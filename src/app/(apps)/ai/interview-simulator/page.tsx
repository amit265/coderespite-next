'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { MessagesSquare, Play, Send, RefreshCw, Terminal, CheckCircle2, User } from 'lucide-react'

interface Message {
  sender: 'interviewer' | 'candidate'
  text: string
}

const TRACK_QUESTIONS: Record<string, string[]> = {
  frontend: [
    "Interviewer: Welcome! Let's start with React. Can you explain the difference between useEffect and useLayoutEffect, and when you would choose one over the other?",
    "Interviewer: Great. How do you handle deep nested state updates in React, and what strategies do you employ to prevent unnecessary re-renders?",
    "Interviewer: Nice. Last question: How do you optimize Core Web Vitals (specifically LCP and CLS) in a Next.js App Router application?"
  ],
  system: [
    "Interviewer: Welcome! Let's talk about System Design. You are asked to design a real-time global leaderboard for a mobile game with 10M active daily users. How do you architect this?",
    "Interviewer: Interesting. How do you handle database partitions or sharding when user counts scale, and how do you ensure data consistency across shards?",
    "Interviewer: Excellent. How do you mitigate cache stampede issues in a high-traffic distributed environment?"
  ]
}

export default function InterviewSimulatorPage() {
  const [track, setTrack] = useState<'frontend' | 'system'>('frontend')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)

  const handleStart = () => {
    setStep(0)
    setMessages([
      {
        sender: 'interviewer',
        text: TRACK_QUESTIONS[track][0]
      }
    ])
    setSessionActive(true)
  }

  const handleSend = () => {
    if (!input.trim() || !sessionActive) return

    const candidateMsg = input.trim()
    const nextStep = step + 1
    const updatedMessages = [...messages, { sender: 'candidate', text: candidateMsg } as Message]
    
    setMessages(updatedMessages)
    setInput('')
    setStep(nextStep)

    // Simulate interviewer response
    setTimeout(() => {
      const questions = TRACK_QUESTIONS[track]
      if (nextStep < questions.length) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'interviewer',
            text: `Interviewer: Good insights on that topic. Let's move on to the next question:\n\n${questions[nextStep]}`
          }
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'interviewer',
            text: "Interviewer: That completes our technical simulation round! You showed great analytical clarity and solid conceptual understanding. Feedback report is compiled in your local cockpit."
          }
        ])
        setSessionActive(false)
      }
    }, 1000)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Pillar 1: AI Workspace</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">Interview Simulator</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Simulate technical system design and frontend engineering interviews with automated feedback checklists.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader className="py-3.5 border-b border-border/40 bg-secondary/15">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MessagesSquare className="h-4 w-4 text-violet-500" />
                  Select Interview Track
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="flex flex-col gap-2">
                  <Button
                    variant={track === 'frontend' ? 'primary' : 'outline'}
                    onClick={() => setTrack('frontend')}
                    className="h-9 text-xs justify-start px-4"
                    disabled={sessionActive}
                  >
                    Frontend Engineering (React/Next.js)
                  </Button>
                  <Button
                    variant={track === 'system' ? 'primary' : 'outline'}
                    onClick={() => setTrack('system')}
                    className="h-9 text-xs justify-start px-4"
                    disabled={sessionActive}
                  >
                    Distributed System Design
                  </Button>
                </div>

                <Button
                  onClick={handleStart}
                  className="w-full h-10 text-xs font-semibold"
                  variant="secondary"
                >
                  <Play className="mr-1.5 h-3.5 w-3.5" />
                  {sessionActive ? 'Restart Session' : 'Start Mock Session'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Console */}
          <div className="lg:col-span-8">
            <Card className="flex flex-col h-[460px]">
              <CardHeader className="border-b border-border/40 py-2.5 bg-secondary/15 flex flex-row items-center justify-between">
                <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-blue-500" />
                  INTERVIEW_CONSOLE_CHAT
                </span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  {sessionActive ? 'Session Active' : 'Session Inactive'}
                </span>
              </CardHeader>
              
              <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 max-w-[85%] ${
                        msg.sender === 'candidate'
                          ? 'ml-auto flex-row-reverse'
                          : 'mr-auto'
                      }`}
                    >
                      <div className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs ${
                        msg.sender === 'candidate' ? 'bg-blue-600' : 'bg-violet-600'
                      }`}>
                        {msg.sender === 'candidate' ? <User className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      </div>
                      <div className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'candidate'
                          ? 'bg-primary text-primary-foreground rounded-tr-none'
                          : 'bg-secondary text-foreground rounded-tl-none border border-border/40'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                    <MessagesSquare className="h-8 w-8 text-muted-foreground/30 animate-pulse" />
                    <p className="text-sm font-semibold text-foreground/80">Simulator Standby</p>
                    <p className="text-xs max-w-sm">
                      Select your specialized engineering track and click Start Mock Session to begin the compiler questionnaire.
                    </p>
                  </div>
                )}
              </CardContent>

              {/* Chat Input */}
              {sessionActive && (
                <div className="border-t border-border/40 p-3 bg-secondary/10 flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your structured explanation response here..."
                    className="flex-1 h-9 px-3 rounded-lg border border-border bg-card text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button onClick={handleSend} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
