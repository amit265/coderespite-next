import { Section } from '@/components/motion/Section'

export default function AboutPage() {
  return (
    <Section>
      <h1 className="font-bold text-3xl mb-8 tracking-tighter">About Me</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm a developer who enjoys building things. This website is my personal space to document that process.
        </p>
        <p>
          I believe in writing for myself first. The goal is clarity of thought, not performance. What you see here is a mix of notes, reflections, and project narratives.
        </p>
        <p>
          This is not a portfolio optimized for recruiters. It's a notebook.
        </p>
      </div>
    </Section>
  )
}
