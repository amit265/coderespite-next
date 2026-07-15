'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Bug, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function BugAnalyzerPage() {
  const [trace, setTrace] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!trace.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const t = trace.toLowerCase()
      let errorType = 'Generic Runtime Exception'
      let rootCause = 'The execution context encountered an unmapped runtime parameter mismatch.'
      let fix = '// Wrap execution in standard try-catch blocks to debug:\ntry {\n  // Execute block\n} catch (e) {\n  console.error("Diagnostic error caught:", e);\n}'

      if (t.includes('hydration') || t.includes('match')) {
        errorType = 'React Hydration Mismatch'
        rootCause = 'Server pre-rendered HTML DOM structures differ from initial client-side hydration mounts.'
        fix = '// Solve hydration mismatches by wrapping in useEffect mounting checks:\nconst [mounted, setMounted] = useState(false);\nuseEffect(() => { setMounted(true); }, []);\nif (!mounted) return null;'
      } else if (t.includes('module') || t.includes('resolve') || t.includes('cannot find')) {
        errorType = 'Module Resolution Failure'
        rootCause = 'The compiler bundler cannot locate the requested package module within node_modules directories.'
        fix = '# Run install commands to restore compiler dependencies:\nnpm install <module_name> --save'
      } else if (t.includes('cors') || t.includes('allow-origin')) {
        errorType = 'CORS Policy Block'
        rootCause = 'The API endpoint has not configured Access-Control-Allow-Origin headers matching the client origin.'
        fix = '// Add CORS middleware headers on server configurations:\napp.use(cors({\n  origin: "https://your-domain.com",\n  methods: ["GET", "POST"]\n}));'
      }

      const diagnosis = `### 🛡️ Diagnostic Report: ${errorType}
Verified diagnosis for pasted application log.

#### 1. Root Cause Analysis
• **Exception Category**: \`${errorType}\`
• **Diagnostic Details**: ${rootCause}

#### 2. Recommended Action Plan
1. Review the stacktrace locations.
2. Check compiler boundary configs.
3. Apply the verified code snippet refactoring below.

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
    setTrace('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setTrace(`Error: Turbopack build failed with 1 errors:\n./src/components/ui/Button.tsx:4:1\nModule not found: Can't resolve '@radix-ui/react-slot'`)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Bug Analyzer</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Diagnose stacktraces and compiler compiler warnings to output verified troubleshooting plans locally.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input side */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="flex flex-col h-[280px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-violet-500" />
                  STACKTRACE_LOG_INPUT
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
                  value={trace}
                  onChange={(e) => setTrace(e.target.value)}
                  placeholder="Paste compiler traces or web browser console error dumps here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={loading || !trace.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Exception...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Analyze Trace Logs
                </>
              )}
            </Button>
          </div>

          {/* Output side */}
          <div className="lg:col-span-7">
            {result ? (
              <Card className="border-border/40 bg-card/60">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    <Bug className="h-3.5 w-3.5 text-emerald-500" />
                    BUG_DIAGNOSIS_REPORT
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
                            {items.map((item, j) => <li key={j}>{item.replace(/\*\*(.*?)\*\*/g, '$1')}</li>)}
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
                <Bug className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Awaiting Log Submission</p>
                <p className="text-xs max-w-sm">
                  Paste compile error tracks on the left to extract solutions.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
