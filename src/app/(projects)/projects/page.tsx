import { Section } from '@/components/motion/Section'

export default function ProjectsPage() {
  return (
    <Section>
      <h1 className="font-bold text-3xl mb-8 tracking-tighter">Projects</h1>
      <p className="prose prose-neutral dark:prose-invert mb-12">
        These are narrative descriptions of projects I've built. I focus on the "why" and what I learned, not just a list of features.
      </p>
      
      <div className="prose prose-neutral dark:prose-invert">
        {/* Project list will be rendered here */}
        <p>
          Coming soon.
        </p>
      </div>
    </Section>
  )
}
