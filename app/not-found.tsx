import Link from 'next/link'
import PageTransition from '@/components/PageTransition'

export default function NotFound() {
    return (
        <PageTransition>
            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-500 tracking-widest">404</h1>
                    <div className="bg-white dark:bg-gray-900 px-2 text-sm rounded rotate-12 absolute">
                        Page Not Found
                    </div>
                    <div className="mt-8">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Oops! The page you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            It might have been moved, deleted, or never existed in the first place.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7m8 0l7 7-7 7" />
                            </svg>
                            Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
