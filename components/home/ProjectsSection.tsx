'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
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
                            <Link href={`/projects/${project.id}`}>
                                <motion.div
                                    className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer"
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
                                            <span className="text-white font-semibold text-lg">{project.title}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                                                <Calendar size={14} className="mr-1" />
                                                {project.date}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
