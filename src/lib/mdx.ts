import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Note } from "./types";

const NOTES_PATH = path.join(process.cwd(), "src/content/notes");

// Helper to check if notes folder exists
const ensureDirectory = () => {
  if (!fs.existsSync(NOTES_PATH)) {
    console.warn(`⚠️ Notes directory not found at: ${NOTES_PATH}`);
    return false;
  }
  return true;
};

export async function getFileBySlug(slug: string) {
  const filePath = path.join(NOTES_PATH, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Note not found: ${slug}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    frontMatter: data,
    mdxSource: content,
  };
}

export async function getAllNotesFrontMatter(): Promise<Note[]> {
  if (!ensureDirectory()) return [];

  const files = fs.readdirSync(NOTES_PATH);

  return (
    files
      .filter((file) => file.endsWith(".mdx")) // Only MDX files
      .map((fileName) => {
        const source = fs.readFileSync(path.join(NOTES_PATH, fileName), "utf8");
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

export const getAllFilesFrontMatter = getAllNotesFrontMatter;
