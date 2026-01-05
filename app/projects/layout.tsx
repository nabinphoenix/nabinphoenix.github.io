import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects | Nabin Nepali - Portfolio of AI & ML Work',
    description: 'Explore the portfolio of Nabin Nepali, featuring machine learning projects, computer vision applications, and AI automation workflows.',
    alternates: {
        canonical: 'https://nabinnepali.com.np/projects',
    },
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
