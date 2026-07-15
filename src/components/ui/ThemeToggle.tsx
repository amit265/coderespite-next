'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-border/40 bg-secondary/50" />
    )
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="relative h-9 w-9 rounded-lg border border-border/40 bg-card hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-[18px] w-[18px] text-yellow-500 animate-spin-slow" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-indigo-600" />
      )}
    </button>
  )
}
