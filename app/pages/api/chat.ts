import type { NextApiRequest, NextApiResponse } from 'next';

const N8N_WEBHOOK_URL = 'https://n8n.srv1132810.hstgr.cloud/webhook/sastosale-chat';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Forward to n8n webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                sessionId: sessionId || `session_${Date.now()}`,
            }),
        });

        if (!response.ok) {
            throw new Error(`n8n webhook returned ${response.status}`);
        }

        const data = await response.json();

        return res.status(200).json({
            response: data.response || data.message || 'No response from assistant',
            success: data.success ?? true,
            orderConfirmed: data.orderConfirmed || false,
            orderId: data.orderId || null,
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return res.status(500).json({
            error: 'Failed to process message',
            response: 'Sorry, I\'m having trouble connecting. Please try again later.',
            success: false
        });
    }
}