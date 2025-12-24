// app/skills/page.tsx
'use client'

import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import SkillSlider from '@/components/SkillSlider'
import { motion } from 'framer-motion'
import { Users, Lightbulb, Zap, Puzzle, MessageCircle, Handshake, Brain, TrendingUp, Network, Filter, Rocket, Database, BarChart4, PieChart } from 'lucide-react'



const softSkills = [
  { name: 'Leadership', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Brainstorming', icon: Lightbulb, color: 'text-amber-500', bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
  { name: 'Fast Learning', icon: Zap, color: 'text-cyan-500', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  { name: 'Problem Solving', icon: Puzzle, color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'Communication', icon: MessageCircle, color: 'text-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { name: 'Team-Work', icon: Handshake, color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' },
]

export default function Skills() {
  return (
    <PageTransition>
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="gradient-text">Skills & Expertise</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A detailed summary of my technical expertise, soft skills, and professional capabilities.
            </p>
          </AnimatedSection>

          <div className="space-y-12">
            {/* Technical Skills - Sliding Logos */}
            <div className="mb-12">
              <AnimatedSection delay={0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Technical Skills & Tools
                  </h2>
                  <SkillSlider />
                </div>
              </AnimatedSection>
            </div>

            {/* Soft Skills */}
            <AnimatedSection delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Soft Skills
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-12 md:gap-x-16">
                  {softSkills.map((skill, index) => (
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

          {/* Additional Skills Grid */}
          <AnimatedSection delay={0.6} className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
              Specialized Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Machine Learning', icon: Brain, color: 'from-purple-500/20 to-indigo-500/20', iconColor: 'text-purple-600 dark:text-purple-400' },
                { name: 'Time Series Analysis', icon: TrendingUp, color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-600 dark:text-blue-400' },
                { name: 'RESTful APIs', icon: Network, color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-600 dark:text-emerald-400' },
                { name: 'Data Preprocessing', icon: Filter, color: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-600 dark:text-amber-400' },
                { name: 'Model Deployment', icon: Rocket, color: 'from-rose-500/20 to-pink-500/20', iconColor: 'text-rose-600 dark:text-rose-400' },
                { name: 'Database Design', icon: Database, color: 'from-blue-600/20 to-indigo-600/20', iconColor: 'text-blue-600 dark:text-blue-400' },
                { name: 'Statistical Analysis', icon: BarChart4, color: 'from-violet-500/20 to-fuchsia-500/20', iconColor: 'text-violet-600 dark:text-violet-400' },
                { name: 'Data Visualization', icon: PieChart, color: 'from-teal-500/20 to-green-500/20', iconColor: 'text-teal-600 dark:text-teal-400' }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative overflow-hidden p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Gradient Blob */}
                  <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${skill.color} blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-xl mb-4 group-hover:bg-transparent transition-colors duration-300 shadow-sm border border-gray-100 dark:border-gray-600">
                      <skill.icon size={28} className={`${skill.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`} />
                    </div>
                    <div className="text-gray-900 dark:text-white font-bold text-sm md:text-base leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {skill.name}
                    </div>
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