import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pidx = searchParams.get('pidx');
        const status = searchParams.get('status');
        const txnId = searchParams.get('transaction_id');
        const purchaseOrderId = searchParams.get('purchase_order_id');
        const amount = searchParams.get('amount');

        if (!pidx) {
            return NextResponse.json({ success: false, error: 'Missing pidx' }, { status: 400 });
        }

        // Construct the n8n URL with all parameters
        const n8nWebhookUrl = new URL('https://nabin8n.tridevinnovation.com/webhook/payment-verify');
        n8nWebhookUrl.searchParams.append('pidx', pidx);
        n8nWebhookUrl.searchParams.append('status', status || 'Completed');
        if (txnId) n8nWebhookUrl.searchParams.append('transaction_id', txnId);
        if (purchaseOrderId) n8nWebhookUrl.searchParams.append('purchase_order_id', purchaseOrderId);
        if (amount) n8nWebhookUrl.searchParams.append('amount', amount);

        console.log('🔗 Proxying request to n8n:', n8nWebhookUrl.toString());

        const response = await fetch(n8nWebhookUrl.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data);
        } else {
            console.error('❌ n8n verification failed:', data);
            return NextResponse.json({
                success: false,
                error: 'Backend verification failed',
                details: data
            }, { status: response.status });
        }
    } catch (error: any) {
        console.error('❌ Payment Proxy Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error during verification',
            details: error.message
        }, { status: 500 });
    }
}
