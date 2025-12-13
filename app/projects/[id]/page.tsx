// app/projects/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import { projects } from '@/data/projects'
import FishDetectionDemo from './FishDetectionDemo'

export default function ProjectDetail() {
  const params = useParams()
  const project = projects.find(p => p.id === parseInt(params.id as string))

  if (!project) {
    return (
      <PageTransition>
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <Link
              href="/projects"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </Link>
          </AnimatedSection>

          {/* Project Header */}
          <AnimatedSection delay={0.2}>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <Calendar size={18} className="mr-2" />
                <span>{project.date}</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Project Image */}
          <AnimatedSection delay={0.3}>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </AnimatedSection>

          {/* Project Description */}
          <AnimatedSection delay={0.4}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {project.description}
              </p>
              {project.fullDescription && (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              )}
            </div>
          </AnimatedSection>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <AnimatedSection delay={0.5}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}

          {/* Technologies */}
          <AnimatedSection delay={0.6}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Tag size={24} className="mr-2" />
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Links */}
          <AnimatedSection delay={0.7}>
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  <Github size={20} className="mr-2" />
                  View on GitHub
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  <ExternalLink size={20} className="mr-2" />
                  Live Demo
                </motion.a>
              )}
            </div>
          </AnimatedSection>

          {/* Fish Detection Demo - Only for project ID 5 */}
          {project.id === 5 && (
            <AnimatedSection delay={0.8} className="mt-12">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Try It Out
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Upload an image of a fish to see the detection system in action. The model can identify 13 different fish species with detailed information.
                </p>
                <FishDetectionDemo />
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

