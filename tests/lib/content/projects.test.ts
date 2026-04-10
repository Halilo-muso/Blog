import assert from "node:assert/strict";
import test from "node:test";
import { withTempContentRoot } from "../../helpers/content-root";
import { getAllProjects, getFeaturedProjects } from "@/lib/content/projects";

test("getFeaturedProjects returns featured entries only", async () => {
  await withTempContentRoot(
    {
      "projects/blog.json": JSON.stringify({
        title: "Blog",
        summary: "Personal site",
        status: "active",
        startedAt: "2026-04-05",
        featured: true,
        links: [{ label: "Live", href: "https://example.com" }],
      }),
      "projects/old.json": JSON.stringify({
        title: "Old",
        summary: "Old thing",
        status: "archived",
        startedAt: "2025-01-01",
        featured: false,
        links: [],
      }),
    },
    async (rootDir) => {
      const featured = await getFeaturedProjects({ rootDir });
      assert.deepEqual(featured.map((project) => project.title), ["Blog"]);
      assert.equal((await getAllProjects({ rootDir })).length, 2);
    },
  );
});
