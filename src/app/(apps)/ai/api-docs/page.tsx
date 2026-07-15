'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileCode, Play, Trash2, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function APIDocBuilderPage() {
  const [code, setCode] = useState('')
  const [format, setFormat] = useState<'openapi' | 'markdown'>('openapi')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!code.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      // Extrapolate endpoints
      const hasPost = code.toLowerCase().includes('post')
      const hasGet = code.toLowerCase().includes('get')
      const hasDelete = code.toLowerCase().includes('delete')
      const method = hasPost ? 'POST' : hasDelete ? 'DELETE' : 'GET'

      let path = '/api/v1/resource'
      const matchPath = code.match(/(?:'|")(\/api\/[a-zA-Z0-9_\-\/]+)(?:'|")/)
      if (matchPath && matchPath[1]) {
        path = matchPath[1]
      }

      let spec = ''
      if (format === 'openapi') {
        spec = `{
  "openapi": "3.0.0",
  "info": {
    "title": "CoderRespite Dynamically Parsed API Spec",
    "version": "1.0.0",
    "description": "Generated specification from endpoint source code"
  },
  "paths": {
    "${path}": {
      "${method.toLowerCase()}": {
        "summary": "Auto-generated route handler spec",
        "responses": {
          "200": {
            "description": "Successful operation execution status",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": { "type": "boolean" },
                    "timestamp": { "type": "integer" }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request / Parameter Validation failure exception"
          }
        }
      }
    }
  }
}`
      } else {
        spec = `# API Specification Documentation

### Route: \`${method} ${path}\`
Auto-generated from your local application route handler block.

#### 1. Description
Handler checks parameters, validates authentication scopes, and resolves database collections.

#### 2. Request Details
- **Method**: \`${method}\`
- **Path**: \`${path}\`
- **Headers**:
  - \`Content-Type\`: \`application/json\`
  - \`Authorization\`: \`Bearer <jwt_token>\`

#### 3. Response Schema (200 OK)
\`\`\`json
{
  "success": true,
  "timestamp": ${Math.floor(Date.now() / 1000)}
}
\`\`\`
`
      }

      setResult(spec)
      setLoading(false)
    }, 1200)
  }

  const handleClear = () => {
    setCode('')
    setResult(null)
  }

  const handleLoadSample = () => {
    setCode(`app.post('/api/v1/users/register', async (req, res) => {\n  const { email, password } = req.body;\n  if (!email || !password) {\n    return res.status(400).json({ error: "Missing parameters" });\n  }\n  const user = await DB.users.create({ email, password });\n  res.status(200).json({ success: true, user });\n});`)
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 1: AI Workspace</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">API Document Builder</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Generate OpenAPI specs or Markdown docs from router code blocks dynamically.
          </p>
        </div>
      </Section>

      {/* Layout Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input side */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="flex flex-col h-[280px]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-violet-500" />
                  API_ROUTE_SOURCE
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
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste Express router, Python Flask route, or FastAPI handler here..."
                  className="w-full h-full p-4 font-mono text-xs bg-transparent border-0 outline-none resize-none text-foreground placeholder-muted-foreground/40 leading-relaxed"
                  spellCheck="false"
                />
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                variant={format === 'openapi' ? 'primary' : 'outline'}
                onClick={() => setFormat('openapi')}
                className="flex-1 h-9 text-xs"
              >
                OpenAPI (JSON)
              </Button>
              <Button
                variant={format === 'markdown' ? 'primary' : 'outline'}
                onClick={() => setFormat('markdown')}
                className="flex-1 h-9 text-xs"
              >
                Markdown Doc
              </Button>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !code.trim()}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Specs...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate Specification
                </>
              )}
            </Button>
          </div>

          {/* Output side */}
          <div className="lg:col-span-7">
            {result ? (
              <Card className="border-border/40 bg-card/60">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    <FileCode className="h-3.5 w-3.5 text-emerald-500" />
                    AUTO_GENERATED_SPECIFICATION
                  </span>
                  <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2.5" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </CardHeader>
                <CardContent className="p-4 bg-black/10">
                  <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[380px]">
                    <code>{result}</code>
                  </pre>
                </CardContent>
              </Card>
            ) : (
              <div className="border border-dashed border-border/60 rounded-xl h-[340px] flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 p-6">
                <FileCode className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Code Input</p>
                <p className="text-xs max-w-sm">
                  Provide route handles on the left and select spec configurations to generate details.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
