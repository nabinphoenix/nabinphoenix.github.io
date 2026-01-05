import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About | Nabin Nepali - ML Engineer & AI Automation Expert',
    description: 'Learn more about Nabin Nepali, a Machine Learning Engineer and AI Automation Expert based in Nepal. Professional background, education, and expertise.',
    alternates: {
        canonical: 'https://nabinnepali.com.np/about',
    },
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
