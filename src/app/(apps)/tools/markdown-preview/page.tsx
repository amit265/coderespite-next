'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileText, Eye, Trash2, Code } from 'lucide-react'

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')

  const compileMarkdown = (raw: string) => {
    let clean = raw
      // Escape HTML entities to prevent scripts injection
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Headers
    clean = clean.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold mt-4 mb-2 text-foreground">$1</h3>')
    clean = clean.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold mt-5 mb-2 text-foreground">$1</h2>')
    clean = clean.replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold mt-6 mb-3 text-foreground">$1</h1>')

    // Bold & Italics
    clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    clean = clean.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Blockquotes
    clean = clean.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground/80 my-3">$1</blockquote>')

    // Code Blocks
    clean = clean.replace(/\\`\\`\\`([\s\S]*?)\\`\\`\\`/gm, '<pre class="p-3 bg-black/60 rounded border border-border/20 font-mono text-xs text-emerald-400 overflow-x-auto my-3 leading-relaxed">$1</pre>')
    clean = clean.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-secondary font-mono text-xs text-foreground/90">$1</code>')

    // Lists
    clean = clean.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')

    // Paragraphs (lines not containing headers/lists/pre)
    clean = clean.split('\n').map(line => {
      if (!line.trim()) return '<br/>'
      if (line.includes('<h') || line.includes('<li') || line.includes('<block') || line.includes('<pre') || line.includes('<br')) {
        return line
      }
      return `<p class="my-2 leading-relaxed">${line}</p>`
    }).join('\n')

    setHtml(clean)
  }

  useEffect(() => {
    compileMarkdown(markdown)
  }, [markdown])

  const handleClear = () => {
    setMarkdown('')
  }

  const handleLoadSample = () => {
    setMarkdown(`# 🚀 Markdown Preview\n\nThis is a client-side **zero-dependency** markdown compiler.\n\n## Features\n- Instantly renders inputs.\n- Supports **bold** and *italic* formatting.\n- Code formatting: \`const test = 10;\`.\n\n> "Simplify, then add lightness." - Colin Chapman`)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Markdown Preview</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Render raw markdown syntax into visual rich-text HTML preview containers in under 1ms.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Editor Panel */}
          <Card className="flex flex-col h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Code className="h-3.5 w-3.5 text-violet-500" />
                MARKDOWN_INPUT
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2" onClick={handleLoadSample}>
                  Sample
                </Button>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-destructive hover:bg-destructive/10" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Paste markdown content here..."
                className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                spellCheck="false"
              />
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="flex flex-col h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Eye className="h-3.5 w-3.5 text-blue-500" />
                RICH_HTML_PREVIEW
              </span>
            </CardHeader>
            <CardContent className="flex-1 p-5 overflow-y-auto bg-black/10 text-xs sm:text-sm font-sans prose prose-neutral dark:prose-invert leading-relaxed max-w-none">
              {markdown.trim() ? (
                <div
                  dangerouslySetInnerHTML={{ __html: html }}
                  className="space-y-2.5 text-muted-foreground"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                  <FileText className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                  <p className="text-sm font-semibold text-foreground/85">Awaiting Markdown Payload</p>
                  <p className="text-xs max-w-xs">
                    Write formatting tags on the left side to preview visual results.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}
