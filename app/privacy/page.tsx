import type { Metadata } from 'next'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
    title: 'Privacy Policy | Nabin Nepali',
    description: 'Privacy Policy for Nabin Nepali Portfolio and Services.',
    alternates: {
        canonical: 'https://nabinnepali.com.np/privacy',
    },
}

export default function PrivacyPage() {
    return (
        <PageTransition>
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 gradient-text">Privacy Policy</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Introduction</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Welcome to the portfolio and services of Nabin Nepali. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Data We Collect</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We may collect and process the following data about you:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Identity Data: Name and email address if you contact us.</li>
                            <li>Technical Data: IP address, browser type and version, time zone setting and location.</li>
                            <li>Usage Data: Information about how you use our website and services.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. How We Use Your Data</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We use your data to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Provide and maintain our services.</li>
                            <li>Notify you about changes to our services.</li>
                            <li>Respond to your inquiries via the contact form.</li>
                            <li>Analyze website performance and improve user experience.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Contact Information</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            If you have any questions about this privacy policy, please contact us at: <br />
                            <strong>Email:</strong> nabinepali012@gmail.com
                        </p>
                    </section>
                </div>
            </div>
        </PageTransition>
    )
}
