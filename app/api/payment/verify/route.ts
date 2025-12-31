import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = process.env.N8N_PAYMENT_WEBHOOK_URL || 'https://nabin8n.tridevinnovation.com/webhook/payment-verify';

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

        // Get response text first to handle both JSON and plain text
        const responseText = await response.text();
        console.log('n8n verification response raw:', responseText);

        if (!response.ok) {
            console.error('n8n webhook error:', response.status, responseText);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Payment verification service error',
                    details: responseText.substring(0, 100)
                },
                { status: response.status }
            );
        }

        // Parse n8n response as JSON or fallback to text
        let n8nData: any = {};
        try {
            n8nData = JSON.parse(responseText);
            console.log('n8n parsed response:', n8nData);
        } catch (e) {
            console.log('n8n returned non-JSON response, status OK');
            n8nData = { success: true, message: responseText };
        }

        // Return the response with fallbacks to ensure UI gets needed fields
        return NextResponse.json({
            success: true,
            order_id: n8nData.order_id || n8nData.purchase_order_id || null,
            total_amount: n8nData.total_amount || n8nData.amount || null,
            pidx: pidx,
            message: n8nData.message || 'Payment verification processed'
        });

    } catch (error) {
        console.error('Payment verification exception:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error during verification',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
