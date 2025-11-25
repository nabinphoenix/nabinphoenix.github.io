// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Nabin Nepali - ML Engineer | FastAPI Developer',
  description: 'ML Engineer proficient in backend development using FastAPI with databases, with strong expertise in machine learning, particularly time series forecasting (ARIMA, SARIMA, LSTM).',
  keywords: ['Nabin Nepali', 'ML Engineer Nepal', 'Machine Learning Engineer', 'FastAPI Developer', 'Python Developer', 'Nepal Machine Learning Portfolio', 'Nabin Nepali Salyan Barala', 'Salyan Barala'],
  authors: [{ name: 'Nabin Nepali' }],
  creator: 'Nabin Nepali',
  publisher: 'Nabin Nepali',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nabinnepali.com.np',
    title: 'Nabin Nepali - ML Engineer | Salyan Barala',
    description: 'ML Engineer from Salyan Barala specializing in FastAPI, Time Series Forecasting, and Computer Vision',
    siteName: 'Nabin Nepali Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabin Nepali - ML Engineer',
    description: 'ML Engineer from Salyan Barala specializing in FastAPI, Time Series Forecasting, and Computer Vision',
  },
  metadataBase: new URL('https://nabinnepali.com.np'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nabin Nepali",
              "jobTitle": "ML Engineer",
              "url": "https://nabinnepali.com.np",
              "email": "nabinepali012@gmail.com",
              "telephone": "+977-9829592158",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Shankhamul, Kathmandu",
                "addressRegion": "Bagmati",
                "addressCountry": "NP",
                "streetAddress": "Salyan Barala (Permanent Address)"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Techspire College"
                }
              ],
              "knowsAbout": [
                "Machine Learning",
                "FastAPI",
                "Python",
                "Time Series Forecasting",
                "Computer Vision"
              ],
              "sameAs": [
                "https://github.com/nabinphoenix",
                "https://www.linkedin.com/in/nabinnepali",
                "https://www.facebook.com/nab.in.nepali.149047/"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}