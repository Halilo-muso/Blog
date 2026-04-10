import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import { resolveCollectionDirectory, sortByDateDesc } from "@/lib/content/shared";
import {
  buildTableOfContents,
  calculateReadingMinutes,
  enhanceCodeBlocks,
} from "@/lib/content/markdown";

export type NoteSummary = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published?: boolean;
  readingMinutes: number;
};

export type NoteTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Note = NoteSummary & {
  contentHtml: string;
  toc: NoteTocItem[];
};

type NoteOptions = {
  rootDir?: string;
};

function getNotesDirectory(rootDir = process.cwd()) {
  return resolveCollectionDirectory("notes", rootDir);
}

export async function getAllNotes(
  { rootDir = process.cwd() }: NoteOptions = {},
): Promise<NoteSummary[]> {
  const notesDirectory = getNotesDirectory(rootDir);
  const fileNames = await fs.readdir(notesDirectory).catch(() => []);

  const notes = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fileContents = await fs.readFile(path.join(notesDirectory, fileName), "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title,
          date: data.date,
          summary: data.summary,
          tags: data.tags ?? [],
          published: data.published,
          readingMinutes: calculateReadingMinutes(content),
        };
      }),
  );

  return sortByDateDesc(notes).filter((note) => note.published !== false);
}

export async function getRecentNotes(
  limit = 3,
  { rootDir = process.cwd() }: NoteOptions = {},
) {
  return (await getAllNotes({ rootDir })).slice(0, limit);
}

export async function getNoteBySlug(
  slug: string,
  { rootDir = process.cwd() }: NoteOptions = {},
): Promise<Note | null> {
  try {
    const fullPath = path.join(getNotesDirectory(rootDir), `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (data.published === false) {
      return null;
    }

    const processedContent = await remark()
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);

    const { contentHtml, toc } = buildTableOfContents(processedContent.toString());

    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      tags: data.tags ?? [],
      published: data.published,
      readingMinutes: calculateReadingMinutes(content),
      contentHtml: enhanceCodeBlocks(contentHtml),
      toc,
    };
  } catch {
    return null;
  }
}
