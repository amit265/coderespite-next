'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Settings, Check, Copy, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const VSCODE_SETTINGS = `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/.next": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true
}
`

export default function VsCodeSettingsPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(VSCODE_SETTINGS)
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
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Boilerplates: Editors</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">VS Code Settings Blueprint</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Copy-ready settings configuration for VS Code enforcing ESLint auto-formatting, Prettier rules, and directory exclusions.
          </p>
        </div>
      </Section>

      {/* Preview */}
      <Section delay={0.1}>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
            <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
              <Settings className="h-3.5 w-3.5 text-violet-500" />
              .vscode/settings.json
            </span>
            <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5" onClick={handleCopy}>
              {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
              {copied ? 'Copied' : 'Copy Template'}
            </Button>
          </CardHeader>
          <CardContent className="p-4 bg-black/10">
            <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px]">
              <code>{VSCODE_SETTINGS}</code>
            </pre>
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
