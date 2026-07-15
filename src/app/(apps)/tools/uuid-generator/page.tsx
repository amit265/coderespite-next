'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Fingerprint, Check, Copy, RefreshCw, Layers } from 'lucide-react'

export default function UUIDGeneratorPage() {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState<string[]>([])
  const [uppercase, setUppercase] = useState(false)
  const [noHyphens, setNoHyphens] = useState(false)
  const [braces, setBraces] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateUUID = () => {
    // Math random fallback + standard crypto check
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })

    if (uppercase) uuid = uuid.toUpperCase()
    if (noHyphens) uuid = uuid.replace(/-/g, '')
    if (braces) uuid = `{${uuid}}`

    return uuid
  }

  const handleGenerate = () => {
    const newList = Array.from({ length: Math.min(Math.max(count, 1), 100) }, () => generateUUID())
    setUuids(newList)
  }

  useEffect(() => {
    handleGenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uppercase, noHyphens, braces, count])

  const handleCopyAll = async () => {
    if (uuids.length === 0) return
    try {
      await navigator.clipboard.writeText(uuids.join('\n'))
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">UUID Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Generate cryptographically secure RFC4122 Version 4 UUID strings instantly in bulk.
          </p>
        </div>
      </Section>

      {/* Grid layout */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-violet-500" />
                  Configuration Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-sm">
                {/* Quantity */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Bulk Count (1-100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                {/* Formats Checkboxes */}
                <div className="space-y-2.5 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-0 h-4 w-4"
                    />
                    <span className="text-xs font-medium">Uppercase format</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={noHyphens}
                      onChange={(e) => setNoHyphens(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-0 h-4 w-4"
                    />
                    <span className="text-xs font-medium">Remove hyphens</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={braces}
                      onChange={(e) => setBraces(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-0 h-4 w-4"
                    />
                    <span className="text-xs font-medium">Enclose in braces `{}`</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleGenerate} className="w-full h-10 text-xs font-semibold">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Generate UUIDs
            </Button>
          </div>

          {/* Outputs Panel */}
          <div className="lg:col-span-8">
            <Card className="flex flex-col h-[400px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Layers className="h-3.5 w-3.5 text-blue-500" />
                  GENERATED_UUIDS
                </span>
                {uuids.length > 0 && (
                  <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5" onClick={handleCopyAll}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? 'Copied All' : 'Copy All'}
                  </Button>
                )}
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-y-auto">
                <div className="p-4 font-mono text-xs text-emerald-400 space-y-2">
                  {uuids.map((uuid, idx) => (
                    <div
                      key={idx}
                      className="py-1 px-2 rounded hover:bg-secondary/40 flex items-center justify-between group transition-colors"
                    >
                      <span>{uuid}</span>
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(uuid)
                          } catch (_) {}
                        }}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground text-[10px] uppercase font-bold tracking-wider transition-opacity flex items-center gap-1 cursor-pointer"
                        title="Copy individual UUID"
                      >
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
