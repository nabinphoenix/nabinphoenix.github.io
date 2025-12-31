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
  title: 'Nabin Nepali - Best Machine Learning Engineer & AI Automation Expert in Nepal',
  description: 'Top Machine Learning Engineer and AI Automation Expert in Nepal. Specializing in AI development, n8n workflow automation, computer vision (YOLO), NLP, and production-ready ML solutions for businesses in Kathmandu and across Nepal.',
  keywords: [
    // Primary Keywords - SEO Optimized
    'Machine Learning Engineer Nepal',
    'AI Developer Nepal',
    'Best Machine Learning Engineer Nepal',
    'Top Machine Learning Engineer Nepal',
    'AI Automation Expert Nepal',
    'n8n Expert Nepal',
    'n8n Specialist Nepal',
    'AI Automation Specialist Nepal',
    'Talented Machine Learning Engineer Nepal',
    'Best ML Engineer Nepal',
    'Top ML Engineer Nepal',
    'Talented ML Engineer Nepal',

    // Name & Brand
    'Nabin Nepali',
    'Nabin Nepali ML Engineer',
    'Nabin Nepali AI Nepal',
    'Nabin Nepali Machine Learning',
    'Nabin Nepali n8n Expert',

    // Location-Based
    'ML Engineer Kathmandu',
    'Machine Learning Engineer Kathmandu',
    'AI Automation Kathmandu',
    'n8n Automation Nepal',
    'AI Developer Kathmandu',

    // Technical Expertise
    'Computer Vision Nepal',
    'YOLO Object Detection Nepal',
    'NLP Engineer Nepal',
    'Time Series Forecasting Nepal',
    'TensorFlow Developer Nepal',
    'PyTorch Engineer Nepal',
    'FastAPI Developer Nepal',

    // Services
    'AI Automation Services Nepal',
    'n8n Workflow Automation Nepal',
    'ML Consultant Nepal',
    'AI Solutions Nepal',
    'Intelligent Automation Nepal',
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
    locale: 'en_NP',
    url: 'https://nabinnepali.com.np',
    title: 'Nabin Nepali - Top Machine Learning Engineer & AI Automation Expert in Nepal',
    description: 'Professional Machine Learning Engineer & AI Automation Specialist in Nepal. Expert in AI, ML, n8n automation, computer vision, YOLO, and building intelligent solutions for businesses in Kathmandu and globally.',
    siteName: 'Nabin Nepali - Machine Learning Engineer Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabin Nepali - Machine Learning Engineer Nepal | AI Automation Expert',
    description: 'Top-rated Machine Learning Engineer and AI Automation Expert in Nepal. Specializing in n8n workflow automation, computer vision, NLP, and intelligent automation solutions.',
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
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="NP-BA" />
        <meta name="geo.placename" content="Kathmandu" />
        <meta name="geo.position" content="27.7172;85.3240" />
        <meta name="ICBM" content="27.7172, 85.3240" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://nabinnepali.com.np/#person",
                  "name": "Nabin Nepali",
                  "alternateName": "Best Machine Learning Engineer in Nepal",
                  "jobTitle": "Machine Learning Engineer & AI Automation Expert",
                  "description": "Top Machine Learning Engineer and AI Automation Specialist in Nepal with expertise in n8n workflow automation, computer vision, NLP, and production-ready AI systems.",
                  "url": "https://nabinnepali.com.np",
                  "image": "https://nabinnepali.com.np/assets/images/nabin2.jpg",
                  "email": "nabinepali012@gmail.com",
                  "telephone": "+977-9829592158",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Shankhamul",
                    "addressLocality": "Kathmandu",
                    "addressRegion": "Bagmati",
                    "postalCode": "44600",
                    "addressCountry": "NP"
                  },
                  "sameAs": [
                    "https://github.com/nabinphoenix",
                    "https://www.linkedin.com/in/nabinnepali",
                    "https://www.facebook.com/nabin.nepali.ml/",
                    "https://www.instagram.com/nabinepali012/",
                    "https://www.researchgate.net/profile/Nabin-Nepali-2"
                  ],
                  "knowsAbout": [
                    "Machine Learning",
                    "Artificial Intelligence",
                    "AI Automation",
                    "n8n Workflow Automation",
                    "Computer Vision",
                    "YOLO Object Detection",
                    "Natural Language Processing",
                    "Time Series Forecasting",
                    "Python",
                    "TensorFlow",
                    "PyTorch",
                    "FastAPI"
                  ],
                  "hasCredential": [
                    {
                      "@type": "EducationalOccupationalCredential",
                      "credentialCategory": "degree",
                      "name": "BSc.IT (Bachelor of Science in Information Technology)",
                      "educationalLevel": "Bachelor's Degree"
                    }
                  ],
                  "workLocation": {
                    "@type": "Place",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Kathmandu",
                      "addressCountry": "Nepal"
                    }
                  },
                  "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "Techspire College"
                  }
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://nabinnepali.com.np/#service",
                  "name": "Nabin Nepali - Machine Learning & AI Automation Services",
                  "provider": {
                    "@id": "https://nabinnepali.com.np/#person"
                  },
                  "areaServed": {
                    "@type": "Country",
                    "name": "Nepal"
                  },
                  "serviceType": [
                    "Machine Learning Development",
                    "AI Automation",
                    "n8n Workflow Automation",
                    "Computer Vision Solutions",
                    "AI Consulting"
                  ],
                  "description": "Professional Machine Learning and AI Automation services in Nepal. Specializing in building intelligent, production-ready AI systems, n8n automation workflows, computer vision applications, and custom ML solutions for businesses."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://nabinnepali.com.np/#website",
                  "url": "https://nabinnepali.com.np",
                  "name": "Nabin Nepali - Machine Learning Engineer Portfolio",
                  "description": "Official portfolio of Nabin Nepali, a leading Machine Learning Engineer and AI Automation Expert in Nepal",
                  "publisher": {
                    "@id": "https://nabinnepali.com.np/#person"
                  }
                }
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
