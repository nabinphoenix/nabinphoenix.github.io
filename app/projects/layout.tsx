import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Machine Learning Projects | Nabin Nepali',
    description: 'Portfolio of Machine Learning and AI projects by Nabin Nepali, including Computer Vision, Time Series Forecasting, and Backend Systems.',
    keywords: ['Nabin Nepali Projects', 'ML Portfolio Nepal', 'Python AI Projects', 'Computer Vision Projects Nepal'],
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
