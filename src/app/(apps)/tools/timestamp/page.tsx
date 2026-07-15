'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Clock, RefreshCw, ArrowRightLeft, Calendar } from 'lucide-react'

export default function TimestampPage() {
  // Live ticker state
  const [currentUnix, setCurrentUnix] = useState<number>(0)
  const [currentLocal, setCurrentLocal] = useState<string>('')
  const [currentUTC, setCurrentUTC] = useState<string>('')

  // Epoch to date state
  const [epochInput, setEpochInput] = useState('')
  const [epochResult, setEpochResult] = useState<{
    gmt: string
    local: string
    iso: string
  } | null>(null)

  // Date to epoch state
  const [dateInput, setDateInput] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  })
  const [dateResult, setDateResult] = useState<{
    seconds: number
    millis: number
  } | null>(null)

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentUnix(Math.floor(now.getTime() / 1000))
      setCurrentLocal(now.toLocaleString())
      setCurrentUTC(now.toUTCString())
    }, 1000)

    // Initial triggers
    const now = new Date()
    setCurrentUnix(Math.floor(now.getTime() / 1000))
    setCurrentLocal(now.toLocaleString())
    setCurrentUTC(now.toUTCString())
    setEpochInput(Math.floor(now.getTime() / 1000).toString())

    return () => clearInterval(timer)
  }, [])

  // Process Epoch to Date conversion
  const handleEpochConvert = () => {
    if (!epochInput.trim()) return
    const num = Number(epochInput.trim())
    if (isNaN(num)) return

    // Guess if milliseconds or seconds
    const date = num > 99999999999 ? new Date(num) : new Date(num * 1000)

    setEpochResult({
      gmt: date.toUTCString(),
      local: date.toLocaleString(),
      iso: date.toISOString(),
    })
  }

  // Process Date to Epoch conversion
  const handleDateConvert = () => {
    const { year, month, day, hours, minutes, seconds } = dateInput
    // JavaScript Month is 0-indexed
    const date = new Date(year, month - 1, day, hours, minutes, seconds)
    const millis = date.getTime()
    const secs = Math.floor(millis / 1000)

    setDateResult({
      seconds: secs,
      millis,
    })
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Unix Timestamp Converter</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Convert epoch seconds and milliseconds to local calendar formats, or compile dates into timestamps.
          </p>
        </div>
      </Section>

      {/* Live Ticker */}
      <Section delay={0.08}>
        <Card className="border-violet-500/20 bg-gradient-to-br from-card/30 to-violet-500/5">
          <CardContent className="p-5 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                <Clock className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Current Unix Epoch</div>
                <div className="text-xl font-mono font-black text-violet-400">{currentUnix}</div>
              </div>
            </div>
            <div className="text-xs space-y-1 font-mono text-muted-foreground/80">
              <div><span className="font-bold text-foreground">Local:</span> {currentLocal}</div>
              <div><span className="font-bold text-foreground">UTC:</span> {currentUTC}</div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Conversion boxes */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Epoch to Date */}
          <Card className="flex flex-col">
            <CardHeader className="py-3 border-b border-border/40 bg-secondary/15">
              <CardTitle className="text-xs font-bold tracking-wider font-mono flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4 text-violet-500" />
                EPOCH_TO_DATE_CONVERTER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Epoch timestamp (seconds or milliseconds)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={epochInput}
                      onChange={(e) => setEpochInput(e.target.value)}
                      placeholder="e.g. 1784024332"
                      className="flex-1 h-9 px-3 rounded-lg border border-border bg-card font-mono text-xs outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button onClick={handleEpochConvert} size="sm">Convert</Button>
                  </div>
                </div>

                {epochResult && (
                  <div className="p-4 rounded-lg bg-black/10 border border-border/40 space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-violet-400 font-bold block uppercase tracking-wider">GMT/UTC String</span>
                      <span className="text-foreground">{epochResult.gmt}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-violet-400 font-bold block uppercase tracking-wider">Local Time</span>
                      <span className="text-foreground">{epochResult.local}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-violet-400 font-bold block uppercase tracking-wider">ISO 8601</span>
                      <span className="text-foreground truncate block">{epochResult.iso}</span>
                    </div>
                  </div>
                )}
              </div>
              {!epochResult && (
                <p className="text-xs text-muted-foreground/60 italic pt-6">Enter timestamp value to inspect calendar outputs.</p>
              )}
            </CardContent>
          </Card>

          {/* Date to Epoch */}
          <Card className="flex flex-col">
            <CardHeader className="py-3 border-b border-border/40 bg-secondary/15">
              <CardTitle className="text-xs font-bold tracking-wider font-mono flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                DATE_TO_EPOCH_CONVERTER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Year</label>
                    <input
                      type="number"
                      value={dateInput.year}
                      onChange={(e) => setDateInput({ ...dateInput, year: Number(e.target.value) })}
                      className="w-full h-8 px-2 rounded border border-border bg-card text-center font-mono text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Month</label>
                    <input
                      type="number"
                      value={dateInput.month}
                      onChange={(e) => setDateInput({ ...dateInput, month: Number(e.target.value) })}
                      className="w-full h-8 px-2 rounded border border-border bg-card text-center font-mono text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Day</label>
                    <input
                      type="number"
                      value={dateInput.day}
                      onChange={(e) => setDateInput({ ...dateInput, day: Number(e.target.value) })}
                      className="w-full h-8 px-2 rounded border border-border bg-card text-center font-mono text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Hr (24)</label>
                    <input
                      type="number"
                      value={dateInput.hours}
                      onChange={(e) => setDateInput({ ...dateInput, hours: Number(e.target.value) })}
                      className="w-full h-8 px-2 rounded border border-border bg-card text-center font-mono text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Min</label>
                    <input
                      type="number"
                      value={dateInput.minutes}
                      onChange={(e) => setDateInput({ ...dateInput, minutes: Number(e.target.value) })}
                      className="w-full h-8 px-2 rounded border border-border bg-card text-center font-mono text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Sec</label>
                    <input
                      type="number"
                      value={dateInput.seconds}
                      onChange={(e) => setDateInput({ ...dateInput, seconds: Number(e.target.value) })}
                      className="w-full h-8 px-2 rounded border border-border bg-card text-center font-mono text-xs outline-none"
                    />
                  </div>
                </div>

                <Button onClick={handleDateConvert} className="w-full h-9 text-xs">Convert Date</Button>

                {dateResult && (
                  <div className="p-4 rounded-lg bg-black/10 border border-border/40 space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-blue-400 font-bold block uppercase tracking-wider">Epoch Seconds</span>
                      <span className="text-foreground">{dateResult.seconds}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-400 font-bold block uppercase tracking-wider">Epoch Milliseconds</span>
                      <span className="text-foreground">{dateResult.millis}</span>
                    </div>
                  </div>
                )}
              </div>
              {!dateResult && (
                <p className="text-xs text-muted-foreground/60 italic pt-6">Process date structures to inspect epoch indexes.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}
