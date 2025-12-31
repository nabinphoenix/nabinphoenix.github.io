'use client'

import { motion } from 'framer-motion'
import { Check, X, Award, DollarSign, Clock, Headphones, Code, Zap } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

export default function WhyChooseMeSection() {
    const comparisons = [
        {
            category: "AI/ML Expertise",
            generic: "Basic understanding of ML concepts",
            me: "Deep expertise in production-ready ML, computer vision, NLP",
            icon: Code
        },
        {
            category: "n8n Automation",
            generic: "No experience with n8n",
            me: "Expert-level n8n workflow automation specialist",
            icon: Zap
        },
        {
            category: "Production Deployment",
            generic: "Prototypes and demos only",
            me: "Production-ready, scalable AI systems that run 24/7",
            icon: Award
        },
        {
            category: "Cost Effectiveness",
            generic: "High international rates ($80-150/hr)",
            me: "Competitive Nepal-based pricing (40-60% savings)",
            icon: DollarSign
        },
        {
            category: "Business Focus",
            generic: "Technical solutions without business context",
            me: "Business-impact driven AI solutions with measurable ROI",
            icon: Award
        },
        {
            category: "Availability",
            generic: "Overseas, timezone issues",
            me: "Based in Kathmandu, easy collaboration",
            icon: Clock
        },
        {
            category: "Long-Term Support",
            generic: "Project-based only, no future support",
            me: "Ongoing support, iterations, and optimization",
            icon: Headphones
        }
    ]

    const benefits = [
        {
            icon: Code,
            title: "Specialized AI Expertise",
            description: "Not a generalist — I'm a dedicated Machine Learning Engineer focused exclusively on AI, ML, and intelligent automation. Every project leverages cutting-edge techniques."
        },
        {
            icon: DollarSign,
            title: "Cost-Effective Solutions",
            description: "Get world-class AI development at Nepal-based competitive rates. Save 40-60% compared to international agencies while maintaining high quality and professional standards."
        },
        {
            icon: Award,
            title: "Production-Ready Systems",
            description: "I don't just build demos. Every AI system I create is production-ready, scalable, and designed to run 24/7 with minimal intervention — from prototype to deployment."
        },
        {
            icon: Zap,
            title: "n8n Automation Specialist",
            description: "As one of the few n8n experts in Nepal, I can automate virtually any business process — from lead generation to customer support — saving you hundreds of hours monthly."
        },
        {
            icon: Clock,
            title: "Local Presence, Global Standards",
            description: "Based in Kathmandu with easy availability for meetings and collaboration, while trained on international tools and best practices (TensorFlow, PyTorch, FastAPI)."
        },
        {
            icon: Headphones,
            title: "Full-Stack AI Development",
            description: "From data collection and model training to API deployment and automation integration — I handle the entire AI development lifecycle with seamless integration."
        }
    ]

    return (
        <section id="why-choose-me" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Why Choose Me as Your Machine Learning Engineer in Nepal?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        As a top-rated Machine Learning Engineer and AI Automation Expert in Nepal, I provide specialized expertise that generic developers simply can't match. Here's how I stand out.
                    </p>
                </AnimatedSection>

                {/* Comparison Table */}
                <AnimatedSection delay={0.2} className="mb-20">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Me vs. Generic Developers
                    </h3>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-2">
                                                <X size={18} className="text-red-500" />
                                                Generic Developer
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 bg-primary-100 dark:bg-primary-900/40">
                                            <div className="flex items-center gap-2">
                                                <Check size={18} className="text-green-500" />
                                                Nabin Nepali (ML Expert)
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800">
                                    {comparisons.map((item, index) => (
                                        <motion.tr
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <item.icon size={18} className="text-primary-500" />
                                                    <span className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                                                        {item.category}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
                                                <div className="flex items-start gap-2">
                                                    <X size={16} className="text-red-500 shrink-0 mt-1" />
                                                    <span>{item.generic}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 bg-primary-50/50 dark:bg-primary-900/10">
                                                <div className="flex items-start gap-2">
                                                    <Check size={16} className="text-green-500 shrink-0 mt-1" />
                                                    <span className="text-gray-900 dark:text-white font-medium text-sm md:text-base">
                                                        {item.me}
                                                    </span>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Key Benefits Grid */}
                <AnimatedSection delay={0.4}>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        What You Get When You Work With Me
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                        <benefit.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            {benefit.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* CTA Section */}
                <AnimatedSection delay={0.6} className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-primary-600 to-teal-600 dark:from-primary-700 dark:to-teal-700 rounded-2xl p-8 md:p-12 shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Build Your Next AI Project?
                        </h3>
                        <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                            Let's discuss how AI automation and machine learning can transform your business. Free consultation for Nepal-based businesses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Get Free Consultation
                            </a>
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                            >
                                View Success Stories
                            </a>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}
