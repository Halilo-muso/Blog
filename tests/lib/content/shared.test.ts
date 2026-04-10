import test from "node:test";
import assert from "node:assert/strict";
import { resolveCollectionDirectory, sortByDateDesc } from "@/lib/content/shared";

test("resolveCollectionDirectory joins the provided root and collection name", () => {
  const result = resolveCollectionDirectory("notes", "D:/tmp/blog");
  assert.equal(result.replace(/\\/g, "/"), "D:/tmp/blog/content/notes");
});

test("sortByDateDesc returns a new newest-first array", () => {
  const source = [
    { slug: "older", date: "2026-04-01" },
    { slug: "newer", date: "2026-04-03" },
  ];

  const result = sortByDateDesc(source);
  assert.deepEqual(result.map((item) => item.slug), ["newer", "older"]);
  assert.deepEqual(source.map((item) => item.slug), ["older", "newer"]);
});
