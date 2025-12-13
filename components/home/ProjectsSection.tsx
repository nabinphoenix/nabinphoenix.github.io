'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Projects
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A collection of my work showcasing expertise in machine learning, backend development, and data analysis.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedSection key={project.id} delay={index * 0.1}>
                            <div className="h-full">
                                <ProjectCard project={project} />
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
