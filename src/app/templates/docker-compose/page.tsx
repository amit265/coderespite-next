'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileCode, Check, Copy, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const DOCKER_CONTENT = `version: '3.8'

services:
  # Node.js Application server
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://db_user:db_pass@postgres:5432/db_name
      - REDIS_URL=redis://redis:6379
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      - postgres
      - redis

  # PostgreSQL Database container
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=db_user
      - POSTGRES_PASSWORD=db_pass
      - POSTGRES_DB=db_name
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  # Redis Cache container
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
`

export default function DockerComposeTemplatePage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DOCKER_CONTENT)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Section delay={0.02}>
        <Link href="/templates" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to Templates
        </Link>
      </Section>

      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Boilerplates: Containerization</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Docker Compose Node Stack</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Copy-ready local developer Docker Compose configuration linking Web App, Postgres DB, and Redis Cache containers.
          </p>
        </div>
      </Section>

      {/* Preview */}
      <Section delay={0.1}>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
            <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
              <FileCode className="h-3.5 w-3.5 text-violet-500" />
              docker-compose.yml
            </span>
            <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5" onClick={handleCopy}>
              {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
              {copied ? 'Copied' : 'Copy Template'}
            </Button>
          </CardHeader>
          <CardContent className="p-4 bg-black/10">
            <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px]">
              <code>{DOCKER_CONTENT}</code>
            </pre>
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
