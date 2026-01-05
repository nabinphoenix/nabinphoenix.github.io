import dbConnect from '@/lib/db';
import Blog, { IBlog } from '@/models/Blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Dynamic blog post page - reads from MongoDB
// Function to get a single blog by slug
async function getBlogBySlug(slug: string): Promise<IBlog | null> {
    try {
        await dbConnect();
        console.log('Looking for blog with slug:', slug);
        const blog = await Blog.findOne({ slug }).lean();
        console.log('Blog found:', blog ? 'YES' : 'NO');
        if (!blog) return null;
        return JSON.parse(JSON.stringify(blog));
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
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

// Allow dynamic params for blog posts created after build
export const dynamicParams = true;

// Generate metadata for each blog post
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: 'Post Not Found | Nabin Nepali Blog',
        };
    }

    return {
        title: `${blog.title} | Nabin Nepali Blog`,
        description: blog.title, // Or generate a summary if available
        openGraph: {
            title: blog.title,
            description: blog.title,
            type: 'article',
            publishedTime: new Date(blog.date).toISOString(),
            authors: ['Nabin Nepali'],
        },
        alternates: {
            canonical: `https://nabinnepali.com.np/blog/${slug}`,
        },
    };
}

// Page component
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Await params in Next.js 15+
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    // If blog not found, show 404
    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto">
                {/* Back button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Blog
                </Link>

                {/* Blog post content */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                        <time className="text-sm text-gray-500 dark:text-gray-400 mb-3 block">
                            {formatDate(blog.date)}
                        </time>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {blog.title}
                        </h1>
                    </header>

                    {/* Content */}
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-ul:text-gray-700 dark:prose-ul:text-gray-300
              prose-ol:text-gray-700 dark:prose-ol:text-gray-300
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-code:text-gray-900 dark:prose-code:text-gray-100
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>

                {/* Footer navigation */}
                <div className="mt-8 text-center">
                    <Link
                        href="/blog"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                        View All Posts
                    </Link>
                </div>
            </article>
        </div>
    );
}

// Enable dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
