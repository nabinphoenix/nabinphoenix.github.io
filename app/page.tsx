import dbConnect from '@/lib/db'
import Blog from '@/models/Blog'
import PageTransition from '@/components/PageTransition'
import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://nabinnepali.com.np',
  },
}
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import SkillsSection from '@/components/home/SkillsSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import WhyChooseMeSection from '@/components/home/WhyChooseMeSection'
import AiAgentsSection from '@/components/home/AiAgentsSection'
import FAQSection from '@/components/home/FAQSection'
import BlogSection from '@/components/home/BlogSection'
import ContactSection from '@/components/home/ContactSection'

async function getLatestBlogs() {
  try {
    await dbConnect()
    const blogs = await Blog.find({})
      .sort({ date: -1 })
      .limit(3)
      .lean()
    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error('Error fetching blogs for home:', error)
    return []
  }
}

export default async function Home() {
  const latestBlogs = await getLatestBlogs()

  return (
    <PageTransition>
      <div className="pt-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        {/* <WhyChooseMeSection /> */}
        <AiAgentsSection />
        {/* <FAQSection /> */}
        <BlogSection blogs={latestBlogs} />
        <ContactSection />
      </div>
    </PageTransition>
  )
}
