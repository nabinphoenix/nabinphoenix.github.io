# Blog System Documentation

## Overview
This is a complete blog system for your Next.js 13+ App Router portfolio website. It allows external systems (like n8n) to automatically post blogs via a POST API.

## File Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── blog/
│   │       └── create/
│   │           └── route.ts          ← API endpoint for creating blogs
│   ├── blog/
│   │   ├── page.tsx                  ← Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx              ← Dynamic blog post page
│   ├── sitemap.ts                    ← Updated with blog URLs
│   └── robots.ts                     ← Already configured
├── data/
│   └── blogs.json                    ← Blog storage (JSON)
└── BLOG_SYSTEM.md                    ← This file
```

## Features

✅ **JSON-based storage** - No database required
✅ **POST API endpoint** - For automated blog posting
✅ **Blog listing page** - Shows all blog posts
✅ **Dynamic blog pages** - Individual pages for each post
✅ **SEO-friendly** - Automatic sitemap generation
✅ **Responsive design** - Tailwind CSS styling
✅ **Type-safe** - Full TypeScript support

## API Usage

### Create a New Blog Post

**Endpoint:** `POST https://nabinnepali.com.np/api/blog/create`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "title": "Your Blog Title",
  "slug": "your-blog-slug",
  "content": "<h2>Your HTML Content</h2><p>This is a paragraph.</p>"
}
```

**Success Response (201):**
```json
{
  "message": "Blog post created successfully",
  "post": {
    "id": 2,
    "title": "Your Blog Title",
    "slug": "your-blog-slug",
    "content": "<h2>Your HTML Content</h2><p>This is a paragraph.</p>",
    "date": "2025-11-24T12:43:35+05:45"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Missing required fields
- **409 Conflict** - Slug already exists
- **500 Internal Server Error** - Server error

### n8n Workflow Example

1. **HTTP Request Node:**
   - Method: POST
   - URL: `https://nabinnepali.com.np/api/blog/create`
   - Body Content Type: JSON
   - Body:
     ```json
     {
       "title": "{{ $json.title }}",
       "slug": "{{ $json.slug }}",
       "content": "{{ $json.content }}"
     }
     ```

## Blog Data Structure

Each blog post in `data/blogs.json` has the following structure:

```typescript
interface Blog {
  id: number;           // Auto-generated, incremental
  title: string;        // Blog post title
  slug: string;         // URL-friendly slug (must be unique)
  content: string;      // HTML content
  date: string;         // ISO 8601 format (auto-generated)
}
```

## Pages

### Blog Listing Page
- **URL:** `https://nabinnepali.com.np/blog`
- **Description:** Shows all blog posts sorted by date (newest first)
- **Features:**
  - Responsive card layout
  - Date formatting
  - Content preview (first 200 characters)
  - Hover effects
  - "Read more" links

### Individual Blog Post Page
- **URL:** `https://nabinnepali.com.np/blog/[slug]`
- **Description:** Displays a single blog post
- **Features:**
  - Full HTML content rendering
  - Tailwind prose styling
  - Back to blog link
  - Responsive design
  - Dark mode support

## SEO

### Sitemap
The sitemap automatically includes:
- All static pages
- Blog listing page (`/blog`)
- All individual blog posts (`/blog/[slug]`)

**URL:** `https://nabinnepali.com.np/sitemap.xml`

### Robots.txt
Already configured to allow all pages including blog posts.

**URL:** `https://nabinnepali.com.np/robots.txt`

## Testing

### Test the Blog Listing Page
1. Navigate to: `http://localhost:3000/blog`
2. You should see the sample blog post

### Test a Blog Post
1. Navigate to: `http://localhost:3000/blog/welcome-to-my-blog`
2. You should see the full blog content

### Test the API with cURL

```bash
curl -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Second Blog Post",
    "slug": "my-second-blog-post",
    "content": "<h2>Hello!</h2><p>This is my second post.</p>"
  }'
```

### Test the API with PowerShell

```powershell
$body = @{
    title = "My Second Blog Post"
    slug = "my-second-blog-post"
    content = "<h2>Hello!</h2><p>This is my second post.</p>"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/blog/create" -Method Post -Body $body -ContentType "application/json"
```

## Important Notes

### Development vs Production

**Development:**
- File writing works normally
- Changes are reflected immediately
- Use `npm run dev`

**Production (Vercel/Similar):**
- File system is **read-only** in serverless environments
- You'll need to migrate to a database (MongoDB, PostgreSQL, etc.) for production
- Alternative: Use a headless CMS (Contentful, Sanity, etc.)

### Current Limitations

⚠️ **No Authentication** - The API is currently open. Add authentication before deploying to production.

⚠️ **File-based Storage** - Works in development but not in serverless production environments.

⚠️ **No Editing/Deletion** - Currently only supports creating new posts.

### Future Enhancements

Consider adding:
- Authentication (API keys, JWT, etc.)
- Database integration (MongoDB, PostgreSQL)
- Edit/Delete endpoints
- Image upload support
- Categories/Tags
- Search functionality
- Comments system
- RSS feed

## Troubleshooting

### "Blog post not found"
- Check that the slug in the URL matches the slug in `blogs.json`
- Ensure `blogs.json` is properly formatted

### API returns 500 error
- Check server logs for details
- Ensure `data/blogs.json` exists and is valid JSON
- Verify file permissions

### Sitemap doesn't show blog posts
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check `blogs.json` is readable

## Support

For issues or questions, check:
1. Next.js documentation: https://nextjs.org/docs
2. This README file
3. Server logs in development mode

---

**Created:** 2025-11-24
**Version:** 1.0.0
