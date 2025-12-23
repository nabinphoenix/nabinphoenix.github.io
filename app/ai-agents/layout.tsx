import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Agents & Automation | Nabin Nepali',
    description: 'Explore autonomous AI agents developed by Nabin Nepali using cutting-edge technologies like n8n, OpenAI, and custom ML models for business automation.',
    keywords: ['AI Agents Nepal', 'Autonomous AI', 'Automation Solutions Nepal', 'Nabin Nepali AI Agents'],
}

export default function AiAgentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
