'use client'

import Image from 'next/image'
import { ExternalLink, Github, Apple } from 'lucide-react'

interface ProjectProps {
  title: string
  description: string
  live: string
  github: string
  image: string
  id: string
  appleStore?: string | null
}

export function ProjectCard({ title, description, live, github, image, appleStore }: ProjectProps) {
  const isMobile = !!appleStore || live.includes('play.google.com')

  return (
    <div className="group flex flex-col bg-secondary/30 rounded-xl overflow-hidden border border-muted hover:border-primary/50 transition-all duration-300">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <Image
          src={`/projects/${image}.png`}
          alt={title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-muted/50">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {isMobile ? 'Play Store' : 'Live Demo'}
          </a>
          
          {appleStore && (
            <a
              href={appleStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <Apple className="h-3.5 w-3.5" />
              App Store
            </a>
          )}

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            Source
          </a>
        </div>
      </div>
    </div>
  )
}
