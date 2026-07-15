'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Table, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function CSVFormatterPage() {
  const [csv, setCsv] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string[][] | null>(null)

  const handleFormat = () => {
    if (!csv.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      // Basic CSV parser
      const lines = csv.trim().split('\n')
      const rows = lines.map(line => line.split(',').map(cell => cell.trim()))
      setResult(rows)
      setLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setCsv('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setCsv("id,name,email,role\n1,Alex Coder,alex@domain.com,Engineer\n2,Jani Developer,jani@domain.com,Designer\n3,Tove Architect,tove@domain.com,Architect")
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">CSV Table Formatter</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Convert comma-separated values (CSV) into clean, readable responsive preview tables.
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
                  RAW_CSV_INPUT
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
                  value={csv}
                  onChange={(e) => setCsv(e.target.value)}
                  placeholder="Paste your CSV data rows here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleFormat}
              disabled={loading || !csv.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Building Table...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Convert CSV to Table
                </>
              )}
            </Button>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7">
            {result ? (
              <Card className="border-border/40 bg-card/60 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    <Table className="h-3.5 w-3.5 text-emerald-500" />
                    FORMATTED_TABLE_PREVIEW
                  </span>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border/60 bg-secondary/20">
                        {result[0].map((header, i) => (
                          <th key={i} className="p-3 font-semibold text-foreground">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.slice(1).map((row, i) => (
                        <tr key={i} className="border-b border-border/40 hover:bg-secondary/5">
                          {row.map((cell, j) => (
                            <td key={j} className="p-3 text-muted-foreground">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            ) : (
              <div className="border border-dashed border-border/60 rounded-xl h-[340px] flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 p-6">
                <Table className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending CSV Input</p>
                <p className="text-xs max-w-sm">
                  Paste unformatted comma-separated parameters on the left to align table structures.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
