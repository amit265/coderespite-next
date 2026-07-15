'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Clock, Check, Copy, RefreshCw, Terminal, AlertTriangle } from 'lucide-react'

export default function CronGeneratorPage() {
  const [expression, setExpression] = useState('*/5 * * * *')
  const [description, setDescription] = useState('Every 5 minutes, every hour, every day, every month.')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleParse = () => {
    setError(null)
    const trimmed = expression.trim()
    const fields = trimmed.split(/\s+/)

    if (fields.length !== 5) {
      setError('Invalid cron format. A cron expression must contain exactly 5 space-separated fields (minute, hour, day-of-month, month, day-of-week).')
      setDescription('')
      return
    }

    const [min, hour, dom, month, dow] = fields

    // Simplistic parser logic
    let minDesc = min === '*' ? 'every minute' : min.startsWith('*/') ? `every ${min.replace('*/', '')} minutes` : `at minute ${min}`
    let hourDesc = hour === '*' ? 'every hour' : hour.startsWith('*/') ? `every ${hour.replace('*/', '')} hours` : `at hour ${hour}`
    let domDesc = dom === '*' ? 'every day-of-month' : `on day-of-month ${dom}`
    let monthDesc = month === '*' ? 'every month' : `in month ${month}`
    let dowDesc = dow === '*' ? 'every day-of-week' : `on day-of-week ${dow}`

    if (min === '0' && hour === '0') {
      minDesc = 'at midnight'
      hourDesc = ''
    }

    const compiled = `${minDesc === 'at midnight' ? 'At midnight' : minDesc.charAt(0).toUpperCase() + minDesc.slice(1)}${hourDesc ? ', ' + hourDesc : ''}, ${domDesc}, ${monthDesc}, ${dowDesc}.`
    setDescription(compiled)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(expression)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  const handleLoadSample = (val: string) => {
    setExpression(val)
    setError(null)
    setTimeout(() => {
      // Small trigger tick
      const fields = val.split(/\s+/)
      const [min, hour, dom, month, dow] = fields
      let minDesc = min === '*' ? 'every minute' : min.startsWith('*/') ? `every ${min.replace('*/', '')} minutes` : `at minute ${min}`
      let hourDesc = hour === '*' ? 'every hour' : hour.startsWith('*/') ? `every ${hour.replace('*/', '')} hours` : `at hour ${hour}`
      let domDesc = dom === '*' ? 'every day-of-month' : `on day-of-month ${dom}`
      let monthDesc = month === '*' ? 'every month' : `in month ${month}`
      let dowDesc = dow === '*' ? 'every day-of-week' : `on day-of-week ${dow}`
      setDescription(`${minDesc.charAt(0).toUpperCase() + minDesc.slice(1)}, ${hourDesc}, ${domDesc}, ${monthDesc}, ${dowDesc}.`)
    }, 20)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Cron Expression Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Deconstruct and compile crontab scheduler expressions into readable English translation strings.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-violet-500" />
                  Cron expression
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-sm">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Crontab Input (5 fields)</label>
                  <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Samples */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Quick presets</span>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={() => handleLoadSample('*/15 * * * *')}>
                      Every 15m
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={() => handleLoadSample('0 0 * * 1-5')}>
                      Weekdays Midnight
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={() => handleLoadSample('30 8 1 * *')}>
                      Monthly Morning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleParse} className="w-full h-10 text-xs font-semibold">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Parse Cron Expression
            </Button>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 space-y-4">
            {error && (
              <div className="p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-mono flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold">Cron Exception:</p>
                  <p className="leading-relaxed opacity-95">{error}</p>
                </div>
              </div>
            )}

            {description && (
              <Card className="border-border/40 bg-card/60">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    <Clock className="h-3.5 w-3.5 text-blue-500" />
                    ENGLISH_DESCRIPTION
                  </span>
                  <Button variant="secondary" size="sm" className="h-6 text-[10px]" onClick={handleCopy}>
                    {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    Copy Cron
                  </Button>
                </CardHeader>
                <CardContent className="p-5 font-sans text-sm leading-relaxed text-emerald-400">
                  <p>{description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
