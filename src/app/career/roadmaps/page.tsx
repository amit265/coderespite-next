'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Milestone, ChevronRight, Compass } from 'lucide-react'
import Link from 'next/link'

export default function RoadmapsPage() {
  return (
    <div className="space-y-12">
      {/* Back button */}
      <Section delay={0.02}>
        <Link href="/career" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 rotate-180" />
          Back to Career Center
        </Link>
      </Section>

      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold">
            <Milestone className="h-3.5 w-3.5" />
            <span>Developer Curriculum</span>
          </div>
          <GradientHeading as="h1">Engineering Roadmaps</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Detailed technology mapping logs and progression steps to guide full-stack and systems engineering career tracks.
          </p>
        </div>
      </Section>

      {/* Roadmaps Split Grid */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend Track */}
          <Card className="flex flex-col p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">1. Senior Frontend Roadmap</h3>
              <p className="text-xs text-muted-foreground">Focus: UI architectures, client scaling, Core Web Vitals optimization.</p>
            </div>
            
            <div className="space-y-4 border-l border-border pl-4 relative">
              <div className="relative space-y-1">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-violet-500" />
                <h4 className="text-sm font-semibold text-foreground">Stage A: Core Mastery</h4>
                <p className="text-xs text-muted-foreground">Master JS scoping execution loops, CSS rendering pipelines, semantic HTML markup nodes.</p>
              </div>

              <div className="relative space-y-1">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-violet-500" />
                <h4 className="text-sm font-semibold text-foreground">Stage B: Framework Scalability</h4>
                <p className="text-xs text-muted-foreground">React state management mechanisms, SSR architectures, Next.js incremental static regeneration.</p>
              </div>

              <div className="relative space-y-1">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-violet-500" />
                <h4 className="text-sm font-semibold text-foreground">Stage C: Performance Auditing</h4>
                <p className="text-xs text-muted-foreground">Optimize Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), code-splitting bundles.</p>
              </div>
            </div>
          </Card>

          {/* Backend Track */}
          <Card className="flex flex-col p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">2. Distributed Systems Roadmap</h3>
              <p className="text-xs text-muted-foreground">Focus: Database scaling, async messaging protocols, cache topologies.</p>
            </div>

            <div className="space-y-4 border-l border-border pl-4 relative">
              <div className="relative space-y-1">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                <h4 className="text-sm font-semibold text-foreground">Stage A: Interface Protocols</h4>
                <p className="text-xs text-muted-foreground">REST resource models, GraphQL mutations, gRPC HTTP/2 server-to-server calls.</p>
              </div>

              <div className="relative space-y-1">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                <h4 className="text-sm font-semibold text-foreground">Stage B: Persistence Scalability</h4>
                <p className="text-xs text-muted-foreground">Postgres database connection pools, table partitions, sharding keys, indexing structures.</p>
              </div>

              <div className="relative space-y-1">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                <h4 className="text-sm font-semibold text-foreground">Stage C: Message Brokers</h4>
                <p className="text-xs text-muted-foreground">Kafka event streams, Redis memory queues, RabbitMQ routing rules, async task loops.</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}
