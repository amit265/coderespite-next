'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileCode, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function CoverLetterPage() {
  const [params, setParams] = useState({
    name: 'Alex Coder',
    role: 'Staff React Engineer',
    company: 'Stripe',
    achievement: 'engineered custom SSR components caching structures, reducing API fetch latencies by 35% across billing platforms.'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const letter = `Dear Hiring Team at ${params.company},

I am writing to express my strong interest in the ${params.role} position at ${params.company}. With a proven track record of optimizing application performance and crafting scalable frontend architectures, I am excited to bring my technical expertise to your engineering division.

During my previous tenure, I successfully ${params.achievement}. This experience aligns perfectly with your goals of maintaining highly reliable, low-latency client experiences.

Thank you for your time and consideration. I look forward to discussing how my background can support your ongoing engineering milestones.

Sincerely,
${params.name}
`
      setResult(letter)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setParams({ name: '', role: '', company: '', achievement: '' })
    setResult(null)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Cover Letter Builder</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Generate custom, highly targeted developer cover letters from role, company, and achievement descriptions.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-violet-500" />
                  Cover Letter parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3.5 text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Your Name</label>
                  <input
                    type="text"
                    value={params.name}
                    onChange={(e) => setParams({ ...params, name: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Target Role</label>
                  <input
                    type="text"
                    value={params.role}
                    onChange={(e) => setParams({ ...params, role: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Company Name</label>
                  <input
                    type="text"
                    value={params.company}
                    onChange={(e) => setParams({ ...params, company: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Key Achievement Highlights</label>
                  <textarea
                    value={params.achievement}
                    onChange={(e) => setParams({ ...params, achievement: e.target.value })}
                    className="w-full h-16 p-2 rounded border border-border bg-card font-mono text-xs outline-none resize-none"
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
                  Generating Letter...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate Cover Letter
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
                    <FileCode className="h-3.5 w-3.5 text-emerald-500" />
                    COVER_LETTER_OUTPUT
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
                  Complete candidate variables on the left to write cover letters.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
