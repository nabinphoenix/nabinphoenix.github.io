'use client'

import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import { motion } from 'framer-motion'
import { Globe, GraduationCap, Calendar, Award, Cpu, MapPin, ExternalLink } from 'lucide-react'



const education = [
  {
    institution: 'Techspire College',
    degree: 'BSc.IT (Bachelor of Science in Information Technology)',
    period: '2023 – Present',
    gpa: '3.5',
    label: 'CGPA',
    status: 'Current',
    color: 'border-teal-500 bg-teal-500'
  },
  {
    institution: 'Tulsi Boarding School',
    degree: '+2 Biology',
    period: 'Completed',
    gpa: '3.31',
    label: 'GPA',
    status: 'Graduated',
    color: 'border-blue-500 bg-blue-500'
  },
  {
    institution: 'Bright Pearl Academy',
    degree: 'SEE (Secondary Education Examination)',
    period: 'Completed',
    gpa: '3.85',
    label: 'GPA',
    status: 'Graduated',
    color: 'border-purple-500 bg-purple-500'
  }
]

const experiences = [
  {
    company: 'Tridev Innovation',
    position: 'Machine Learning Engineer Intern',
    period: 'Sep 2025 – Present',
    location: 'Kupondole, Lalitpur',
    website: 'https://www.tridevinnovation.com/',
    tech: ['Python', 'YOLOv8', 'n8n', 'FastAPI', 'OpenCV', 'AI Agents'],
    responsibilities: [
      'Architecting production-ready Computer Vision systems utilizing YOLO-based object detection for real-time industrial applications.',
      'Engineering complex AI automation ecosystems with n8n, significantly optimizing business operations and reducing manual overhead.',
      'Developing high-performance API infrastructures using FastAPI for seamless ML model deployment and cross-system integration.',
      'Designing "Self-Healing" 24/7 intelligent workflows that automate critical business processes across multiple departments.',
      'Collaborating with stakeholders to translate abstract business requirements into scalable, practical AI solutions.'
    ],
    color: 'border-primary-500 bg-primary-500'
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
    barColor: 'bg-purple-500',
    badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300'
  }
]

export default function About() {
  return (
    <PageTransition>
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
              About <span className="gradient-text font-extrabold">Nabin Nepali</span>
              <span className="text-2xl md:text-3xl block mt-3 font-semibold text-gray-500 dark:text-gray-400">
                Machine Learning Engineer & AI Automation Expert in Nepal
              </span>
            </h1>
          </AnimatedSection>

          {/* Professional Summary */}
          <AnimatedSection delay={0.1} className="mb-16">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Professional Summary
              </h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                <p>
                  I'm a <strong>Machine Learning Engineer</strong> based in Kathmandu, Nepal, with a real passion for building systems that think. Originally from Salyan Barala, I've spent most of my journey diving deep into Artificial Intelligence, constantly looking for ways to build solutions that actually make a difference.
                </p>
                <p>
                  My main focus these days is building <strong>intelligent AI agents</strong> that don't just automate tasks—they help businesses scale. I love creating systems that reduce manual grunt work and can practically run and generate value for you while you're sleeping. On the tech side, I build robust backends using <strong>FastAPI</strong> and <strong>Python</strong>, and I'm particularly fond of working with <strong>Time Series Forecasting</strong> (like ARIMA, SARIMA, LSTM) and <strong>Computer Vision</strong> (CNN, YOLO) to solve complex problems.
                </p>
                <p>
                  Right now, I'm finishing up my BSc.IT at <a href="https://techspire.edu.np/" target="_blank" rel="noopener noreferrer" aria-label="Visit Techspire College website" className="text-primary-600 hover:underline">Techspire College</a>, which is affiliated with the <a href="https://www.apu.edu.my/" target="_blank" rel="noopener noreferrer" aria-label="Visit Asia Pacific University of Technology & Innovation website" className="text-primary-600 hover:underline">Asia Pacific University of Technology & Innovation (APU)</a>. For me, it's all about bridging the gap between what's taught in books and what actually works in the real world. I thrive on turning messy data into clear, actionable insights and deploying AI that actually works at scale.
                </p>
              </div>
            </div>
          </AnimatedSection>





          {/* Experience Timeline */}
          <AnimatedSection delay={0.2} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <Cpu className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Work Experience
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left Panel: Company & Role */}
                    <div className="md:w-1/3 p-5 sm:p-6 md:p-8 bg-gray-50/50 dark:bg-gray-700/30 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 flex flex-col justify-center">
                      <div className="flex justify-end items-start mb-4">
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${exp.company} website`}
                          className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {exp.position}
                      </h3>
                      <div className="text-primary-600 dark:text-primary-400 font-semibold mb-4">
                        {exp.company}
                      </div>

                      <div className="space-y-2 mt-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={14} className="text-primary-500" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin size={14} className="text-primary-500" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Tech Stack for this role */}
                      <div className="mt-8 flex flex-wrap gap-2">
                        {exp.tech?.map((t) => (
                          <span key={t} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel: Responsibilities */}
                    <div className="md:w-2/3 p-5 sm:p-6 md:p-8 flex flex-col justify-center bg-white dark:bg-gray-800/50">
                      <h4 className="text-xs font-bold text-primary-500 uppercase tracking-[0.2em] mb-6 border-b border-gray-100 dark:border-gray-700/50 pb-2">
                        Impact & Contributions
                      </h4>
                      <ul className="space-y-5">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed flex gap-4">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-primary-500 shrink-0 shadow-[0_0_10px_rgba(var(--primary-600),0.5)]" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
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
                        <span>{edu.label} {edu.gpa}</span>
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
