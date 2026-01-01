'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import SkillSlider from '@/components/SkillSlider'
import { Users, Lightbulb, Zap, Puzzle, MessageCircle, Handshake } from 'lucide-react'

export default function SkillsSection() {
    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Skills & <span className="gradient-text">Expertise</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        A detailed summary of my technical expertise, soft skills, and professional capabilities.
                    </p>
                </AnimatedSection>

                <div className="space-y-12">
                    {/* Technical Skills - Sliding Logos */}
                    <div className="mb-12">
                        <AnimatedSection delay={0.2}>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                    Technical Skills & Tools
                                </h3>
                                <SkillSlider />
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Soft Skills */}
                    <AnimatedSection delay={0.4}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                Soft Skills
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-12 md:gap-x-16">
                                {[
                                    { name: 'Leadership', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
                                    { name: 'Brainstorming', icon: Lightbulb, color: 'text-amber-500', bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
                                    { name: 'Fast Learning', icon: Zap, color: 'text-cyan-500', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
                                    { name: 'Problem Solving', icon: Puzzle, color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
                                    { name: 'Communication', icon: MessageCircle, color: 'text-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
                                    { name: 'Team-Work', icon: Handshake, color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' },
                                ].map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex flex-col items-center group cursor-default"
                                    >
                                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${skill.bgColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-md border border-transparent hover:border-gray-200 dark:hover:border-gray-700`}>
                                            <skill.icon size={32} className={`${skill.color} transition-transform duration-300 group-hover:scale-110`} />
                                        </div>
                                        <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-center tracking-tight">
                                            {skill.name}
                                        </h4>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}
