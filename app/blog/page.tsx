import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import BlogCard from '@/components/BlogCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Nabin Nepali - Insights on AI & Machine Learning',
    description: 'Read the latest insights on Artificial Intelligence, Machine Learning, and Automation by Nabin Nepali.',
    alternates: {
        canonical: 'https://nabinnepali.com.np/blog',
    },
};

// Function to get all blogs
async function getBlogs() {
    try {
        await dbConnect();
        const blogs = await Blog.find({}).sort({ date: -1 }).lean();
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Error reading blogs:', error);
        return [];
    }
}

// Blog listing page
export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <PageTransition>
            <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <AnimatedSection className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="gradient-text">Blog & Insights</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Exploring the latest trends and insights in AI, machine learning, cloud computing, cybersecurity, and emerging technologies.
                        </p>
                    </AnimatedSection>

                    {/* Blog Grid */}
                    {blogs.length === 0 ? (
                        <AnimatedSection delay={0.2} className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Check back soon for new content!
                            </p>
                        </AnimatedSection>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog: any, index: number) => (
                                <AnimatedSection key={blog._id} delay={index * 0.1}>
                                    <BlogCard blog={blog} />
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
}

// Enable dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

