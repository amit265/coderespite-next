'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import {
  Code,
  ShieldAlert,
  Fingerprint,
  Key,
  QrCode,
  Binary,
  Globe,
  Clock,
  FileCode,
  Paintbrush,
  Palette,
  AlignLeft,
  Columns,
  Image,
  Layers,
  Calendar,
  ArrowRight,
  Sparkles,
  Terminal,
  FileText,
  Eye,
} from 'lucide-react'

interface ToolCard {
  title: string
  description: string
  href: string
  icon: any
  status: 'Ready' | 'Coming Soon' | 'Beta'
  color: string
}

const toolsList: ToolCard[] = [
  {
    title: 'JSON Formatter & Validator',
    description: 'Format, validate, beautify, and minify raw JSON data with real-time exception indicators.',
    href: '/tools/json-formatter',
    icon: Code,
    status: 'Ready',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  {
    title: 'JWT Decoder',
    description: 'Inspect JWT headers, payloads, and signatures. Converts epoch timestamps to local times instantly.',
    href: '/tools/jwt-decoder',
    icon: ShieldAlert,
    status: 'Ready',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'UUID Generator',
    description: 'Create cryptographically secure bulk RFC4122 v4 UUID strings on the fly.',
    href: '/tools/uuid-generator',
    icon: Fingerprint,
    status: 'Ready',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Password Generator',
    description: 'Generate high-entropy customizable passwords with variable symbol constraints.',
    href: '/tools/password-generator',
    icon: Key,
    status: 'Ready',
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    title: 'QR Code Generator',
    description: 'Convert URLs, text, or configs into clean, custom-colored SVG/PNG QR codes.',
    href: '/tools/qr-generator',
    icon: QrCode,
    status: 'Ready',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Base64 Encoder/Decoder',
    description: 'Fast UTF-8 safe encoding and decoding of raw string values and file payloads.',
    href: '/tools/base64',
    icon: Binary,
    status: 'Ready',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
  {
    title: 'URL Encoder & Decoder',
    description: 'Strict query string URL-parameter safety escaping and parsing tool.',
    href: '/tools/url-encoder-decoder',
    icon: Globe,
    status: 'Ready',
    color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    title: 'Unix Timestamp Converter',
    description: 'Format Unix seconds and milliseconds into human timezone representations.',
    href: '/tools/timestamp',
    icon: Clock,
    status: 'Ready',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
  {
    title: 'Diff Checker',
    description: 'Side-by-side or line-by-line file differences comparison console.',
    href: '/tools/diff-checker',
    icon: Columns,
    status: 'Ready',
    color: 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20',
  },
  {
    title: 'Cron Expression Generator',
    description: 'Translate crontab schedules into human-readable English timings.',
    href: '/tools/cron-generator',
    icon: Terminal,
    status: 'Ready',
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    title: 'Color Picker & Converter',
    description: 'Pick visual colors and translate them to HEX, RGB, and HSL formatting codes.',
    href: '/tools/color-picker',
    icon: Paintbrush,
    status: 'Ready',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Markdown Preview',
    description: 'Compile and render raw markdown code blocks into rich HTML previews.',
    href: '/tools/markdown-preview',
    icon: FileText,
    status: 'Ready',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  {
    title: 'Cryptographic Hash Generator',
    description: 'Calculate secure SHA-1, SHA-256, and MD5 message digests client-side.',
    href: '/tools/hash-generator',
    icon: Key,
    status: 'Ready',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
  {
    title: 'Regex Tester & Validator',
    description: 'Validate regular expression patterns against test strings with live highlights.',
    href: '/tools/regex-tester',
    icon: Code,
    status: 'Ready',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'SQL Formatter & Beautifier',
    description: 'Format, uppercase, and beautify unaligned SQL queries locally.',
    href: '/tools/sql-formatter',
    icon: FileCode,
    status: 'Ready',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'CSS Gradient Generator',
    description: 'Create linear gradients and export copy-ready cross-browser CSS styles.',
    href: '/tools/gradient-generator',
    icon: Paintbrush,
    status: 'Ready',
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  },
  {
    title: 'HTML & CSS Previewer',
    description: 'Render raw HTML templates and CSS style sheets within a live preview.',
    href: '/tools/html-preview',
    icon: Eye,
    status: 'Ready',
    color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    title: 'YAML Formatter',
    description: 'Beautify, clean, and fix indentations of unformatted YAML properties.',
    href: '/tools/yaml-formatter',
    icon: FileCode,
    status: 'Ready',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'XML Formatter',
    description: 'Beautify, indent, and format nested XML markup tags structure.',
    href: '/tools/xml-formatter',
    icon: FileCode,
    status: 'Ready',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
  {
    title: 'CSV Table Formatter',
    description: 'Convert comma-separated values (CSV) into clean, readable responsive preview tables.',
    href: '/tools/csv-formatter',
    icon: AlignLeft,
    status: 'Ready',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  {
    title: 'Meta Tag Generator',
    description: 'Generate clean HTML and Open Graph (OG) meta tags to optimize SEO.',
    href: '/tools/meta-tag-generator',
    icon: Fingerprint,
    status: 'Ready',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
  {
    title: 'robots.txt Generator',
    description: 'Configure search crawler access configurations and generate standard robots.txt directives.',
    href: '/tools/robots-txt-generator',
    icon: FileCode,
    status: 'Ready',
    color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
  },
  {
    title: 'SEO Schema Generator',
    description: 'Build schema.org structured JSON-LD data modules to improve site indexing.',
    href: '/tools/schema-generator',
    icon: FileCode,
    status: 'Ready',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'sitemap.xml Generator',
    description: 'Convert a list of URLs into a search-engine-readable XML sitemap index.',
    href: '/tools/sitemap-generator',
    icon: FileCode,
    status: 'Ready',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Client Image Compressor',
    description: 'Scale and compress PNG/JPG files locally within your browser using Canvas.',
    href: '/tools/image-compressor',
    icon: Image,
    status: 'Ready',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'SVG Code Optimizer',
    description: 'Minify SVG file components by cleaning comments, XML schemas, and double spacings.',
    href: '/tools/svg-optimizer',
    icon: FileCode,
    status: 'Ready',
    color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  },
]

export default function ToolsHubPage() {
  return (
    <div className="space-y-12">
      {/* Header section */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <GradientHeading as="h1">Developer Utilities</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Fast, zero-latency, and client-centric tools built to save you time. All computations run inside your browser context — meaning your tokens, JSON payloads, and passwords never touch a remote server.
          </p>
        </div>
      </Section>

      {/* Grid List */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsList.map((tool) => {
            const Icon = tool.icon
            const isReady = tool.status === 'Ready'
            return (
              <Card
                key={tool.title}
                className={`flex flex-col justify-between group h-full ${
                  !isReady && 'opacity-60 hover:border-border/40'
                }`}
                hoverEffect={isReady}
              >
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg border ${tool.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        tool.status === 'Ready'
                          ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                          : 'bg-muted text-muted-foreground border border-border/40'
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground/80">
                      {tool.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {isReady ? (
                    <Link href={tool.href}>
                      <Button variant="secondary" size="sm" className="w-full">
                        <span>Launch Tool</span>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" size="sm" className="w-full cursor-not-allowed" disabled>
                      <span>Under Construction</span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
