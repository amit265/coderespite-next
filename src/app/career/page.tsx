'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Compass, Sparkles, Milestone, ArrowRight, HelpCircle } from 'lucide-react'

export default function CareerCenterPage() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold">
            <Compass className="h-3.5 w-3.5" />
            <span>Professional Growth</span>
          </div>
          <GradientHeading as="h1">Career Center</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Optimize your developer career journey. Simulate interview loops, structure learning roadmaps, and review ATS-friendly resume guidelines.
          </p>
        </div>
      </Section>

      {/* Grid of features */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interview Simulator integration */}
          <Card className="flex flex-col justify-between group h-full" hoverEffect>
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-violet-500/20 text-violet-400 border border-violet-500/30 tracking-wider">
                  AI Tool
                </span>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  Interactive Interview Simulator
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Run simulated conversational frontend or system design technical rounds and get instant analytical checklists.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/ai/interview-simulator">
                <Button variant="secondary" size="sm" className="w-full">
                  <span>Launch Simulator</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Roadmaps */}
          <Card className="flex flex-col justify-between group h-full" hoverEffect>
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <Milestone className="h-5 w-5" />
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                  Roadmaps
                </span>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  Engineering Roadmaps
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Deep learning curriculums and progression pipelines for Senior Frontend and Systems Engineers.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/career/roadmaps">
                <Button variant="secondary" size="sm" className="w-full">
                  <span>Explore Roadmaps</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Interview Prep */}
          <Card className="flex flex-col justify-between group h-full" hoverEffect>
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                  Preparation
                </span>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  Interview Questions
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Validate core frontend rendering and distributed systems architecture concepts using study cards.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/career/interview-prep">
                <Button variant="secondary" size="sm" className="w-full">
                  <span>Start Practice</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* ATS Resume Review */}
          <Card className="flex flex-col justify-between group h-full" hoverEffect>
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-violet-500/20 text-violet-400 border border-violet-500/30 tracking-wider">
                  AI Auditor
                </span>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  ATS Resume Optimizer
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Analyze resume copy matches against key target job description keywords.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/career/resume-review">
                <Button variant="secondary" size="sm" className="w-full">
                  <span>Start Audit</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Salary Guides */}
          <Card className="flex flex-col justify-between group h-full" hoverEffect>
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <Milestone className="h-5 w-5" />
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                  Compensation
                </span>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  Software Engineering Salary Guides
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Analyze total compensations, equity packages, and base figures.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/career/salary-guides">
                <Button variant="secondary" size="sm" className="w-full">
                  <span>View Guides</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}
