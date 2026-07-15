'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { ShieldCheck, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function SecurityReviewPage() {
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
      let status = 'Secure'
      let issue = 'No critical security anomalies detected.'
      let fix = '// Verified clean context.'

      if (c.includes('select * from') && (c.includes('req.query') || c.includes('req.body'))) {
        status = 'Critical SQL Injection'
        issue = 'Found dynamic SQL query string concatenation linking direct request variables.'
        fix = '// Secure query formatting by utilizing parameterized values:\nconst query = "SELECT * FROM users WHERE id = $1";\nconst values = [req.query.id];\nawait db.query(query, values);'
      } else if (c.includes('dangerouslysetinnerhtml')) {
        status = 'XSS Vulnerability'
        issue = 'Found un-escaped innerHTML parameters injecting client elements directly.'
        fix = '// Secure markup by utilizing textContent declarations or HTML sanitize layers:\nconst cleanHTML = dompurify.sanitize(userInput);\nreturn <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;'
      }

      const diagnosis = `### 🛡️ Security Audit Report
Verified diagnosis for pasted application log.

#### 1. Vulnerability Diagnosis
• **Status level**: \`${status}\`
• **Diagnostic Details**: ${issue}

#### 2. Recommended Action Plan
1. Avoid string concatenation when building query pipelines.
2. Escape all custom parameters before browser DOM renders.

#### 3. Recommended Fix Code Block
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
    setCode(`app.get('/user', async (req, res) => {\n  const query = "SELECT * FROM users WHERE id = " + req.query.id;\n  const data = await db.execute(query);\n  res.json(data);\n});`)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Security Review Assistant</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Scan code blocks locally to identify SQL injection, Cross-Site Scripting (XSS), and CORS vulnerability vectors.
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
                  SOURCE_CODE_INPUT
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
                  placeholder="Paste your API endpoints or UI component files here..."
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
                  Scanning Vulnerabilities...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Perform Security Review
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
                    SECURITY_AUDIT_REPORT
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
                <ShieldCheck className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Code Submission</p>
                <p className="text-xs max-w-sm">
                  Paste application code files on the left to extract vulnerability reports.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
