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
  published?: boolean;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export type Post = PostSummary & {
  contentHtml: string;
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

export async function getAllPosts(): Promise<PostSummary[]> {
  const fileNames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const { frontmatter } = await readMarkdownFile(slug);

        return {
          slug,
          ...frontmatter,
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
      ...frontmatter,
      contentHtml: processedContent.toString(),
    };
  } catch {
    return null;
  }
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
