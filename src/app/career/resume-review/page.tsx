'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Sparkles, Terminal, ShieldCheck, Check, Copy, Loader2, FileCode } from 'lucide-react'

export default function ResumeReviewPage() {
  const [resume, setResume] = useState('')
  const [keywords, setKeywords] = useState('React, Next.js, TypeScript, Postgres, Docker')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!resume.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const parsedKeywords = keywords.split(',').map(k => k.trim().toLowerCase())
      const resumeLower = resume.toLowerCase()
      const matches = parsedKeywords.filter(k => resumeLower.includes(k))
      const matchPercentage = Math.round((matches.length / parsedKeywords.length) * 100)

      const feedback = `### 📊 ATS Resume Audit Report
ATS screening audit logs compiled client-side.

#### 1. Keyword Match Score
• **Match Percentage**: \`${matchPercentage}%\`
• **Found Keywords**: ${matches.map(m => `\`${m}\``).join(', ') || 'None'}
• **Missing Keywords**: ${parsedKeywords.filter(k => !resumeLower.includes(k)).map(m => `\`${m}\``).join(', ') || 'None'}

#### 2. ATS Optimization Recommendations
1. Ensure keywords are placed in context inside experience roles, rather than static stacks lists.
2. Maintain standard chronological section layouts to prevent crawler parsing blocks.
`
      setResult(feedback)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setResume('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setResume("Alex Coder\nSenior Frontend Engineer\nExperienced in React, TypeScript, and local client architectures.")
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
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 10: Career Center</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">ATS Resume Optimizer</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Scan your resume copy against key job description keywords to analyze match scores.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader className="py-3 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-xs font-semibold flex items-center gap-2 font-mono">
                  <Terminal className="h-4 w-4 text-violet-500" />
                  KEYWORDS_TARGETS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-sm">
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  placeholder="Target keywords (comma-separated)..."
                />
              </CardContent>
            </Card>

            <Card className="flex flex-col h-[200px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-blue-500" />
                  RESUME_TEXT_INPUT
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
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your text-format resume contents here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={loading || !resume.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Auditing Resume Match...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Scan Resume Match
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
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    RESUME_ATS_REPORT
                  </span>
                  <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2.5" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    Copy Report
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
                      if (para.includes('•') || para.startsWith('-')) {
                        const items = para.split('\n').map(item => item.replace(/^[•\-]\s*/, '').trim())
                        return (
                          <ul key={i} className="list-disc pl-5 space-y-1.5">
                            {items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-black/45 font-mono text-[11px] text-amber-400">$1</code>') }} />)}
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
                <FileCode className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Resume Submission</p>
                <p className="text-xs max-w-sm">
                  Paste resume content on the left to extract match metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
