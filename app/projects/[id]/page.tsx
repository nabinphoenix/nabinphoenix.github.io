import { Metadata } from 'next'
import { projects } from '@/data/projects'
import { aiAgents } from '@/data/ai-agents'
import ProjectDetailClient from './ProjectDetailClient'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: idStr } = await params
  const id = parseInt(idStr)
  const project = [...projects, ...aiAgents].find((p) => p.id === id)

  if (!project) {
    return {
      title: 'Project Not Found | Nabin Nepali',
    }
  }

  return {
    title: `${project.title} | Nabin Nepali Project`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
    keywords: [...project.technologies, 'Nabin Nepali Projects', 'AI Engineer Nepal'],
    alternates: {
      canonical: `https://nabinnepali.com.np/projects/${id}`,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  // Although the client component uses useParams, it's good practice to await them here if needed
  // or just render the client component.
  await params
  return <ProjectDetailClient />
}
