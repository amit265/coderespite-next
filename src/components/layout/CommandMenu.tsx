'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Sparkles, Wrench, BookOpen, Bug, Folder, Compass, Terminal } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface CommandItem {
  title: string
  description: string
  href: string
  category: 'AI Workspace' | 'Utilities' | 'Learning Hub' | 'Debug Hub' | 'Pages'
  icon: any
}

const searchRegistry: CommandItem[] = [
  // AI Assistants
  { title: 'Code Explainer & Reviewer', description: 'Deconstruct complex functional blocks and run structural code reviews.', href: '/ai/code-explainer', category: 'AI Workspace', icon: Sparkles },
  { title: 'API Document Builder', description: 'Autogenerate Swagger, OpenAPI, or markdown specifications.', href: '/ai/api-docs', category: 'AI Workspace', icon: Sparkles },
  { title: 'Unit Test Generator', description: 'Produce Jest, Mocha, or PyTest suites targeting edge cases.', href: '/ai/unit-test', category: 'AI Workspace', icon: Sparkles },
  { title: 'SQL & Query Generator', description: 'Transform human language definitions into complex SQL schema queries.', href: '/ai/sql-generator', category: 'AI Workspace', icon: Sparkles },
  { title: 'Commit Message Creator', description: 'Draft clean, semantic commit messages matching Conventional Commits.', href: '/ai/commit-msg', category: 'AI Workspace', icon: Sparkles },
  { title: 'Interactive Interview Simulator', description: 'Run voice or text mock interviews for Senior Engineering positions.', href: '/ai/interview-simulator', category: 'AI Workspace', icon: Sparkles },
  { title: 'Bug Analyzer', description: 'Diagnose stacktraces and compiler exception tracks.', href: '/ai/bug-analyzer', category: 'AI Workspace', icon: Sparkles },
  { title: 'README Generator', description: 'Autogenerate structured, formatted standard README markdown files.', href: '/ai/readme-generator', category: 'AI Workspace', icon: Sparkles },
  { title: 'Regex Generator', description: 'Build complex regular expressions from conversational requests.', href: '/ai/regex-generator', category: 'AI Workspace', icon: Sparkles },
  { title: 'Prompt Optimizer', description: 'Refine raw prompts into structured instructions with context variables.', href: '/ai/prompt-optimizer', category: 'AI Workspace', icon: Sparkles },
  { title: 'Architecture Assistant', description: 'Draft database diagrams and structural tech stack blueprints.', href: '/ai/architecture', category: 'AI Workspace', icon: Sparkles },
  { title: 'Accessibility Audit', description: 'Verify WCAG compliance checks, contrast indicators, and missing aria label attributes.', href: '/ai/accessibility', category: 'AI Workspace', icon: Sparkles },
  { title: 'ATS Resume Builder', description: 'Assemble clean, structured markdown resume profiles optimized for recruiter systems.', href: '/ai/resume-builder', category: 'AI Workspace', icon: Sparkles },
  { title: 'Security Review Assistant', description: 'Audits source code blocks for SQL injection, XSS leaks, and vulnerabilities.', href: '/ai/security-review', category: 'AI Workspace', icon: Sparkles },
  { title: 'Performance Review Assistant', description: 'Scans algorithms complexity bounds to resolve computational loops nesting bloats.', href: '/ai/performance-review', category: 'AI Workspace', icon: Sparkles },
  { title: 'Cover Letter Builder', description: 'Assembles customized, targeted cover letters from achievement descriptions.', href: '/ai/cover-letter', category: 'AI Workspace', icon: Sparkles },

  // Developer Utilities
  { title: 'JSON Formatter & Validator', description: 'Format, validate, and minify JSON inputs.', href: '/tools/json-formatter', category: 'Utilities', icon: Wrench },
  { title: 'JWT Decoder & Inspector', description: 'Inspect and debug JWT structure, headers, and payloads.', href: '/tools/jwt-decoder', category: 'Utilities', icon: Wrench },
  { title: 'UUID Generator', description: 'Generate cryptographically secure random UUIDs.', href: '/tools/uuid-generator', category: 'Utilities', icon: Wrench },
  { title: 'Password Generator', description: 'Generate strong, customizable credentials.', href: '/tools/password-generator', category: 'Utilities', icon: Wrench },
  { title: 'QR Code Generator', description: 'Convert URLs, text, or configs into clean, custom-colored SVG/PNG QR codes.', href: '/tools/qr-generator', category: 'Utilities', icon: Wrench },
  { title: 'Base64 Encoder/Decoder', description: 'Fast UTF-8 safe encoding and decoding of raw string values and file payloads.', href: '/tools/base64', category: 'Utilities', icon: Wrench },
  { title: 'URL Encoder & Decoder', description: 'Strict query string URL-parameter safety escaping and parsing tool.', href: '/tools/url-encoder-decoder', category: 'Utilities', icon: Wrench },
  { title: 'Unix Timestamp Converter', description: 'Format Unix seconds and milliseconds into human timezone representations.', href: '/tools/timestamp', category: 'Utilities', icon: Wrench },
  { title: 'Diff Checker', description: 'Side-by-side or line-by-line file differences comparison console.', href: '/tools/diff-checker', category: 'Utilities', icon: Wrench },
  { title: 'Cron Expression Generator', description: 'Translate crontab schedules into human-readable English timings.', href: '/tools/cron-generator', category: 'Utilities', icon: Wrench },
  { title: 'Color Picker & Converter', description: 'Pick visual colors and translate them to HEX, RGB, and HSL formatting codes.', href: '/tools/color-picker', category: 'Utilities', icon: Wrench },
  { title: 'Markdown Preview', description: 'Compile and render raw markdown code blocks into rich HTML previews.', href: '/tools/markdown-preview', category: 'Utilities', icon: Wrench },
  { title: 'Cryptographic Hash Generator', description: 'Calculate secure SHA-1, SHA-256, and MD5 message digests client-side.', href: '/tools/hash-generator', category: 'Utilities', icon: Wrench },
  { title: 'Regex Tester & Validator', description: 'Validate regular expression patterns against test strings with live highlights.', href: '/tools/regex-tester', category: 'Utilities', icon: Wrench },
  { title: 'SQL Formatter & Beautifier', description: 'Format, uppercase, and beautify unaligned SQL queries locally.', href: '/tools/sql-formatter', category: 'Utilities', icon: Wrench },
  { title: 'CSS Gradient Generator', description: 'Create linear gradients and export copy-ready cross-browser CSS styles.', href: '/tools/gradient-generator', category: 'Utilities', icon: Wrench },
  { title: 'HTML & CSS Previewer', description: 'Render raw HTML templates and CSS style sheets within a live preview.', href: '/tools/html-preview', category: 'Utilities', icon: Wrench },
  { title: 'YAML Formatter', description: 'Beautify, clean, and fix indentations of unformatted YAML properties.', href: '/tools/yaml-formatter', category: 'Utilities', icon: Wrench },
  { title: 'XML Formatter', description: 'Beautify, indent, and format nested XML markup tags structure.', href: '/tools/xml-formatter', category: 'Utilities', icon: Wrench },
  { title: 'CSV Table Formatter', description: 'Convert comma-separated values (CSV) into clean, readable responsive preview tables.', href: '/tools/csv-formatter', category: 'Utilities', icon: Wrench },
  { title: 'Meta Tag Generator', description: 'Generate clean HTML and Open Graph (OG) meta tags to optimize SEO.', href: '/tools/meta-tag-generator', category: 'Utilities', icon: Wrench },
  { title: 'robots.txt Generator', description: 'Configure search crawler access configurations and generate standard robots.txt directives.', href: '/tools/robots-txt-generator', category: 'Utilities', icon: Wrench },
  { title: 'SEO Schema Generator', description: 'Build schema.org structured JSON-LD data modules to improve site indexing.', href: '/tools/schema-generator', category: 'Utilities', icon: Wrench },
  { title: 'sitemap.xml Generator', description: 'Convert a list of URLs into a search-engine-readable XML sitemap index.', href: '/tools/sitemap-generator', category: 'Utilities', icon: Wrench },
  { title: 'Client Image Compressor', description: 'Scale and compress PNG/JPG files locally within your browser using Canvas.', href: '/tools/image-compressor', category: 'Utilities', icon: Wrench },
  { title: 'SVG Code Optimizer', description: 'Minify SVG file components by cleaning comments, XML schemas, and double spacings.', href: '/tools/svg-optimizer', category: 'Utilities', icon: Wrench },

  // Learning Hub
  { title: 'Advanced React State Management Guide', description: 'Master component mounting, render lifecycles, and hydration.', href: '/learn/react/state-management', category: 'Learning Hub', icon: BookOpen },
  { title: 'Strict TSConfig Rules Guide', description: 'A comprehensive guide detailing tsconfig strict properties.', href: '/learn/typescript/tsconfig-guide', category: 'Learning Hub', icon: BookOpen },
  { title: 'Distributed Systems Scaling Tutorial', description: 'A developer guide mapping load balancers and sharding.', href: '/learn/systems/scaling', category: 'Learning Hub', icon: BookOpen },

  // Debug Hub
  { title: 'React Hydration Mismatch Fix', description: 'Troubleshoot HTML structure discrepancies.', href: '/debug/react/hydration-error', category: 'Debug Hub', icon: Bug },
  { title: 'CORS Mismatch Fixes', description: 'Solve cross-origin resource sharing errors.', href: '/debug/web/cors-policy', category: 'Debug Hub', icon: Bug },
  { title: 'NPM Dependency Conflicts', description: 'Resolve peer dependencies collisions and broken cache hashes.', href: '/debug/package-managers/npm-conflicts', category: 'Debug Hub', icon: Bug },

  // Pages & Collections
  { title: 'Projects & Build Logs', description: 'Engineering case studies and site build logs.', href: '/projects', category: 'Pages', icon: Folder },
  { title: 'Career Center', description: 'ATS analysis, interview prep, and salary roadmaps.', href: '/career', category: 'Pages', icon: Compass },
  { title: 'Resource Library', description: 'Curated list of frameworks, APIs, databases, and assets.', href: '/resources', category: 'Pages', icon: Compass },
  { title: 'Templates Directory', description: 'Production-ready file configurations and docker boilerplates.', href: '/templates', category: 'Pages', icon: Folder },
  { title: 'Personal Dashboard', description: 'Workspace bookmarks, history tracker, and configs cockpit.', href: '/dashboard', category: 'Pages', icon: Compass },
  { title: 'GitHub Profile README Builder', description: 'Generate clean, modern markdown profile README blocks with icons and stack indicators.', href: '/templates/github-profile', category: 'Pages', icon: Folder },
  { title: 'Portfolio Layout Configuration', description: 'Generate JSON configurations to customize layouts of static site portfolio builders.', href: '/templates/portfolio', category: 'Pages', icon: Folder },
  { title: 'API Endpoint Documentation Schema', description: 'Draft REST API path parameters, request headers, and response layouts in markdown.', href: '/templates/api-docs', category: 'Pages', icon: Folder },
  { title: 'ATS Resume Optimizer', description: 'Analyze resume copy matches against key target job description keywords.', href: '/career/resume-review', category: 'Pages', icon: Compass },
  { title: 'Software Engineering Salary Guides', description: 'Analyze total compensations, equity packages, and base figures.', href: '/career/salary-guides', category: 'Pages', icon: Compass },
]

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Listen to keyboard events and dispatcher
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const handleToggleEvent = () => {
      setIsOpen((prev) => !prev)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('toggle-search', handleToggleEvent)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('toggle-search', handleToggleEvent)
    }
  }, [])

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Filter registry
  const filtered = searchRegistry.filter((item) => {
    const matchStr = `${item.title} ${item.description} ${item.category}`.toLowerCase()
    return matchStr.includes(query.toLowerCase())
  })

  // Handle keyboard list navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filtered.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filtered.length)
      scrollIntoView(selectedIndex + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
      scrollIntoView(selectedIndex - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = filtered[selectedIndex]
      if (selected) {
        router.push(selected.href)
        setIsOpen(false)
      }
    }
  }

  // Keep selected item in view
  const scrollIntoView = (index: number) => {
    if (!listRef.current) return
    const container = listRef.current
    const items = container.querySelectorAll('.command-item')
    const target = items[index % filtered.length] as HTMLElement
    if (target) {
      const containerTop = container.scrollTop
      const containerBottom = containerTop + container.clientHeight
      const elemTop = target.offsetTop
      const elemBottom = elemTop + target.clientHeight

      if (elemTop < containerTop) {
        container.scrollTop = elemTop
      } else if (elemBottom > containerBottom) {
        container.scrollTop = elemBottom - container.clientHeight
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onKeyDown={handleKeyDown}
            className="relative w-full max-w-xl mx-4 bg-card border border-border/80 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 border-b border-border/40 h-12 bg-secondary/20">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search resources, utilities, help sheets..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                className="w-full bg-transparent border-0 outline-none text-sm text-foreground placeholder-muted-foreground/60 h-full"
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/60 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shrink-0">
                ESC
              </kbd>
            </div>

            {/* List Content */}
            <div
              ref={listRef}
              className="max-h-[320px] overflow-y-auto p-2 space-y-1"
            >
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const Icon = item.icon
                  const isSelected = idx === selectedIndex
                  return (
                    <button
                      key={item.href + '-' + idx}
                      onClick={() => {
                        router.push(item.href)
                        setIsOpen(false)
                      }}
                      className={`command-item w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                        isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/40 text-muted-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded bg-secondary/80 border border-border/10 shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold truncate ${isSelected ? 'text-foreground' : 'text-foreground/90'}`}>
                            {item.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground/80 truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/40 font-semibold uppercase shrink-0 tracking-wider">
                        {item.category}
                      </span>
                    </button>
                  )
                })
              ) : (
                <div className="py-12 text-center text-sm text-muted-foreground space-y-2">
                  <Terminal className="h-6 w-6 mx-auto text-muted-foreground/40" />
                  <p>No results found for &quot;<span className="text-foreground">{query}</span>&quot;</p>
                </div>
              )}
            </div>

            {/* Footer help guide */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border/20 bg-secondary/10 text-[10px] text-muted-foreground/60">
              <div className="flex gap-4">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
              <span>CoderRespite search console</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
