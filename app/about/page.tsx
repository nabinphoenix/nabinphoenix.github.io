'use client'

import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import { motion } from 'framer-motion'
import { Globe, GraduationCap, Calendar, Award } from 'lucide-react'

const expertise = ['FastAPI', 'Python', 'MongoDB', 'Time Series', 'CNN', 'YOLO', 'SARIMA']

const education = [
  {
    institution: 'Techspire College',
    degree: 'BSc.IT (Bachelor of Science in Information Technology)',
    period: '2023 – Present',
    gpa: '3.48',
    status: 'Current',
    color: 'border-blue-500 bg-blue-500'
  },
  {
    institution: 'Tulsi Boarding School',
    degree: '+2 Biology',
    period: 'Completed',
    gpa: '3.31',
    status: 'Graduated',
    color: 'border-emerald-500 bg-emerald-500'
  },
  {
    institution: 'Bright Pearl Academy',
    degree: 'SEE (Secondary Education Examination)',
    period: 'Completed',
    gpa: '3.85',
    status: 'Graduated',
    color: 'border-purple-500 bg-purple-500'
  }
]

const languages = [
  {
    name: 'Nepali',
    level: 'Fluent',
    percent: 100,
    barColor: 'bg-emerald-500',
    badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
  },
  {
    name: 'English',
    level: 'Intermediate',
    percent: 80,
    barColor: 'bg-blue-500',
    badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300'
  },
  {
    name: 'Hindi',
    level: 'Intermediate',
    percent: 70,
    barColor: 'bg-orange-500',
    badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300'
  }
]

export default function About() {
  return (
    <PageTransition>
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="gradient-text">Nabin Nepali</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Machine Learning Engineer | AI Developer | Kathmandu, Nepal
            </p>
          </AnimatedSection>

          {/* Professional Summary */}
          <AnimatedSection delay={0.1} className="mb-16">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Professional Summary
              </h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                <p>
                  I am a passionate <strong>Machine Learning Engineer</strong> based in Kathmandu, Nepal, with a deep curiosity for building intelligent systems.
                  Originally from Salyan Barala, I have dedicated my journey to mastering Artificial Intelligence, seeking to create impactful solutions.
                </p>
                <p>
                  My expertise lies in developing robust backend systems with <strong>FastAPI</strong> and <strong>Python</strong>, coupled with advanced machine learning models.
                  I specialize in intricate fields such as <strong>Time Series Forecasting</strong> (ARIMA, SARIMA, LSTM) and <strong>Computer Vision</strong> (CNN, YOLO), bringing comprehensive technical knowledge to every project.
                </p>
                <p>
                  Currently pursuing my BSc.IT at Techspire College, I bridge the gap between academic theory and practical application.
                  I excel in transforming complex data into actionable insights and deploying scalable AI solutions that solve real-world problems.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact & Location */}
          <AnimatedSection delay={0.15} className="mb-16">
            <div className="bg-gradient-to-r from-primary-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-primary-100 dark:border-gray-600 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                <div>
                  <strong>Email:</strong> nabinepali012@gmail.com
                </div>
                <div>
                  <strong>Phone:</strong> +977-9829592158
                </div>
                <div>
                  <strong>Location:</strong> Shankhamul, Kathmandu, Nepal
                </div>
                <div>
                  <strong>Origin:</strong> Salyan Barala, Nepal
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Expertise */}
          <AnimatedSection delay={0.2} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Technical Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {expertise.map((skill, index) => (
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
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Education
              </h2>
            </div>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:dark:via-gray-700 before:to-transparent">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Timeline Dot */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 ${edu.color} text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                    <GraduationCap size={16} />
                  </div>

                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 relative">
                    {/* Arrow for Desktop */}
                    <div className={`hidden md:block absolute top-[1.2rem] w-4 h-4 bg-white dark:bg-gray-800 border-t border-l border-gray-100 dark:border-gray-700 rotate-45 ${index % 2 === 0 ? '-right-2' : '-left-2'}`}></div>

                    <div className="flex flex-col mb-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                          {edu.institution}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          {edu.status}
                        </span>
                      </div>
                      <div className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                        {edu.degree}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-semibold bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded">
                        <Award size={14} className="text-yellow-500" />
                        <span>GPA {edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Languages */}
          <AnimatedSection delay={0.6}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Languages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
                >
                  {/* Decorative background gradient */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${lang.barColor} opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {lang.name}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${lang.badgeClass}`}>
                        {lang.level}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                        className={`h-full ${lang.barColor} rounded-full shadow-sm`}
                      />
                    </div>
                    <p className="text-right text-xs text-gray-400 mt-2 font-medium">
                      {lang.percent}% Proficiency
                    </p>
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
