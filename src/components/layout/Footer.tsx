'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Github, Twitter, Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <footer className="mt-32 pb-16 border-t border-border/40 pt-16">
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-6 items-center">
          <a
            href="https://github.com/amit265"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/amit_265"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="mailto:hello@coderespite.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-secondary text-muted-foreground hover:text-primary"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-medium text-muted-foreground/60 uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="/notes" className="hover:text-primary transition-colors">Notes</Link>
          <Link href="/apps" className="hover:text-primary transition-colors">Apps</Link>
          <Link href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</Link>
        </div>

        <p className="text-xs text-muted-foreground/40 text-center">
          © {new Date().getFullYear()} Code Respite. Built with focus.
        </p>
      </div>
    </footer>
  )
}