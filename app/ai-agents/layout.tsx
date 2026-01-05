import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Agents | Nabin Nepali - Intelligent Automation Solutions',
    description: 'Discover AI agents built by Nabin Nepali. Intelligent solutions for automation, business efficiency, and advanced interaction.',
    alternates: {
        canonical: 'https://nabinnepali.com.np/ai-agents',
    },
}

export default function AiAgentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
