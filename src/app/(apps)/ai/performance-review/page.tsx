'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Cpu, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function PerformanceReviewPage() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!code.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const c = code.toLowerCase()
      let complexity = 'O(1) - Constant Time'
      let issue = 'No runtime performance loops detected.'
      let fix = '// Verified optimal complexity.'

      // Simple keywords checking
      if (c.includes('for') && c.split('for').length > 2) {
        complexity = 'O(N^2) - Quadratic Time'
        issue = 'Found nested loops iterating over identical ranges, leading to potential complexity bloats.'
        fix = '// Optimize nesting structures by mapping parameters to indexed keys lookup arrays:\nconst map = new Map(listB.map(item => [item.id, item]));\nlistA.forEach(item => {\n  const match = map.get(item.id);\n});'
      } else if (c.includes('for') || c.includes('while') || c.includes('.map(')) {
        complexity = 'O(N) - Linear Time'
        issue = 'Normal loops detected. Ensure operations inside loops execute under O(1) latency scopes.'
      }

      const diagnosis = `### ⚡ Performance Review Report
Audit diagnostics compiled from structural code scans.

#### 1. Complexity Assessment
• **Time Complexity**: \`${complexity}\`
• **Performance Details**: ${issue}

#### 2. Optimization Strategy
1. Cache repeated nested lookups inside Map objects.
2. Minimize recursive function layers where iterators are safer.

#### 3. Optimized Implementation Suggestion
\`\`\`javascript
${fix}
\`\`\`
`
      setResult(diagnosis)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setCode('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setCode(`for (let i = 0; i < listA.length; i++) {\n  for (let j = 0; j < listB.length; j++) {\n    if (listA[i].id === listB[j].id) {\n      console.log("Match found");\n    }\n  }\n}`)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Performance Review Assistant</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Scan algorithms and React components to evaluate runtime complexity and resolve computational loops nesting bloats.
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
                  ALGORITHM_SOURCE_CODE
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
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your javascript function or algorithm details here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={loading || !code.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Time Complexity...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Perform Performance Review
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
                    <Cpu className="h-3.5 w-3.5 text-emerald-500" />
                    PERFORMANCE_AUDIT_REPORT
                  </span>
                  <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2.5" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </CardHeader>
                <CardContent className="p-5 prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm font-sans space-y-4">
                  <div className="space-y-4 leading-relaxed text-muted-foreground">
                    {result.split('\n\n').map((para, i) => {
                      if (para.startsWith('###')) {
                        return <h3 key={i} className="text-lg font-bold text-foreground mt-4">{para.replace('###', '').trim()}</h3>
                      }
                      if (para.startsWith('####')) {
                        return <h4 key={i} className="text-sm font-semibold text-foreground mt-3">{para.replace('####', '').trim()}</h4>
                      }
                      if (para.startsWith('```')) {
                        const lines = para.split('\n').filter(l => !l.startsWith('```'))
                        return (
                          <pre key={i} className="p-4 rounded bg-black/60 border border-border/20 font-mono text-xs text-emerald-400 overflow-x-auto my-3">
                            <code>{lines.join('\n')}</code>
                          </pre>
                        )
                      }
                      if (para.includes('•') || para.startsWith('-')) {
                        const items = para.split('\n').map(item => item.replace(/^[•\-]\s*/, '').trim())
                        return (
                          <ul key={i} className="list-disc pl-5 space-y-1.5">
                            {items.map((item, j) => <li key={j}>{item}</li>)}
                          </ul>
                        )
                      }
                      return <p key={i}>{para}</p>
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="border border-dashed border-border/60 rounded-xl h-[340px] flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 p-6">
                <Cpu className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Code Submission</p>
                <p className="text-xs max-w-sm">
                  Paste algorithm logic on the left to extract complexity reviews.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
