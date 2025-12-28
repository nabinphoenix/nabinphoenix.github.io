import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = 'https://nabin8n.tridevinnovation.com/webhook/payment-verify';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { pidx } = body;

        // Validate pidx
        if (!pidx || typeof pidx !== 'string' || pidx.trim() === '') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing or invalid pidx parameter'
                },
                { status: 400 }
            );
        }

        console.log('Verifying payment with pidx:', pidx);

        // Call n8n webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pidx: pidx.trim() }),
        });

        // Check if n8n responded
        if (!response.ok) {
            console.error('n8n webhook error:', response.status, response.statusText);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Payment verification service unavailable'
                },
                { status: 502 }
            );
        }

        // Parse n8n response
        const data = await response.json();
        console.log('n8n response:', data);

        // Return the response from n8n
        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error during payment verification',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
