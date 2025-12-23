// app/projects/[id]/ProjectDetailClient.tsx
'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import { projects } from '@/data/projects'
import { aiAgents } from '@/data/ai-agents'
import FishDetectionDemo from './FishDetectionDemo'

export default function ProjectDetailClient() {
    const params = useParams()
    const project = [...projects, ...aiAgents].find(p => p.id === parseInt(params.id as string))

    if (!project) {
        const id = parseInt(params.id as string)
        const isAgent = !isNaN(id) && id >= 100
        return (
            <PageTransition>
                <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {isAgent ? "Agent Not Found" : "Project Not Found"}
                        </h1>
                        <Link
                            href={isAgent ? "/ai-agents" : "/projects"}
                            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            {isAgent ? "Back to AI Agents" : "Back to Projects"}
                        </Link>
                    </div>
                </div>
            </PageTransition>
        )
    }

    const isAgent = project && project.id >= 100

    return (
        <PageTransition>
            <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <AnimatedSection>
                        <Link
                            href={isAgent ? "/ai-agents" : "/projects"}
                            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            {isAgent ? "Back to AI Agents" : "Back to Projects"}
                        </Link>
                    </AnimatedSection>

                    {/* Project Header */}
                    <AnimatedSection delay={0.2}>
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {project.title}
                            </h1>
                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                                <Calendar size={18} className="mr-2" />
                                <span>{project.date}</span>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Project Image */}
                    <AnimatedSection delay={0.3}>
                        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                    </AnimatedSection>

                    {/* Project Description */}
                    <AnimatedSection delay={0.4}>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Overview
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                {project.description}
                            </p>
                            {project.fullDescription && (
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {project.fullDescription}
                                </p>
                            )}
                        </div>
                    </AnimatedSection>

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                        <AnimatedSection delay={0.5}>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Key Features
                                </h2>
                                <ul className="space-y-3">
                                    {project.features.map((feature, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-start space-x-3"
                                        >
                                            <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Technologies */}
                    <AnimatedSection delay={0.6}>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Tag size={24} className="mr-2" />
                                Technologies Used
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, index) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Workflow Analysis - Only for Agents/Projects with this data */}
                    {project.workflowAnalysis && (
                        <AnimatedSection delay={0.65}>
                            <div className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-10">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                                    <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    Workflow Architecture
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Pattern</h3>
                                        <p className="text-gray-900 dark:text-white font-medium">{project.workflowAnalysis.pattern}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Setup Time</h3>
                                        <div className="text-gray-900 dark:text-white font-medium whitespace-pre-line">{project.workflowAnalysis.setupTime}</div>
                                    </div>
                                </div>

                                {/* Workflow Diagram - For AI Agents (101, 102) */}
                                {(project.id === 101 || project.id === 102) && (
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Workflow Diagram</h3>
                                        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                            <Image
                                                src={
                                                    project.id === 101
                                                        ? "/assets/ai_agents/workflow_image/Automated Blo_Generation_Engine.png"
                                                        : "/assets/ai_agents/workflow_image/maya_ai_agent.png"
                                                }
                                                alt={`${project.title} Workflow Diagram`}
                                                width={1200}
                                                height={800}
                                                className="w-full h-auto"
                                                priority
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How it Works</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                            {project.workflowAnalysis.whatItDoes}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                                            <h3 className="font-bold text-red-900 dark:text-red-300 mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                Replaces
                                            </h3>
                                            <div className="text-sm text-red-800 dark:text-red-200 leading-relaxed whitespace-pre-line">{project.workflowAnalysis.replaces}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                                            <h3 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                Total Savings
                                            </h3>
                                            <div className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed whitespace-pre-line">{project.workflowAnalysis.totalSavings}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                Real Advantage
                                            </h3>
                                            <div className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed whitespace-pre-line">{project.workflowAnalysis.realAdvantage}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Execution Steps</h3>
                                        <div className="relative">
                                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="space-y-6">
                                                {project.workflowAnalysis.workflowSteps.map((step, idx) => (
                                                    <div key={idx} className="relative pl-10">
                                                        <div className="absolute left-[9px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-primary-500 bg-white dark:bg-gray-900 z-10"></div>
                                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                                            <span className="font-mono text-xs text-primary-500 font-bold tracking-wider uppercase mb-1 block">Step {idx + 1}</span>
                                                            <span className="text-gray-700 dark:text-gray-200 font-medium">{step}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Links */}
                    <AnimatedSection delay={0.7}>
                        <div className="flex flex-wrap gap-4">
                            {project.githubUrl && (
                                <motion.a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                                >
                                    <Github size={20} className="mr-2" />
                                    View on GitHub
                                </motion.a>
                            )}
                            {project.liveUrl && (
                                <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    <ExternalLink size={20} className="mr-2" />
                                    Live Demo
                                </motion.a>
                            )}
                        </div>
                    </AnimatedSection>

                    {/* Fish Detection Demo - Only for project ID 5 */}
                    {project.id === 5 && (
                        <AnimatedSection delay={0.8} className="mt-12">
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Try It Out
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">
                                    Upload an image of a fish to see the detection system in action. The model can identify 13 different fish species with detailed information.
                                </p>
                                <FishDetectionDemo />
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            </div >
        </PageTransition >
    )
}
