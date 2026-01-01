'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        A collection of my work showcasing expertise in machine learning, backend development, and data analysis.
                    </p>
                </AnimatedSection>

                <div className="relative">
                    <div className="hidden md:flex justify-end absolute -top-12 right-0">
                        <AnimatedSection delay={0.2}>
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all group px-2"
                            >
                                View All Projects
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedSection>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.slice(0, 3).map((project, index) => (
                            <AnimatedSection key={project.id} delay={index * 0.1}>
                                <div className="h-full">
                                    <ProjectCard project={project} />
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Mobile View All */}
                    <div className="md:hidden text-center mt-12">
                        <AnimatedSection delay={0.2}>
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all group"
                            >
                                View All Projects
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    )
}
