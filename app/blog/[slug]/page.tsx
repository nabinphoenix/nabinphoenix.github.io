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
        const blog = await Blog.findOne({ slug }).lean();
        if (!blog) return null;
        return JSON.parse(JSON.stringify(blog));
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

// Function to get recent blogs for internal linking
async function getRecentBlogs(currentSlug: string) {
    try {
        await dbConnect();
        const blogs = await Blog.find({ slug: { $ne: currentSlug } })
            .sort({ date: -1 })
            .limit(3)
            .lean();
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Error fetching recent blogs:', error);
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
        description: blog.title,
        openGraph: {
            title: blog.title,
            description: blog.title,
            type: 'article',
            publishedTime: new Date(blog.date).toISOString(),
            authors: ['Nabin Nepali'],
            url: `https://nabinnepali.com.np/blog/${slug}`,
            siteName: 'Nabin Nepali Blog',
        },
        alternates: {
            canonical: `https://nabinnepali.com.np/blog/${slug}`,
        },
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        }
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
    const [blog, recentBlogs] = await Promise.all([
        getBlogBySlug(slug),
        getRecentBlogs(slug)
    ]);

    // If blog not found, show 404
    if (!blog) {
        notFound();
    }

    // Article JSON-LD Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: blog.title,
        datePublished: new Date(blog.date).toISOString(),
        author: {
            '@type': 'Person',
            name: 'Nabin Nepali',
            url: 'https://nabinnepali.com.np'
        },
        publisher: {
            '@type': 'Person',
            name: 'Nabin Nepali'
        },
        description: blog.title,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://nabinnepali.com.np/blog/${slug}`
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 overflow-hidden">
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

                {/* Recent Posts Section for Internal Linking */}
                {recentBlogs.length > 0 && (
                    <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Recent Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentBlogs.map((recent: any) => (
                                <Link
                                    key={recent._id}
                                    href={`/blog/${recent.slug}`}
                                    className="group block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
                                >
                                    <time className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">
                                        {formatDate(recent.date)}
                                    </time>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {recent.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer navigation */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Explore More Insights
                    </Link>
                </div>
            </article>
        </div>
    );
}

// Use ISR (Incremental Static Regeneration) for better indexing
export const revalidate = 3600; // Revalidate every hour

