// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google' // Import Google Fonts
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClientChatWidget from '@/components/ClientChatWidget'
import { Toaster } from 'sonner'

// Initialize Outfit font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Nabin Nepali - ML Engineer | AI Developer | FastAPI Expert Nepal',
  description: 'Nabin Nepali - Machine Learning Engineer from Nepal specializing in AI, Deep Learning, Computer Vision, Time Series Forecasting (ARIMA, SARIMA, LSTM), FastAPI backend development, TensorFlow, PyTorch. Based in Kathmandu, Nepal.',
  keywords: [
    // Name & Brand
    'Nabin Nepali',
    'Nabin Nepali Portfolio',
    'Nabin Nepali ML Engineer',
    'Nabin Nepali AI',
    'Nabin Nepali Nepal',
    'Nabin Nepali Salyan Barala',
    'Nabin Nepali Machine Learning',
    'Nabin Nepali Computer Vision',
    'Nabin Nepali FastAPI',

    // Professional Titles
    'ML Engineer Nepal',
    'Machine Learning Engineer Nepal',
    'AI Engineer Nepal',
    'AI Developer Nepal',
    'Data Scientist Nepal',
    'Python Developer Nepal',
    'FastAPI Developer Nepal',
    'Deep Learning Engineer Nepal',

    // Location-Based
    'ML Engineer Kathmandu',
    'Machine Learning Engineer Kathmandu',
    'AI Developer Kathmandu',
    'Tech Professional Nepal',
    'Software Engineer Nepal',

    // Technical Skills
    'TensorFlow Developer Nepal',
    'PyTorch Engineer Nepal',
    'Computer Vision Nepal',
    'Time Series Forecasting Nepal',
    'LSTM Neural Networks Nepal',
    'ARIMA SARIMA Expert',
    'FastAPI Backend Developer',
    'Python Machine Learning',

    // Project-Based
    'Fish Detection System',
    'Object Detection Nepal',
    'AI Projects Nepal',
    'Machine Learning Portfolio',
    'Computer Vision Projects',

    // Services
    'ML Consultant Nepal',
    'AI Solutions Nepal',
    'Machine Learning Services Nepal',
    'Freelance ML Engineer Nepal',
  ],
  authors: [{ name: 'Nabin Nepali' }],
  creator: 'Nabin Nepali',
  publisher: 'Nabin Nepali',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nabinnepali.com.np',
    title: 'Nabin Nepali - ML Engineer | AI Developer | Nepal',
    description: 'Professional Machine Learning Engineer from Nepal specializing in AI, Deep Learning, Computer Vision, Time Series Forecasting, and FastAPI backend development. Portfolio showcasing ML projects and expertise.',
    siteName: 'Nabin Nepali - ML Engineer Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabin Nepali - ML Engineer | AI Developer Nepal',
    description: 'Machine Learning Engineer specializing in AI, Deep Learning, Computer Vision, Time Series Forecasting (LSTM, ARIMA), and FastAPI development in Nepal',
  },
  metadataBase: new URL('https://nabinnepali.com.np'),
  alternates: {
    canonical: 'https://nabinnepali.com.np',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} font-sans`} suppressHydrationWarning>
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
                "https://www.facebook.com/nabin.nepali.ml/",
                "https://www.instagram.com/nabinepali012/",
                "https://www.researchgate.net/profile/Nabin-Nepali-2"
              ]
            })
          }}
        />
      </head>
      <body className="font-inter antialiased overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ClientChatWidget />
            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
