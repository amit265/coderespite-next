import { getFileBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Section } from '@/components/motion/Section'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'
import { ChevronRight, Calendar, BookOpen, Clock } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const note = await getFileBySlug('learn', slug).catch(() => null)
  
  if (!note) {
    return { title: 'Guide Not Found' }
  }

  const { frontMatter } = note

  return {
    title: `${frontMatter.title} | Learning Hub`,
    description: frontMatter.description || siteConfig.description,
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description || siteConfig.description,
      type: 'article',
      publishedTime: frontMatter.date,
      url: `${siteConfig.url}/learn/${slug.join('/')}`,
    },
  }
}

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params
  const note = await getFileBySlug('learn', slug).catch(() => null)

  if (!note) {
    notFound()
  }

  const { frontMatter, mdxSource } = note

  return (
    <Section>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/learn" className="hover:text-primary transition-colors">Learning Hub</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate font-semibold">{frontMatter.title}</span>
        </nav>

        {/* Title and Meta */}
        <div className="space-y-4 border-b border-border/40 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider">
              {frontMatter.category || 'Guide'}
            </span>
            {frontMatter.difficulty && (
              <span className="text-[9px] px-2 py-0.5 rounded bg-secondary text-muted-foreground font-semibold">
                {frontMatter.difficulty}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {frontMatter.title}
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {frontMatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/60 pt-2 font-mono">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(frontMatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>10 min read</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-sm sm:prose-base leading-relaxed">
          <MDXRemote source={mdxSource} />
        </article>

        {/* Footer actions */}
        <div className="border-t border-border/40 pt-8 flex items-center justify-between text-xs">
          <Link href="/learn" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            ← Back to Learning Hub
          </Link>
          <span className="text-muted-foreground/40 font-mono">End of Document</span>
        </div>
      </div>
    </Section>
  )
}
