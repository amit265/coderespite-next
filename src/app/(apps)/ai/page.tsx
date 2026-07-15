'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import {
  Sparkles,
  Search,
  Code,
  CheckSquare,
  ShieldCheck,
  Cpu,
  FileCode,
  FileSpreadsheet,
  Terminal,
  MessagesSquare,
  ArrowRight,
  Bug,
  Layers,
  Eye,
} from 'lucide-react'

interface AICard {
  title: string
  description: string
  href: string
  icon: any
  status: 'Ready' | 'Beta' | 'Coming Soon'
  color: string
}

const aiToolsList: AICard[] = [
  {
    title: 'Code Explainer & Reviewer',
    description: 'Deconstruct complex functional blocks and run structural code reviews for bugs, logic flaws, and performance leaks.',
    href: '/ai/code-explainer',
    icon: Code,
    status: 'Ready',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  {
    title: 'API Document Builder',
    description: 'Autogenerate Swagger, OpenAPI, or markdown specifications directly from handler source code blocks.',
    href: '/ai/api-docs',
    icon: FileCode,
    status: 'Ready',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Unit Test Generator',
    description: 'Produce high-coverage Jest, Mocha, or PyTest suites targeting structural edge cases in your code.',
    href: '/ai/unit-test',
    icon: CheckSquare,
    status: 'Ready',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'SQL & Query Generator',
    description: 'Transform human language definitions into complex SQL schema queries and indexed join scripts.',
    href: '/ai/sql-generator',
    icon: FileSpreadsheet,
    status: 'Ready',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Commit Message Creator',
    description: 'Draft clean, semantic commit messages matching Conventional Commits directly from git diff inputs.',
    href: '/ai/commit-msg',
    icon: Terminal,
    status: 'Ready',
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    title: 'Interactive Interview Simulator',
    description: 'Run voice or text mock interviews for Senior Engineering, System Design, and Frontend positions.',
    href: '/ai/interview-simulator',
    icon: MessagesSquare,
    status: 'Ready',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
  {
    title: 'Bug Analyzer',
    description: 'Diagnose stacktraces and browser console exceptions for quick refactoring workarounds.',
    href: '/ai/bug-analyzer',
    icon: Bug,
    status: 'Ready',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
  {
    title: 'README Generator',
    description: 'Autogenerate structured, formatted standard README markdown files from project variables.',
    href: '/ai/readme-generator',
    icon: FileCode,
    status: 'Ready',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Regex Generator',
    description: 'Build complex regular expressions and text pattern matches from conversational requests.',
    href: '/ai/regex-generator',
    icon: Code,
    status: 'Ready',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  {
    title: 'Prompt Optimizer',
    description: 'Refine raw prompts into structured, detail-heavy instructions with context variables.',
    href: '/ai/prompt-optimizer',
    icon: Sparkles,
    status: 'Ready',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Architecture Assistant',
    description: 'Draft database diagrams and structural tech stack components blueprints from specifications.',
    href: '/ai/architecture',
    icon: Layers,
    status: 'Ready',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
  {
    title: 'Accessibility Audit',
    description: 'Verify WCAG compliance checks, contrast indicators, and missing aria label attributes.',
    href: '/ai/accessibility',
    icon: Eye,
    status: 'Ready',
    color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    title: 'ATS Resume Builder',
    description: 'Assemble clean, structured markdown resume profiles optimized for recruiter systems.',
    href: '/ai/resume-builder',
    icon: FileCode,
    status: 'Ready',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Security Review Assistant',
    description: 'Audits source code blocks for SQL injection, XSS leaks, and vulnerabilities.',
    href: '/ai/security-review',
    icon: ShieldCheck,
    status: 'Ready',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
  {
    title: 'Performance Review Assistant',
    description: 'Scans algorithms complexity bounds to resolve computational loops nesting bloats.',
    href: '/ai/performance-review',
    icon: Cpu,
    status: 'Ready',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Cover Letter Builder',
    description: 'Assembles customized, targeted cover letters from achievement descriptions.',
    href: '/ai/cover-letter',
    icon: FileCode,
    status: 'Ready',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
]

export default function AIHubPage() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Workspace Labs</span>
          </div>
          <GradientHeading as="h1">AI Workspace</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Harness the power of tailored AI models designed specifically for software engineering workflows. Write production-ready tests, structure APIs, and audit complex routines with high-fidelity, context-aware prompt engines.
          </p>
        </div>
      </Section>

      {/* Grid of AI Assistants */}
      <Section delay={0.12}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiToolsList.map((tool) => {
            const Icon = tool.icon
            const isReady = tool.status === 'Ready'
            return (
              <Card
                key={tool.title}
                className={`flex flex-col justify-between group h-full ${
                  !isReady && 'opacity-60 hover:border-border/40'
                }`}
                hoverEffect={isReady}
              >
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg border ${tool.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        tool.status === 'Ready'
                          ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30'
                          : 'bg-muted text-muted-foreground border border-border/40'
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground/80">
                      {tool.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {isReady ? (
                    <Link href={tool.href}>
                      <Button variant="secondary" size="sm" className="w-full">
                        <span>Launch Assistant</span>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" size="sm" className="w-full cursor-not-allowed" disabled>
                      <span>Under Construction</span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
