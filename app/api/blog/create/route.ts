import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define the Blog type
interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    date: string;
}

// POST endpoint to create a new blog post
export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body = await request.json();
        const { title, content, slug } = body;

        // Validate required fields
        if (!title || !content || !slug) {
            return NextResponse.json(
                { error: 'Missing required fields: title, content, and slug are required' },
                { status: 400 }
            );
        }

        // Define the path to blogs.json
        const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json');

        // Read existing blogs
        let blogs: Blog[] = [];
        try {
            const fileContent = await fs.readFile(blogsFilePath, 'utf-8');
            blogs = JSON.parse(fileContent);
        } catch (error) {
            // If file doesn't exist or is empty, start with empty array
            console.log('blogs.json not found or empty, creating new file');
            blogs = [];
        }

        // Check if slug already exists
        const slugExists = blogs.some((blog) => blog.slug === slug);
        if (slugExists) {
            return NextResponse.json(
                { error: 'A blog post with this slug already exists' },
                { status: 409 }
            );
        }

        // Generate new ID (max ID + 1)
        const newId = blogs.length > 0 ? Math.max(...blogs.map((b) => b.id)) + 1 : 1;

        // Create new blog post
        const newBlog: Blog = {
            id: newId,
            title,
            slug,
            content,
            date: new Date().toISOString(),
        };

        // Add new blog to array
        blogs.push(newBlog);

        // Write back to file
        await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2), 'utf-8');

        // Return success response
        return NextResponse.json(
            {
                message: 'Blog post created successfully',
                post: newBlog,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// Reject other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST to create a blog post.' },
        { status: 405 }
    );
}
