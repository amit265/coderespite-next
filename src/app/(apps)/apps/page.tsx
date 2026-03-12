import fs from 'fs'
import path from 'path'
import { Section } from '@/components/motion/Section'
import { ProjectCard } from '@/components/ui/ProjectCard'
import Link from 'next/link'

export default function AppsPage() {
  const dataPath = path.join(process.cwd(), 'data', 'projects.json')
  const projectsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  const mobileApps = projectsData.mobile || []

  return (
    <div className="flex flex-col gap-16">
      <Section>
        <h1 className="font-bold text-3xl mb-8 tracking-tighter">Apps</h1>
        <p className="prose prose-neutral dark:prose-invert mb-8">
          This is my mobile laboratory. I build these apps primarily to solve my own problems or to explore specific interaction patterns on Android and iOS.
        </p>
        <div className="p-4 bg-secondary/50 border border-muted rounded-lg text-sm text-muted-foreground italic prose prose-neutral dark:prose-invert">
          <p>
            Note: While some are on the Play Store, many are "forever-beta" tools I use for my own learning reinforcement.
          </p>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mobileApps.map((app: any) => (
            <ProjectCard key={app.id} {...app} />
          ))}
          
          {/* Internal Tool Placeholder */}
          <div className="group flex flex-col bg-secondary/10 rounded-xl overflow-hidden border border-dashed border-muted p-5 transition-all">
            <h3 className="text-lg font-bold mb-2 text-muted-foreground italic">
              Internal: Spaced Repetition Tool
            </h3>
            <p className="text-sm text-muted-foreground/60 leading-relaxed mb-4">
              My private tool for practicing concepts using flashcards. Built with React Native & SQLite. Not for public release.
            </p>
            <span className="text-[10px] font-mono text-muted-foreground/40 mt-auto uppercase tracking-tighter">
              Private Build
            </span>
          </div>
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="prose prose-neutral dark:prose-invert text-sm">
          <p>
            Looking for my web work? Check the <Link href="/projects" className="text-primary hover:underline">full projects index</Link>.
          </p>
        </div>
      </Section>
    </div>
  )
}
