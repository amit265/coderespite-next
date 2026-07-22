'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Play, Code, Eye, RefreshCw, Trash2 } from 'lucide-react'

export default function CodePlaygroundPage() {
  const [code, setCode] = useState(`<h1>Hello CodeRespite</h1>\n<p>Type HTML and JS here...</p>\n<script>\n  console.log("Playground loaded!");\n</script>`)
  const [iframeSrc, setIframeSrc] = useState('')

  const handleRun = () => {
    const blob = new Blob([code], { type: 'text/html' })
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
    setCode('')
    setIframeSrc('')
  }

  const handleLoadSample = () => {
    setCode(`<h3>Interactive Playground</h3>\n<button id="btn" style="background:#6366f1;color:#fff;border:0;padding:6px 12px;border-radius:6px;cursor:pointer;">Click Me</button>\n<p id="out" style="margin-top:10px;font-family:sans-serif;color:#a1a1aa;"></p>\n\n<script>\n  document.getElementById('btn').onclick = () => {\n    document.getElementById('out').innerText = "Hello from sandboxed JavaScript context!";\n  }\n</script>`)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 6: Interactive Learning</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Client Code Sandbox</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Execute html, css, and inline javascript blocks within a fully sandboxed preview container locally.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Editor */}
          <Card className="flex flex-col h-[420px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Code className="h-3.5 w-3.5 text-violet-500" />
                SANDBOX_SOURCE_CODE
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2" onClick={handleLoadSample}>
                  Sample
                </Button>
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
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write sandboxed html/css/js elements..."
                className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                spellCheck="false"
              />
            </CardContent>
          </Card>

          {/* Render frame */}
          <Card className="flex flex-col h-[420px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Eye className="h-3.5 w-3.5 text-blue-500" />
                SANDBOX_IFRAME_OUTPUT
              </span>
            </CardHeader>
            <CardContent className="flex-1 p-0 bg-white dark:bg-zinc-950">
              {iframeSrc ? (
                <iframe
                  src={iframeSrc}
                  className="w-full h-full border-0 bg-white"
                  title="Code Sandbox Preview"
                  sandbox="allow-scripts"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                  <Play className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                  <p className="text-sm font-semibold text-foreground/80">Pending Sandbox Execution</p>
                  <p className="text-xs max-w-sm">
                    Complete markup elements and click Run at the editor header to compile preview frames.
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
