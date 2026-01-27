import { notFound } from 'next/navigation'
import { getProject, projects } from '@/lib/projects'
import ProjectLayout from '@/components/Project/ProjectLayout'

interface ProjectPageProps {
  params: {
    category: string
    project: string
  }
}

// Force dynamic rendering since we use client-side context
export const dynamic = 'force-dynamic'

export function generateMetadata({ params }: ProjectPageProps) {
  const project = getProject(params.category, params.project)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const titleParts = project.titleKey.split('.')
  const projectName = titleParts[titleParts.length - 1]

  return {
    title: `${projectName.charAt(0).toUpperCase() + projectName.slice(1)} | Designer Portfolio`,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.category, params.project)

  if (!project) {
    notFound()
  }

  return <ProjectLayout project={project} />
}
