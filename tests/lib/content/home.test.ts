import assert from "node:assert/strict";
import test from "node:test";
import { withTempContentRoot } from "../../helpers/content-root";
import { getHomepageOverview } from "@/lib/content/home";

test("getHomepageOverview returns recent blog posts, recent notes, featured projects, and featured links", async () => {
  await withTempContentRoot(
    {
      "posts/post.md": `---
title: Post
date: 2026-04-03
summary: Blog summary
category: tech
published: true
---
Blog body`,
      "notes/note.md": `---
title: Note
date: 2026-04-04
summary: Note summary
published: true
---
Note body`,
      "projects/blog.json": JSON.stringify({
        title: "Blog",
        summary: "Personal site",
        status: "active",
        startedAt: "2026-04-05",
        featured: true,
        links: [],
      }),
      "links/github.json": JSON.stringify({
        label: "GitHub",
        href: "https://github.com/example",
        description: "Code",
        kind: "profile",
        featured: true,
      }),
    },
    async (rootDir) => {
      const overview = await getHomepageOverview({ rootDir });
      assert.equal(overview.posts.length, 1);
      assert.equal(overview.notes.length, 1);
      assert.equal(overview.projects.length, 1);
      assert.equal(overview.links.length, 1);
    },
  );
});
