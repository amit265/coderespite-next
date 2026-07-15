'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Layout, FileCode, Layers, ArrowRight, Settings, User, Globe, FileText } from 'lucide-react'

interface TemplateCard {
  title: string
  description: string
  href: string
  category: 'Documentation' | 'Docker' | 'Starters'
  icon: any
}

const templates: TemplateCard[] = [
  {
    title: 'Standard README Blueprint',
    description: 'Copy-ready professional Markdown README containing status badges, quick starts, and license details.',
    href: '/templates/readme-template',
    category: 'Documentation',
    icon: FileCode,
  },
  {
    title: 'Docker Compose Node-Postgres Stack',
    description: 'Local development environment stack configuring Node backend, Postgres database, and Redis cache.',
    href: '/templates/docker-compose',
    category: 'Docker',
    icon: Layers,
  },
  {
    title: 'React Component Starter',
    description: 'Unified React TypeScript functional starter component implementing lifecycle data hooks.',
    href: '/templates/react-starter',
    category: 'Starters',
    icon: FileCode,
  },
  {
    title: 'VS Code Settings Configuration',
    description: 'Uniform settings configuring format-on-save actions, Prettier targets, and exclusion variables.',
    href: '/templates/vscode-settings',
    category: 'Starters',
    icon: Settings,
  },
  {
    title: 'GitHub Profile README Builder',
    description: 'Generate clean, modern markdown profile README blocks with icons and stack indicators.',
    href: '/templates/github-profile',
    category: 'Documentation',
    icon: User,
  },
  {
    title: 'Portfolio Layout Configuration',
    description: 'Generate JSON configurations to customize layouts of static site portfolio builders.',
    href: '/templates/portfolio',
    category: 'Starters',
    icon: Globe,
  },
  {
    title: 'API Endpoint Documentation Schema',
    description: 'Draft REST API path parameters, request headers, and response layouts in markdown.',
    href: '/templates/api-docs',
    category: 'Documentation',
    icon: FileText,
  },
]

export default function TemplatesHubPage() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold">
            <Layout className="h-3.5 w-3.5" />
            <span>Developer Boilerplates</span>
          </div>
          <GradientHeading as="h1">Templates & Boilerplates</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Production-ready configuration schemas, markdown boilerplates, and container stacks you repeatedly have to write from scratch.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tpl) => {
            const Icon = tpl.icon
            return (
              <Card key={tpl.title} className="flex flex-col justify-between group h-full" hoverEffect>
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                      {tpl.category}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {tpl.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {tpl.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={tpl.href}>
                    <Button variant="secondary" size="sm" className="w-full">
                      <span>View Template</span>
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
