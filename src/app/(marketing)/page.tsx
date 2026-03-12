import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { Section } from '@/components/motion/Section'
import { getAllFilesFrontMatter } from '@/lib/mdx'

export default async function HomePage() {
  const notes = await getAllFilesFrontMatter('notes')
  
  const recentNotes = notes
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  const dataPath = path.join(process.cwd(), 'data', 'projects.json')
  const projectsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  
  // Highlighted projects: 1 from Mobile, 1 from Next, 1 from React
  const highlightedProjects = [
    ...(projectsData.mobile?.slice(0, 1) || []),
    ...(projectsData.next?.slice(0, 1) || []),
    ...(projectsData.react?.slice(0, 1) || [])
  ]

  return (
    <div className="flex flex-col gap-20">
      <Section delay={0.1}>
        <h1 className="text-2xl font-bold mb-6 tracking-tight">Now</h1>
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            I'm currently focused on building out this notebook. My goal is to create a space
            for myself to think in public, document my learning, and share my projects without the
            pressure of a typical blog.
          </p>
          <p>
            It's a return to a more personal web.
          </p>
        </div>
      </Section>

      <Section delay={0.2}>
        <h2 className="text-2xl font-bold mb-6 tracking-tight">Recent Notes</h2>
        <div className="flex flex-col gap-6">
          {recentNotes.map((note) => (
            <Link 
              key={note.slug} 
              href={`/notes/${note.slug}`}
              className="group flex flex-col gap-1"
            >
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {note.title}
              </h3>
              <time className="text-sm text-muted-foreground">
                {new Date(note.date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </Link>
          ))}
          <Link href="/notes" className="text-sm text-primary hover:underline mt-2">
            View all notes →
          </Link>
        </div>
      </Section>

      <Section delay={0.3}>
        <h2 className="text-2xl font-bold mb-6 tracking-tight">Highlighted Projects</h2>
        <div className="flex flex-col gap-8">
           {highlightedProjects.map((project: any) => (
             <div key={project.id} className="group flex flex-col gap-2">
               <h3 className="font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                 {project.title}
                 <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground uppercase font-bold tracking-widest">
                   {project.id.startsWith('app') ? 'React Native' : 
                    project.id.startsWith('next') ? 'Next.js' : 'React'}
                 </span>
               </h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                 {project.description}
               </p>
               <div className="flex gap-4">
                 <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:text-primary transition-colors">
                   {project.id.startsWith('app') ? 'Play Store' : 'Live'}
                 </a>
                 <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:text-primary transition-colors">Source</a>
               </div>
             </div>
           ))}
          <Link href="/projects" className="text-sm text-primary hover:underline mt-4 inline-block">
            Explore all projects →
          </Link>
        </div>
      </Section>

      <Section delay={0.4}>
        <div className="prose prose-neutral dark:prose-invert text-sm text-muted-foreground">
            <p>
                I also have a little <Link href="/apps">Android app</Link> I use for daily practice and learning reinforcement. It's a personal tool, not a product.
            </p>
        </div>
      </Section>
    </div>
  )
}