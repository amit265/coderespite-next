'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Key, Check, Copy, RefreshCw, AlertTriangle } from 'lucide-react'

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let charset = ''
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!charset) {
      setPassword('')
      return
    }

    let generated = ''
    const array = new Uint32Array(length)
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array)
      for (let i = 0; i < length; i++) {
        generated += charset[array[i] % charset.length]
      }
    } else {
      // Fallback
      for (let i = 0; i < length; i++) {
        generated += charset.charAt(Math.floor(Math.random() * charset.length))
      }
    }

    setPassword(generated)
  }

  // Calculate entropy and strength
  const getStrengthMetrics = () => {
    let poolSize = 0
    if (includeLowercase) poolSize += 26
    if (includeUppercase) poolSize += 26
    if (includeNumbers) poolSize += 10
    if (includeSymbols) poolSize += 28 // approximate symbols list

    if (poolSize === 0 || length === 0) return { bits: 0, text: 'No entropy', color: 'text-rose-500 bg-rose-500/10' }

    // Entropy formula: H = L * log2(R)
    const bits = Math.round(length * (Math.log(poolSize) / Math.log(2)))

    let text = 'Weak'
    let color = 'text-rose-500 bg-rose-500/10 border-rose-500/20'

    if (bits >= 128) {
      text = 'Paranoid / Military-Grade'
      color = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    } else if (bits >= 80) {
      text = 'Very Strong'
      color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    } else if (bits >= 50) {
      text = 'Strong'
      color = 'text-green-500 bg-green-500/10 border-green-500/20'
    } else if (bits >= 36) {
      text = 'Medium'
      color = 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    }

    return { bits, text, color }
  }

  useEffect(() => {
    generatePassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const handleCopy = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  const { bits, text, color } = getStrengthMetrics()

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Password Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Construct high-entropy, cryptographically secure random credentials locally.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Key className="h-4 w-4 text-violet-500" />
                  Entropy Options
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-5 text-sm">
                {/* Length Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-muted-foreground">Password Length</span>
                    <span className="font-mono font-bold text-foreground bg-secondary px-2 py-0.5 rounded">{length} chars</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Character inclusions */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-0 h-4 w-4"
                    />
                    <span className="text-xs font-medium">Lowercase letters (a-z)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-0 h-4 w-4"
                    />
                    <span className="text-xs font-medium">Uppercase letters (A-Z)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-0 h-4 w-4"
                    />
                    <span className="text-xs font-medium">Numeric digits (0-9)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-0 h-4 w-4"
                    />
                    <span className="text-xs font-medium">Special symbols (!@#$%...)</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Button onClick={generatePassword} className="w-full h-10 text-xs font-semibold">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Generate Password
            </Button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 space-y-4">
            {/* Display screen */}
            <Card className="bg-black/10 border-border/40">
              <CardContent className="p-6 flex flex-col items-center justify-between min-h-[140px] gap-4">
                <span className="font-mono text-base md:text-xl text-center break-all select-all font-bold tracking-wider text-emerald-400">
                  {password || <span className="text-muted-foreground/35 italic">Select character groups...</span>}
                </span>

                {password && (
                  <Button variant="secondary" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="mr-1 h-3.5 w-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3.5 w-3.5" />
                        <span>Copy Password</span>
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Strength meter */}
            {password && (
              <Card className={`border ${color}`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Security Rating</div>
                    <div className="text-sm font-extrabold">{text}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Entropy</div>
                    <div className="text-sm font-mono font-bold">{bits} Bits</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
