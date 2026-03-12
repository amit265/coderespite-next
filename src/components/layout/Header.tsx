'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navItems = {
  '/': { name: 'Home' },
  '/notes': { name: 'Notes' },
  '/blog': { name: 'Blog' },
  '/projects': { name: 'Projects' },
  '/learn': { name: 'Learn' },
  '/apps': { name: 'Apps' },
  '/about': { name: 'About' },
}

export function Header() {
  const pathname = usePathname()

  return (
    <header className="mb-16">
      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={clsx(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                  )}
                >
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}