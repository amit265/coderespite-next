'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Layers, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function ArchitectureAssistantPage() {
  const [spec, setSpec] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!spec.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const s = spec.toLowerCase()
      let stack = 'Next.js App Router, Express.js backend, PostgreSQL Database'
      let componentsFlow = 'Client UI -> REST API Gateway -> DB Storage'
      
      if (s.includes('realtime') || s.includes('chat') || s.includes('messaging')) {
        stack = 'Next.js Frontend, WebSocket Node.js server, Redis Cache, MongoDB Database'
        componentsFlow = 'Client WebSockets -> WS Message Broker -> Redis cache pipeline -> MongoDB archive storage'
      } else if (s.includes('offline') || s.includes('local')) {
        stack = 'PWA React Web App, Service Workers cache, IndexedDB local storage, Sync REST Gateway'
        componentsFlow = 'Client Action -> Service Worker -> Local IndexedDB -> Sync Background job -> Server API'
      }

      const report = `### 🗺️ System Architecture Blueprint
Parsed structural requirements matching your project spec definition.

#### 1. Tech Stack Recommendation
• **Frontend Architecture**: Client UI SPA/SSR targeting React/Next.js models.
• **Database layer**: ${stack.split(', ').pop()}
• **Backend Stack**: ${stack}

#### 2. Components Pipeline
• **Data Flow**: \`${componentsFlow}\`
• **Gateway rules**: JWT bearer header checks, request rate limit policies.

#### 3. Database Schema Overview
\`\`\`sql
-- Recommended base structures
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  payload JSONB NOT NULL
);
\`\`\`
`
      setResult(report)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setSpec('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setSpec("Build a real-time messaging chat application with offline-first local storage and sync loops.")
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Architecture Assistant</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Translate high-level application specs into database structures and system design components maps.
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
                  PROJECT_SPECIFICATIONS
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
                  value={spec}
                  onChange={(e) => setSpec(e.target.value)}
                  placeholder="Describe your system requirements and user flows..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={loading || !spec.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Synthesizing Blueprint...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate Architecture Blueprint
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
                    <Layers className="h-3.5 w-3.5 text-emerald-500" />
                    SYSTEM_DESIGN_BLUEPRINT
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
                <Layers className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Specifications Input</p>
                <p className="text-xs max-w-sm">
                  Describe what your project is building on the left to lay out system structures.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
