import { getFileBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Section } from '@/components/motion/Section'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params
  try {
    const { frontMatter } = await getFileBySlug('blog', slug)
    return {
      title: frontMatter.title,
      description: frontMatter.summary || siteConfig.description,
      openGraph: {
        title: frontMatter.title,
        description: frontMatter.summary || siteConfig.description,
        type: 'article',
        publishedTime: frontMatter.date,
        url: `${siteConfig.url}/blog/${slug}`,
        images: [
          {
            url: frontMatter.image || siteConfig.ogImage,
            width: 1200,
            height: 630,
            alt: frontMatter.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: frontMatter.title,
        description: frontMatter.summary || siteConfig.description,
        images: [frontMatter.image || siteConfig.ogImage],
      },
    }
  } catch (error) {
    return {
      title: 'Post Not Found',
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    const { frontMatter, mdxSource } = await getFileBySlug('blog', slug)

    return (
      <Section>
        <Link 
          href="/blog" 
          className="text-sm text-muted-foreground hover:text-primary mb-8 block transition-colors"
        >
          ← Back to blog
        </Link>
        <h1 className="font-bold text-4xl mb-4 tracking-tighter">
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
  } catch (error) {
    notFound()
  }
}
