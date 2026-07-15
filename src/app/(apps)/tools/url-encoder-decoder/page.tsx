'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Globe, Check, Copy, Trash2, AlertTriangle, RefreshCw } from 'lucide-react'

export default function URLEncoderDecoderPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleProcess = () => {
    setError(null)
    if (!input.trim()) {
      setOutput('')
      return
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeURIComponent(input)
        setOutput(encoded)
      } else {
        const decoded = decodeURIComponent(input.trim())
        setOutput(decoded)
      }
    } catch (err: any) {
      setError(mode === 'encode' ? 'Failed to encode URL payload.' : 'URI Malformed Exception: Failed to decode percent-encoded value. Verify that the URL contains correct formatting.')
      setOutput('')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(null)
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">URL Encoder & Decoder</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Escape query string parameters safely or translate percent-encoded addresses into clean string values.
          </p>
        </div>
      </Section>

      {/* Mode Selectors */}
      <Section delay={0.08}>
        <div className="flex gap-2 max-w-sm">
          <Button
            variant={mode === 'encode' ? 'primary' : 'outline'}
            onClick={() => {
              setMode('encode')
              handleClear()
            }}
            className="flex-1 h-9 text-xs"
          >
            Encode URL
          </Button>
          <Button
            variant={mode === 'decode' ? 'primary' : 'outline'}
            onClick={() => {
              setMode('decode')
              handleClear()
            }}
            className="flex-1 h-9 text-xs"
          >
            Decode URL
          </Button>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Input Panel */}
          <Card className="flex flex-col h-[320px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Globe className="h-3.5 w-3.5 text-violet-500" />
                {mode === 'encode' ? 'RAW_STRING' : 'ENCODED_URL'}
              </span>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-destructive hover:bg-destructive/10" onClick={handleClear}>
                <Trash2 className="mr-1 h-3 w-3" />
                Clear
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter raw text or query parameters to escape...' : 'Enter percent-encoded URL values to parse...'}
                className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                spellCheck="false"
              />
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="flex flex-col h-[320px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
              <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                <Globe className="h-3.5 w-3.5 text-blue-500" />
                {mode === 'encode' ? 'ENCODED_URL_OUTPUT' : 'DECODED_STRING_OUTPUT'}
              </span>
              {output && (
                <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2.5" onClick={handleCopy}>
                  {copied ? <Check className="mr-1 h-3 w-3 text-emerald-500" /> : <Copy className="mr-1 h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 p-0 relative overflow-hidden bg-black/10">
              {error && (
                <div className="absolute inset-x-4 top-4 p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-mono flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-semibold">URI Exception:</p>
                    <p className="leading-relaxed opacity-90">{error}</p>
                  </div>
                </div>
              )}
              <textarea
                readOnly
                value={output}
                placeholder="Parsed output will display here..."
                className={`w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none leading-relaxed ${
                  error ? 'pt-20 text-rose-400/60' : 'text-emerald-400'
                }`}
                spellCheck="false"
              />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Process Actions */}
      <Section delay={0.16}>
        <Button onClick={handleProcess} className="h-10 px-6 text-xs font-semibold">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
          {mode === 'encode' ? 'Encode URL values' : 'Decode URL values'}
        </Button>
      </Section>
    </div>
  )
}
