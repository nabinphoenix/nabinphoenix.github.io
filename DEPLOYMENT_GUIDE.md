# Deployment Guide - nabinnepali.com.np

## 🎯 Overview
This guide will help you deploy your Next.js portfolio to your existing GitHub repository and domain (nabinnepali.com.np).

## 📋 Prerequisites
- GitHub account with existing repository
- Domain: nabinnepali.com.np
- Git installed on your computer
- Vercel account (recommended for Next.js deployment)

---

## 🚀 Step 1: Prepare Your Project for GitHub

### 1.1 Initialize Git (if not already done)
```powershell
cd "c:\Users\A S U S\OneDrive - Asia Pacific University of Technology And Innovation (APU)\Desktop\Portfolio Next Js\my-app"
git init
```

### 1.2 Create .gitignore file
Your project should already have a `.gitignore` file. Verify it includes:
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### 1.3 Add all files to Git
```powershell
git add .
git commit -m "Initial commit: Next.js portfolio with blog system"
```

---

## 🔗 Step 2: Connect to Your GitHub Repository

### Option A: If you want to REPLACE the existing repository content

⚠️ **WARNING**: This will replace your current index.html website!

```powershell
# Add your GitHub repository as remote
git remote add origin https://github.com/nabinphoenix/nabinnepali.com.np.git

# Force push (this will replace everything)
git push -f origin main
```

### Option B: If you want to KEEP both versions (Recommended)

Create a new branch for the Next.js version:

```powershell
# Add your GitHub repository as remote
git remote add origin https://github.com/nabinphoenix/nabinnepali.com.np.git

# Fetch existing content
git fetch origin

# Create a new branch for Next.js
git checkout -b nextjs-version

# Push to new branch
git push origin nextjs-version
```

Later, when you're ready to switch:
```powershell
git checkout main
git merge nextjs-version
git push origin main
```

---

## 🌐 Step 3: Deploy to Vercel (Recommended for Next.js)

Vercel is the best platform for Next.js deployment (made by the same team).

### 3.1 Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account

### 3.2 Import Your Project
1. Click "Add New Project"
2. Select your GitHub repository
3. Vercel will auto-detect Next.js settings
4. Click "Deploy"

### 3.3 Configure Your Custom Domain
1. Go to Project Settings → Domains
2. Add your domain: `nabinnepali.com.np`
3. Vercel will provide DNS records

### 3.4 Update Your Domain DNS Settings
Go to your domain registrar and add these DNS records:

**For Apex Domain (nabinnepali.com.np):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Wait 24-48 hours** for DNS propagation.

---

## 🔧 Step 4: Environment Variables (if needed)

If you add authentication or API keys later:

1. Go to Vercel Project Settings → Environment Variables
2. Add your variables
3. Redeploy

---

## 📝 Step 5: Configure Blog System for Production

### ⚠️ IMPORTANT: File Storage Limitation

Your current blog system uses **file-based storage** (`data/blogs.json`), which works in development but **NOT in production** on Vercel (serverless environment has read-only filesystem).

### Solutions for Production:

#### Option A: Use Vercel Postgres (Recommended)
```bash
npm install @vercel/postgres
```

#### Option B: Use MongoDB Atlas (Free tier available)
```bash
npm install mongodb
```

#### Option C: Use a Headless CMS
- Contentful
- Sanity
- Strapi

### For Now (Testing):
You can deploy as-is for testing, but the blog creation API won't work in production. You'll need to migrate to a database before using n8n in production.

---

## 🤖 Step 6: n8n Blog Integration

### Development (Local Testing)
Your n8n workflow should POST to:
```
http://localhost:3000/api/blog/create
```

### Production (After Deployment)
Update your n8n workflow to POST to:
```
https://nabinnepali.com.np/api/blog/create
```

### n8n Workflow Configuration

