import dbConnect from '@/lib/db';
import Blog, { IBlog } from '@/models/Blog';
import Link from 'next/link';

// Function to get all blogs
async function getBlogs(): Promise<IBlog[]> {
    try {
        await dbConnect();
        const blogs = await Blog.find({}).sort({ date: -1 }).lean();
        // Convert _id and date to simple types if needed, but lean() helps. 
        // We need to serialize for Next.js if passing to client components, but this is a server component.
        // However, Mongoose documents might have non-serializable fields.
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Error reading blogs:', error);
        return [];
    }
}

// Format date for display
function formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Blog listing page
export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Thoughts, stories, and ideas
                    </p>
                </div>

                {/* Blog list */}
                {blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No blog posts yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {blogs.map((blog) => (
                            <Link
                                key={String(blog._id)}
                                href={`/blog/${blog.slug}`}
                                className="block group"
                            >
                                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400">
                                    <div className="flex flex-col">
                                        <time className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                            {formatDate(blog.date)}
                                        </time>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {blog.title}
                                        </h2>
                                        <div className="text-gray-600 dark:text-gray-300 line-clamp-3">
                                            {/* Extract plain text from HTML for preview */}
                                            {blog.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                                        </div>
                                        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                                            Read more
                                            <svg
                                                className="w-5 h-5 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Enable dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
