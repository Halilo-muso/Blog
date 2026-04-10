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
import { getDateLocale, getDictionary, type SiteLocale } from "@/lib/i18n";

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

type ContentOptions = {
  rootDir?: string;
};

function getPostsDirectory(rootDir = process.cwd()) {
  return resolveCollectionDirectory("posts", rootDir);
}

async function readMarkdownFile(slug: string, rootDir = process.cwd()) {
  const fullPath = path.join(getPostsDirectory(rootDir), `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as PostFrontmatter,
    content,
  };
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

export async function getAllPosts(
  { rootDir = process.cwd() }: ContentOptions = {},
): Promise<PostSummary[]> {
  const fileNames = await fs.readdir(getPostsDirectory(rootDir));

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const { frontmatter, content } = await readMarkdownFile(slug, rootDir);

        return {
          slug,
          ...normalizeFrontmatter(frontmatter, content),
        };
      }),
  );

  return sortByDateDesc(posts).filter((post) => post.published !== false);
}

export async function getPostsByCategory(
  { rootDir = process.cwd() }: ContentOptions = {},
): Promise<GroupedPosts[]> {
  const posts = await getAllPosts({ rootDir });

  return postCategories.map((category) => ({
    category,
    posts: posts.filter((post) => post.category === category),
  }));
}

export async function getPostsForCategory(
  category: PostCategory,
  { rootDir = process.cwd() }: ContentOptions = {},
) {
  const posts = await getAllPosts({ rootDir });
  return posts.filter((post) => post.category === category);
}

export async function getRecentPosts(
  limit = 3,
  { rootDir = process.cwd() }: ContentOptions = {},
) {
  const posts = await getAllPosts({ rootDir });
  return posts.slice(0, limit);
}

export async function getPostBySlug(
  slug: string,
  { rootDir = process.cwd() }: ContentOptions = {},
): Promise<Post | null> {
  try {
    const { frontmatter, content } = await readMarkdownFile(slug, rootDir);

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

export async function getAdjacentPosts(
  slug: string,
  { rootDir = process.cwd() }: ContentOptions = {},
): Promise<AdjacentPosts> {
  const posts = await getAllPosts({ rootDir });
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
