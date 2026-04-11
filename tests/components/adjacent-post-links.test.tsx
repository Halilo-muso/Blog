import React from "react";
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdjacentPostLinks } from "@/components/adjacent-post-links";

test("AdjacentPostLinks gives explicit accessible names and hides decorative arrows", () => {
  const html = renderToStaticMarkup(
    <AdjacentPostLinks
      locale="en"
      labels={{ newer: "Newer post", older: "Older post" }}
      previous={{
        slug: "older-entry",
        title: "Older Entry",
        date: "2026-04-08",
        summary: "Older summary",
        category: "tech",
        tags: [],
        readingMinutes: 2,
      }}
      next={{
        slug: "newer-entry",
        title: "Newer Entry",
        date: "2026-04-12",
        summary: "Newer summary",
        category: "tech",
        tags: [],
        readingMinutes: 3,
      }}
      categoryLabels={{
        tech: "Tech",
        daily: "Daily",
        music: "Music",
        misc: "Misc",
      }}
    />,
  );

  assert.match(html, /aria-label="Newer post: Newer Entry"/);
  assert.match(html, /aria-label="Older post: Older Entry"/);
  assert.equal((html.match(/aria-hidden="true"/g) ?? []).length, 2);
});
