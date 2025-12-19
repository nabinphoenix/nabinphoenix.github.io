import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { aiAgents } from '@/data/ai-agents'
import { promises as fs } from 'fs'
import path from 'path'

// Define the Blog type
interface Blog {
    id: number;
    title: string;
    slug: string
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
    const domain = 'https://nabinnepali.com.np'
    const blogs = await getBlogs();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: domain,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${domain}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${domain}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${domain}/ai-agents`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${domain}/skills`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${domain}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${domain}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Project Detail Pages (IDs 1-5, etc.)
    const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${domain}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // AI Agent Detail Pages (IDs 101, 102, etc.)
    const aiAgentEntries: MetadataRoute.Sitemap = aiAgents.map((agent) => ({
        url: `${domain}/projects/${agent.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Blog Post Detail Pages
    const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${domain}/blog/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticPages, ...projectEntries, ...aiAgentEntries, ...blogEntries];
}
