import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'
import { getAllFilesFrontMatter } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/projects',
    '/notes',
    '/apps',
    '/tools',
    '/ai',
    '/learn',
    '/debug',
    '/templates',
    '/resources',
    '/career',
    '/dashboard',
    '/collections'
  ].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  )

  const blogPosts = (await getAllFilesFrontMatter('blog')).map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
  }))

  const notes = (await getAllFilesFrontMatter('notes')).map((note) => ({
    url: `${siteConfig.url}/notes/${note.slug}`,
    lastModified: note.date,
  }))

  return [...routes, ...blogPosts, ...notes]
}
