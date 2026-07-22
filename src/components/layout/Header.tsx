'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'
import { Menu, X, Search, Terminal } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { AnimatePresence, motion } from 'framer-motion'

const navItems = [
  { path: '/ai', name: 'AI Workspace' },
  { path: '/tools', name: 'Utilities' },
  { path: '/learn', name: 'Learning Hub' },
  { path: '/debug', name: 'Debug Hub' },
  { path: '/career', name: 'Career' },
  { path: '/projects', name: 'Projects' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/10 group-hover:shadow-violet-500/20 transition-all duration-300">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-violet-500 group-hover:to-indigo-500 transition-all duration-300">
            CodeRespite
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ path, name }) => {
            const isActive = pathname.startsWith(path) || (path === '/' && pathname === '/')
            return (
              <Link
                key={path}
                href={path}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                )}
              >
                {name}
              </Link>
            )
          })}
        </nav>

        {/* Actions (Search, Theme, Mobile Toggle) */}
        <div className="flex items-center gap-2">
          {/* Search Trigger Button (Placeholder for cmd+K) */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-search'))}
            className="h-9 px-3 rounded-lg border border-border/40 bg-card hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all duration-200 shadow-sm cursor-pointer active:scale-95 text-xs"
            title="Search (Cmd+K)"
          >
            <Search className="h-4 w-4" />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/60 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>⌘</span>K
            </kbd>
          </button>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden h-9 w-9 rounded-lg border border-border/40 bg-card hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (with AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map(({ path, name }) => {
                const isActive = pathname.startsWith(path) || (path === '/' && pathname === '/')
                return (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                    )}
                  >
                    {name}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}