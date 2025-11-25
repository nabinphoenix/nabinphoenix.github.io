// app/skills/page.tsx
'use client'

import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import { motion } from 'framer-motion'

const technicalSkills = [
  { name: 'Python', level: 90 },
  { name: 'FastAPI', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'MySQL', level: 75 },
  { name: 'ARIMA', level: 85 },
  { name: 'SARIMA', level: 80 },
  { name: 'LSTM', level: 75 },
  { name: 'CNN', level: 70 },
  { name: 'YOLO', level: 65 },
]

const softSkills = [
  { name: 'Leadership', level: 85 },
  { name: 'Brainstorming', level: 90 },
  { name: 'Fast Learning', level: 95 },
  { name: 'Problem Solving', level: 88 },
  { name: 'Communication', level: 82 },
  { name: 'Team Collaboration', level: 87 },
]

const SkillBar = ({ skill, delay }: { skill: { name: string; level: number }; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="mb-6"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
      <span className="text-primary-600 dark:text-primary-400 font-semibold">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        className="bg-gradient-to-r from-primary-500 to-teal-500 h-3 rounded-full relative overflow-hidden"
      >
        <motion.div
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ width: "50%" }}
        />
      </motion.div>
    </div>
  </motion.div>
)

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Technical Skills
                </h2>
                <div className="space-y-2">
                  {technicalSkills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Soft Skills */}
            <AnimatedSection delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Soft Skills
                </h2>
                <div className="space-y-2">
                  {softSkills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      delay={index * 0.1 + 0.2}
                    />
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