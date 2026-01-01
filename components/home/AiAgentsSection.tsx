'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Bot } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import ProjectCard from '@/components/ProjectCard'
import { aiAgents } from '@/data/ai-agents'

export default function AiAgentsSection() {
    return (
        <section id="ai-agents" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        AI Agents <span className="gradient-text">&</span> Automations
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Next-generation AI agents designed for automation, interaction, and practical problem-solving.
                    </p>
                </AnimatedSection>

                <div className="relative">
                    <div className="hidden md:flex justify-end absolute -top-12 right-0">
                        <AnimatedSection delay={0.2}>
                            <Link
                                href="/ai-agents"
                                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all group px-2"
                            >
                                View All Agents
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedSection>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {aiAgents.map((agent, index) => (
                            <AnimatedSection key={agent.id} delay={index * 0.1}>
                                <ProjectCard project={agent} />
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Mobile View All */}
                    <div className="md:hidden text-center mt-12">
                        <AnimatedSection delay={0.2}>
                            <Link
                                href="/ai-agents"
                                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all group"
                            >
                                View All Agents
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    )
}
