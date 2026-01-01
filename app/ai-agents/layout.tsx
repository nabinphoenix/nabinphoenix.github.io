import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Agents & Business Automation | Nabin Nepali - AI Expert Nepal',
    description: 'Leading AI Automation Specialist in Nepal. Custom autonomous AI agents, n8n workflow automation, and intelligent systems built by Nabin Nepali to scale your business operations.',
    keywords: [
        'AI Agents Nepal',
        'AI Automation Expert Nepal',
        'Business Automation Specialist Kathmandu',
        'n8n Workflow Automation Nepal',
        'Autonomous AI Developers Nepal'
    ],
}

export default function AiAgentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
