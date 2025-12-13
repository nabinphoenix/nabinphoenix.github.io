// app/skills/page.tsx
'use client'

import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import SkillSlider from '@/components/SkillSlider'
import { motion } from 'framer-motion'
import { Users, Lightbulb, Zap, Puzzle, MessageCircle, Handshake } from 'lucide-react'



const softSkills = [
  { name: 'Leadership', icon: Users },
  { name: 'Brainstorming', icon: Lightbulb },
  { name: 'Fast Learning', icon: Zap },
  { name: 'Problem Solving', icon: Puzzle },
  { name: 'Communication', icon: MessageCircle },
  { name: 'Team Collaboration', icon: Handshake },
]

export default function Skills() {
  return (
    <PageTransition>
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive overview of my technical capabilities and professional strengths.
            </p>
          </AnimatedSection>

          <div className="space-y-12">
            {/* Technical Skills - Sliding Logos */}
            <div className="mb-12">
              <AnimatedSection delay={0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Technical Skills & Tools
                  </h2>
                  <SkillSlider />
                </div>
              </AnimatedSection>
            </div>

            {/* Soft Skills */}
            <AnimatedSection delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Soft Skills
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group text-center h-full"
                    >
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                        <skill.icon size={24} />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {skill.name}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Additional Skills Grid */}
          <AnimatedSection delay={0.6} className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                'Machine Learning',
                'Time Series Analysis',
                'RESTful APIs',
                'Data Preprocessing',
                'Model Deployment',
                'Database Design',
                'Statistical Analysis',
                'Data Visualization'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="text-primary-600 dark:text-primary-400 font-semibold">
                    {skill}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  )
}