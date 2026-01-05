import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact | Nabin Nepali - Let\'s Connect',
    description: 'Get in touch with Nabin Nepali for project inquiries, collaborations, or tech discussions. Machine Learning Engineer and AI Automation Expert in Kathmandu, Nepal.',
    alternates: {
        canonical: 'https://nabinnepali.com.np/contact',
    },
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
