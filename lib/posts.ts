import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  published?: boolean;
};

export type PostSummary = Omit<PostFrontmatter, "tags"> & {
  slug: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostSummary & {
  contentHtml: string;
};

export type AdjacentPosts = {
  previous: PostSummary | null;
  next: PostSummary | null;
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

function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}

function normalizeFrontmatter(frontmatter: PostFrontmatter, content: string): Omit<PostSummary, "slug"> {
  return {
    ...frontmatter,
    tags: frontmatter.tags ?? [],
    readingTime: calculateReadingTime(content),
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

    const processedContent = await remark().use(html).process(content);

    return {
      slug,
      ...normalizeFrontmatter(frontmatter, content),
      contentHtml: processedContent.toString(),
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

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
