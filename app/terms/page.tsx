import type { Metadata } from 'next'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
    title: 'Terms of Service | Nabin Nepali',
    description: 'Terms of Service for Nabin Nepali Portfolio and Services.',
    alternates: {
        canonical: 'https://nabinnepali.com.np/terms',
    },
}

export default function TermsPage() {
    return (
        <PageTransition>
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 gradient-text">Terms of Service</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Agreement to Terms</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Use License</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Permission is granted to temporarily download one copy of the materials on Nabin Nepali&apos;s website for personal, non-commercial transitory viewing only.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. Disclaimer</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            The materials on this website are provided on an &apos;as is&apos; basis. Nabin Nepali makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Governing Law</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            These terms and conditions are governed by and construed in accordance with the laws of Nepal and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>
                    </section>
                </div>
            </div>
        </PageTransition>
    )
}
