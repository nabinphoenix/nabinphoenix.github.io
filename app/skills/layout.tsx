import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Technical Skills & Expertise | Nabin Nepali',
    description: 'Technical skillset of Nabin Nepali, including Python, FastAPI, TensorFlow, PyTorch, MongoDB, and AWS for Machine Learning and Backend development.',
    keywords: ['Nabin Nepali Skills', 'Python ML Skills', 'FastAPI Developer Skills', 'AI Expertise Nepal'],
}

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
