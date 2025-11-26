import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

// POST endpoint to create a new blog post
export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await dbConnect();

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

        // Check if slug already exists
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            return NextResponse.json(
                { error: 'A blog post with this slug already exists' },
                { status: 409 }
            );
        }

        // Create new blog post
        const newBlog = await Blog.create({
            title,
            slug,
            content,
            date: new Date(),
        });

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
