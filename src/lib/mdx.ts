import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Note } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

// Helper to check if directory exists
const ensureDirectory = (collection: string) => {
  const collectionPath = path.join(CONTENT_PATH, collection);
  if (!fs.existsSync(collectionPath)) {
    console.warn(`⚠️ Collection directory not found at: ${collectionPath}`);
    return false;
  }
  return true;
};

export async function getFileBySlug(collection: string, slug?: string) {
  // Handle single argument case for backward compatibility or if slug is first
  const actualCollection = slug ? collection : "notes";
  const actualSlug = slug || collection;

  const filePath = path.join(CONTENT_PATH, actualCollection, `${actualSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content not found: ${actualCollection}/${actualSlug}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    frontMatter: data,
    mdxSource: content,
  };
}

export async function getAllFilesFrontMatter(collection: string = "notes"): Promise<Note[]> {
  if (!ensureDirectory(collection)) return [];

  const collectionPath = path.join(CONTENT_PATH, collection);
  const files = fs.readdirSync(collectionPath);

  return (
    files
      .filter((file) => file.endsWith(".mdx")) // Only MDX files
      .map((fileName) => {
        const source = fs.readFileSync(path.join(collectionPath, fileName), "utf8");
        const { data } = matter(source);

        return {
          ...data,
          slug: fileName.replace(".mdx", ""),
        } as Note;
      })
      // Sort by date (newest first)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );
}

export const getAllNotesFrontMatter = () => getAllFilesFrontMatter("notes");
