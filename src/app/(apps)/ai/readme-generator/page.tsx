'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileCode, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function READMEGeneratorPage() {
  const [params, setParams] = useState({
    title: 'CodeRespite App',
    description: 'A premium developer operating system providing low-latency browser tools.',
    install: 'npm install',
    run: 'npm run dev',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const readme = `# 🚀 ${params.title}

${params.description}

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Static Checklist](https://img.shields.io/badge/Static-100%25-brightgreen)]()

---

## 🛠️ Installation

Restore required package dependencies to execute the app locally:

\`\`\`bash
${params.install}
\`\`\`

---

## ⚡ Quick Start

Start the application compilation server inside local development mode:

\`\`\`bash
${params.run}
\`\`\`

---

## 🛡️ License

This codebase is licensed under the MIT License - see the details page for details.
`
      setResult(readme)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setParams({ title: '', description: '', install: '', run: '' })
    setResult(null)
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) { }
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 1: AI Workspace</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">README Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Generate detailed, pre-formatted standard project README files from basic descriptive variables.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input side */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-violet-500" />
                  README Variables
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3.5 text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Project Title</label>
                  <input
                    type="text"
                    value={params.title}
                    onChange={(e) => setParams({ ...params, title: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Description</label>
                  <textarea
                    value={params.description}
                    onChange={(e) => setParams({ ...params, description: e.target.value })}
                    className="w-full h-16 p-2 rounded border border-border bg-card font-mono text-xs outline-none resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Install Command</label>
                  <input
                    type="text"
                    value={params.install}
                    onChange={(e) => setParams({ ...params, install: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Run Command</label>
                  <input
                    type="text"
                    value={params.run}
                    onChange={(e) => setParams({ ...params, run: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Files...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate README Markdown
                </>
              )}
            </Button>
          </div>

          {/* Output side */}
          <div className="lg:col-span-7">
            {result ? (
              <Card className="border-border/40 bg-card/60">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    <FileCode className="h-3.5 w-3.5 text-emerald-500" />
                    README_MARKDOWN_OUTPUT
                  </span>
                  <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2.5" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </CardHeader>
                <CardContent className="p-4 bg-black/10">
                  <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[380px]">
                    <code>{result}</code>
                  </pre>
                </CardContent>
              </Card>
            ) : (
              <div className="border border-dashed border-border/60 rounded-xl h-[340px] flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 p-6">
                <FileCode className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Inputs</p>
                <p className="text-xs max-w-sm">
                  Complete README configuration variables on the left to write documents.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
