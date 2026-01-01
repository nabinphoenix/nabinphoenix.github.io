import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI, Machine Learning & Automation Blog | Nabin Nepali - Nepal',
    description: 'Technical insights, n8n automation tutorials, and Machine Learning research from Nabin Nepali, a leading AI Automation Expert in Nepal.',
    keywords: [
        'Nabin Nepali Blog',
        'Machine Learning Blog Nepal',
        'AI Automation Tutorials',
        'n8n Tips Nepal',
        'AI Industry Nepal'
    ],
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
