'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Image as ImageIcon, Play, Check, Download, Upload, Loader2 } from 'lucide-react'

export default function ImageCompressorPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [compressedSrc, setCompressedSrc] = useState<string | null>(null)
  const [quality, setQuality] = useState(0.7)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageSrc(event.target.result as string)
        setCompressedSrc(null)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleCompress = () => {
    if (!imageSrc) return
    setLoading(true)

    setTimeout(() => {
      const img = new Image()
      img.src = imageSrc
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          setLoading(false)
          return
        }

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const compressedData = canvas.toDataURL('image/jpeg', quality)
        setCompressedSrc(compressedData)
        setLoading(false)
      }
    }, 1000)
  }

  const handleDownload = () => {
    if (!compressedSrc) return
    const link = document.createElement('a')
    link.href = compressedSrc
    link.download = 'compressed-coderespite.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClear = () => {
    setImageSrc(null)
    setCompressedSrc(null)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Client Image Compressor</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Scale and compress PNG/JPG files locally within your browser using HTML5 Canvas rendering.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Controls */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Upload className="h-3.5 w-3.5 text-violet-500" />
                IMAGE_COMPRESSION_CONFIG
              </span>
              {imageSrc && (
                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-destructive px-2" onClick={handleClear}>
                  Clear
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-sm flex-1 flex flex-col justify-center">
              {!imageSrc ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-border hover:border-violet-500/40 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 space-y-3"
                >
                  <Upload className="h-10 w-10 text-muted-foreground/30" />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground/80 text-xs sm:text-sm">Upload target image file</p>
                    <p className="text-xs text-muted-foreground/60">Supports PNG, JPG, JPEG up to 10MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-border/60 bg-black/10 flex items-center justify-center">
                    <img src={imageSrc} alt="Raw source" className="max-w-full max-h-[180px] object-contain" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">COMPRESSION QUALITY</span>
                      <span className="text-foreground font-semibold">{Math.round(quality * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-secondary"
                    />
                  </div>

                  <Button
                    onClick={handleCompress}
                    disabled={loading}
                    className="w-full h-10 text-xs font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Running canvas algorithms...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4 text-emerald-400" />
                        Perform Canvas Compression
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Compressed Render */}
          <Card className="flex flex-col">
            <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <ImageIcon className="h-3.5 w-3.5 text-emerald-500" />
                COMPRESSED_PREVIEW
              </span>
              {compressedSrc && (
                <Button variant="primary" size="sm" className="h-6 text-[10px] px-2" onClick={handleDownload}>
                  <Download className="h-3 w-3 mr-1" />
                  Download file
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col items-center justify-center bg-black/5">
              {compressedSrc ? (
                <div className="space-y-4 w-full">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-border/60 bg-black/20 flex items-center justify-center">
                    <img src={compressedSrc} alt="Compressed output" className="max-w-full max-h-[220px] object-contain" />
                  </div>
                  <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs text-center">
                    Successfully compressed using client-side image canvas scaler.
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground space-y-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/30 animate-pulse mx-auto" />
                  <p className="text-sm font-semibold text-foreground/80">Pending Compression</p>
                  <p className="text-xs max-w-xs mx-auto">
                    Select quality factors and click compress to scale assets.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}
