'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileCode, Check, Copy, Loader2, Sparkles, Terminal } from 'lucide-react'

export default function SchemaGeneratorPage() {
  const [params, setParams] = useState({
    title: 'How to build state systems',
    author: 'Jani Developer',
    description: 'An advanced breakdown of react rendering lifecycles.',
    url: 'https://coderespite.com/learn/react'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': params.title,
        'description': params.description,
        'author': {
          '@type': 'Person',
          'name': params.author
        },
        'url': params.url
      }
      setResult(JSON.stringify(schema, null, 2))
      setLoading(false)
    }, 800)
  }

  const handleClear = () => {
    setParams({ title: '', author: '', description: '', url: '' })
    setResult(null)
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(`<script type="application/ld+json">\n${result}\n</script>`)
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
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">SEO Schema Generator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Build schema.org structured JSON-LD data modules to improve site indexing search visibility scores.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-violet-500" />
                  Structured parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3.5 text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Headline Title</label>
                  <input
                    type="text"
                    value={params.title}
                    onChange={(e) => setParams({ ...params, title: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Author Name</label>
                  <input
                    type="text"
                    value={params.author}
                    onChange={(e) => setParams({ ...params, author: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Description</label>
                  <textarea
                    value={params.description}
                    onChange={(e) => setParams({ ...params, description: e.target.value })}
                    className="w-full h-16 p-2 rounded border border-border bg-card font-mono text-xs outline-none resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Article URL</label>
                  <input
                    type="text"
                    value={params.url}
                    onChange={(e) => setParams({ ...params, url: e.target.value })}
                    className="w-full h-8 px-2 rounded border border-border bg-card font-mono text-xs outline-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              className="w-full h-10 text-xs font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Schema...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  Generate JSON-LD Schema
                </>
              )}
            </Button>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7">
            {result ? (
              <Card className="border-border/40 bg-card/60">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
                  <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                    <FileCode className="h-3.5 w-3.5 text-emerald-500" />
                    JSON_LD_SCRIPT_BLOCK
                  </span>
                  <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2.5" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    Copy Tag
                  </Button>
                </CardHeader>
                <CardContent className="p-4 bg-black/10">
                  <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
                    <code>{`<script type="application/ld+json">\n${result}\n</script>`}</code>
                  </pre>
                </CardContent>
              </Card>
            ) : (
              <div className="border border-dashed border-border/60 rounded-xl h-[340px] flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 p-6">
                <FileCode className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/80">Pending Inputs</p>
                <p className="text-xs max-w-sm">
                  Complete criteria parameters on the left to structure JSON-LD tags.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
