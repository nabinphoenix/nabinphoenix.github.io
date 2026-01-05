import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Payment Status | Nabin Nepali',
    robots: {
        index: false,
        follow: false,
    },
}

export default function PaymentSuccessLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
