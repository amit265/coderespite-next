import { getFileBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Section } from '@/components/motion/Section'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  // Try to get the file
  const note = await getFileBySlug('notes', slug).catch(() => null)
  
  if (!note) {
    return { title: 'Note Not Found' }
  }

  const { frontMatter } = note

  return {
    title: frontMatter.title,
    description: frontMatter.summary || siteConfig.description,
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.summary || siteConfig.description,
      type: 'article',
      publishedTime: frontMatter.date,
      url: `${siteConfig.url}/notes/${slug}`,
      images: [{
        url: frontMatter.image || siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: frontMatter.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [frontMatter.image || siteConfig.ogImage],
    },
  }
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params

  // Inline catch to keep the UI logic clean
  const note = await getFileBySlug(slug).catch(() => null)

  if (!note) {
    notFound()
  }

  const { frontMatter, mdxSource } = note

  return (
    <Section>
      <Link 
        href="/notes" 
        className="text-sm text-muted-foreground hover:text-primary mb-8 block transition-colors"
      >
        ← Back to notes
      </Link>
      
      <h1 className="font-bold text-3xl mb-2 tracking-tighter">
        {frontMatter.title}
      </h1>
      
      <time className="text-sm text-muted-foreground block mb-12">
        {new Date(frontMatter.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={mdxSource} />
      </article>
    </Section>
  )
}