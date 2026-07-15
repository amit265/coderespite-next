import { getTopicInfo, KNOWLEDGE_GRAPH } from '@/lib/graph'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import Link from 'next/link'
import { ArrowRight, Box, Play, FileCode, CheckSquare, Layers } from 'lucide-react'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return Object.keys(KNOWLEDGE_GRAPH).map((slug) => ({
    slug,
  }))
}

export default async function TopicHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = getTopicInfo(slug)

  if (!topic) {
    notFound()
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Box className="h-3.5 w-3.5" />
            <span>Topic Cluster Hub</span>
          </div>
          <GradientHeading as="h1">{topic.name} Ecosystem</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {topic.description} Access all corresponding tools, tutorials, guides, templates, and AI assistants.
          </p>
        </div>
      </Section>

      {/* Grid of related items */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topic.resources.map((res, idx) => {
            let Icon = FileCode
            if (res.type === 'Tool') Icon = CheckSquare
            if (res.type === 'Assistant') Icon = Play
            if (res.type === 'Template') Icon = Layers

            return (
              <Card key={idx} className="flex flex-col justify-between group h-full hover:border-violet-500/20" hoverEffect>
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                      {res.type}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {res.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={res.href}>
                    <Button variant="secondary" size="sm" className="w-full">
                      <span>Launch Resource</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
