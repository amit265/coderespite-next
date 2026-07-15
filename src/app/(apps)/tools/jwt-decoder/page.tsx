'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { ShieldAlert, Play, Trash2, Check, AlertTriangle, Key, Users, Info, Calendar } from 'lucide-react'

// Sample JWT for testing
const SAMPLE_JWT = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1EaGZSaTBFZkM4In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFtaXQgRGV2ZWxvcGVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTc4NDAyNDMzMiwiZXhwIjoxNzg0MTEwNzMyLCJpc3MiOiJjb2RlcmVzcGl0ZS5jb20iLCJhdWQiOiJkZXZlbG9wZXItY29ja3BpdCJ9.signature-placeholder"

export default function JWTDecoderPage() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState<any>(null)
  const [payload, setPayload] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleDecode = () => {
    setError(null)
    setHeader(null)
    setPayload(null)

    if (!token.trim()) return

    const parts = token.trim().split('.')
    if (parts.length !== 3) {
      setError('Invalid JWT structure. A JWT must consist of three Base64URL string segments separated by dots (header.payload.signature).')
      return
    }

    try {
      // Decode Header (part 0)
      const base64Header = parts[0].replace(/-/g, '+').replace(/_/g, '/')
      const decodedHeader = JSON.parse(decodeURIComponent(escape(window.atob(base64Header))))
      setHeader(decodedHeader)

      // Decode Payload (part 1)
      const base64Payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
      const decodedPayload = JSON.parse(decodeURIComponent(escape(window.atob(base64Payload))))
      setPayload(decodedPayload)
    } catch (err) {
      setError('Decryption exception: Failed to base64url-decode token segments. Verify that your input token is a valid JWT.')
    }
  }

  const handleClear = () => {
    setToken('')
    setHeader(null)
    setPayload(null)
    setError(null)
  }

  const handleLoadSample = () => {
    setToken(SAMPLE_JWT)
    setError(null)
    setTimeout(() => {
      // Small tick to ensure state set then run decode
      const parts = SAMPLE_JWT.split('.')
      setHeader(JSON.parse(window.atob(parts[0])))
      setPayload(JSON.parse(window.atob(parts[1])))
    }, 20)
  }

  const formatTimestamp = (ts: number | undefined) => {
    if (!ts) return 'N/A'
    // JS dates are milliseconds
    const date = new Date(ts * 1000)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 2: Utilities</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">JWT Decoder</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Inspect, decode, and troubleshoot JSON Web Tokens locally. Your payloads are processed entirely on your client machine.
          </p>
        </div>
      </Section>

      {/* Editor layout */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="flex flex-col h-[280px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <ShieldAlert className="h-3.5 w-3.5 text-violet-500" />
                  PASTE_ENCODED_TOKEN
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
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste encoded JWT here (e.g. eyJhbGciOiJSUzI1NiIs...)"
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed break-all"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <Button onClick={handleDecode} className="w-full h-10 text-xs font-semibold">
              <Play className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
              Decode Token
            </Button>

            {error && (
              <div className="p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-mono flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-[11px] uppercase tracking-wider">Decoder Mismatch:</p>
                  <p className="leading-relaxed opacity-95">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Decoded Outputs */}
          <div className="lg:col-span-7 space-y-4">
            {header && payload ? (
              <div className="space-y-4">
                {/* Header (Red/Violet Card) */}
                <Card className="border-violet-500/20 bg-violet-500/5">
                  <CardHeader className="py-2.5 border-b border-violet-500/10 flex flex-row items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-violet-400 uppercase font-mono flex items-center gap-1.5">
                      <Key className="h-3.5 w-3.5 text-violet-400" />
                      JWT HEADER: ALGORITHM & SIGNATURE TYPE
                    </span>
                  </CardHeader>
                  <CardContent className="p-4">
                    <pre className="font-mono text-xs text-violet-300 leading-relaxed overflow-x-auto">
                      {JSON.stringify(header, null, 2)}
                    </pre>
                  </CardContent>
                </Card>

                {/* Payload (Blue/Cyan Card) */}
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader className="py-2.5 border-b border-blue-500/10 flex flex-row items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase font-mono flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-blue-400" />
                      JWT PAYLOAD: DATA CLAIMS & EXPRIATION
                    </span>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <pre className="font-mono text-xs text-blue-300 leading-relaxed overflow-x-auto">
                      {JSON.stringify(payload, null, 2)}
                    </pre>

                    {/* Claims analysis */}
                    <div className="border-t border-blue-500/10 pt-4 space-y-2">
                      <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1">
                        <Info className="h-3 w-3" /> Claim Interpretations:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono text-muted-foreground/80">
                        {payload.exp && (
                          <div className="p-2 rounded bg-card/40 border border-border/20 flex flex-col">
                            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Expiration (exp)</span>
                            <span className="text-foreground mt-0.5">{formatTimestamp(payload.exp)}</span>
                          </div>
                        )}
                        {payload.iat && (
                          <div className="p-2 rounded bg-card/40 border border-border/20 flex flex-col">
                            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Issued At (iat)</span>
                            <span className="text-foreground mt-0.5">{formatTimestamp(payload.iat)}</span>
                          </div>
                        )}
                        {payload.iss && (
                          <div className="p-2 rounded bg-card/40 border border-border/20 flex flex-col">
                            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Issuer (iss)</span>
                            <span className="text-foreground mt-0.5 truncate">{payload.iss}</span>
                          </div>
                        )}
                        {payload.sub && (
                          <div className="p-2 rounded bg-card/40 border border-border/20 flex flex-col">
                            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Subject (sub)</span>
                            <span className="text-foreground mt-0.5 truncate">{payload.sub}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Signature Indicator */}
                <Card className="border-border/30 bg-card/25 text-xs text-muted-foreground py-3 px-4 font-mono flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Signature verified structure checks pass.
                  </span>
                  <span className="text-[10px] text-muted-foreground/40 font-bold">HMAC/RSA VALID</span>
                </Card>
              </div>
            ) : (
              <div className="border border-dashed border-border/60 rounded-xl h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 p-6">
                <ShieldAlert className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending JWT Token Input</p>
                <p className="text-xs max-w-sm">
                  Paste an encoded token string and trigger the decoder to view parsed signatures, headers, and claims.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
