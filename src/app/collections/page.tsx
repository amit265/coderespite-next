'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FolderHeart, Sparkles, Layers, Terminal, ArrowRight } from 'lucide-react'

interface CollectionCard {
  title: string
  description: string
  href: string
  itemsCount: number
  icon: any
  color: string
}

const collections: CollectionCard[] = [
  {
    title: 'Frontend Developer Toolkit',
    description: 'A curated selection of utilities and helpers optimized for modern component-driven styling and state management integrations.',
    href: '/collections/frontend-toolkit',
    itemsCount: 5,
    icon: Layers,
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
  {
    title: 'Backend Systems & Database Pack',
    description: 'Essential compilation setups, database pipelines builders, and connection stacks to scale server architectures.',
    href: '/collections/backend-toolkit',
    itemsCount: 4,
    icon: Terminal,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'AI Engineering Toolkit',
    description: 'Deploy next-generation assistants ranging from mock conversation engines to documentation blueprints builders.',
    href: '/collections/ai-toolkit',
    itemsCount: 4,
    icon: Sparkles,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
]

export default function CollectionsHubPage() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold">
            <FolderHeart className="h-3.5 w-3.5" />
            <span>Developer Collections</span>
          </div>
          <GradientHeading as="h1">Curated Collections</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Accelerate your engineering workflow. Launch curated toolkits grouped explicitly by technical domains (Frontend, Backend, and AI).
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => {
            const Icon = col.icon
            return (
              <Card key={col.title} className="flex flex-col justify-between group h-full hover:border-violet-500/20" hoverEffect>
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg border ${col.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                      {col.itemsCount} Resources
                    </span>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {col.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {col.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={col.href}>
                    <Button variant="secondary" size="sm" className="w-full">
                      <span>Explore Collection</span>
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
