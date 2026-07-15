'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { HelpCircle, Check, X, RefreshCw, Milestone } from 'lucide-react'

interface Question {
  id: number
  text: string
  options: string[]
  answer: number
  explanation: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: "Which hook executes synchronously after all DOM mutations are complete?",
    options: ["useEffect", "useLayoutEffect", "useMemo", "useCallback"],
    answer: 1,
    explanation: "useLayoutEffect fires synchronously immediately after the browser layout calculations but before screen painting, making it ideal for synchronous layouts inspections."
  },
  {
    id: 2,
    text: "What does the CAP theorem state is impossible to guarantee in distributed systems?",
    options: [
      "Simultaneous Consistency, Availability, and Partition Tolerance",
      "Both Speed and Storage size scaling rules",
      "Postgres replication limits matching locks",
      "REST query headers security access validations"
    ],
    answer: 0,
    explanation: "The CAP theorem states that a distributed systems can only guarantee at most two out of Consistency, Availability, and Partition Tolerance simultaneously."
  }
]

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const handleSelect = (idx: number) => {
    if (submitted) return
    setSelectedOpt(idx)
  }

  const handleSubmit = () => {
    if (selectedOpt === null || submitted) return

    setSubmitted(true)
    const current = quizQuestions[currentIdx]
    if (selectedOpt === current.answer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    const nextIdx = currentIdx + 1
    if (nextIdx < quizQuestions.length) {
      setCurrentIdx(nextIdx)
      setSelectedOpt(null)
      setSubmitted(false)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentIdx(0)
    setSelectedOpt(null)
    setSubmitted(false)
    setScore(0)
    setFinished(false)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 6: Interactive Learning</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Technical Mini Quizzes</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Test your knowledge of advanced system design patterns and modern frontend frameworks compilers locally.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="max-w-2xl mx-auto">
          {finished ? (
            <Card className="p-8 text-center space-y-6">
              <Milestone className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">Quiz Completed!</h2>
                <p className="text-sm text-muted-foreground">
                  You scored <span className="text-emerald-400 font-bold">{score}</span> out of {quizQuestions.length} correct answers.
                </p>
              </div>
              <Button onClick={handleRestart} className="h-10 text-xs font-semibold mx-auto">
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Try Quiz Again
              </Button>
            </Card>
          ) : (
            <Card className="flex flex-col">
              <CardHeader className="py-3 border-b border-border/40 bg-secondary/15 flex flex-row justify-between items-center">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <HelpCircle className="h-3.5 w-3.5 text-violet-500" />
                  QUESTION {currentIdx + 1} OF {quizQuestions.length}
                </span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  Score: {score}
                </span>
              </CardHeader>
              <CardContent className="p-6 space-y-6 text-sm">
                <h3 className="text-base font-semibold leading-relaxed text-foreground/90">
                  {quizQuestions[currentIdx].text}
                </h3>

                {/* Options */}
                <div className="flex flex-col gap-3">
                  {quizQuestions[currentIdx].options.map((opt, idx) => {
                    const isSelected = selectedOpt === idx
                    const isCorrect = idx === quizQuestions[currentIdx].answer
                    let optStyle = 'border-border bg-card/40 hover:bg-secondary/10'

                    if (isSelected) {
                      optStyle = 'border-primary bg-primary/5 text-primary'
                    }

                    if (submitted) {
                      if (isCorrect) {
                        optStyle = 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-medium'
                      } else if (isSelected) {
                        optStyle = 'border-rose-500/30 bg-rose-500/5 text-rose-400'
                      } else {
                        optStyle = 'border-border/20 bg-card/10 text-muted-foreground/40 cursor-not-allowed'
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={submitted}
                        className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all duration-150 flex justify-between items-center ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && <Check className="h-4 w-4 text-emerald-500 shrink-0" />}
                        {submitted && isSelected && !isCorrect && <X className="h-4 w-4 text-rose-500 shrink-0" />}
                      </button>
                    )
                  })}
                </div>

                {/* Action button */}
                {!submitted ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedOpt === null}
                    className="w-full h-10 text-xs font-semibold"
                  >
                    Submit Choice
                  </Button>
                ) : (
                  <div className="space-y-4 pt-4 border-t border-border/40">
                    <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs leading-relaxed">
                      <p className="font-semibold mb-0.5">Explanation Details:</p>
                      <p className="opacity-95">{quizQuestions[currentIdx].explanation}</p>
                    </div>
                    <Button onClick={handleNext} className="w-full h-10 text-xs font-semibold">
                      Continue to Next Question
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </div>
  )
}
