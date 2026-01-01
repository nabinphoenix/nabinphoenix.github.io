import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Nabin Nepali | Top Machine Learning Engineer & AI Automation Expert in Nepal',
    description: 'Nabin Nepali is a professional Machine Learning Engineer and AI Automation Expert based in Kathmandu, Nepal. Specialized in building intelligent AI agents, n8n automation workflows, and computer vision systems for businesses.',
    keywords: [
        'About Nabin Nepali',
        'Machine Learning Engineer Nepal',
        'AI Automation Expert Nepal',
        'Nabin Nepali AI Specialist',
        'AI Developer Kathmandu',
        'n8n Expert Nepal'
    ],
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
