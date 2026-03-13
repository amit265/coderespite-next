import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { Section } from '@/components/motion/Section'
import { getAllFilesFrontMatter } from '@/lib/mdx'

export default async function HomePage() {
  const notes = await getAllFilesFrontMatter();
  
  // Combine and sort by date
  const allWriting = [...notes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  const dataPath = path.join(process.cwd(), 'data', 'projects.json')
  const projectsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  
  const highlightedProjects = [
    ...(projectsData.mobile?.slice(0, 3) || []),
    ...(projectsData.next?.slice(0, 1) || []),
    ...(projectsData.react?.slice(0, 1) || [])
  ]

  return (
    <div className="flex flex-col gap-24">
      <Section delay={0.1}>
        <h1 className="text-3xl font-bold mb-8 tracking-tighter">Code Respite</h1>
        <div className="prose prose-neutral dark:prose-invert space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I&apos;m a developer building tools for thought and documenting the process of learning. 
            This website is my personal space to think in public and share my projects.
          </p>
        
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Recent Notes</h2>
          <Link href="/notes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            View all →
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          {allWriting.map((item) => (
            <Link 
              key={item.slug} 
              href={item.slug.includes('blog') ? `/blog/${item.slug}` : `/notes/${item.slug}`}
              className="group flex flex-col gap-2"
            >
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors leading-snug">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <time>
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
                {item.slug.includes('blog') && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-bold tracking-widest uppercase">Post</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section delay={0.3}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Featured Work</h2>
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Explore all →
          </Link>
        </div>
        <div className="flex flex-col gap-10">
           {highlightedProjects.map((project: any) => (
             <div key={project.id} className="group flex flex-col gap-3">
               <h3 className="font-semibold group-hover:text-primary transition-colors flex items-center gap-2 text-lg">
                 {project.title}
                 <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground uppercase font-bold tracking-widest">
                   {project.id.startsWith('app') ? 'Mobile' : 
                    project.id.startsWith('next') ? 'Next.js' : 'React'}
                 </span>
               </h3>
               <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                 {project.description}
               </p>
               <div className="flex gap-6 mt-1">
                 <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary">
                   {project.id.startsWith('app') ? 'App Store' : 'Live Demo'}
                 </a>
                 <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary">Source Code</a>
               </div>
             </div>
           ))}
        </div>
      </Section>

      {/* <Section delay={0.4}>
        <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
                I also maintain a small collection of <Link href="/apps" className="text-primary font-medium hover:underline">Android apps</Link> I use for daily practice and learning reinforcement. They're built for personal use, not as polished products.
            </p>
        </div>
      </Section> */}
    </div>
  )
}