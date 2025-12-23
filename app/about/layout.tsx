import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Nabin Nepali | ML Engineer & AI Developer',
    description: 'Learn about Nabin Nepali, a Machine Learning Engineer based in Kathmandu, Nepal. Expertise in FastAPI, Python, Time Series Forecasting, and Computer Vision.',
    keywords: ['About Nabin Nepali', 'Nabin Nepali Biography', 'Nabin Nepali Education', 'ML Engineer Nepal'],
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
