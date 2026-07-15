'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileSpreadsheet, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function SQLFormatterPage() {
  const [sql, setSql] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleFormat = () => {
    if (!sql.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      let raw = sql.trim()

      // Capitalize major SQL keywords
      const keywords = [
        'select', 'from', 'where', 'group by', 'order by', 'limit',
        'left join', 'right join', 'inner join', 'join', 'on', 'and', 'or', 'having',
        'insert into', 'values', 'update', 'set', 'delete from'
      ]

      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi')
        raw = raw.replace(regex, kw.toUpperCase())
      })

      // Standardize linebreaks before major clauses
      const breakClauses = ['FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'LIMIT', 'LEFT JOIN', 'INNER JOIN', 'JOIN', 'HAVING']
      breakClauses.forEach(clause => {
        const regex = new RegExp(`\\s+${clause}\\b`, 'g')
        raw = raw.replace(regex, `\n${clause}`)
      })

      // Format SELECT projection columns
      if (raw.startsWith('SELECT')) {
        const firstFrom = raw.indexOf('FROM')
        if (firstFrom !== -1) {
          const projection = raw.substring(6, firstFrom).trim()
          const formattedProj = projection.split(',').map(p => `  ${p.trim()}`).join(',\n')
          raw = `SELECT\n${formattedProj}\n` + raw.substring(firstFrom)
        }
      }

      setResult(raw)
      setLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setSql('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setSql("select u.id, u.email, sum(t.amount) as total from users u left join transactions t on u.id = t.user_id where u.created_at >= now() - interval '30 days' group by u.id, u.email having sum(t.amount) > 100 limit 10;")
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
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">SQL Formatter & Beautifier</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Format, indent, and uppercase raw SQL database query structures client-side instantly.
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
                  RAW_SQL_INPUT
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
                  value={sql}
                  onChange={(e) => setSql(e.target.value)}
                  placeholder="Paste your unformatted raw SQL queries here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleFormat}
              disabled={loading || !sql.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Formatting...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Format SQL Query
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
                    <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
                    FORMATTED_SQL_OUTPUT
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
                <FileSpreadsheet className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending SQL Input</p>
                <p className="text-xs max-w-sm">
                  Paste database queries on the left to structure and align formatting columns.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
