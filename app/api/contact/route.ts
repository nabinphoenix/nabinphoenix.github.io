import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, message } = body

        // URL from environment variable
        const scriptUrl = process.env.GOOGLE_SCRIPT_URL

        if (!scriptUrl) {
            return NextResponse.json(
                { error: 'Server configuration error: Missing Script URL' },
                { status: 500 }
            )
        }

        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })

        if (!response.ok) {
            throw new Error('Failed to submit to Google Script')
        }

        // Google Script often returns a 302 Redirect for "text/html", handling strictly might be tricky.
        // However, fetch commonly follows redirects by default.
        // If the script returns JSON, we are good.

        return NextResponse.json({ success: true, message: 'Message sent successfully' })

    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}
