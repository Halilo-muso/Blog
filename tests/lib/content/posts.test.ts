import assert from "node:assert/strict";
import test from "node:test";
import { withTempContentRoot } from "../../helpers/content-root";
import {
  formatDate,
  formatReadingTime,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getPostsForCategory,
  getRecentPosts,
  isPostCategory,
  postCategories,
} from "@/lib/content/posts";

async function withWorkingDirectory(rootDir: string, run: () => Promise<void>) {
  const previousCwd = process.cwd();
  process.chdir(rootDir);

  try {
    await run();
  } finally {
    process.chdir(previousCwd);
  }
}

const fixtureFiles = {
  "posts/newer.md": `---
title: Newer Post
date: 2026-04-03
summary: Newer summary
category: tech
tags:
  - nextjs
---

## Intro

### Details

\`\`\`ts
const value = 1;
\`\`\`
`,
  "posts/older.md": `---
title: Older Post
date: 2026-04-01
summary: Older summary
category: unknown
---

Body words only.
`,
  "posts/draft.md": `---
title: Draft Post
date: 2026-04-04
summary: Draft summary
published: false
---

Should stay hidden.
`,
};

test("posts API preserves blog filtering, sorting, and category behavior", async () => {
  await withTempContentRoot(fixtureFiles, async (rootDir) => {
    await withWorkingDirectory(rootDir, async () => {
      const posts = await getAllPosts();
      assert.deepEqual(posts.map((post) => post.slug), ["newer", "older"]);
      assert.equal(posts[0].category, "tech");
      assert.equal(posts[1].category, "misc");
      assert.deepEqual(posts[1].tags, []);

      const grouped = await getPostsByCategory();
      assert.deepEqual(grouped.map((group) => group.category), [...postCategories]);
      assert.equal(grouped.find((group) => group.category === "tech")?.posts.length, 1);
      assert.equal(grouped.find((group) => group.category === "misc")?.posts.length, 1);

      const techPosts = await getPostsForCategory("tech");
      assert.deepEqual(techPosts.map((post) => post.slug), ["newer"]);

      const recent = await getRecentPosts(1);
      assert.deepEqual(recent.map((post) => post.slug), ["newer"]);
    });
  });
});

test("getPostBySlug preserves toc, code labels, and not-found semantics", async () => {
  await withTempContentRoot(fixtureFiles, async (rootDir) => {
    await withWorkingDirectory(rootDir, async () => {
      const post = await getPostBySlug("newer");
      assert.ok(post);
      assert.deepEqual(post.toc, [
        { id: "intro", text: "Intro", level: 2 },
        { id: "details", text: "Details", level: 3 },
      ]);
      assert.match(post.contentHtml, /article-code-language">TypeScript</);

      const draft = await getPostBySlug("draft");
      assert.equal(draft, null);

      const missing = await getPostBySlug("does-not-exist");
      assert.equal(missing, null);
    });
  });
});

test("adjacent post links keep existing direction semantics", async () => {
  await withTempContentRoot(fixtureFiles, async (rootDir) => {
    await withWorkingDirectory(rootDir, async () => {
      const forNewer = await getAdjacentPosts("newer");
      assert.equal(forNewer.previous?.slug, "older");
      assert.equal(forNewer.next, null);

      const forOlder = await getAdjacentPosts("older");
      assert.equal(forOlder.previous, null);
      assert.equal(forOlder.next?.slug, "newer");

      const missing = await getAdjacentPosts("missing");
      assert.deepEqual(missing, { previous: null, next: null });
    });
  });
});

test("category guard and formatting helpers remain compatible", () => {
  assert.equal(isPostCategory("tech"), true);
  assert.equal(isPostCategory("unknown"), false);
  assert.equal(formatReadingTime(5, "en"), "5 min read");
  assert.ok(formatDate("2026-04-03", "en").includes("2026"));
});
