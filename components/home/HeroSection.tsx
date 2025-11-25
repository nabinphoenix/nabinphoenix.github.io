'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Download, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

export default function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <motion.div variants={itemVariants} className="space-y-4">
                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="block">NABIN</span>
                            <span className="block gradient-text">NEPALI</span>
                        </motion.h1>
                        <motion.h2
                            className="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-semibold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            ML Engineer
                        </motion.h2>
                    </motion.div>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Proficient in backend development using FastAPI with databases, with strong expertise in machine learning, particularly time series forecasting (ARIMA, SARIMA, LSTM). Currently expanding skills in computer vision with CNN and YOLO. Passionate about building scalable systems and applying AI solutions to real-world problems.
                    </motion.p>

                    {/* Contact Info */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>nabinepali012@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>9829592158</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>Shankhamul, Kathmandu (From Salyan Barala)</span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors group"
                        >
                            View Projects
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                        <a
                            href="/resume/Nabin_Nepali_Resume.pdf"
                            download
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors group"
                        >
                            <Download className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                            Download Resume
                        </a>
                    </motion.div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative flex justify-center"
                >
                    <div className="relative">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-primary-400 to-teal-400 p-1"
                        >
                            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 overflow-hidden">
                                <Image
                                    src="/assets/images/nabin2.jpg"
                                    alt="Nabin Nepali"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Floating elements */}
                        <motion.div
                            animate={{
                                y: [0, -30, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -top-4 -right-4 bg-primary-500 text-white p-3 rounded-lg shadow-lg"
                        >
                            <div className="text-sm font-semibold">Python</div>
                        </motion.div>

                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, -5, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute -bottom-4 -left-4 bg-teal-500 text-white p-3 rounded-lg shadow-lg"
                        >
                            <div className="text-sm font-semibold">FastAPI</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
