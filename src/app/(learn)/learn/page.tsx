import Link from 'next/link'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Section } from '@/components/motion/Section'

export default async function LearnPage() {
  const topics = await getAllFilesFrontMatter('learn')

  return (
    <Section>
      <h1 className="font-bold text-3xl mb-8 tracking-tighter">Learn</h1>
      <p className="prose prose-neutral dark:prose-invert mb-12">
        Structured learning content. I explain concepts in my own words, focusing on intuition and mental models.
      </p>

      <div className="flex flex-col gap-8">
        {topics.map((topic) => (
          <div key={topic.slug}>
            <Link 
              href={`/learn/${topic.slug}`}
              className="group flex flex-col gap-1"
            >
              <h2 className="font-semibold text-xl group-hover:text-primary transition-colors">
                {topic.title}
              </h2>
              {topic.date && (
                <time className="text-sm text-muted-foreground">
                  Last updated: {new Date(topic.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </time>
              )}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  )
}
