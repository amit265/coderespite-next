'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Palette, Copy, Check, RefreshCw } from 'lucide-react'

export default function GradientGeneratorPage() {
  const [color1, setColor1] = useState('#8b5cf6')
  const [color2, setColor2] = useState('#ec4899')
  const [direction, setDirection] = useState('to right')
  const [copied, setCopied] = useState(false)

  const cssCode = `background: linear-gradient(${direction}, ${color1}, ${color2});`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssCode)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">CSS Gradient Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Create high-performance linear gradients and export copy-ready cross-browser CSS styles parameters.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader className="py-3 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-xs font-semibold flex items-center gap-2 font-mono">
                  <Palette className="h-4 w-4 text-violet-500" />
                  GRADIENT_STOPS_CONFIG
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-sm font-sans">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Color Stop 1</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="h-8 w-8 rounded border border-border cursor-pointer p-0"
                      />
                      <input
                        type="text"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="flex-1 h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Color Stop 2</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="h-8 w-8 rounded border border-border cursor-pointer p-0"
                      />
                      <input
                        type="text"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="flex-1 h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase block">Direction angle</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  >
                    <option value="to right">To Right (→)</option>
                    <option value="to left">To Left (←)</option>
                    <option value="to bottom">To Bottom (↓)</option>
                    <option value="to top">To Top (↑)</option>
                    <option value="45deg">45 degrees (↗)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visual Output & CSS */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="p-1 border-border/40 bg-card/60 overflow-hidden h-32 rounded-xl">
              <div
                className="w-full h-full rounded-lg"
                style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
              />
            </Card>

            <Card className="border-border/40 bg-card/60">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 font-mono">CSS_CODE_OUTPUT</span>
                <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2" onClick={handleCopy}>
                  {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  Copy Code
                </Button>
              </CardHeader>
              <CardContent className="p-4 bg-black/10">
                <pre className="font-mono text-xs text-emerald-400 overflow-x-auto">
                  <code>{cssCode}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
