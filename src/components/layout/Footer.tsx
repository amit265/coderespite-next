'use client'

import { Github, Twitter, Mail, Terminal } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 mt-32 py-12 md:py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Pitch */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white">
                <Terminal className="h-3.5 w-3.5" />
              </div>
              <span className="font-bold text-base tracking-tight">
                CodeRespite
              </span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed">
              A premium, high-speed ecosystem designed to help developers learn faster, build faster, and debug smarter.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/amit265"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/amit_265"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@coderespite.in"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground/80">Ecosystem</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/ai" className="hover:text-primary transition-colors">
                  AI Workspace
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-primary transition-colors">
                  Developer Utilities
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-primary transition-colors">
                  Resource Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Content Hubs */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground/80">Content Hubs</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/learn" className="hover:text-primary transition-colors">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link href="/debug" className="hover:text-primary transition-colors">
                  Debug Hub
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Projects & Build Logs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground/80">Resources</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/career" className="hover:text-primary transition-colors">
                  Career Center
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-primary transition-colors">
                  Templates & Boilerplates
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-primary transition-colors">
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <p>© {new Date().getFullYear()} CodeRespite. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}