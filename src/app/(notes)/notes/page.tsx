import Link from 'next/link'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Section } from '@/components/motion/Section'

export default async function NotesPage() {
  const notes = await getAllFilesFrontMatter('notes')

  // Sort notes by date descending
  const sortedNotes = notes.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Section>
      <h1 className="font-bold text-3xl mb-8 tracking-tighter">Notes</h1>
      <p className="prose prose-neutral dark:prose-invert mb-12">
        Short-form, chronological notes. Mostly things I'm thinking about, learning, or snippets of code.
      </p>

      <div className="flex flex-col gap-8">
        {sortedNotes.map((note) => (
          <div key={note.slug}>
            <Link 
              href={`/notes/${note.slug}`}
              className="group flex flex-col gap-1"
            >
              <h2 className="font-semibold text-xl group-hover:text-primary transition-colors">
                {note.title}
              </h2>
              <time className="text-sm text-muted-foreground">
                {new Date(note.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  )
}