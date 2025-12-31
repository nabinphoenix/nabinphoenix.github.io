'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import BlogCard from '@/components/BlogCard'

interface BlogSectionProps {
    blogs: any[]
}

export default function BlogSection({ blogs }: BlogSectionProps) {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Latest <span className="gradient-text">Insights</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Exploring the latest trends and insights in AI, machine learning, and emerging technologies.
                    </p>
                </AnimatedSection>

                <div className="relative">
                    <div className="hidden md:flex justify-end absolute -top-12 right-0">
                        <AnimatedSection delay={0.2}>
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all group px-2"
                            >
                                Read More Articles
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedSection>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => (
                            <AnimatedSection key={blog._id} delay={index * 0.1}>
                                <BlogCard blog={blog} />
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Mobile View All */}
                    <div className="md:hidden text-center mt-12">
                        <AnimatedSection delay={0.2}>
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all group"
                            >
                                Read More Articles
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    )
}
