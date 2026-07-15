'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { Landmark, ArrowUpRight, ShieldAlert, Sparkles, Star } from 'lucide-react'

interface SalaryNode {
  title: string
  base: string
  equity: string
  bonus: string
  total: string
  demand: 'High' | 'Very High' | 'Critical'
}

const salaryData: SalaryNode[] = [
  {
    title: 'Senior React Developer',
    base: '$160,000 - $190,000',
    equity: '$40,000 - $80,000/yr',
    bonus: '10% - 15%',
    total: '$210,000 - $285,000',
    demand: 'High'
  },
  {
    title: 'Staff Full-Stack Engineer',
    base: '$190,000 - $230,000',
    equity: '$80,000 - $150,000/yr',
    bonus: '15% - 20%',
    total: '$290,000 - $410,000',
    demand: 'Very High'
  },
  {
    title: 'Distributed Systems Architect',
    base: '$210,000 - $260,000',
    equity: '$120,000 - $220,000/yr',
    bonus: '20% - 25%',
    total: '$350,000 - $525,000',
    demand: 'Critical'
  }
]

export default function SalaryGuidesPage() {
  const [filter, setFilter] = useState('All')

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 10: Career Center</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Software Engineer Salary Guides</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Inspect total compensation metrics, base figures, and annual equity allocations across top tech markets.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salaryData.map((sal) => (
            <Card key={sal.title} className="flex flex-col justify-between group h-full hover:border-violet-500/20" hoverEffect>
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 flex items-center justify-center">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-secondary text-muted-foreground border border-border/40 tracking-wider">
                    {sal.demand} Demand
                  </span>
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base font-bold text-foreground">
                    {sal.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4 text-xs font-mono text-muted-foreground">
                <div className="border-t border-border/40 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Base Salary:</span>
                    <span className="text-foreground font-semibold">{sal.base}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equity Component:</span>
                    <span className="text-foreground font-semibold">{sal.equity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Bonus:</span>
                    <span className="text-foreground font-semibold">{sal.bonus}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/40 pt-2 text-sm">
                    <span className="text-violet-400 font-bold uppercase">Estimated TC:</span>
                    <span className="text-violet-400 font-bold">{sal.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
