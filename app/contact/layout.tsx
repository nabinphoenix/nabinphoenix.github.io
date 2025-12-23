import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Nabin Nepali | Hire AI Developer Nepal',
    description: 'Get in touch with Nabin Nepali for freelance projects, AI consultations, or collaboration opportunities in Machine Learning and Backend development.',
    keywords: ['Contact Nabin Nepali', 'Hire ML Engineer Nepal', 'Nabin Nepali Email', 'AI Consultant Kathmandu'],
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
