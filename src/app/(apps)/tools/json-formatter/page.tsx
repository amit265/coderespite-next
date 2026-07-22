'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Play, Copy, Check, Trash2, FileText, Code, Columns, AlertTriangle } from 'lucide-react'

const sampleJSON = {
  name: "CodeRespite Platform",
  version: "1.0.0",
  active: true,
  theme: "Obsidian Dark",
  meta: {
    pillars: ["AI Workspace", "Developer Utilities", "Learning Hub", "Debug Hub"],
    stats: {
      tools: 18,
      courses: 12,
      latencyMs: 0
    }
  },
  author: {
    name: "Amit",
    role: "Fullstack Architect",
    links: {
      github: "https://github.com/amit265",
      twitter: "https://x.com/amit_265"
    }
  }
}

export default function JSONFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleFormat = (indent = 2) => {
    setError(null)
    if (!input.trim()) {
      setOutput('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format')
      setOutput('')
    }
  }

  const handleMinify = () => {
    setError(null)
    if (!input.trim()) {
      setOutput('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format')
      setOutput('')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(null)
  }

  const handleLoadSample = () => {
    setInput(JSON.stringify(sampleJSON, null, 2))
    setError(null)
    setOutput('')
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">JSON Formatter & Validator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Validate, pretty-print, and format JSON inputs dynamically. Powered fully inside your local browser runtime.
          </p>
        </div>
      </Section>

      {/* Editor Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Input Panel */}
          <Card className="flex flex-col h-[520px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-3 bg-secondary/15">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Code className="h-3.5 w-3.5 text-violet-500" />
                INPUT_JSON
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={handleLoadSample}>
                  <FileText className="mr-1 h-3.5 w-3.5" />
                  Sample
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-destructive hover:bg-destructive/10" onClick={handleClear}>
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative overflow-hidden">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste raw, unformatted, or minified JSON text here..."
                className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                spellCheck="false"
              />
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="flex flex-col h-[520px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-3 bg-secondary/15">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Columns className="h-3.5 w-3.5 text-blue-500" />
                FORMATTED_OUTPUT
              </span>
              {output && (
                <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5" onClick={handleCopy}>
                  {copySuccess ? (
                    <>
                      <Check className="mr-1 h-3.5 w-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 p-0 relative overflow-hidden bg-black/10">
              {error && (
                <div className="absolute inset-x-4 top-4 p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-mono flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">JSON Validation Mismatch:</p>
                    <p className="leading-relaxed opacity-90">{error}</p>
                  </div>
                </div>
              )}
              <textarea
                readOnly
                value={output}
                placeholder="Formatted output will display here..."
                className={`w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none leading-relaxed ${error ? 'pt-24 text-rose-400/60' : 'text-emerald-400'
                  }`}
                spellCheck="false"
              />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Control Console */}
      <Section delay={0.15}>
        <Card className="border-border/40 bg-secondary/10">
          <CardContent className="py-4 px-6 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              Select formatting options to process data locally.
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleFormat(2)} className="h-9 px-4 text-xs font-semibold">
                <Play className="mr-1.5 h-3.5 w-3.5" />
                Format (2 Spaces)
              </Button>
              <Button onClick={() => handleFormat(4)} className="h-9 px-4 text-xs font-semibold">
                <Play className="mr-1.5 h-3.5 w-3.5" />
                Format (4 Spaces)
              </Button>
              <Button variant="outline" onClick={handleMinify} className="h-9 px-4 text-xs font-semibold">
                <Code className="mr-1.5 h-3.5 w-3.5" />
                Minify
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
