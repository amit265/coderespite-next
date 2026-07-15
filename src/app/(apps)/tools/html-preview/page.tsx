'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Play, Code, Eye, RefreshCw, Trash2 } from 'lucide-react'

export default function HTMLPreviewPage() {
  const [html, setHtml] = useState('<div class="box">\n  <h1>Live HTML Preview</h1>\n  <p>Render markup elements instantly.</p>\n</div>')
  const [css, setCss] = useState('.box {\n  padding: 24px;\n  background: #f4f4f5;\n  border-radius: 8px;\n  font-family: sans-serif;\n  color: #18181b;\n}')
  const [iframeSrc, setIframeSrc] = useState('')

  const handleRun = () => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `
    const blob = new Blob([combined], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    setIframeSrc(url)
  }

  useEffect(() => {
    handleRun()
    return () => {
      if (iframeSrc) URL.revokeObjectURL(iframeSrc)
    }
  }, [])

  const handleClear = () => {
    setHtml('')
    setCss('')
    setIframeSrc('')
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">HTML & CSS Previewer</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Render raw HTML templates and custom CSS style sheets within a live sandboxed iframe preview block.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Editors */}
          <div className="space-y-4 flex flex-col justify-stretch">
            {/* HTML Editor */}
            <Card className="flex flex-col h-[200px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Code className="h-3.5 w-3.5 text-violet-500" />
                  HTML_EDITOR
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-destructive hover:bg-destructive/10" onClick={handleClear}>
                    Clear
                  </Button>
                  <Button variant="primary" size="sm" className="h-6 text-[10px] px-2" onClick={handleRun}>
                    <Play className="h-3 w-3 mr-1" />
                    Run
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            {/* CSS Editor */}
            <Card className="flex flex-col h-[200px]">
              <CardHeader className="py-2 border-b border-border/40 bg-secondary/15 flex flex-row items-center justify-between">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Code className="h-3.5 w-3.5 text-blue-500" />
                  CSS_EDITOR
                </span>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>
          </div>

          {/* Render Frame */}
          <Card className="flex flex-col h-[416px]">
            <CardHeader className="py-2 border-b border-border/40 bg-secondary/15 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Eye className="h-3.5 w-3.5 text-emerald-500" />
                SANDBOXED_IFRAME_OUTPUT
              </span>
            </CardHeader>
            <CardContent className="flex-1 p-0 bg-white dark:bg-zinc-950">
              {iframeSrc ? (
                <iframe
                  src={iframeSrc}
                  className="w-full h-full border-0 bg-white"
                  title="HTML/CSS Editor Sandbox"
                  sandbox="allow-scripts"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                  <Play className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                  <p className="text-sm font-semibold text-foreground/85">Pending Sandbox Execution</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}
