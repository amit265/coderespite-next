import fs from 'fs'
import path from 'path'
import { Section } from '@/components/motion/Section'
import { ProjectList } from '@/components/projects/ProjectList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Narrative descriptions of projects I\'ve built, focusing on the why and what I learned.',
}

export default function ProjectsPage() {
  const dataPath = path.join(process.cwd(), 'data', 'projects.json')
  const projectsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  return (
    <div className="flex flex-col gap-12">
      <Section>
        <h1 className="font-bold text-3xl mb-8 tracking-tighter">Projects</h1>
        <p className="prose prose-neutral dark:prose-invert mb-12">
          These are narrative descriptions of projects I've built. I focus on the "why" and what I learned, not just a list of features.
        </p>
      </Section>

      <ProjectList projectsData={projectsData} />
    </div>
  )
}
