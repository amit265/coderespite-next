import Link from 'next/link'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Section } from '@/components/motion/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'A collection of notes, reflections, and technical snippets.',
}

export default async function NotesPage() {
  const notes = await getAllFilesFrontMatter('notes')

  // Combine and sort by date descending
  const allWriting = [...notes,].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Section>
      <h1 className="font-bold text-3xl mb-8 tracking-tighter">Notes</h1>
      <p className="prose prose-neutral dark:prose-invert mb-12 text-muted-foreground">
        Short-form thoughts, technical reflections, and documentation of my learning process.
      </p>

      <div className="flex flex-col gap-10">
        {allWriting.map((item) => (
          <div key={item.slug}>
            <Link
              href={`/notes/${item.slug}`}
              className="group flex flex-col gap-1"
            >
              <h2 className="font-semibold text-xl group-hover:text-primary transition-colors">
                {item.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <time>
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  )
}