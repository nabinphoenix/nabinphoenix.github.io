import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Skills & Expertise | Nabin Nepali - Technical Proficiency',
    description: 'A comprehensive overview of Nabin Nepali\'s technical skills, including Machine Learning, AI Automation, Python, and soft skills.',
    alternates: {
        canonical: 'https://nabinnepali.com.np/skills',
    },
}

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
