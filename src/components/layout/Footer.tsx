'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export function Footer() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <footer className="mt-20 flex justify-center">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full transition-colors hover:bg-secondary"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Moon className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
    </footer>
  )
}