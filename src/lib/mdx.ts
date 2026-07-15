import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_PATH = path.join(process.cwd(), "src/content")

// Get a file by collection and dynamic nested slug segments
export async function getFileBySlug(collection: string, slugSegments: string | string[]) {
  const slugPath = Array.isArray(slugSegments) ? slugSegments.join('/') : slugSegments
  const filePath = path.join(CONTENT_PATH, collection, `${slugPath}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content not found: ${collection}/${slugPath}`)
  }

  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)

  return {
    frontMatter: {
      ...data,
      slug: slugPath,
    } as any,
    mdxSource: content,
  }
}

// Retrieve all frontmatter files in a collection recursively
export async function getAllFilesFrontMatter(collection: string) {
  const collectionPath = path.join(CONTENT_PATH, collection)
  if (!fs.existsSync(collectionPath)) {
    return []
  }

  const getFilesRecursively = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    const files = entries
      .filter((file) => !file.isDirectory() && file.name.endsWith('.mdx'))
      .map((file) => path.join(dir, file.name))
    
    const folders = entries.filter((file) => file.isDirectory())
    for (const folder of folders) {
      files.push(...getFilesRecursively(path.join(dir, folder.name)))
    }
    
    return files
  }

  const allPaths = getFilesRecursively(collectionPath)

  return allPaths.map((filePath) => {
    const relativePath = path.relative(collectionPath, filePath)
    const slug = relativePath.replace(/\.mdx$/, '')
    const source = fs.readFileSync(filePath, "utf8")
    const { data } = matter(source)

    return {
      ...data,
      slug,
    } as any
  }).sort((a: any, b: any) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA // Sort newest first
  })
}
