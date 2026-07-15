'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Terminal, Check, Copy, AlertCircle, HelpCircle } from 'lucide-react'

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
  const [flags, setFlags] = useState('g')
  const [testText, setTestText] = useState('My emails are alex@domain.com and test.user@coderespite.org!')
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [highlightedHtml, setHighlightedHtml] = useState('')

  useEffect(() => {
    setError(null)
    setMatches([])
    setHighlightedHtml(testText)

    if (!pattern.trim()) return

    try {
      const regex = new RegExp(pattern, flags)
      const matchesArray: string[] = []

      // If global flag is present, loop to find all matches
      if (flags.includes('g')) {
        let match
        while ((match = regex.exec(testText)) !== null) {
          if (match[0] === '') break // Prevent infinite loop
          matchesArray.push(match[0])
        }
      } else {
        const match = regex.exec(testText)
        if (match) {
          matchesArray.push(match[0])
        }
      }

      setMatches(matchesArray)

      // Generate highlighted HTML preview safely
      if (matchesArray.length > 0) {
        let html = testText
        // Highlight matches using a unique replace mechanism to prevent overlapping html injections
        const uniqueRegex = new RegExp(`(${pattern})`, flags)
        html = html.replace(uniqueRegex, '<span class="bg-amber-400/30 text-amber-300 font-semibold px-0.5 rounded border border-amber-400/40">$1</span>')
        setHighlightedHtml(html)
      }
    } catch (e: any) {
      setError(e.message || 'Invalid regular expression.')
    }
  }, [pattern, flags, testText])

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Regular Expression Tester</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Validate regex pattern structures against test text fields with real-time matching highlights.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader className="py-3 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-xs font-semibold flex items-center gap-2 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-violet-500" />
                  REGEX_CONFIG
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3.5 text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Pattern Expression</label>
                  <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="w-full h-9 px-3 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Flags</label>
                  <input
                    type="text"
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    placeholder="e.g. g, i, m"
                    className="w-full h-9 px-3 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col h-[180px]">
              <CardHeader className="py-2.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-xs font-semibold flex items-center gap-2 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-violet-500" />
                  TEST_STRING_INPUT
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  placeholder="Enter the test strings to check matches against..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                />
              </CardContent>
            </Card>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 space-y-4">
            {error && (
              <div className="p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-mono flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Compiler Exception:</p>
                  <p className="opacity-90">{error}</p>
                </div>
              </div>
            )}

            {!error && (
              <>
                {/* Highlights */}
                <Card className="border-border/40 bg-card/60">
                  <CardHeader className="py-2.5 border-b border-border/40 bg-secondary/15">
                    <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                      <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
                      HIGHLIGHTED_MATCHES_PREVIEW
                    </span>
                  </CardHeader>
                  <CardContent className="p-5 font-mono text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
                  </CardContent>
                </Card>

                {/* Match Lists */}
                <Card className="border-border/40 bg-card/60">
                  <CardHeader className="py-2.5 border-b border-border/40 bg-secondary/15">
                    <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      MATCHES_LIST ({matches.length})
                    </span>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 max-h-[160px] overflow-y-auto font-mono text-xs">
                    {matches.length > 0 ? (
                      matches.map((m, idx) => (
                        <div key={idx} className="p-2 rounded bg-black/10 border border-border/40 text-emerald-400">
                          {m}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground/60 text-center py-2">No matching tokens found.</p>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
