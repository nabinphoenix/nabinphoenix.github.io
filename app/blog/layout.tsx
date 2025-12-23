import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI & Machine Learning Blog | Nabin Nepali',
    description: 'Technical articles, insights, and tutorials on Artificial Intelligence and Machine Learning by Nabin Nepali.',
    keywords: ['Nabin Nepali Blog', 'AI Blog Nepal', 'Machine Learning Tutorials', 'Tech Blog Kathmandu'],
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
