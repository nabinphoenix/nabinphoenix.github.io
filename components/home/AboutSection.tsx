'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'

export default function AboutSection() {
    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-4xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        About Me
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Learn more about my background, education, and the technologies I work with.
                    </p>
                </AnimatedSection>

                {/* Expertise */}
                <AnimatedSection delay={0.2} className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        Expertise
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {['FastAPI', 'Python', 'MongoDB', 'Time Series', 'CNN', 'YOLO', 'SARIMA'].map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Education Timeline */}
                <AnimatedSection delay={0.4} className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        Education
                    </h3>
                    <div className="space-y-8">
                        {[
                            { institution: 'Techspire College', degree: 'BSc.IT', period: '2023–Present', gpa: 'GPA 3.48' },
                            { institution: 'Tulsi Boarding', degree: '+2 Biology', period: 'Completed', gpa: 'GPA 3.31' },
                            { institution: 'Bright Pearl Academy', degree: 'SEE', period: 'Completed', gpa: 'GPA 3.85' }
                        ].map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-start space-x-4 p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            >
                                <div className="flex-shrink-0 w-3 h-3 bg-primary-500 rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {edu.institution}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {edu.degree} • {edu.period} • {edu.gpa}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Languages */}
                <AnimatedSection delay={0.6}>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        Languages
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'English', level: 'Intermediate' },
                            { name: 'Nepali', level: 'Fluent' },
                            { name: 'Hindi', level: 'Intermediate' }
                        ].map((lang, index) => (
                            <motion.div
                                key={lang.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            >
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {lang.name}
                                </h4>
                                <p className="text-primary-600 dark:text-primary-400 font-medium">
                                    {lang.level}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}