**HTTP Request Node:**
- Method: POST
- URL: `https://nabinnepali.com.np/api/blog/create`
- Authentication: None (add API key later!)
- Body Type: JSON
- Body:
```json
{
  "title": "{{ $json.title }}",
  "slug": "{{ $json.slug }}",
  "content": "{{ $json.htmlContent }}"
}
```

### How Blogs Appear on Your Site

1. **n8n generates HTML** → Sends POST request to your API
2. **API saves to database** (after you migrate from file storage)
3. **Blog listing page** (`/blog`) automatically shows all blogs
4. **Individual blog pages** (`/blog/[slug]`) display each post
5. **All blogs are visible** - past, current, and future blogs will all appear automatically!

The blog system is **fully automatic**:
- ✅ New blogs appear immediately on `/blog`
- ✅ Each blog gets its own page at `/blog/[slug]`
- ✅ No manual updates needed
- ✅ SEO-friendly URLs
- ✅ Responsive design

---

## 📱 Step 7: Update Favicon (Browser Tab Icon)

### Method 1: Replace the existing favicon
1. Create or download your new favicon (`.ico` file)
2. Replace the file at: `app/favicon.ico`
3. The favicon will update automatically

### Method 2: Use a custom icon
Create `app/icon.png` or `app/icon.svg`:
```
app/
  ├── icon.png (or icon.svg)
  └── favicon.ico
```

Next.js will automatically use it!

### Method 3: Remove favicon (use default)
Delete `app/favicon.ico` - Next.js will use its default icon.

### Generate a Favicon
Use these free tools:
- [favicon.io](https://favicon.io/) - Generate from text, image, or emoji
- [realfavicongenerator.net](https://realfavicongenerator.net/) - Advanced options

---

## 🔄 Step 8: Continuous Deployment

Once connected to Vercel:

1. **Make changes locally**
2. **Commit and push to GitHub:**
   ```powershell
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **Vercel automatically deploys** - Your site updates in ~2 minutes!

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] Favicon updated/removed
- [ ] Blog system tested locally
- [ ] Database migration planned (for production blogs)
- [ ] n8n workflow configured with production URL
- [ ] Environment variables set (if needed)

---

## 🐛 Troubleshooting

### Issue: "Blog API returns 500 error in production"
**Cause:** File system is read-only on Vercel
**Solution:** Migrate to database (see Step 5)

### Issue: "Domain not working"
**Cause:** DNS propagation takes time
**Solution:** Wait 24-48 hours, check DNS with [whatsmydns.net](https://whatsmydns.net)

### Issue: "Old website still showing"
**Cause:** Browser cache or DNS cache
**Solution:** Clear browser cache, try incognito mode

### Issue: "Build fails on Vercel"
**Cause:** Missing dependencies or TypeScript errors
**Solution:** Check Vercel build logs, fix errors locally first

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Custom Domains on Vercel](https://vercel.com/docs/concepts/projects/domains)
- [n8n Documentation](https://docs.n8n.io/)

---

## 🎉 Summary

### Current vs Future Blogs
**How it works:**
1. Your blog listing page (`/blog`) reads from the database
2. It automatically displays ALL blogs (sorted by date, newest first)
3. When n8n creates a new blog → It's instantly visible
4. No manual intervention needed!

**Blog Visibility:**
- ✅ **Current blogs** - Already in database, visible now
- ✅ **Future blogs** - n8n creates them, they appear automatically
- ✅ **All blogs** - Listed on `/blog` page
- ✅ **Individual pages** - Each blog has its own URL

### Quick Start Commands

```powershell
# 1. Commit your code
git add .
git commit -m "Next.js portfolio with blog system"

# 2. Push to GitHub
git remote add origin https://github.com/nabinphoenix/nabinnepali.com.np.git
git push -u origin main

# 3. Deploy on Vercel (via web interface)
# Visit vercel.com and import your repository

# 4. Update n8n workflow
# Change URL to: https://nabinnepali.com.np/api/blog/create
```

---

**Last Updated:** 2025-11-25  
**Status:** Ready for deployment! 🚀
