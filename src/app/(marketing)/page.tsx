'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import {
  Sparkles,
  Wrench,
  BookOpen,
  Bug,
  ArrowRight,
  Terminal,
  Cpu,
  Zap,
  Search,
} from 'lucide-react'

export default function HomePage() {
  const hubs = [
    {
      title: 'AI Workspace',
      description: 'Supercharge your development cycle with custom AI-powered code generators, explainers, reviewers, and career accelerators.',
      href: '/ai',
      icon: Sparkles,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
      tag: 'AI Tools',
      stats: '15+ Assistants',
    },
    {
      title: 'Developer Utilities',
      description: 'Lightning-fast, offline-capable client tools you repeatedly need. Format JSONs, decode JWTs, build regex, and run diff checks.',
      href: '/tools',
      icon: Wrench,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      tag: 'Utilities',
      stats: '18+ Formats',
    },
    {
      title: 'Learning Hub',
      description: 'Evergreen, comprehensive guides focused on developer mental models and deep tech (React, Next.js, System Design).',
      href: '/learn',
      icon: BookOpen,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      tag: 'Guides',
      stats: '50+ Articles',
    },
    {
      title: 'Debug Hub',
      description: 'Stop guessing stack traces. Instant, standardized root causes and quick fixes for common framework errors (CORS, Hydration, NPM).',
      href: '/debug',
      icon: Bug,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      tag: 'Troubleshoot',
      stats: '100+ Errors',
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Section delay={0.05}>
        <div className="text-center space-y-6 max-w-3xl mx-auto py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold tracking-wide animate-pulse">
            <Sparkles className="h-3 w-3" />
            <span>Developer Ecosystem v1.0</span>
          </div>

          <GradientHeading as="h1" className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            Learn. Build. Debug.
          </GradientHeading>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            The developer&apos;s ultimate cockpit. A clean, premium platform providing AI support, offline utilities, structured learning pathways, and rapid debugging manuals.
          </p>

          {/* Interactive Hero Search Trigger */}
          <div className="pt-4 max-w-xl mx-auto">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-search'))}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-card/50 hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-all duration-300 shadow-lg cursor-pointer group"
            >
              <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <span className="text-sm font-medium text-left flex-1">Search tools, guides, templates, and errors...</span>
              <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-0.5 rounded border border-border/80 bg-muted px-2 font-mono text-xs font-medium text-muted-foreground">
                <span>⌘</span>K
              </kbd>
            </button>
          </div>
        </div>
      </Section>

      {/* Core Ecosystem Pillars Grid */}
      <Section delay={0.15}>
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Core Pillars</h2>
            <p className="text-sm text-muted-foreground">Four specialized zones to optimize your day-to-day coding workflow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hubs.map((hub) => {
              const Icon = hub.icon
              return (
                <Card key={hub.title} className="flex flex-col justify-between group">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-lg border ${hub.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold uppercase tracking-wider text-muted-foreground">
                          {hub.tag}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold uppercase tracking-wider">
                          {hub.stats}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {hub.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {hub.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={hub.href} className="w-full">
                      <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                        <span>Enter Hub</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Feature Highlight / Terminal Demo Section */}
      <Section delay={0.25}>
        <Card className="border-violet-500/20 bg-gradient-to-br from-card/30 to-violet-500/5 hover:border-violet-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="p-8 space-y-6 lg:col-span-3 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                <Cpu className="h-4 w-4" />
                <span>Zero Latency Toolkit</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Designed to run fast. Real fast.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No spinners. No heavy server roundtrips for basic conversions. CodeRespite runs utilities right in your browser context. Our layouts utilize React hydration protection and system theme preference detections to maximize page speeds and SEO scores.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/tools/json-formatter">
                  <Button variant="outline" size="sm">
                    <Zap className="mr-2 h-3.5 w-3.5 text-amber-500" />
                    <span>Test JSON Formatter</span>
                  </Button>
                </Link>
                <Link href="/learn/react/state-management">
                  <Button variant="ghost" size="sm" className="hover:underline">
                    <span>Read learning paths</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Custom Interactive Mock Console */}
            <div className="p-6 bg-black/60 border-t lg:border-t-0 lg:border-l border-border/40 font-mono text-xs text-muted-foreground space-y-4 lg:col-span-2 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-border/20 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] text-muted-foreground/50">respite-shell</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-violet-500">~</span>
                  <span className="text-foreground font-semibold">coderespite init</span>
                </div>
                <div className="text-emerald-500">✔ Loading design system tokens...</div>
                <div className="text-emerald-500">✔ Formatting theme: Obsidian-Dark</div>
                <div className="text-emerald-500">✔ Mapping 8 product categories...</div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-500">~</span>
                  <span className="text-foreground animate-pulse">npm run dev_</span>
                </div>
              </div>
              <div className="border-t border-border/20 pt-3 text-[10px] text-muted-foreground/30 flex items-center justify-between">
                <span>PID: 40822</span>
                <span>Active: 100% Client</span>
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  )
}