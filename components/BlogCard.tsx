'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Calendar, ArrowRight } from 'lucide-react'
import { IBlog } from '@/models/Blog'

interface BlogCardProps {
    blog: {
        _id: string
        title: string
        slug: string
        content: string
        date: Date | string
    }
}

export default function BlogCard({ blog }: BlogCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/blog/${blog.slug}`)
    }

    // Format date
    const formatDate = (date: Date | string) => {
        const d = new Date(date)
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    // Generate a consistent gradient based on the title length or some hash to make it look distinct but consistent
    const getGradient = (str: string) => {
        const gradients = [
            'from-pink-500/20 to-rose-500/20',
            'from-cyan-500/20 to-blue-500/20',
            'from-violet-500/20 to-purple-500/20',
            'from-amber-500/20 to-orange-500/20',
            'from-emerald-500/20 to-green-500/20',
        ]
        const index = str.length % gradients.length
        return gradients[index]
    }

    return (
        <motion.div
            className="group relative bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-800 hover:border-cyan-500/50 cursor-pointer h-full flex flex-col"
            whileHover={{ y: -5, scale: 1.01 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {/* Background Gradient Effect */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${getGradient(blog.title)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Date Badge */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center text-xs font-medium text-cyan-400 bg-cyan-950/30 px-2.5 py-1 rounded-md border border-cyan-500/20 backdrop-blur-sm">
                        <Calendar size={12} className="mr-1.5" />
                        {formatDate(blog.date)}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-100 group-hover:text-cyan-300 transition-colors mb-3 line-clamp-2">
                    {blog.title}
                </h3>

                {/* Excerpt */}
                <div className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </div>

                {/* Read More Link */}
                <div className="flex items-center text-cyan-500 text-sm font-medium group-hover:translate-x-2 transition-transform duration-300 mt-auto">
                    Read Article
                    <ArrowRight size={16} className="ml-2" />
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    )
}
