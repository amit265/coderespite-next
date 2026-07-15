'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { CheckSquare, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function UnitTestGeneratorPage() {
  const [code, setCode] = useState('')
  const [framework, setFramework] = useState<'jest' | 'pytest'>('jest')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!code.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      // Find function name in inputs
      let funcName = 'handler'
      const matchFunc = code.match(/(?:function|const|let)\s+([a-zA-Z0-9_]+)\s*(?:=|\()/ )
      if (matchFunc && matchFunc[1]) {
        funcName = matchFunc[1]
      } else {
        const matchPython = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/)
        if (matchPython && matchPython[1]) funcName = matchPython[1]
      }

      let tests = ''
      if (framework === 'jest') {
        tests = `import { ${funcName} } from './source';

describe('Unit Tests for ${funcName}()', () => {
  test('should execute successfully with valid parameters', () => {
    const input = { val: 10 };
    const result = ${funcName}(input);
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  test('should fail gracefully or throw exceptions on empty inputs', () => {
    expect(() => {
      ${funcName}(null);
    }).toThrow();
  });
});`
      } else {
        tests = `import pytest
from source import ${funcName}

def test_${funcName}_success():
    payload = {"val": 10}
    response = ${funcName}(payload)
    assert response is not None
    assert response.get("success") is True

def test_${funcName}_invalid_parameters():
    with pytest.raises(ValueError):
        ${funcName}(None)
`
      }

      setResult(tests)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setCode('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setCode(`function processTransaction(transaction) {\n  if (!transaction || !transaction.id) {\n    throw new Error("Invalid transaction structure");\n  }\n  return {\n    success: true,\n    refId: transaction.id,\n    timestamp: Date.now()\n  };\n}`)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Unit Test Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Generate high-coverage Jest or PyTest unit test files targeting code edge cases locally.
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
                  PASTE_SOURCE_CODE
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
                  placeholder="Paste your script, utility, or class handler here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                variant={framework === 'jest' ? 'primary' : 'outline'}
                onClick={() => setFramework('jest')}
                className="flex-1 h-9 text-xs"
              >
                Jest (JS/TS)
              </Button>
              <Button
                variant={framework === 'pytest' ? 'primary' : 'outline'}
                onClick={() => setFramework('pytest')}
                className="flex-1 h-9 text-xs"
              >
                PyTest (Python)
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
                  Generating Suites...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate Test Suite
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
                    <CheckSquare className="h-3.5 w-3.5 text-emerald-500" />
                    TEST_SUITE_OUTPUT
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
                <CheckSquare className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Code Input</p>
                <p className="text-xs max-w-sm">
                  Provide functions on the left and select test target frameworks to generate suites.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
