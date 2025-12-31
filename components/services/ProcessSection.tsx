'use client'

import { motion } from 'framer-motion'
import { MessageCircle, FileText, Code, TestTube, Rocket, Headphones } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

export default function ProcessSection() {
    const steps = [
        {
            icon: MessageCircle,
            title: 'Discovery & Consultation',
            description: 'We start with a free consultation to understand your business needs, goals, and challenges. I analyze your requirements and recommend the best AI/ML approach.',
            duration: '1-2 days'
        },
        {
            icon: FileText,
            title: 'Proposal & Planning',
            description: 'Receive a detailed proposal with project scope, timeline, milestones, and cost estimates. We align on expectations and create a clear roadmap.',
            duration: '2-3 days'
        },
        {
            icon: Code,
            title: 'Development & Training',
            description: 'Agile development with weekly updates. I build your ML models, automation workflows, or AI systems using best practices and production-ready code.',
            duration: '2-8 weeks'
        },
        {
            icon: TestTube,
            title: 'Testing & Optimization',
            description: 'Rigorous testing to ensure accuracy, performance, and reliability. I optimize models and workflows based on real-world data and edge cases.',
            duration: '1-2 weeks'
        },
        {
            icon: Rocket,
            title: 'Deployment & Launch',
            description: 'Seamless deployment to production with minimal downtime. I handle server setup, API integration, and ensure everything runs smoothly 24/7.',
            duration: '3-5 days'
        },
        {
            icon: Headphones,
            title: 'Support & Maintenance',
            description: 'One month of free post-launch support included. I provide documentation, training, and ongoing assistance to ensure long-term success.',
            duration: 'Ongoing'
        }
    ]

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-6xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        How I Work: From Consultation to Delivery
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        A transparent, collaborative process designed to deliver production-ready AI solutions on time and within budget.
                    </p>
                </AnimatedSection>

                <div className="relative">
                    {/* Vertical Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 dark:from-primary-800 dark:via-primary-600 dark:to-primary-800" />

                    {/* Steps */}
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Content Card */}
                                    <div className="flex-1 w-full">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 group hover:shadow-xl transition-all"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                                    <step.icon size={24} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                            {step.title}
                                                        </h3>
                                                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                                                            {step.duration}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Step Number (Desktop) */}
                                    <div className="hidden md:flex items-center justify-center shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 text-white font-bold flex items-center justify-center text-lg shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Spacer for alignment */}
                                    <div className="hidden md:block flex-1" />
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
