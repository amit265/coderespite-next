'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { HelpCircle, ChevronRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface QuestionItem {
  id: number
  question: string
  answer: string
  category: 'Frontend' | 'System Design'
}

const interviewQuestions: QuestionItem[] = [
  {
    id: 1,
    question: "What is the differences between rendering on server (SSR) vs client (CSR) in Next.js?",
    answer: "SSR (Server-Side Rendering) compiles pages to raw HTML on every inbound request server-side, reducing client computational latency. CSR (Client-Side Rendering) downloads a lean shell page and executes Javascript in browser scopes to mount components, lowering server load parameters but increasing initial paint times.",
    category: "Frontend"
  },
  {
    id: 2,
    question: "Explain the difference between SQL database sharding vs database replication.",
    answer: "Sharding partitions table records horizontally across separate databases (e.g. users 1-100 on DB_A, 101-200 on DB_B) to spread write load. Replication duplicates the entire dataset across multiple read nodes from a primary node to scale read query capabilities and failover resiliency.",
    category: "System Design"
  }
]

export default function InterviewPrepPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="space-y-12">
      {/* Back button */}
      <Section delay={0.02}>
        <Link href="/career" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 rotate-180" />
          Back to Career Center
        </Link>
      </Section>

      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Interview Preparation</span>
          </div>
          <GradientHeading as="h1">Interview Preparation Prep</GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Practice essential systems architecture questions and senior frontend rendering concepts using expandable study lists.
          </p>
        </div>
      </Section>

      {/* Question list */}
      <Section delay={0.12}>
        <div className="space-y-4">
          {interviewQuestions.map((item) => {
            const isOpen = openId === item.id
            return (
              <Card key={item.id} className="border border-border bg-card/60 overflow-hidden">
                <button
                  onClick={() => toggleOpen(item.id)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-secondary/10 transition-colors"
                >
                  <div className="space-y-1 mr-4">
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      {item.question}
                    </h3>
                  </div>
                  {isOpen ? <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" /> : <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 border-t border-border/40 bg-black/10 text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {item.answer}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
