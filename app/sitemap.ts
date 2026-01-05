import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { aiAgents } from '@/data/ai-agents'

import dbConnect from '@/lib/db'
import Blog from '@/models/Blog'

// Define the Blog type
interface BlogType {
    _id: any;
    title: string;
    slug: string;
    date: string;
}

// Function to get all blogs from MongoDB
async function getBlogs(): Promise<BlogType[]> {
    try {
        await dbConnect();
        const blogs = await Blog.find({}).sort({ date: -1 }).lean();
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Error fetching blogs for sitemap:', error);
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
        {
            url: `${domain}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
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
