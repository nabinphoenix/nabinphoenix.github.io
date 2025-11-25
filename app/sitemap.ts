import { MetadataRoute } from 'next'
import { promises as fs } from 'fs'
import path from 'path'

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
        console.error('Error reading blogs for sitemap:', error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get all blogs
    const blogs = await getBlogs();

    // Create blog entries for sitemap
    const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `https://nabinnepali.com.np/blog/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: 'https://nabinnepali.com.np',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://nabinnepali.com.np/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://nabinnepali.com.np/projects',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://nabinnepali.com.np/skills',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://nabinnepali.com.np/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://nabinnepali.com.np/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    // Combine static pages and blog entries
    return [...staticPages, ...blogEntries];
}
