import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { BookOpen, Calendar, ArrowRight, Tag, Milestone } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Hub',
  description: 'Structured, deep-dive guides to master frontend ecosystems, system designs, and computer science concepts.',
}

export default async function LearnHubPage() {
  const articles = await getAllFilesFrontMatter('learn')

  return (
    <div className="space-y-12">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Developer Curriculum</span>
          </div>
          <GradientHeading as="h1">Learning Hub</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Evergreen documentation and structured learning paths built around deep technical concepts. We focus on teaching underlying patterns, mental models, and engineering trade-offs instead of superficial syntax lookups.
          </p>
        </div>
      </Section>

      {/* Structured Tracks */}
      <Section delay={0.12}>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Milestone className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">Active Learning Tracks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-emerald-500/10 bg-emerald-500/[0.02]">
              <CardHeader className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Track 01</span>
                <CardTitle className="text-lg font-bold">Advanced React & Component Arch</CardTitle>
                <CardDescription className="text-xs">
                  Master reconciliation, fiber internals, custom hooks state pipelines, and concurrent features.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Link href="/learn/react/state-management">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    <span>Explore Track</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/10 bg-emerald-500/[0.02]">
              <CardHeader className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Track 02</span>
                <CardTitle className="text-lg font-bold">Distributed System Design</CardTitle>
                <CardDescription className="text-xs">
                  Learn load balancing, partition strategies, consensus mechanisms (Raft, Paxos), and local caching topologies.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Link href="/learn/systems/scaling">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    <span>Explore Track</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* All Articles List */}
      <Section delay={0.2}>
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">All Guide Reference Documents</h2>
          
          <div className="flex flex-col gap-4">
            {articles.length > 0 ? (
              articles.map((article: any) => (
                <Card key={article.slug} className="group hover:border-emerald-500/20">
                  <Link href={`/learn/${article.slug}`}>
                    <CardHeader className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider">
                            {article.category || 'Guide'}
                          </span>
                          {article.difficulty && (
                            <span className="text-[9px] px-2 py-0.5 rounded bg-secondary text-muted-foreground font-semibold">
                              {article.difficulty}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 self-end md:self-center font-mono">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 border border-dashed border-border/60 rounded-xl text-muted-foreground">
                No guides written yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
