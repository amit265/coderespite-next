'use client'

import { Section } from '@/components/motion/Section'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

interface ProjectListProps {
  projectsData: any
}

export function ProjectList({ projectsData }: ProjectListProps) {
  const categories = Object.keys(projectsData)
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const isScrollingRef = useRef(false)

  // Handle intersection observer to highlight current category in nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates if we're currently executing a programmatic scroll
        if (isScrollingRef.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id)
          }
        })
      },
      { 
        // Focus on the top 30% of the viewport to determine "active"
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0 
      }
    )

    categories.forEach((cat) => {
      const el = document.getElementById(cat)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [categories])

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      isScrollingRef.current = true
      setActiveCategory(id)
      
      const offset = 120 // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Reset scroll flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col gap-12">
      {/* Sticky Category Navigation */}
      <nav className="sticky top-0 z-20 py-4 bg-background/95 backdrop-blur-md border-b border-muted -mx-4 px-4 overflow-x-auto no-scrollbar">
        <ul className="flex items-center gap-2 min-w-max">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => scrollToCategory(category)}
                className={clsx(
                  'px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border cursor-pointer',
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-secondary/50 text-muted-foreground border-transparent hover:border-muted hover:text-foreground'
                )}
              >
                {category === 'mobile' ? 'React Native' : 
                 category === 'next' ? 'Next.js' : 
                 category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-24 mt-4">
        {categories.map((category) => (
          <div key={category} id={category} className="scroll-mt-32">
            <Section delay={0.1}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold capitalize tracking-tight">
                  {category === 'mobile' ? 'React Native' : 
                   category === 'next' ? 'Next.js' : category}
                </h2>
                <div className="flex-1 h-px bg-muted"></div>
                <span className="text-xs text-muted-foreground font-mono">
                  {projectsData[category].length} items
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsData[category].map((project: any) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </Section>
          </div>
        ))}
      </div>
    </div>
  )
}
