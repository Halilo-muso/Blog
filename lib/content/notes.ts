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
  aiVersionHtml?: string;
};

type NoteOptions = {
  rootDir?: string;
};

function getNotesDirectory(rootDir = process.cwd()) {
  return resolveCollectionDirectory("notes", rootDir);
}

function isPublicNoteFile(fileName: string) {
  return fileName.endsWith(".md") && !fileName.endsWith(".ai.md");
}

async function renderMarkdownContent(content: string) {
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const { contentHtml, toc } = buildTableOfContents(processedContent.toString());

  return {
    contentHtml: enhanceCodeBlocks(contentHtml),
    toc,
  };
}

async function getOptionalAiVersionHtml(fullPath: string) {
  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { content } = matter(fileContents);
    const rendered = await renderMarkdownContent(content);
    return rendered.contentHtml;
  } catch {
    return undefined;
  }
}

export async function getAllNotes(
  { rootDir = process.cwd() }: NoteOptions = {},
): Promise<NoteSummary[]> {
  const notesDirectory = getNotesDirectory(rootDir);
  const fileNames = await fs.readdir(notesDirectory).catch(() => []);

  const notes = await Promise.all(
    fileNames
      .filter(isPublicNoteFile)
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
    const notesDirectory = getNotesDirectory(rootDir);
    const fullPath = path.join(notesDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (data.published === false) {
      return null;
    }

    const renderedMain = await renderMarkdownContent(content);
    const aiVersionHtml = await getOptionalAiVersionHtml(path.join(notesDirectory, `${slug}.ai.md`));

    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      tags: data.tags ?? [],
      published: data.published,
      readingMinutes: calculateReadingMinutes(content),
      contentHtml: renderedMain.contentHtml,
      toc: renderedMain.toc,
      aiVersionHtml,
    };
  } catch {
    return null;
  }
}
