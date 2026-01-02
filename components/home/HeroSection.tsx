'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Download, ArrowRight, Mail, Phone, MapPin, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
    const [isDownloading, setIsDownloading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [parachuteY, setParachuteY] = useState(60)
    const [isBroken, setIsBroken] = useState(false)
    const [showCancelMessage, setShowCancelMessage] = useState(false)
    const [showTechStack, setShowTechStack] = useState(true)
    const [mounted, setMounted] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const [isZooming, setIsZooming] = useState(false)
    const router = useRouter()

    useEffect(() => {
        router.prefetch('/projects')
    }, [router])

    // Ensure client-side only rendering to avoid hydration errors
    useEffect(() => {
        setMounted(true)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    const handleViewProjects = () => {
        setIsZooming(true)
        setTimeout(() => {
            router.push('/projects')
        }, 700)
    }

    // Rotate badges every 5 seconds (only after mounted)
    useEffect(() => {
        if (!mounted) return

        const interval = setInterval(() => {
            setShowTechStack(prev => !prev)
        }, 5000)

        return () => clearInterval(interval)
    }, [mounted])

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
            // Speed up the final descent
            return 40 - ((progress - 70) / 30) * 40
        }
    }

    const handleDownload = () => {
        if (isDownloading) return

        setProgress(0)
        setParachuteY(60)
        setIsDownloading(true)
        setIsBroken(false)

        if (intervalRef.current) clearInterval(intervalRef.current)

        // Faster interval for smoother/faster descent
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 15 // Increased increment for more speed

                if (newProgress >= 100) {
                    if (intervalRef.current) clearInterval(intervalRef.current)

                    setTimeout(() => {
                        setIsDownloading(false)

                        // Trigger actual download after landing animation
                        const link = document.createElement('a')
                        link.href = '/assets/resume/Nabin Nepali CV Resume.pdf'
                        link.download = 'Nabin_Nepali_CV_Resume.pdf'
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    }, 800)

                    return 100
                }

                const newY = getParachutePosition(newProgress)
                setParachuteY(newY)
                return newProgress
            })
        }, 120) // Reduced interval (200ms -> 120ms) for faster fall
    }

    const handleCancelDownload = () => {
        if (!isDownloading) return

        // Clear the interval immediately to stop progress
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        setIsBroken(true)
        setShowCancelMessage(true)
        setIsDownloading(false)

        setTimeout(() => {
            setShowCancelMessage(false)
        }, 2000)
    }

    return (
        <>
            <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden" suppressHydrationWarning>
                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        animate={isZooming ? {
                            scale: 3.5,
                            rotate: 5,
                            opacity: 0,
                            filter: "blur(20px)"
                        } : {
                            scale: 1,
                            rotate: 0,
                            opacity: 1,
                            filter: "blur(0px)"
                        }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Text Content */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            <motion.div variants={itemVariants} className="space-y-4">
                                <motion.h1
                                    className="text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="block">NABIN</span>
                                    <span className="block gradient-text uppercase tracking-tighter">NEPALI</span>
                                </motion.h1>
                                <motion.h2
                                    className="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-semibold"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    Machine Learning Engineer & AI Automation Expert in Nepal
                                </motion.h2>
                            </motion.div>

                            <motion.p
                                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                As a top Machine Learning Engineer based in Kathmandu, Nepal, I specialize in building production-ready AI systems, intelligent automation workflows using n8n, computer vision applications with YOLO, and scalable ML solutions. Expert in AI development, NLP, time-series forecasting (ARIMA, SARIMA), and intelligent automation that transforms businesses in Nepal and globally.
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
                                <button
                                    onClick={handleViewProjects}
                                    suppressHydrationWarning={true}
                                    aria-label="View AI and Machine Learning Projects"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center">
                                        View AI & ML Projects
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                    </span>
                                </button>
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    suppressHydrationWarning={true}
                                    aria-label="Download CV Resume"
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
                            className="relative flex justify-center lg:justify-end lg:pr-12"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-primary-400 to-teal-400 p-1"
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

                                {/* Floating elements - Rotating between Tech and Titles */}
                                {mounted && (
                                    <AnimatePresence mode="wait">
                                        {showTechStack ? (
                                            <>
                                                <motion.div
                                                    key="python"
                                                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: [0, -30, 0],
                                                        rotate: [0, 5, 0]
                                                    }}
                                                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                                    transition={{
                                                        opacity: { duration: 0.3 },
                                                        scale: { duration: 0.3 },
                                                        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                                    }}
                                                    className="absolute top-0 -right-2 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 bg-primary-500 text-white p-2 sm:p-3 rounded-lg shadow-lg z-20"
                                                >
                                                    <div className="text-sm font-semibold">Python</div>
                                                </motion.div>

                                                <motion.div
                                                    key="fastapi"
                                                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: [0, -20, 0],
                                                        rotate: [0, -5, 0]
                                                    }}
                                                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                                    transition={{
                                                        opacity: { duration: 0.3 },
                                                        scale: { duration: 0.3 },
                                                        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
                                                    }}
                                                    className="absolute bottom-0 -left-2 sm:-bottom-2 sm:-left-2 md:-bottom-4 md:-left-4 text-white p-2 sm:p-3 rounded-lg shadow-lg z-20"
                                                    style={{ backgroundColor: '#2dd4bf' }}
                                                >
                                                    <div className="text-sm font-semibold">FastAPI</div>
                                                </motion.div>
                                            </>
                                        ) : (
                                            <>
                                                <motion.div
                                                    key="ml-engineer"
                                                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: [0, -30, 0],
                                                        rotate: [0, 5, 0]
                                                    }}
                                                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                                    transition={{
                                                        opacity: { duration: 0.3 },
                                                        scale: { duration: 0.3 },
                                                        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                                    }}
                                                    className="absolute top-0 -right-2 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 bg-primary-500 text-white p-2 sm:p-3 rounded-lg shadow-lg z-20"
                                                >
                                                    <div className="text-sm font-semibold">ML Engineer </div>
                                                </motion.div>

                                                <motion.div
                                                    key="ai-developer"
                                                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: [0, -20, 0],
                                                        rotate: [0, -5, 0]
                                                    }}
                                                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                                    transition={{
                                                        opacity: { duration: 0.3 },
                                                        scale: { duration: 0.3 },
                                                        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
                                                    }}
                                                    className="absolute bottom-0 -left-2 sm:-bottom-2 sm:-left-2 md:-bottom-4 md:-left-4 text-white p-2 sm:p-3 rounded-lg shadow-lg z-20"
                                                    style={{ backgroundColor: '#2dd4bf' }}
                                                >
                                                    <div className="text-sm font-semibold">AI Developer</div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Premium Hyperdrive Warp Overlay */}
                <AnimatePresence>
                    {isZooming && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
                        >
                            {/* Flash Background */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.8] }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 bg-white dark:bg-primary-950 mix-blend-overlay"
                            />

                            {/* Radial Burst Lines */}
                            <svg className="w-[200vw] h-[200vh] absolute" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {[...Array(30)].map((_, i) => (
                                    <motion.line
                                        key={i}
                                        x1="50" y1="50"
                                        x2={50 + Math.cos(i * (Math.PI / 15)) * 100}
                                        y2={50 + Math.sin(i * (Math.PI / 15)) * 100}
                                        stroke="currentColor"
                                        strokeWidth="0.2"
                                        className="text-primary-500/40"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: [0, 1],
                                            opacity: [0, 1, 0],
                                            strokeDashoffset: [0, -100]
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeIn",
                                            delay: Math.random() * 0.2,
                                            repeat: Infinity
                                        }}
                                    />
                                ))}
                            </svg>

                            {/* Expanding Portal Rings */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-20 h-20 border-2 border-primary-500/30 rounded-full"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 20, opacity: [0, 0.5, 0] }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut",
                                        delay: i * 0.2
                                    }}
                                />
                            ))}

                            {/* Center Flash */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [0, 1.5, 2.5], opacity: [0, 1, 0] }}
                                transition={{ duration: 0.6 }}
                                className="w-64 h-64 bg-white rounded-full blur-3xl"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Realistic Parachute Animation */}
                <div
                    className={`fixed bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer z-50 transition-opacity duration-500 ${isDownloading || isBroken ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={handleCancelDownload}
                    style={{
                        transform: `translate(-50%, ${-parachuteY}px)`,
                    }}
                >
                    <div className={isBroken ? '' : 'animate-sway'}>
                        {/* Parachute & Person SVG */}
                        <svg
                            width="140"
                            height="180"
                            viewBox="0 0 140 180"
                            className={`transition-transform duration-500 ${isBroken ? 'animate-parachute-break' : ''}`}
                        >
                            {/* Parachute Canopy */}
                            <g className="parachute-canopy">
                                <path
                                    d="M10,60 C10,10 130,10 130,60 C130,80 110,80 100,80 C90,80 80,70 70,70 C60,70 50,80 40,80 C30,80 10,80 10,60"
                                    fill="#14b8a6"
                                    stroke="#0d9488"
                                    strokeWidth="2"
                                />
                                {/* Canopy Details (lines) */}
                                <path d="M70,12 L70,70" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                <path d="M40,20 L55,75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                <path d="M100,20 L85,75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                            </g>

                            {/* Strings */}
                            <g className={`transition-opacity duration-300 ${isBroken ? 'opacity-0' : 'opacity-100'}`}>
                                <path d="M15,65 L70,130" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                                <path d="M40,80 L70,130" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                                <path d="M100,80 L70,130" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                                <path d="M125,65 L70,130" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                            </g>

                            {/* Human Character in "Carrying" Pose */}
                            <g className={isBroken ? 'animate-person-fall' : ''}>
                                {/* Head */}
                                <circle cx="70" cy="122" r="7" fill="#4b5563" />

                                {/* Body/Torso */}
                                <path d="M70,129 L70,152" stroke="#4b5563" strokeWidth="7" strokeLinecap="round" />

                                {/* Right Arm - Holding Parachute String */}
                                <path d="M70,135 L45,110" stroke="#4b5563" strokeWidth="3" strokeLinecap="round" />

                                {/* Left Arm - Securely wrapping around/holding the Resume */}
                                <path d="M70,138 L85,145" stroke="#4b5563" strokeWidth="3" strokeLinecap="round" />

                                {/* Resume Paper - Placed in front as if being carried */}
                                <motion.g
                                    animate={{
                                        rotate: [-3, 3, -3],
                                        y: [0, -2, 0]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {/* Paper Shadow */}
                                    <rect x="75" y="138" width="22" height="30" fill="rgba(0,0,0,0.1)" rx="2" />
                                    {/* Paper */}
                                    <rect x="72" y="135" width="22" height="30" fill="white" rx="2" stroke="#14b8a6" strokeWidth="1.5" />
                                    {/* Realistic Resume Content Lines */}
                                    <line x1="77" y1="142" x2="89" y2="142" stroke="#14b8a6" strokeWidth="2" />
                                    <line x1="77" y1="148" x2="87" y2="148" stroke="#e5e7eb" strokeWidth="1" />
                                    <line x1="77" y1="152" x2="87" y2="152" stroke="#e5e7eb" strokeWidth="1" />
                                    <line x1="77" y1="156" x2="87" y2="156" stroke="#e5e7eb" strokeWidth="1" />
                                    <circle cx="88" cy="158" r="2" fill="#14b8a6" opacity="0.5" />
                                </motion.g>

                                {/* Legs */}
                                <path d="M70,152 L60,170" stroke="#4b5563" strokeWidth="3" strokeLinecap="round" />
                                <path d="M70,152 L82,168" stroke="#4b5563" strokeWidth="3" strokeLinecap="round" />
                            </g>
                        </svg>
                    </div>

                    {/* Progress Text */}
                    <div
                        className={`mt-4 text-xl font-bold text-gray-900 dark:text-white drop-shadow-lg transition-opacity duration-300 delay-500 ${isBroken ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        {Math.min(progress, 100).toFixed(0)}%
                    </div>
                </div>

                {/* Sleek Teal Cancel Notification */}
                <AnimatePresence>
                    {showCancelMessage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
                            className="fixed top-1/2 left-1/2 z-[100] pointer-events-none"
                        >
                            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl shadow-[0_20px_60px_rgba(20,184,166,0.4)] border border-teal-400/50 flex items-center gap-4 backdrop-blur-sm">
                                <div className="bg-white/20 p-1.5 rounded-lg">
                                    <XCircle size={22} className="text-white" />
                                </div>
                                <span className="text-lg font-bold tracking-tight uppercase tracking-wider">
                                    Download Cancelled
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Parachute Animation Styles */}
            <style jsx>{`
                @keyframes sway {
                    0%, 100% { transform: rotate(-5deg); }
                    50% { transform: rotate(5deg); }
                }

                .animate-sway {
                    animation: sway 3s ease-in-out infinite;
                    transform-origin: top center;
                }

                @keyframes parachute-break {
                    0% { transform: translateY(0) rotate(0deg) scale(1); }
                    100% { transform: translateY(-500px) rotate(45deg) scale(0.5); opacity: 0; }
                }

                @keyframes person-fall {
                    0% { transform: translateY(0) rotate(0deg); }
                    100% { transform: translateY(800px) rotate(360deg); opacity: 0; }
                }

                .animate-parachute-break {
                    animation: parachute-break 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .animate-person-fall {
                    animation: person-fall 1.5s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;
                }
            `}</style>
        </>
    )
}
