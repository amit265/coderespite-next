'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GradientHeading } from '@/components/ui/GradientHeading'
import { Section } from '@/components/motion/Section'
import { FileCode, Check, Copy, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const REACT_STARTER = `import React, { useState, useEffect } from 'react';

// Standard TypeScript Props Interface
interface UserProfileProps {
  userId: string;
  theme?: 'dark' | 'light';
}

export default function UserProfile({ userId, theme = 'dark' }: UserProfileProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await fetch(\`/api/users/\${userId}\`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [userId]);

  if (loading) return <div className="animate-pulse p-4 text-center">Loading profile...</div>;
  if (!profile) return <div className="p-4 text-red-500">Profile data not found.</div>;

  return (
    <div className={\`p-6 rounded-xl border \${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}\`}>
      <h2 className="text-lg font-bold">{profile.name}</h2>
      <p className="text-sm text-zinc-500">{profile.email}</p>
    </div>
  );
}
`

export default function ReactStarterTemplatePage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REACT_STARTER)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Section delay={0.02}>
        <Link href="/templates" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to Templates
        </Link>
      </Section>

      {/* Title */}
      <Section delay={0.05}>
        <div className="space-y-2">
          <div className="text-xs text-primary font-semibold tracking-widest uppercase">Boilerplates: Frontend</div>
          <GradientHeading as="h1" className="text-3xl sm:text-4xl">React Functional Component Starter</GradientHeading>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Copy-ready structured TypeScript React functional component managing hooks, async data fetching, and prop interfaces.
          </p>
        </div>
      </Section>

      {/* Preview */}
      <Section delay={0.1}>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 py-2.5 bg-secondary/15">
            <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 font-mono">
              <FileCode className="h-3.5 w-3.5 text-violet-500" />
              UserProfile.tsx
            </span>
            <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5" onClick={handleCopy}>
              {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
              {copied ? 'Copied' : 'Copy Template'}
            </Button>
          </CardHeader>
          <CardContent className="p-4 bg-black/10">
            <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px]">
              <code>{REACT_STARTER}</code>
            </pre>
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
