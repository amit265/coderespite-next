'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { User, Bookmark, History, Settings, ExternalLink, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function UserDashboardPage() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [prefTheme, setPrefTheme] = useState('dark')

  useEffect(() => {
    // Load local storage states
    const savedBookmarks = localStorage.getItem('coderespite_bookmarks')
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    } else {
      // Default presets
      const defaults = ['JSON Formatter', 'Code Explainer', 'Diff Checker']
      setBookmarks(defaults)
      localStorage.setItem('coderespite_bookmarks', JSON.stringify(defaults))
    }

    const savedHistory = localStorage.getItem('coderespite_history')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    } else {
      const defaults = ['/tools/json-formatter', '/ai/code-explainer', '/templates/readme-template']
      setHistory(defaults)
      localStorage.setItem('coderespite_history', JSON.stringify(defaults))
    }
  }, [])

  const handleClearHistory = () => {
    localStorage.removeItem('coderespite_history')
    setHistory([])
  }

  const handleRemoveBookmark = (item: string) => {
    const updated = bookmarks.filter(b => b !== item)
    setBookmarks(updated)
    localStorage.setItem('coderespite_bookmarks', JSON.stringify(updated))
  }

  return (
    <div className="space-y-12">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold">
            <User className="h-3.5 w-3.5" />
            <span>Developer Workspace Cockpit</span>
          </div>
          <GradientHeading as="h1">Personal Cockpit</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Manage your bookmarks, track reading progress logs, and adjust compiler defaults inside your persistent local browser workbench workspace.
          </p>
        </div>
      </Section>

      {/* Content Grid */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Bookmarks & History */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bookmarks */}
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-violet-500" />
                  Saved Tools & Assistants ({bookmarks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 font-mono text-xs">
                {bookmarks.length > 0 ? (
                  bookmarks.map((bookmark) => (
                    <div key={bookmark} className="flex items-center justify-between p-2 rounded bg-black/10 border border-border/40">
                      <span className="text-foreground">{bookmark}</span>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] text-destructive hover:bg-destructive/10 px-2" onClick={() => handleRemoveBookmark(bookmark)}>
                        Remove
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground/60 text-center py-4">No bookmarks added yet.</p>
                )}
              </CardContent>
            </Card>

            {/* Reading History */}
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <History className="h-4 w-4 text-blue-500" />
                  Recently Visited Logs ({history.length})
                </CardTitle>
                {history.length > 0 && (
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] text-destructive px-2" onClick={handleClearHistory}>
                    Clear
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-4 space-y-3 font-mono text-xs">
                {history.length > 0 ? (
                  history.map((path, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-black/10 border border-border/40">
                      <span className="text-muted-foreground">{path}</span>
                      <Link href={path}>
                        <Button variant="ghost" size="sm" className="h-6 text-[10px] flex items-center gap-1">
                          Visit <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground/60 text-center py-4">No recent history logs recorded.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right panel: Preferences */}
          <div className="lg:col-span-4">
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Settings className="h-4 w-4 text-emerald-500" />
                  Workbench Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="text-muted-foreground font-bold uppercase tracking-wider block">Default Theme Mode</label>
                  <select
                    value={prefTheme}
                    onChange={(e) => setPrefTheme(e.target.value)}
                    className="w-full h-8 px-2 rounded border border-border bg-card outline-none"
                  >
                    <option value="dark">Obsidian Dark (First-class)</option>
                    <option value="light">Solarized Light</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-muted-foreground font-bold uppercase tracking-wider block">Default Tab Indent</label>
                  <select className="w-full h-8 px-2 rounded border border-border bg-card outline-none">
                    <option>2 Spaces (Standard)</option>
                    <option>4 Spaces</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
