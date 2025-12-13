import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://nabin8n.tridevinnovation.com/webhook/maya-ai';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { chatInput, message, sessionId, timestamp, source } = body;

        // Support both 'chatInput' and 'message' field names
        const userMessage = chatInput || message;

        console.log('📨 Chat API - Received message:', userMessage);

        if (!userMessage) {
            console.log('❌ No message provided');
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        const payload = {
            chatInput: userMessage,
            sessionId: sessionId || `session_${Date.now()}`,
            timestamp: timestamp || new Date().toISOString(),
            source: source || 'chat-widget',
        };

        console.log('🔄 Forwarding to n8n webhook:', N8N_WEBHOOK_URL);
        console.log('📦 Payload:', JSON.stringify(payload, null, 2));

        // Forward to n8n webhook with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            console.log('📥 n8n response status:', response.status, response.statusText);
            console.log('📥 Content-Type:', response.headers.get('content-type'));

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`❌ n8n webhook error: ${response.status} ${response.statusText}`);
                console.error('Error response:', errorText);

                return NextResponse.json(
                    {
                        error: 'Webhook error',
                        response: 'Sorry, the AI assistant is currently unavailable. Please try again later.',
                        success: false,
                        details: `Status: ${response.status}. Error: ${errorText.substring(0, 200)}`
                    },
                    { status: 500 }
                );
            }

            // Get the response text first
            const responseText = await response.text();
            console.log('📥 Raw response length:', responseText.length);
            console.log('📥 Raw response preview:', responseText.substring(0, 200));

            // Check if response is empty
            if (!responseText || responseText.trim() === '') {
                console.error('❌ Empty response from n8n webhook');
                return NextResponse.json(
                    {
                        error: 'Empty response',
                        response: 'The AI assistant didn\'t respond. Please try again.',
                        success: false
                    },
                    { status: 500 }
                );
            }

            // Try to parse as JSON first, if that fails treat as plain text
            let aiResponse;

            try {
                const data = JSON.parse(responseText);
                console.log('✅ Parsed as JSON successfully');
                console.log('📊 Response fields:', Object.keys(data).join(', '));
                aiResponse = data.output || data.response || data.message || 'No response from assistant';
            } catch (parseError: any) {
                // Not JSON, treat as plain text response (which is what your n8n returns)
                console.log('📝 Response is plain text, not JSON - using as-is');
                aiResponse = responseText.trim();
            }

            console.log('✅ Sending AI response:', aiResponse.substring(0, 100));

            return NextResponse.json({
                response: aiResponse,
                success: true,
            });

        } catch (fetchError: any) {
            clearTimeout(timeoutId);

            if (fetchError.name === 'AbortError') {
                console.error('❌ Request timeout - n8n took too long to respond');
                return NextResponse.json(
                    {
                        error: 'Request timeout',
                        response: 'The AI is taking too long to respond. Please try again.',
                        success: false
                    },
                    { status: 500 }
                );
            }

            throw fetchError;
        }

    } catch (error: any) {
        console.error('❌ Chat API Error:', error);
        console.error('Error details:', {
            name: error?.name,
            message: error?.message,
            stack: error?.stack?.substring(0, 200)
        });

        return NextResponse.json(
            {
                error: 'Failed to process message',
                response: 'Sorry, I\'m having trouble connecting. Please try again later.',
                success: false,
                details: error?.message || 'Unknown error'
            },
            { status: 500 }
        );
    }
}