import assert from "node:assert/strict";
import test from "node:test";
import { withTempContentRoot } from "../../helpers/content-root";
import { getAllNotes, getNoteBySlug, getRecentNotes } from "@/lib/content/notes";

test("getAllNotes sorts newest first and ignores unpublished notes", async () => {
  await withTempContentRoot(
    {
      "notes/a-day-one.md": `---
title: Day One
date: 2026-04-01
summary: Day one
published: true
---
First note`,
      "notes/z-day-two.md": `---
title: Day Two
date: 2026-04-02
summary: Day two
published: true
---
Second note`,
      "notes/draft.md": `---
title: Draft
date: 2026-04-03
summary: Draft
published: false
---
Draft note`,
    },
    async (rootDir) => {
      const notes = await getAllNotes({ rootDir });
      assert.deepEqual(notes.map((note) => note.slug), ["z-day-two", "a-day-one"]);
      assert.deepEqual(
        (await getRecentNotes(1, { rootDir })).map((note) => note.slug),
        ["z-day-two"],
      );
    },
  );
});

test("getAllNotes ignores AI companion note files", async () => {
  await withTempContentRoot(
    {
      "notes/day-one.md": `---
title: Day One
date: 2026-04-01
summary: Day one
published: true
---
Body`,
      "notes/day-one.ai.md": `AI alternate body`,
    },
    async (rootDir) => {
      const notes = await getAllNotes({ rootDir });
      assert.deepEqual(notes.map((note) => note.slug), ["day-one"]);
    },
  );
});

test("getNoteBySlug preserves HTML rendering and table of contents", async () => {
  await withTempContentRoot(
    {
      "notes/entry.md": `---
title: Entry
date: 2026-04-03
summary: Entry summary
tags:
  - diary
published: true
---
## Section One

Body

### Section Two

\`\`\`ts
const value = 1;
\`\`\``,
    },
    async (rootDir) => {
      const note = await getNoteBySlug("entry", { rootDir });
      assert.ok(note);
      assert.deepEqual(note.toc, [
        { id: "section-one", text: "Section One", level: 2 },
        { id: "section-two", text: "Section Two", level: 3 },
      ]);
      assert.match(note.contentHtml, /article-code-language">TypeScript</);
    },
  );
});

test("getNoteBySlug loads optional AI companion content without exposing it as a second note", async () => {
  await withTempContentRoot(
    {
      "notes/entry.md": `---
title: Entry
date: 2026-04-03
summary: Entry summary
published: true
---
Main body`,
      "notes/entry.ai.md": `## AI Version

Alternate body`,
    },
    async (rootDir) => {
      const note = await getNoteBySlug("entry", { rootDir });
      assert.ok(note);
      assert.match(note.aiVersionHtml ?? "", /Alternate body/);
      assert.equal((await getAllNotes({ rootDir })).length, 1);
    },
  );
});

test("repo diary note can expose an AI companion version without creating a second public note", async () => {
  const note = await getNoteBySlug("2026-04-17-diary");
  assert.ok(note);
  assert.match(note.aiVersionHtml ?? "", /我非常討厭一種人/);

  const notes = await getAllNotes();
  assert.equal(notes.filter((entry) => entry.slug === "2026-04-17-diary").length, 1);
});

test("repo notes keep their Chinese text when loaded from disk", async () => {
  const note = await getNoteBySlug("2026-04-06-diary");
  assert.ok(note);
  assert.equal(note.title, "\u904A\u73A9\u7684\u4E00\u5929");
  assert.match(note.summary, /\u8A18\u9304\u4ECA\u5929\u7684\u65E5\u5E38/);
});
