// app/api/contact/route.ts (Optional backend for contact form)
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Here you would typically:
    // 1. Validate the data
    // 2. Send an email using a service like SendGrid, Resend, etc.
    // 3. Store in database if needed

    // For now, we'll just log and return success
    console.log('Contact form submission:', { name, email, message })

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Error sending message' },
      { status: 500 }
    )
  }
}