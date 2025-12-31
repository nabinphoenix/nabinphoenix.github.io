import type { Metadata } from 'next'
import PageTransition from '@/components/PageTransition'
import ServicesHero from '@/components/services/ServicesHero'
import ServicesList from '@/components/services/ServicesList'
import ProcessSection from '@/components/services/ProcessSection'
import PricingSection from '@/components/services/PricingSection'
import ServicesCTA from '@/components/services/ServicesCTA'

export const metadata: Metadata = {
    title: 'AI Automation Services & Machine Learning Development in Nepal | Nabin Nepali',
    description: 'Professional Machine Learning development, AI automation, n8n workflow automation, computer vision, and AI consulting services in Nepal. Expert ML engineer offering production-ready AI solutions for businesses in Kathmandu and globally.',
    keywords: [
        'AI Automation Services Nepal',
        'Machine Learning Development Nepal',
        'n8n Workflow Automation Nepal',
        'AI Consulting Nepal',
        'Computer Vision Services Nepal',
        'ML Engineer Services Kathmandu',
        'AI Solutions Nepal',
        'Intelligent Automation Nepal',
        'n8n Expert Nepal',
        'AI Development Services Nepal'
    ],
    openGraph: {
        title: 'AI Automation & Machine Learning Services in Nepal',
        description: 'Professional ML development, AI automation, and n8n workflow services by Nepal\'s leading Machine Learning Engineer. Production-ready AI solutions for businesses.',
        url: 'https://nabinnepali.com.np/services',
    },
    alternates: {
        canonical: 'https://nabinnepali.com.np/services',
    },
}

export default function ServicesPage() {
    return (
        <PageTransition>
            <div className="pt-16">
                <ServicesHero />
                <ServicesList />
                <ProcessSection />
                <PricingSection />
                <ServicesCTA />
            </div>
        </PageTransition>
    )
}
