import type { NextApiRequest, NextApiResponse } from 'next';
import { writeFileSync } from 'fs';
import { join } from 'path';

const N8N_WEBHOOK_URL = 'https://n8n.srv1132810.hstgr.cloud/webhook/sastosale-chat';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { chatInput, message, sessionId } = req.body;
        const userMessage = chatInput || message;

        const logData = {
            timestamp: new Date().toISOString(),
            received: { chatInput, message, sessionId },
            webhookUrl: N8N_WEBHOOK_URL
        };

        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Forward to n8n webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                sessionId: sessionId || `session_${Date.now()}`,
            }),
        });

        const responseText = await response.text();

        Object.assign(logData, {
            n8nStatus: response.status,
            n8nResponse: responseText
        });

        if (!response.ok) {
            Object.assign(logData, { error: `n8n webhook returned ${response.status}` });
            writeFileSync(join(process.cwd(), 'chat-debug.log'), JSON.stringify(logData, null, 2));
            throw new Error(`n8n webhook returned ${response.status}: ${responseText}`);
        }

        const data = responseText ? JSON.parse(responseText) : {};

        Object.assign(logData, { success: true, parsedData: data });
        writeFileSync(join(process.cwd(), 'chat-debug.log'), JSON.stringify(logData, null, 2));

        return res.status(200).json({
            response: data.response || data.message || data.output || 'No response from assistant',
            success: data.success ?? true,
            orderConfirmed: data.orderConfirmed || false,
            orderId: data.orderId || null,
        });

    } catch (error: any) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            error: error.message,
            stack: error.stack,
            type: error.constructor.name
        };

        writeFileSync(join(process.cwd(), 'chat-debug.log'), JSON.stringify(errorLog, null, 2));

        return res.status(500).json({
            error: 'Failed to process message',
            response: 'Sorry, I\'m having trouble connecting. Please try again later.',
            success: false,
            debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}