import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { ArrowRight, FolderHeart, Sparkles, Layers, Terminal, ChevronLeft } from 'lucide-react'

interface CollectionItem {
  title: string
  description: string
  href: string
  type: 'Tool' | 'Assistant' | 'Template'
}

interface CollectionData {
  title: string
  description: string
  icon: any
  color: string
  items: CollectionItem[]
}

const COLLECTIONS_MAP: Record<string, CollectionData> = {
  'frontend-toolkit': {
    title: 'Frontend Developer Toolkit',
    description: 'A curated selection of utilities and helpers optimized for modern component-driven styling and state management integrations.',
    icon: Layers,
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    items: [
      { title: 'JSON Formatter & Validator', description: 'Beautify and validate raw JSON values locally.', href: '/tools/json-formatter', type: 'Tool' },
      { title: 'Color Picker & Converter', description: 'Pick colors and generate HEX/RGB/HSL codes.', href: '/tools/color-picker', type: 'Tool' },
      { title: 'Markdown Preview', description: 'Preview formatted markdown with live local compilation.', href: '/tools/markdown-preview', type: 'Tool' },
      { title: 'React component Starter', description: 'Starter TypeScript React component boilerplate.', href: '/templates/react-starter', type: 'Template' },
      { title: 'Conversational Regex Builder', description: 'Translate English constraints into regex syntax.', href: '/ai/regex-generator', type: 'Assistant' },
    ]
  },
  'backend-toolkit': {
    title: 'Backend Systems & Database Pack',
    description: 'Essential compilation setups, database pipelines builders, and connection stacks to scale server architectures.',
    icon: Terminal,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    items: [
      { title: 'JWT Claims Decoder', description: 'Inspect token scopes, signatures, and timestamps.', href: '/tools/jwt-decoder', type: 'Tool' },
      { title: 'SQL Formatter & Beautifier', description: 'Uppercase and align unformatted query logs.', href: '/tools/sql-formatter', type: 'Tool' },
      { title: 'Cron Expression Generator', description: 'Understand crontab scheduler expression timings.', href: '/tools/cron-generator', type: 'Tool' },
      { title: 'Docker Compose Node-Postgres Boilerplate', description: 'Pre-linked container stack config.', href: '/templates/docker-compose', type: 'Template' },
    ]
  },
  'ai-toolkit': {
    title: 'AI Engineering Toolkit',
    description: 'Deploy next-generation assistants ranging from mock conversation engines to documentation blueprints builders.',
    icon: Sparkles,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    items: [
      { title: 'Unit Test Suite Generator', description: 'Produce Jest and PyTest template scripts.', href: '/ai/unit-test', type: 'Assistant' },
      { title: 'API Document Builder', description: 'Compile Swagger or Markdown APIs from handlers.', href: '/ai/api-docs', type: 'Assistant' },
      { title: 'SQL & Database Query Builder', description: 'Transcribe prompts into DB operations.', href: '/ai/sql-generator', type: 'Assistant' },
      { title: 'Commit message writer', description: 'Write Conventional Commits from git diffs.', href: '/ai/commit-msg', type: 'Assistant' },
    ]
  }
}

export function generateStaticParams() {
  return Object.keys(COLLECTIONS_MAP).map((slug) => ({
    slug,
  }))
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = COLLECTIONS_MAP[slug]

  if (!collection) {
    notFound()
  }

  const Icon = collection.icon

  return (
    <div className="space-y-12">
      {/* Back button */}
      <Section delay={0.02}>
        <Link href="/collections" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to Collections
        </Link>
      </Section>

      {/* Header */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${collection.color} text-xs font-semibold uppercase tracking-wider font-mono`}>
            <Icon className="h-3.5 w-3.5" />
            <span>Curated Collection Toolkit</span>
          </div>
          <GradientHeading as="h1">{collection.title}</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {collection.description} Launch individual tools below directly.
          </p>
        </div>
      </Section>

      {/* Grid of collection items */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collection.items.map((item, idx) => (
            <Card key={idx} className="flex flex-col justify-between group h-full hover:border-violet-500/20" hoverEffect>
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                    {item.type}
                  </span>
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={item.href}>
                  <Button variant="secondary" size="sm" className="w-full">
                    <span>Launch Resource</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
