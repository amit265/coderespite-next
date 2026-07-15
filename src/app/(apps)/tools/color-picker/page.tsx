'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Palette, Check, Copy } from 'lucide-react'

export default function ColorPickerPage() {
  const [color, setColor] = useState('#6366f1')
  const [copied, setCopied] = useState(false)

  // Hex to RGB
  const getRgb = () => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return isNaN(r) ? 'rgb(99, 102, 241)' : `rgb(${r}, ${g}, ${b})`
  }

  // Hex to HSL
  const getHsl = () => {
    const hex = color.replace('#', '')
    let r = parseInt(hex.substring(0, 2), 16) / 255
    let g = parseInt(hex.substring(2, 4), 16) / 255
    let b = parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    let l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    h = Math.round(h * 360)
    s = Math.round(s * 100)
    l = Math.round(l * 100)

    return isNaN(h) ? 'hsl(240, 84%, 67%)' : `hsl(${h}, ${s}%, ${l}%)`
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Color Picker & Converter</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Generate and translate visual colors into Hex, RGB, and HSL style sheets format values locally.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-items-stretch">
          {/* Picker Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Card className="flex flex-col items-center justify-center p-6 bg-card/60">
              <div className="relative h-32 w-32 rounded-xl overflow-hidden shadow-lg border border-border/80">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute inset-0 h-full w-full border-0 outline-none cursor-pointer p-0 opacity-0"
                />
                <div
                  className="h-full w-full"
                  style={{ backgroundColor: color }}
                />
              </div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground mt-4 block">
                Click color node to select
              </span>
            </Card>
          </div>

          {/* Code outputs */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="border-border/40 bg-card/60">
              <CardHeader className="py-3 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-xs font-bold tracking-wider font-mono flex items-center gap-2">
                  <Palette className="h-4 w-4 text-violet-500" />
                  CSS_STYLE_OUTPUTS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4 font-mono text-xs">
                {/* HEX */}
                <div className="flex items-center justify-between p-2 rounded bg-black/10 border border-border/40">
                  <div>
                    <span className="text-[9px] text-violet-400 font-bold block uppercase tracking-wider">HEX Code</span>
                    <span className="text-foreground">{color}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={() => handleCopy(color)}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* RGB */}
                <div className="flex items-center justify-between p-2 rounded bg-black/10 border border-border/40">
                  <div>
                    <span className="text-[9px] text-blue-400 font-bold block uppercase tracking-wider">RGB Code</span>
                    <span className="text-foreground">{getRgb()}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={() => handleCopy(getRgb())}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* HSL */}
                <div className="flex items-center justify-between p-2 rounded bg-black/10 border border-border/40">
                  <div>
                    <span className="text-[9px] text-emerald-400 font-bold block uppercase tracking-wider">HSL Code</span>
                    <span className="text-foreground">{getHsl()}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={() => handleCopy(getHsl())}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {copied && (
                  <p className="text-[10px] text-emerald-400 font-bold text-center uppercase tracking-widest animate-pulse">
                    ✓ Copied code value
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
