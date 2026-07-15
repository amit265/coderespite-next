'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileSpreadsheet, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function SQLGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [dialect, setDialect] = useState<'postgres' | 'mongodb'>('postgres')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      // Analyze prompt to synthesize query
      const p = prompt.toLowerCase()
      const hasJoin = p.includes('join') || p.includes('relation') || p.includes('transactions')
      const hasLimit = p.includes('limit') || p.includes('top') || p.includes('first')
      const hasWhere = p.includes('where') || p.includes('who') || p.includes('more than') || p.includes('days')

      let query = ''
      if (dialect === 'postgres') {
        query = `-- Dynamic SQL Builder Output\nSELECT \n  u.id, \n  u.email, \n  u.created_at${hasJoin ? ',\n  SUM(t.amount) as total_spent' : ''}\nFROM users u`
        if (hasJoin) {
          query += '\nLEFT JOIN transactions t ON u.id = t.user_id'
        }
        if (hasWhere) {
          query += '\nWHERE u.created_at >= NOW() - INTERVAL \'30 days\''
          if (p.includes('100') || p.includes('spent')) {
            query += '\n  AND t.status = \'completed\''
          }
        }
        if (hasJoin) {
          query += '\nGROUP BY u.id, u.email, u.created_at'
          if (p.includes('100') || p.includes('more than')) {
            query += '\nHAVING SUM(t.amount) > 100'
          }
        }
        if (hasLimit) {
          query += '\nLIMIT 10'
        }
        query += ';'
      } else {
        query = `// MongoDB Aggregation Pipeline\ndb.users.aggregate([\n`
        if (hasJoin) {
          query += `  {\n    $lookup: {\n      from: "transactions",\n      localField: "_id",\n      foreignField: "userId",\n      as: "transactions"\n    }\n  },\n`
        }
        if (hasWhere) {
          query += `  {\n    $match: {\n      createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) }\n    }\n  },\n`
        }
        if (hasLimit) {
          query += `  { $limit: 10 }\n`
        }
        query += `]);`
      }

      setResult(query)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setPrompt('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setPrompt("Find users who created accounts in the last 30 days, join them with completed transactions, and limit the results to the top 10 rows.")
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">SQL & Query Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Translate conversational query descriptors into Postgres SQL commands or MongoDB pipelines.
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
                  CONVERSATIONAL_PROMPT
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
                  placeholder="Describe your query in plain English (e.g. Find users who spent over 500 dollars)..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                variant={dialect === 'postgres' ? 'primary' : 'outline'}
                onClick={() => setDialect('postgres')}
                className="flex-1 h-9 text-xs"
              >
                PostgreSQL
              </Button>
              <Button
                variant={dialect === 'mongodb' ? 'primary' : 'outline'}
                onClick={() => setDialect('mongodb')}
                className="flex-1 h-9 text-xs"
              >
                MongoDB
              </Button>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Building Queries...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate Database Query
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
                    DATABASE_QUERY_OUTPUT
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
                <p className="text-sm font-semibold text-foreground/80">Pending Prompt Input</p>
                <p className="text-xs max-w-sm">
                  Describe what details you need to retrieve on the left to synthesize queries.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
