'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileCode, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function PromptOptimizerPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const optimized = `# ⚡ Optimized Developer System Prompt

Use this structured prompt context inside LLMs to achieve deterministic, high-quality results.

\`\`\`markdown
## System Role & Persona
You are a senior software engineer specialized in rapid prototyping and modular architectural designs.

## Task Instruction
Reconstruct and execute the following conversational request:
"${prompt}"

## Execution Context & Guardrails
- Ensure all logic structures handle exception bounds (e.g., empty values, null checking).
- Write clean, commented blocks with variable types declared explicitly.
- Prioritize low execution complexity and clean semantic code layouts.

## Expected Output Format
Return the results using strict markdown code fences:
\\\`\\\`\\\`[language]
[Code block]
\\\`\\\`\\\`
\`\`\`
`
      setResult(optimized)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setPrompt('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setPrompt("Write a typescript function to parse CSV rows and filter out empty columns.")
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Prompt Optimizer</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Refine raw developer prompts into structured instructions using markdown formats and role assignments locally.
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
                  RAW_CONVERSATIONAL_PROMPT
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
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste what you want the AI to generate in plain terms..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing Context...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Optimize Prompt
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
                    STRUCTURED_PROMPT_REPORT
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
                <p className="text-sm font-semibold text-foreground/80">Pending Prompt Input</p>
                <p className="text-xs max-w-sm">
                  Provide conversational requirements on the left to structure prompt schemas.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
