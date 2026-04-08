import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import { getDateLocale, getDictionary, type SiteLocale } from "@/lib/i18n";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export const postCategories = ["tech", "daily", "music", "misc"] as const;

export type PostCategory = (typeof postCategories)[number];

type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  category?: string;
  tags?: string[];
  published?: boolean;
};

export type PostSummary = Omit<PostFrontmatter, "tags" | "category"> & {
  slug: string;
  category: PostCategory;
  tags: string[];
  readingMinutes: number;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Post = PostSummary & {
  contentHtml: string;
  toc: TocItem[];
};

export type AdjacentPosts = {
  previous: PostSummary | null;
  next: PostSummary | null;
};

export type GroupedPosts = {
  category: PostCategory;
  posts: PostSummary[];
};

function sortPosts(posts: PostSummary[]) {
  return posts.sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
}

async function readMarkdownFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as PostFrontmatter,
    content,
  };
}

function calculateReadingMinutes(content: string) {
  const latinWords = content.trim().split(/\s+/).filter(Boolean).length;
  const cjkChars = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const units = latinWords + cjkChars;

  return Math.max(1, Math.ceil(units / 350));
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\-\u4e00-\u9fff]/g, "")
    .replace(/-+/g, "-");
}

function buildTableOfContents(contentHtml: string) {
  const toc: TocItem[] = [];
  const usedIds = new Map<string, number>();

  const withAnchors = contentHtml.replace(
    /<(h2|h3)>(.*?)<\/\1>/g,
    (_, tag: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const baseId = slugifyHeading(text) || "section";
      const count = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      const level = Number(tag.slice(1)) as 2 | 3;

      toc.push({ id, text, level });

      return `<${tag} id="${id}">${inner}</${tag}>`;
    },
  );

  return {
    contentHtml: withAnchors,
    toc,
  };
}

const codeLanguageLabels: Record<string, string> = {
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  markdown: "Markdown",
  md: "Markdown",
  plaintext: "Text",
  shell: "Shell",
  sh: "Shell",
  ts: "TypeScript",
  tsx: "TSX",
  txt: "Text",
  yaml: "YAML",
  yml: "YAML",
};

function formatCodeLanguage(language?: string) {
  if (!language) {
    return "Code";
  }

  const normalized = language.toLowerCase();
  return codeLanguageLabels[normalized] ?? normalized.toUpperCase();
}

function enhanceCodeBlocks(contentHtml: string) {
  return contentHtml.replace(/<pre>([\s\S]*?)<\/pre>/g, (block) => {
    const languageMatch = block.match(/language-([\w-]+)/);
    const languageLabel = formatCodeLanguage(languageMatch?.[1]);

    return `<div class="article-code-block"><div class="article-code-header"><span class="article-code-dot" aria-hidden="true"></span><span class="article-code-language">${languageLabel}</span></div>${block}</div>`;
  });
}
export function isPostCategory(category?: string): category is PostCategory {
  return postCategories.some((item) => item === category);
}

function normalizeCategory(category?: string): PostCategory {
  if (isPostCategory(category)) {
    return category;
  }

  return "misc";
}

function normalizeFrontmatter(
  frontmatter: PostFrontmatter,
  content: string,
): Omit<PostSummary, "slug"> {
  return {
    ...frontmatter,
    category: normalizeCategory(frontmatter.category),
    tags: frontmatter.tags ?? [],
    readingMinutes: calculateReadingMinutes(content),
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const fileNames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const { frontmatter, content } = await readMarkdownFile(slug);

        return {
          slug,
          ...normalizeFrontmatter(frontmatter, content),
        };
      }),
  );

  return sortPosts(posts).filter((post) => post.published !== false);
}

export async function getPostsByCategory(): Promise<GroupedPosts[]> {
  const posts = await getAllPosts();

  return postCategories.map((category) => ({
    category,
    posts: posts.filter((post) => post.category === category),
  }));
}

export async function getPostsForCategory(category: PostCategory) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getRecentPosts(limit = 3) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { frontmatter, content } = await readMarkdownFile(slug);

    if (frontmatter.published === false) {
      return null;
    }

    const processedContent = await remark()
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);

    const { contentHtml, toc } = buildTableOfContents(processedContent.toString());
    const enhancedContentHtml = enhanceCodeBlocks(contentHtml);

    return {
      slug,
      ...normalizeFrontmatter(frontmatter, content),
      contentHtml: enhancedContentHtml,
      toc,
    };
  } catch {
    return null;
  }
}

export async function getAdjacentPosts(slug: string): Promise<AdjacentPosts> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export function formatDate(date: string, locale: SiteLocale) {
  return new Intl.DateTimeFormat(getDateLocale(locale), {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatReadingTime(minutes: number, locale: SiteLocale) {
  const dictionary = getDictionary(locale);

  return `${minutes} ${dictionary.common.minuteRead}`;
}


