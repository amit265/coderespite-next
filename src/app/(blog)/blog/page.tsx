import Link from 'next/link'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Section } from '@/components/motion/Section'

export default async function BlogPage() {
  const posts = await getAllFilesFrontMatter('blog')

  const sortedPosts = posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Section>
      <h1 className="font-bold text-3xl mb-8 tracking-tighter">Blog</h1>
      <p className="prose prose-neutral dark:prose-invert mb-12">
        Longer-form, more reflective writing. These are my experiences and thoughts on software development and technology.
      </p>

      <div className="flex flex-col gap-10">
        {sortedPosts.map((post) => (
          <div key={post.slug}>
            <Link 
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2"
            >
              <h2 className="font-semibold text-2xl group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <time className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  )
}