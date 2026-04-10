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
} from "@/lib/posts";

const fixtureFiles = {
  "posts/z-newer.md": `---
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
  "posts/a-older.md": `---
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
    const posts = await getAllPosts({ rootDir });
    assert.deepEqual(posts.map((post) => post.slug), ["z-newer", "a-older"]);
    assert.equal(posts[0].category, "tech");
    assert.equal(posts[1].category, "misc");
    assert.deepEqual(posts[1].tags, []);

    const grouped = await getPostsByCategory({ rootDir });
    assert.deepEqual(grouped.map((group) => group.category), [...postCategories]);
    assert.equal(grouped.find((group) => group.category === "tech")?.posts.length, 1);
    assert.equal(grouped.find((group) => group.category === "misc")?.posts.length, 1);

    const techPosts = await getPostsForCategory("tech", { rootDir });
    assert.deepEqual(techPosts.map((post) => post.slug), ["z-newer"]);

    const recent = await getRecentPosts(1, { rootDir });
    assert.deepEqual(recent.map((post) => post.slug), ["z-newer"]);
  });
});

test("getPostBySlug preserves toc, code labels, and not-found semantics", async () => {
  await withTempContentRoot(fixtureFiles, async (rootDir) => {
    const post = await getPostBySlug("z-newer", { rootDir });
    assert.ok(post);
    assert.deepEqual(post.toc, [
      { id: "intro", text: "Intro", level: 2 },
      { id: "details", text: "Details", level: 3 },
    ]);
    assert.match(post.contentHtml, /article-code-language">TypeScript</);

    const draft = await getPostBySlug("draft", { rootDir });
    assert.equal(draft, null);

    const missing = await getPostBySlug("does-not-exist", { rootDir });
    assert.equal(missing, null);
  });
});

test("adjacent post links keep existing direction semantics", async () => {
  await withTempContentRoot(fixtureFiles, async (rootDir) => {
    const forNewer = await getAdjacentPosts("z-newer", { rootDir });
    assert.equal(forNewer.previous?.slug, "a-older");
    assert.equal(forNewer.next, null);

    const forOlder = await getAdjacentPosts("a-older", { rootDir });
    assert.equal(forOlder.previous, null);
    assert.equal(forOlder.next?.slug, "z-newer");

    const missing = await getAdjacentPosts("missing", { rootDir });
    assert.deepEqual(missing, { previous: null, next: null });
  });
});

test("category guard and formatting helpers remain compatible", () => {
  assert.equal(isPostCategory("tech"), true);
  assert.equal(isPostCategory("unknown"), false);
  assert.equal(formatReadingTime(5, "en"), "5 min read");
  assert.ok(formatDate("2026-04-03", "en").includes("2026"));
});
