'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Copy, Check, Instagram, Loader2, Send } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import SocialIcon from '@/components/SocialIcon'
import { toast } from 'sonner'

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        I'm always open to discussing new opportunities, projects, or just having a chat about technology.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <AnimatedSection delay={0.2}>
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Contact Information
                            </h3>

                            <div className="space-y-6">
                                {[
                                    { icon: Mail, label: 'Email', value: 'nabinepali012@gmail.com', copyField: 'Email' },
                                    { icon: Phone, label: 'Phone', value: '+977-9829592158', copyField: 'Phone number' },
                                    { icon: MapPin, label: 'Location', value: 'Shankhamul, Kathmandu, Nepal', copyField: 'Address' },
                                ].map((info, index) => (
                                    <ContactInfoCard key={info.label} info={info} index={index} />
                                ))}
                            </div>

                            <div className="pt-6">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Follow me on
                                </h4>
                                <div className="flex gap-6">
                                    {[
                                        {
                                            name: 'GitHub',
                                            icon: Github,
                                            url: 'https://github.com/nabinphoenix',
                                            color: 'hover:text-gray-700 dark:hover:text-white',
                                        },
                                        {
                                            name: 'LinkedIn',
                                            icon: Linkedin,
                                            url: 'https://www.linkedin.com/in/nabinnepali',
                                            color: 'hover:text-blue-600',
                                        },
                                        {
                                            name: 'Facebook',
                                            icon: Facebook,
                                            url: 'https://www.facebook.com/nabin.nepali.ml/',
                                            color: 'hover:text-blue-500',
                                        },
                                        {
                                            name: 'Instagram',
                                            icon: Instagram,
                                            url: 'https://www.instagram.com/nabinepali012/',
                                            color: 'hover:text-pink-600',
                                        },
                                    ].map((social) => (
                                        <SocialIcon key={social.name} social={social} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Contact Form */}
                    <AnimatedSection delay={0.4}>
                        <ContactForm />
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}

function ContactInfoCard({ info, index }: { info: any; index: number }) {
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
        toast.success(`${field} copied to clipboard!`)
    }

    return (
        <motion.div
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
                title="Copy to clipboard"
                suppressHydrationWarning
            >
                {copiedField === info.copyField ? (
                    <Check size={20} className="text-green-500" />
                ) : (
                    <Copy size={20} />
                )}
            </button>
        </motion.div>
    )
}

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message')
            }

            toast.success('Message sent successfully! Check your email for confirmation.')
            setFormData({ name: '', email: '', message: '' })
        } catch (error) {
            console.error('Error sending message:', error)
            toast.error('Failed to send message. Please try again or email directly.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Message
            </h3>
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
                        placeholder="Your name"
                        disabled={isSubmitting}
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
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
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
                        placeholder="How can I help you?"
                        disabled={isSubmitting}
                        suppressHydrationWarning
                    />
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    suppressHydrationWarning
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            <span>Send Message</span>
                        </>
                    )}
                </motion.button>
            </form>
        </div>
    )
}
