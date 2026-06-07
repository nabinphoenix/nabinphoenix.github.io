import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Message from '@/models/Message'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, message } = body

        // 1. Save to MongoDB (Primary & Reliable)
        try {
            await dbConnect()
            await Message.create({ name, email, message })
            console.log('✅ Message saved to MongoDB')
        } catch (dbError) {
            console.error('❌ MongoDB Save Error:', dbError)
            // We continue even if DB fails, to try the Google Script notification
        }

        // 2. Notify via Google Script (Optional/Notification)
        const scriptUrl = process.env.GOOGLE_SCRIPT_URL

        if (scriptUrl) {
            try {
                const formParams = new URLSearchParams()
                formParams.append('name', name)
                formParams.append('email', email)
                formParams.append('message', message)

                const response = await fetch(scriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formParams.toString(),
                    redirect: 'follow'
                })

                if (!response.ok) {
                    const errorText = await response.text()
                    console.warn(`⚠️ Google Script Notification failed (${response.status}):`, errorText.substring(0, 100))
                } else {
                    console.log('🚀 Google Script notification sent')
                }
            } catch (scriptError) {
                console.error('⚠️ Google Script Fetch Error:', scriptError)
            }
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' })

    } catch (error: any) {
        console.error('Contact form error detail:', error.message || error)
        return NextResponse.json(
            { error: 'Failed to send message', details: error.message },
            { status: 500 }
        )
    }
}

