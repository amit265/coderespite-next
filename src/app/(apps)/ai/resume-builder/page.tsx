'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileCode, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function ResumeBuilderPage() {
  const [params, setParams] = useState({
    name: 'Alex Coder',
    title: 'Senior Full Stack Engineer',
    skills: 'React, TypeScript, Next.js, Node.js, PostgreSQL, Docker',
    experience: 'Engineered high-performance web applications, reducing page load latency metrics by 40% and upgrading schema indexes.'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const resume = `# ${params.name}
**${params.title}** | email@domain.com | github.com/username

---

## 🛠️ Technical Skills
**Languages & Frameworks**: ${params.skills}
**Tools & Systems**: Git, Linux CLI, Docker, REST/GraphQL APIs, CI/CD pipelines

---

## ⚡ Professional Experience
### Senior Software Architect | Tech Solutions Corp (2024 - Present)
- ${params.experience}
- Implemented micro-frontend designs reducing bundle sizes by 30%.
- Oversaw migration to serverless API gateways, lowering container costs.

---

## 🎓 Education
**B.S. in Computer Science** | University of Engineering (Graduated 2022)
`
      setResult(resume)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setParams({ name: '', title: '', skills: '', experience: '' })
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Resume Builder</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Generate clean, ATS-compliant markdown resumes targeting specialized full stack and system design engineering job descriptions.
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
                  Resume Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3.5 text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Full Name</label>
                  <input
                    type="text"
                    value={params.name}
                    onChange={(e) => setParams({ ...params, name: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Target Title</label>
                  <input
                    type="text"
                    value={params.title}
                    onChange={(e) => setParams({ ...params, title: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Key Skills (Comma Separated)</label>
                  <input
                    type="text"
                    value={params.skills}
                    onChange={(e) => setParams({ ...params, skills: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Key Experience Highlights</label>
                  <textarea
                    value={params.experience}
                    onChange={(e) => setParams({ ...params, experience: e.target.value })}
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
                  Building Profile...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate Markdown Resume
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
                    ATS_RESUME_MARKDOWN
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
                  Complete candidate variables on the left to write resumes.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
