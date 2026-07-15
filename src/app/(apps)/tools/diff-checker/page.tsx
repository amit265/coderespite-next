'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Columns, Eye, Trash2, Check, RefreshCw, AlertTriangle } from 'lucide-react'

interface DiffLine {
  type: 'unchanged' | 'added' | 'removed'
  content: string
}

export default function DiffCheckerPage() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [diffResult, setDiffResult] = useState<DiffLine[]>([])
  const [hasProcessed, setHasProcessed] = useState(false)

  const handleDiff = () => {
    const origLines = original.split('\n')
    const modLines = modified.split('\n')
    const result: DiffLine[] = []

    let i = 0
    let j = 0

    // Simplistic difference LCS/sliding comparison algorithm
    while (i < origLines.length || j < modLines.length) {
      if (i < origLines.length && j < modLines.length) {
        if (origLines[i] === modLines[j]) {
          result.push({ type: 'unchanged', content: origLines[i] })
          i++
          j++
        } else {
          // Lookahead checks to see if added or removed
          if (origLines[i + 1] === modLines[j]) {
            result.push({ type: 'removed', content: origLines[i] })
            i++
          } else if (origLines[i] === modLines[j + 1]) {
            result.push({ type: 'added', content: modLines[j] })
            j++
          } else {
            result.push({ type: 'removed', content: origLines[i] })
            result.push({ type: 'added', content: modLines[j] })
            i++
            j++
          }
        }
      } else if (i < origLines.length) {
        result.push({ type: 'removed', content: origLines[i] })
        i++
      } else if (j < modLines.length) {
        result.push({ type: 'added', content: modLines[j] })
        j++
      }
    }

    setDiffResult(result)
    setHasProcessed(true)
  }

  const handleClear = () => {
    setOriginal('')
    setModified('')
    setDiffResult([])
    setHasProcessed(false)
  }

  const handleLoadSample = () => {
    setOriginal(`function calculateDiscount(price, userType) {\n  let discount = 0;\n  if (userType === 'vip') {\n    discount = price * 0.2;\n  }\n  return price - discount;\n}`)
    setModified(`function calculateDiscount(price, userType) {\n  if (price < 0) throw new Error("Price negative");\n  let discount = 0;\n  if (userType === 'vip') {\n    discount = price * 0.3; // Increased discount\n  }\n  return price - discount;\n}`)
    setDiffResult([])
    setHasProcessed(false)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Diff Checker</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Inspect line changes, additions, and deletions between two code blocks or text bodies locally.
          </p>
        </div>
      </Section>

      {/* Inputs Panels */}
      {!hasProcessed ? (
        <Section delay={0.1}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original */}
              <Card className="flex flex-col h-[320px]">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    ORIGINAL_TEXT
                  </span>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2" onClick={handleLoadSample}>
                    Sample
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <textarea
                    value={original}
                    onChange={(e) => setOriginal(e.target.value)}
                    placeholder="Enter original text payload here..."
                    className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                    spellCheck="false"
                  />
                </CardContent>
              </Card>

              {/* Modified */}
              <Card className="flex flex-col h-[320px]">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    MODIFIED_TEXT
                  </span>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <textarea
                    value={modified}
                    onChange={(e) => setModified(e.target.value)}
                    placeholder="Enter modified text payload here..."
                    className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                    spellCheck="false"
                  />
                </CardContent>
              </Card>
            </div>

            <Button onClick={handleDiff} className="w-full h-10 text-xs font-semibold">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Compare Differences
            </Button>
          </div>
        </Section>
      ) : (
        /* Results View */
        <Section delay={0.1}>
          <div className="space-y-4">
            <Card className="flex flex-col min-h-[400px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Columns className="h-3.5 w-3.5 text-violet-500" />
                  DIFF_COMPARISON_CONSOLE
                </span>
                <Button variant="secondary" size="sm" className="h-6 text-[10px]" onClick={handleClear}>
                  Edit Inputs
                </Button>
              </CardHeader>
              <CardContent className="p-4 font-mono text-xs overflow-x-auto space-y-0.5 bg-black/10">
                {diffResult.map((line, idx) => (
                  <div
                    key={idx}
                    className={`py-0.5 px-3 rounded flex items-start gap-3 select-none leading-relaxed ${
                      line.type === 'added'
                        ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500'
                        : line.type === 'removed'
                        ? 'bg-rose-500/10 text-rose-400 border-l-2 border-rose-500 line-through'
                        : 'text-muted-foreground/80'
                    }`}
                  >
                    <span className="w-4 shrink-0 text-center text-[10px] opacity-40">
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                    </span>
                    <span className="break-all whitespace-pre-wrap">{line.content || ' '}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>
      )}
    </div>
  )
}
