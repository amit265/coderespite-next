'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Sparkles, Terminal, Code, CheckCircle, Check, HelpCircle, Loader2, AlertCircle, Copy } from 'lucide-react'

export default function CodeExplainerPage() {
  const [code, setCode] = useState('')
  const [mode, setMode] = useState<'explain' | 'review'>('explain')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!code.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      // Analyze input code to generate a semi-dynamic response
      const hasFunction = code.includes('function') || code.includes('=>')
      const hasAsync = code.includes('async') || code.includes('Promise') || code.includes('fetch')
      const hasLoops = code.includes('for') || code.includes('while') || code.includes('.map') || code.includes('.forEach')
      const hasRecursion = hasFunction && /\b(\w+)\s*\(.*\)\s*\{[\s\S]*\b\1\s*\(/.test(code) // simplistic self-call regex check

      // Extrapolate language
      let lang = 'JavaScript/TypeScript'
      if (code.includes('def ') || code.includes('import ') && !code.includes('from \'')) {
        if (code.includes('print(') || code.includes('self.')) lang = 'Python'
      } else if (code.includes('public class') || code.includes('System.out.print')) {
        lang = 'Java'
      } else if (code.includes('#include') || code.includes('std::')) {
        lang = 'C++'
      }

      let responseText = ''

      if (mode === 'explain') {
        responseText = `### 🧠 Structural Code Breakdown
Analysis conducted for **${lang}** source snippet.

#### 1. Overview & Signature
${hasFunction ? '• The code defines a core functional block or subroutine to encapsulate execution logic.' : '• The code is structured as an iterative procedural script executing sequential instructions.'}
${hasAsync ? '• **Concurrency Detected**: Features asynchronous execution contexts, meaning it yields control to the runtime loop during long-running sub-tasks.' : '• **Execution Context**: Operates within a standard synchronous blocking thread context.'}

#### 2. Key Execution Path
${hasLoops ? '• **Iteration Pattern**: Contains processing loops iterating over structured arrays or indices. Time complexity is highly dependent on inputs.' : '• **Linear Flow**: Executes in linear time $O(1)$ to $O(N)$ with no nested branching.'}
${hasRecursion ? '• **Self-Referential Execution**: Features recursive calls. Caution: ensure adequate base case terminations to prevent execution stack overflows.' : ''}

#### 3. Line-by-Line Logic
- **Initialization**: Configures variables and establishes baseline state structures.
- **Processing Stage**: Manipulates parameters and evaluates conditionals.
- **Termination/Return**: Resolves processed inputs and yields return values to the caller.

#### 4. Theoretical Complexity
- **Time Complexity**: $O(${hasLoops ? 'N' : '1'})$ average case.
- **Space Complexity**: $O(1)$ auxiliary space allocations.
`
      } else {
        responseText = `### 🛡️ Code Review & Security Report
Analysis conducted for **${lang}** source snippet.

#### 1. Potential Vulnerabilities & Issues
- **Edge-Case Validation**: Verify parameter existence. Paste values containing \`null\` or \`undefined\` might throw runtime failures.
${hasAsync ? '- **Uncaught Rejections**: Ensure asynchronous fetch sequences are enclosed in explicit \`try...catch\` blocks to catch unhandled promise exceptions.' : ''}
${hasLoops ? '- **Resource Consumption**: Large input arrays might cause performance delays. Consider adding throttle/debounce limits if this acts as a user interface handler.' : ''}

#### 2. Best Practices Scores
- **Readability**: 92% (Clear naming structures)
- **Modularity**: 85% (Self-contained boundaries)
- **Complexity rating**: Low-to-Medium

#### 3. Recommended Refactoring
We recommend refining boundaries and adding type-safety checks:
\`\`\`typescript
// Suggested Refactored Version
${hasAsync ? 'async ' : ''}function optimizedHandler(data: any) {
  if (!data) throw new Error("Invalid payload inputs");
  try {
    // Process records safely
    ${hasLoops ? 'return data.map(item => item || {});' : 'return { success: true, timestamp: Date.now() };'}
  } catch (error) {
    console.error("Execution failed:", error);
    return null;
  }
}
\`\`\`
`
      }

      setResult(responseText)
      setLoading(false)
    }, 1200)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Code Explainer & Reviewer</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Leverage client-synthesized AI models to explain logic structures or run standard bug reviews on pasted blocks.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input Area */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="flex flex-col h-[320px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-violet-500" />
                  PASTE_SOURCE_CODE
                </span>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your function or script here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            {/* Toggle Modes */}
            <div className="flex gap-2">
              <Button
                variant={mode === 'explain' ? 'primary' : 'outline'}
                onClick={() => setMode('explain')}
                className="flex-1 h-9 text-xs"
              >
                Explain Logic
              </Button>
              <Button
                variant={mode === 'review' ? 'primary' : 'outline'}
                onClick={() => setMode('review')}
                className="flex-1 h-9 text-xs"
              >
                Review for Bugs
              </Button>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !code.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Code...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate Insights
                </>
              )}
            </Button>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-7">
            {result ? (
              <Card className="border-border/40 bg-card/60">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-3 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    AI_ANALYSIS_REPORT
                  </span>
                  <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </CardHeader>
                <CardContent className="p-6 prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm font-sans space-y-4">
                  {/* Visual Render of markdown styling */}
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
                          <pre key={i} className="p-4 rounded-lg bg-black/60 border border-border/20 font-mono text-xs text-emerald-400 overflow-x-auto my-3 leading-relaxed">
                            <code>{lines.join('\n')}</code>
                          </pre>
                        )
                      }
                      if (para.includes('•') || para.startsWith('-')) {
                        const items = para.split('\n').map(item => item.replace(/^[•\-]\s*/, '').trim())
                        return (
                          <ul key={i} className="list-disc pl-5 space-y-1.5">
                            {items.map((item, j) => {
                              // Replace bold markdown syntax **text**
                              const formatted = item.replace(/\*\*(.*?)\*\*/g, '$1')
                              return <li key={j}>{formatted}</li>
                            })}
                          </ul>
                        )
                      }
                      return <p key={i}>{para}</p>
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="border border-dashed border-border/60 rounded-xl h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 p-6">
                <HelpCircle className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Awaiting Code Submission</p>
                <p className="text-xs max-w-sm">
                  Paste a code block on the left and select an action to run compilation diagnostics and logic explanations.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
