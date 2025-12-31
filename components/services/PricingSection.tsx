'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

export default function PricingSection() {
    const packages = [
        {
            name: 'Starter',
            subtitle: 'Perfect for small automation projects',
            price: 'NPR 30,000 - 80,000',
            usdPrice: '$225 - $600',
            description: 'Ideal for businesses starting their AI automation journey',
            features: [
                'Simple n8n workflow automation (3-5 integrations)',
                'Basic data processing and synchronization',
                'Email and notification automation',
                '1 week delivery time',
                '2 weeks of post-launch support',
                'Documentation and training included'
            ],
            popular: false,
            color: 'from-blue-500 to-blue-600'
        },
        {
            name: 'Professional',
            subtitle: 'Most popular for growing businesses',
            price: 'NPR 100,000 - 250,000',
            usdPrice: '$750 - $1,875',
            description: 'Comprehensive AI solutions with custom ML models',
            features: [
                'Custom machine learning model development',
                'Advanced n8n automation (10+ integrations)',
                'Computer vision or NLP implementation',
                'FastAPI deployment for real-time inference',
                '4-6 weeks delivery time',
                '1 month of post-launch support',
                'Full documentation and code handover',
                'Team training session included'
            ],
            popular: true,
            color: 'from-primary-500 to-teal-500'
        },
        {
            name: 'Enterprise',
            subtitle: 'For complex, large-scale AI systems',
            price: 'NPR 300,000+',
            usdPrice: '$2,250+',
            description: 'Full-scale AI transformation with ongoing support',
            features: [
                'Multiple ML models and AI systems',
                'Complete automation suite with n8n',
                'Computer vision + NLP + Predictive Analytics',
                'MLOps and continuous monitoring setup',
                'Custom timeline (8-12 weeks typical)',
                '3 months of post-launch support',
                'Priority support and SLA',
                'Quarterly model retraining',
                'Dedicated project management',
                'On-site consultation available (Kathmandu)'
            ],
            popular: false,
            color: 'from-purple-500 to-pink-500'
        }
    ]

    const additionalServices = [
        'Hourly consulting: NPR 2,500 - 4,000/hour ($20-30/hour)',
        'AI readiness assessment: NPR 15,000 ($110)',
        'Team training workshops: NPR 25,000/day ($190/day)',
        'Maintenance & support: NPR 10,000 - 30,000/month ($75-225/month)'
    ]

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Transparent Pricing for AI & ML Services in Nepal
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Cost-effective pricing without compromising quality. All packages include free consultation, documentation, and post-launch support.
                    </p>
                </AnimatedSection>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {packages.map((pkg, index) => (
                        <AnimatedSection key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className={`relative h-full p-8 rounded-2xl border-2 ${pkg.popular
                                        ? 'border-primary-500 dark:border-primary-400 shadow-2xl bg-gradient-to-br from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg'
                                    } transition-all duration-300`}
                            >
                                {/* Popular Badge */}
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-primary-600 to-teal-600 text-white text-sm font-bold rounded-full shadow-lg">
                                            <Star size={14} fill="currentColor" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        {pkg.subtitle}
                                    </p>
                                    <div className="mb-2">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {pkg.price}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {pkg.usdPrice} USD
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                                        {pkg.description}
                                    </p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <a
                                    href="#contact"
                                    className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all ${pkg.popular
                                            ? 'bg-gradient-to-r from-primary-600 to-teal-600 text-white hover:from-primary-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    Get Started
                                </a>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Additional Services */}
                <AnimatedSection delay={0.4} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Additional Services & Pricing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        {additionalServices.map((service, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <Check size={18} className="text-primary-500 shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                    {service}
                                </span>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* ROI Note */}
                <AnimatedSection delay={0.6} className="mt-12 text-center">
                    <div className="max-w-3xl mx-auto bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            💡 ROI Guarantee
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Most automation projects pay for themselves within <strong>2-4 months</strong> through time savings and efficiency gains.
                            For example, if automation saves you 50 hours/month and your time is worth NPR 1,000/hour, that's <strong>NPR 50,000/month</strong> saved —
                            a typical NPR 100,000 automation pays for itself in just 2 months.
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}
