'use client'

import PageTransition from '@/components/PageTransition'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import SkillsSection from '@/components/home/SkillsSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import ContactSection from '@/components/home/ContactSection'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <>
      <PageTransition>
        <div className="pt-16">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </PageTransition>
      <ChatWidget />
    </>
  )
}