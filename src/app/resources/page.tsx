'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Library, Link, Globe, Layers, ArrowUpRight } from 'lucide-react'

interface ResourceCard {
  title: string
  description: string
  url: string
  category: 'Icons' | 'API' | 'Hosting'
  icon: any
}

const resourcesList: ResourceCard[] = [
  {
    title: 'Lucide Icons Library',
    description: 'Beautiful, consistent icon toolkit for developers, containing thousands of vector SVG exports.',
    url: 'https://lucide.dev',
    category: 'Icons',
    icon: Library,
  },
  {
    title: 'JSONPlaceholder API',
    description: 'Free, fake online REST API for testing and prototyping JSON query retrievals.',
    url: 'https://jsonplaceholder.typicode.com',
    category: 'API',
    icon: Globe,
  },
  {
    title: 'Vercel Deployment Hub',
    description: 'Hosting platform for static files and frontend frameworks, optimized for Next.js and React.',
    url: 'https://vercel.com',
    category: 'Hosting',
    icon: Layers,
  },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold">
            <Library className="h-3.5 w-3.5" />
            <span>Curated Directories</span>
          </div>
          <GradientHeading as="h1">Resource Library</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Curated listings of high-quality, free, and open-source assets, icons, fonts, API endpoints, and hosting platforms to accelerate development.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourcesList.map((res) => {
            const Icon = res.icon
            return (
              <Card key={res.title} className="flex flex-col justify-between group h-full" hoverEffect>
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                      {res.category}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5 justify-between">
                      {res.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {res.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <a href={res.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="sm" className="w-full text-xs">
                      <span>Explore Asset</span>
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
