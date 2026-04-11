import React from "react";
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { DetailPageMetadata } from "@/components/detail-page-metadata";

test("DetailPageMetadata renders semantic time, reading time, and tags", () => {
  const html = renderToStaticMarkup(
    <DetailPageMetadata
      date="2026-04-10"
      readingMinutes={5}
      tags={["accessibility", "notes"]}
      locale="en"
      labels={{
        metadata: "Entry metadata",
        publishedOn: "Published on",
        readingTime: "Reading time",
        tags: "Tags",
      }}
    />,
  );

  assert.match(html, /<dl[^>]*aria-label="Entry metadata"/);
  assert.match(html, /<time[^>]*datetime="2026-04-10"/i);
  assert.match(html, />April 10, 2026</);
  assert.match(html, />5 min read</);
  assert.match(html, /<ul[^>]*aria-label="Tags"/);
  assert.match(html, /<li[^>]*>accessibility<\/li>/);
  assert.match(html, /<li[^>]*>notes<\/li>/);
});
