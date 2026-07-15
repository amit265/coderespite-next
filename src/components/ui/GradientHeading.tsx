'use client'

import * as React from 'react'
import clsx from 'clsx'

export interface GradientHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  gradient?: string
}

export function GradientHeading({
  children,
  className,
  as: Component = 'h1',
  gradient = 'from-violet-500 via-indigo-500 to-cyan-500',
  ...props
}: GradientHeadingProps) {
  return (
    <Component
      className={clsx(
        'font-extrabold tracking-tight bg-gradient-to-r bg-clip-text text-transparent pb-1',
        gradient,
        {
          'text-4xl sm:text-5xl md:text-6xl': Component === 'h1',
          'text-2xl sm:text-3xl md:text-4xl': Component === 'h2',
          'text-xl sm:text-2xl': Component === 'h3',
          'text-lg sm:text-xl': Component === 'h4',
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
