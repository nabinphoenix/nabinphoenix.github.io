import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Agents | Nabin Nepali',
    description: 'Explore autonomous AI agents and intelligent systems built by Nabin Nepali.',
}

export default function AiAgentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
