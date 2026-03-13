import fs from 'fs'
import path from 'path'
import { Section } from '@/components/motion/Section'
import { ProjectCard } from '@/components/ui/ProjectCard'
import Link from 'next/link'

export default function AppsPage() {
  const dataPath = path.join(process.cwd(), 'data', 'projects.json')
  const projectsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  const mobileApps = projectsData.mobile || []

  // Split apps by status (Assuming your JSON has a 'status' or 'published' field)
  const publishedApps = mobileApps.filter((app: any) => app.live !== null )
  const workshopApps = mobileApps.filter((app: any) => app.live === null)

  return (
    <div className="flex flex-col gap-12">
      <Section>
        <h1 className="font-bold text-3xl mb-4 tracking-tighter">Mobile Lab</h1>
        <p className="prose prose-neutral dark:prose-invert mb-8 text-muted-foreground">
          My digital scratchpad. I build these apps to solve my own problems, then polish them enough to survive on your phone.
        </p>
      </Section>

      {/* --- Section 1: In the Workshop --- */}
      <Section delay={0.1}>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="font-semibold text-xl tracking-tight">Still Cooking</h2>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
            Active Builds
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshopApps.map((app: any) => (
            <ProjectCard key={app.id} {...app} />
          ))}
          {workshopApps.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No active fires... for now.</p>
          )}
        </div>
      </Section>

      {/* --- Section 2: Out in the Wild --- */}
      <Section delay={0.2}>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="font-semibold text-xl tracking-tight">In the Wild</h2>
          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
            {publishedApps.length} Apps Live
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedApps.map((app: any) => (
            <ProjectCard key={app.id} {...app} />
          ))}
        </div>
      </Section>

      <Section delay={0.3}>
        <div className="prose prose-neutral dark:prose-invert text-sm border-t border-muted pt-8">
          <p>
            Curious about the web side? Explore the <Link href="/projects" className="text-primary hover:underline font-medium">Full Projects Index</Link>.
          </p>
        </div>
      </Section>
    </div>
  )
}