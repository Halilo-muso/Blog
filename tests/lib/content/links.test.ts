import assert from "node:assert/strict";
import test from "node:test";
import { withTempContentRoot } from "../../helpers/content-root";
import { getFeaturedLinks } from "@/lib/content/links";

test("getFeaturedLinks only returns featured links", async () => {
  await withTempContentRoot(
    {
      "links/github.json": JSON.stringify({
        label: "GitHub",
        href: "https://github.com/example",
        description: "Code",
        kind: "profile",
        featured: true,
      }),
      "links/other.json": JSON.stringify({
        label: "Other",
        href: "https://example.com",
        description: "Other",
        kind: "other",
        featured: false,
      }),
    },
    async (rootDir) => {
      const links = await getFeaturedLinks({ rootDir });
      assert.deepEqual(links.map((link) => link.label), ["GitHub"]);
    },
  );
});
