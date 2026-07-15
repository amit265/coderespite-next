import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Bug, Calendar, ArrowRight, AlertOctagon, Terminal } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Debug Hub',
  description: 'Find root causes, symptoms, and instant copy-ready code fixes for common developer compilation and runtime errors.',
}

export default async function DebugHubPage() {
  const errors = await getAllFilesFrontMatter('debug')

  return (
    <div className="space-y-12">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-semibold">
            <Bug className="h-3.5 w-3.5" />
            <span>Troubleshooting Engine</span>
          </div>
          <GradientHeading as="h1">Debug Hub</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Stop scrolling through forums for vague replies. Debug Hub maps common compilation errors, hydration mismatches, and configuration bugs directly to their root causes and verified prevention plans.
          </p>
        </div>
      </Section>

      {/* Checklist Overview Categories */}
      <Section delay={0.12}>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-rose-500 animate-pulse" />
            <h2 className="text-xl font-bold tracking-tight">Common Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-rose-500/10 bg-rose-500/[0.01]">
              <CardHeader className="space-y-1.5 p-5">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest font-mono">Next.js & SSR</span>
                <CardTitle className="text-base font-bold">Hydration Mismatches</CardTitle>
                <CardDescription className="text-xs">
                  Troubleshoot HTML structure discrepancies and client timezone date differences.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Link href="/debug/react/hydration-error">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <span>Explore (1 Fix)</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-rose-500/10 bg-rose-500/[0.01]">
              <CardHeader className="space-y-1.5 p-5">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest font-mono">Security</span>
                <CardTitle className="text-base font-bold">CORS Mismatches</CardTitle>
                <CardDescription className="text-xs">
                  Inspect domain verification blocks, HTTP headers, preflight requests, and options payloads.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Link href="/debug/web/cors-policy">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <span>Explore (1 Fix)</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-rose-500/10 bg-rose-500/[0.01]">
              <CardHeader className="space-y-1.5 p-5">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest font-mono">Package Managers</span>
                <CardTitle className="text-base font-bold">NPM Dependency Conflicts</CardTitle>
                <CardDescription className="text-xs">
                  Resolve peer dependencies collisions, legacy-peer-deps flags, and broken cache hashes.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Link href="/debug/package-managers/npm-conflicts">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <span>Explore (1 Fix)</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Errors List */}
      <Section delay={0.2}>
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Active Troubleshooting Reference Manuals</h2>

          <div className="flex flex-col gap-4">
            {errors.length > 0 ? (
              errors.map((error: any) => (
                <Card key={error.slug} className="group hover:border-rose-500/20">
                  <Link href={`/debug/${error.slug}`}>
                    <CardHeader className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-bold uppercase tracking-wider font-mono">
                            {error.category || 'Debug'}
                          </span>
                        </div>
                        <h3 className="text-base font-bold group-hover:text-primary transition-colors">
                          {error.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {error.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 self-end md:self-center font-mono">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(error.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 border border-dashed border-border/60 rounded-xl text-muted-foreground">
                No error reports filed yet. Keep hacking!
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
