import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Define the Blog type
interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    date: string;
}

// Function to get all blogs
async function getBlogs(): Promise<Blog[]> {
    try {
        const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json');
        const fileContent = await fs.readFile(blogsFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading blogs:', error);
        return [];
    }
}

// Function to get a single blog by slug
async function getBlogBySlug(slug: string): Promise<Blog | null> {
    const blogs = await getBlogs();
    return blogs.find((blog) => blog.slug === slug) || null;
}

// Format date for display
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Generate static params for all blog posts (optional, for static generation)
export async function generateStaticParams() {
    const blogs = await getBlogs();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

// Page component
export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    const blog = await getBlogBySlug(params.slug);

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
