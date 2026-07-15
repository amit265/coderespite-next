'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { QrCode, Check, Copy, Download, RefreshCw, Globe } from 'lucide-react'

export default function QRGeneratorPage() {
  const [text, setText] = useState('https://coderespite.com')
  const [size, setSize] = useState(250)
  const [qrUrl, setQrUrl] = useState('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fcoderespite.com')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!text.trim()) return
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text.trim())}`
    setQrUrl(url)
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">QR Code Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Convert links, configurations, or texts into clean, high-resolution SVG/PNG QR codes instantly.
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
                  <Globe className="h-4 w-4 text-violet-500" />
                  QR Config parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-sm">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Payload Data (URL or Text)</label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g. https://your-domain.com"
                    className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Resolution Size ({size}x{size} px)</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-xs outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="150">150 x 150 (Compact)</option>
                    <option value="250">250 x 250 (Standard)</option>
                    <option value="500">500 x 500 (High-Res)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleGenerate} className="w-full h-10 text-xs font-semibold">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Generate QR Code
            </Button>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 flex flex-col items-center gap-4">
            <Card className="p-6 flex flex-col items-center justify-center border-border/40 bg-card/60 w-full md:w-auto min-w-[320px]">
              {/* Image Frame */}
              <div className="p-4 rounded-xl bg-white border border-border flex items-center justify-center shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="Generated QR Code"
                  className="h-48 w-48 select-none"
                  loading="lazy"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 mt-6 w-full max-w-[250px]">
                <a href={qrUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Open Image
                  </Button>
                </a>
                <Button variant="secondary" size="sm" onClick={handleCopyUrl} className="flex-1 text-xs">
                  {copied ? <Check className="mr-1 h-3.5 w-3.5 text-emerald-500" /> : <Copy className="mr-1 h-3.5 w-3.5" />}
                  Copy Link
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
