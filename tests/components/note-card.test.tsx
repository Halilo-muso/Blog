import React from "react";
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { NoteCard } from "@/components/note-card";

test("NoteCard renders title, summary, date, and note permalink", () => {
  const html = renderToStaticMarkup(
    <NoteCard
      note={{
        slug: "entry",
        title: "Entry",
        date: "2026-04-10",
        summary: "A short status update.",
        tags: ["status"],
        readingMinutes: 1,
      }}
      locale="en"
    />,
  );

  assert.match(html, /Entry/);
  assert.match(html, /A short status update\./);
  assert.match(html, /\/notes\/entry/);
});

