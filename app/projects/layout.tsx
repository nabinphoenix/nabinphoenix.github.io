import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Machine Learning & AI Projects | Nabin Nepali - Expert in Nepal',
    description: 'Explore the portfolio of Nabin Nepali, featuring top-tier Machine Learning, Computer Vision, and AI Automation projects developed in Nepal. Production-ready AI solutions and custom ML models.',
    keywords: [
        'Nabin Nepali Projects',
        'Best Machine Learning Portfolio Nepal',
        'AI Projects Nepal',
        'Computer Vision Solutions Nepal',
        'AI Automation Portfolio'
    ],
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
