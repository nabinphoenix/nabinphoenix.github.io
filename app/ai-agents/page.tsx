'use client'

import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import ProjectCard from '@/components/ProjectCard'
import { aiAgents } from '@/data/ai-agents'

export default function AiAgents() {
    return (
        <PageTransition>
            <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <AnimatedSection className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="gradient-text">AI Agents</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Built and deployed next-generation AI agents designed for automation, interaction, and practical problem-solving, reducing manual labor and increasing business operational efficiency.
                        </p>
                    </AnimatedSection>

                    {/* Agents Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {aiAgents.map((agent, index) => (
                            <AnimatedSection key={agent.id} delay={index * 0.1}>
                                <ProjectCard project={agent} />
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
