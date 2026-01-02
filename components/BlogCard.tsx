'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
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
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
            whileHover={{ y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Link
                href={`/blog/${blog.slug}`}
                className="absolute inset-0 z-40"
                aria-label={`Read article: ${blog.title}`}
            />
            {/* Decorative Gradient Overlay (Subtle) */}
            <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getGradient(blog.title)} opacity-10 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110`}
            />

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Date Badge */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2.5 py-1 rounded-full">
                        <Calendar size={12} className="mr-1.5" />
                        {formatDate(blog.date)}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {blog.title}
                </h3>

                {/* Excerpt */}
                <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </div>

                {/* Read More Link */}
                <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:translate-x-2 transition-transform duration-300 mt-auto">
                    Read Article
                    <ArrowRight size={16} className="ml-2" />
                </div>
            </div>
        </motion.div>
    )
}
