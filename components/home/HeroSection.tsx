'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Download, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

export default function HeroSection() {
    const [isDownloading, setIsDownloading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [parachuteY, setParachuteY] = useState(60)
    const [isBroken, setIsBroken] = useState(false)
    const [showCancelMessage, setShowCancelMessage] = useState(false)

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

    // Calculate parachute position based on progress
    const getParachutePosition = (progress: number) => {
        if (progress <= 50) {
            if (progress <= 10) {
                return 60 - (progress / 10) * 2
            } else if (progress <= 20) {
                return 58 - ((progress - 10) / 10) * 3
            } else if (progress <= 30) {
                return 55 - ((progress - 20) / 10) * 3
            } else if (progress <= 40) {
                return 52 - ((progress - 30) / 10) * 4
            } else if (progress <= 45) {
                return 48 - ((progress - 40) / 5) * 3
            } else if (progress <= 48) {
                return 45 - ((progress - 45) / 3) * 3
            } else {
                return 42 - ((progress - 48) / 2) * 2
            }
        } else if (progress <= 70) {
            return 40
        } else {
            return 40 - ((progress - 70) / 30) * 40
        }
    }

    const handleDownload = () => {
        if (isDownloading) return

        setProgress(0)
        setParachuteY(60)
        setIsDownloading(true)
        setIsBroken(false)

        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 10

                if (newProgress >= 100) {
                    clearInterval(interval)
                    setIsDownloading(false)

                    setTimeout(() => {
                        setIsDownloading(false)

                        // Trigger actual download
                        const link = document.createElement('a')
                        link.href = '/assets/resume/Nabin Nepali CV Resume.pdf'
                        link.download = 'Nabin_Nepali_CV_Resume.pdf'
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    }, 1000)

                    return 100
                }

                const newY = getParachutePosition(newProgress)
                setParachuteY(newY)
                return newProgress
            })
        }, 200)
    }

    const handleCancelDownload = () => {
        if (!isDownloading) return

        setIsBroken(true)
        setShowCancelMessage(true)
        setIsDownloading(false)

        setTimeout(() => {
            setShowCancelMessage(false)
        }, 2000)

        setTimeout(() => {
            setIsBroken(false)
        }, 1500)
    }

    return (
        <>
            <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
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
                                <span>Shankhamul, Kathmandu</span>
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
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                                Download Resume
                            </button>
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

                {/* Parachute Animation */}
                <div
                    className={`fixed bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer z-50 transition-opacity duration-500 ${isDownloading || isBroken ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={handleCancelDownload}
                    style={{
                        transform: `translate(-50%, ${-parachuteY}px)`,
                    }}
                >
                    {/* Parachute */}
                    <svg
                        className={`w-20 h-10 transition-transform duration-500 ${isBroken ? 'animate-parachute-break' : ''
                            }`}
                        viewBox="0 0 120 60"
                    >
                        <path
                            d="M60,15 C85,15 105,30 105,50 C105,65 85,65 60,65 C35,65 15,65 15,50 C15,30 35,15 60,15 Z"
                            fill="#14b8a6"
                            stroke="rgba(255, 255, 255, 0.8)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* Strings */}
                    <div
                        className={`w-1 h-10 bg-white/80 transition-transform duration-800 delay-300 ${isBroken ? 'animate-string-break' : 'scale-y-100'
                            }`}
                    />

                    {/* Person */}
                    <div
                        className={`w-8 h-10 bg-primary-500 rounded-t-2xl transition-transform duration-500 ${isBroken ? 'animate-person-fall' : ''
                            }`}
                    />

                    {/* Progress Text */}
                    <div
                        className={`mt-4 text-xl font-bold text-gray-900 dark:text-white drop-shadow-lg transition-opacity duration-300 delay-500 ${isBroken ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        {Math.min(progress, 100).toFixed(0)}%
                    </div>
                </div>

                {/* Cancel Message */}
                <div
                    className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm px-8 py-4 rounded-xl text-xl text-white z-50 transition-opacity duration-500 ${showCancelMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    Download Cancelled
                </div>
            </section>

            {/* Parachute Animation Styles */}
            <style jsx>{`
                @keyframes parachute-break {
                    0% { transform: translateY(0) rotate(0deg); }
                    30% { transform: translateY(0) rotate(10deg); }
                    70% { transform: translateY(20px) rotate(-15deg) scale(0.9); }
                    100% { transform: translateY(100px) rotate(-30deg) scale(0.7); opacity: 0; }
                }

                @keyframes string-break {
                    0% { transform: scaleY(1); }
                    50% { transform: scaleY(0.5); opacity: 0.7; }
                    100% { transform: scaleY(0); opacity: 0; }
                }

                @keyframes person-fall {
                    0% { transform: translateY(0) rotate(0deg); }
                    20% { transform: translateY(10px) rotate(5deg); }
                    40% { transform: translateY(30px) rotate(-10deg); }
                    60% { transform: translateY(60px) rotate(15deg); }
                    80% { transform: translateY(90px) rotate(-20deg); }
                    100% { transform: translateY(120px) rotate(-25deg); opacity: 0; }
                }

                .animate-parachute-break {
                    animation: parachute-break 1s forwards;
                }

                .animate-string-break {
                    animation: string-break 0.5s forwards;
                }

                .animate-person-fall {
                    animation: person-fall 1.5s forwards;
                }
            `}</style>
        </>
    )
}
