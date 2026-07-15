'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Terminal, Play, Trash2, Check, Copy, Loader2, Sparkles } from 'lucide-react'

export default function CommitMsgPage() {
  const [diff, setDiff] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!diff.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      // Analyze diff to detect type
      const d = diff.toLowerCase()
      let type = 'feat'
      let scope = 'core'

      if (d.includes('test') || d.includes('spec')) {
        type = 'test'
        scope = 'testing'
      } else if (d.includes('bug') || d.includes('fix') || d.includes('error') || d.includes('catch')) {
        type = 'fix'
        scope = 'bug-fixes'
      } else if (d.includes('readme') || d.includes('documentation') || d.includes('.md')) {
        type = 'docs'
        scope = 'documentation'
      } else if (d.includes('refactor') || d.includes('clean') || d.includes('unused')) {
        type = 'refactor'
        scope = 'cleanup'
      } else if (d.includes('style') || d.includes('css') || d.includes('theme')) {
        type = 'style'
        scope = 'styles'
      }

      // Check for path scope indications
      const pathMatch = diff.match(/a\/src\/components\/([a-zA-Z0-9_\-]+)/)
      if (pathMatch && pathMatch[1]) {
        scope = pathMatch[1]
      } else {
        const pathAppMatch = diff.match(/a\/src\/app\/([a-zA-Z0-9_\-\(\)]+)/)
        if (pathAppMatch && pathAppMatch[1]) scope = pathAppMatch[1].replace(/[\(\)]/g, '')
      }

      const msg = `${type}(${scope}): dynamic commit summaries from parsed diffs\n\n- Analyzed changes in file tracks\n- Resolved logic updates\n- Synthesized layout metrics`

      setResult(msg)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setDiff('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setDiff(`diff --git a/src/components/ui/Button.tsx b/src/components/ui/Button.tsx\nindex a8b9c1d..d9e8f7c 100644\n--- a/src/components/ui/Button.tsx\n+++ b/src/components/ui/Button.tsx\n@@ -4,3 +4,4 @@\n-import { Slot } from '@radix-ui/react-slot'\n+import clsx from 'clsx'\n-const Comp = asChild ? Slot : 'button'\n+const Comp = 'button'`)
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 1: AI Workspace</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Commit Message Creator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Generate clean, semantic commit messages matching Conventional Commits directly from git diff inputs.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="flex flex-col h-[280px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-violet-500" />
                  GIT_DIFF_OUTPUT
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
                  value={diff}
                  onChange={(e) => setDiff(e.target.value)}
                  placeholder="Paste git diff code block here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={loading || !diff.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Messages...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate Commit Message
                </>
              )}
            </Button>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7">
            {result ? (
              <Card className="border-border/40 bg-card/60">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                    CONVENTIONAL_COMMIT_MSG
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
                <Terminal className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Diff Input</p>
                <p className="text-xs max-w-sm">
                  Provide diff file comparison trees on the left to write conventional commit messages.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
