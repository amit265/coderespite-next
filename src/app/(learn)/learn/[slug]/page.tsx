import { getFileBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Section } from '@/components/motion/Section'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function LearnTopicPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    const { frontMatter, mdxSource } = await getFileBySlug('learn', slug)

    return (
      <Section>
        <Link 
          href="/learn" 
          className="text-sm text-muted-foreground hover:text-primary mb-8 block transition-colors"
        >
          ← Back to learn
        </Link>
        <h1 className="font-bold text-3xl mb-8 tracking-tighter">
          {frontMatter.title}
        </h1>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={mdxSource} />
        </article>
      </Section>
    )
  } catch (error) {
    notFound()
  }
}
