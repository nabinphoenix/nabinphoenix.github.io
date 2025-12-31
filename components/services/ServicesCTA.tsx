'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Calendar, FileText } from 'lucide-react'
import Link from 'next/link'

export default function ServicesCTA() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Business with AI?
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Let's discuss your project and create a custom solution that delivers real business value.
                        Free consultation for Nepal-based businesses — no obligations, just expert guidance.
                    </p>

                    {/* CTA Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all"
                        >
                            <MessageCircle className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">
                                Free Consultation
                            </h3>
                            <p className="text-sm text-gray-300 mb-4">
                                30-minute call to discuss your needs and explore AI opportunities
                            </p>
                            <Link
                                href="#contact"
                                className="inline-block text-teal-400 hover:text-teal-300 font-semibold text-sm"
                            >
                                Schedule Now →
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all"
                        >
                            <FileText className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">
                                View Portfolio
                            </h3>
                            <p className="text-sm text-gray-300 mb-4">
                                See real projects and results from my AI automation work
                            </p>
                            <Link
                                href="/projects"
                                className="inline-block text-primary-400 hover:text-primary-300 font-semibold text-sm"
                            >
                                Browse Projects →
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all"
                        >
                            <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">
                                Get Proposal
                            </h3>
                            <p className="text-sm text text-gray-300 mb-4">
                                Receive a detailed quote with timeline and cost breakdown
                            </p>
                            <Link
                                href="#contact"
                                className="inline-block text-green-400 hover:text-green-300 font-semibold text-sm"
                            >
                                Request Quote →
                            </Link>
                        </motion.div>
                    </div>

                    {/* Primary CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white text-lg font-bold rounded-lg transition-all shadow-2xl hover:shadow-primary-500/50 hover:scale-105"
                        >
                            Start Your AI Project Today
                        </Link>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Available for new projects</span>
                        </div>
                        <span>•</span>
                        <span>Based in Kathmandu, Nepal</span>
                        <span>•</span>
                        <span>Serving clients globally</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
