import React from "react";
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { NoteAiVersionPanel } from "@/components/note-ai-version-panel";

test("NoteAiVersionPanel renders nothing when no AI content exists", () => {
  const html = renderToStaticMarkup(
    <NoteAiVersionPanel
      contentHtml={undefined}
      labels={{
        toggle: "查看 AI 潤色版",
        badge: "AI 版本",
        description: "同一篇日記的另一種寫法",
      }}
    />,
  );

  assert.equal(html, "");
});

test("NoteAiVersionPanel renders a collapsed AI disclosure when content exists", () => {
  const html = renderToStaticMarkup(
    <NoteAiVersionPanel
      contentHtml="<p>Alternate body</p>"
      labels={{
        toggle: "查看 AI 潤色版",
        badge: "AI 版本",
        description: "同一篇日記的另一種寫法",
      }}
    />,
  );

  assert.match(html, /<details[^>]*>/);
  assert.match(html, />查看 AI 潤色版</);
  assert.match(html, />AI 版本</);
  assert.match(html, /Alternate body/);
});
