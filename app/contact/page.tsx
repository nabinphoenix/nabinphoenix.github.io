// app/contact/page.tsx
'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import PageTransition from '@/components/PageTransition'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Copy, Check } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:nabinepali012@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`
    window.location.href = mailtoLink
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'nabinepali012@gmail.com',
      copyField: 'email',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+977-9829592158',
      copyField: 'phone',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Shankhamul, Kathmandu, Nepal',
      copyField: 'location',
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      url: 'https://github.com/nabinphoenix',
      label: 'GitHub',
      color: 'hover:text-gray-700 dark:hover:text-white',
    },
    {
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/nabinnepali',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    {
      icon: Facebook,
      url: 'https://www.facebook.com/nabin.nepali.ml/',
      label: 'Facebook',
      color: 'hover:text-blue-500',
    },
  ]

  return (
    <PageTransition>
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, projects, or just having a chat about technology.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contact Information
                </h2>

                {/* Contact Details */}
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                          <info.icon className="text-primary-600 dark:text-primary-400" size={24} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {info.label}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {info.value}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(info.value, info.copyField)}
                        className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        suppressHydrationWarning
                      >
                        {copiedField === info.copyField ? (
                          <Check size={20} className="text-green-500" />
                        ) : (
                          <Copy size={20} />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Follow me on
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
                      >
                        <social.icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      required
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      required
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                      required
                      suppressHydrationWarning
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                    suppressHydrationWarning
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}