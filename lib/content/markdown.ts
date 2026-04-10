const codeLanguageLabels: Record<string, string> = {
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  markdown: "Markdown",
  md: "Markdown",
  plaintext: "Text",
  shell: "Shell",
  sh: "Shell",
  ts: "TypeScript",
  tsx: "TSX",
  txt: "Text",
  yaml: "YAML",
  yml: "YAML",
};

function formatCodeLanguage(language?: string) {
  if (!language) {
    return "Code";
  }

  const normalized = language.toLowerCase();
  return codeLanguageLabels[normalized] ?? normalized.toUpperCase();
}

export function calculateReadingMinutes(content: string) {
  const latinWords = content.trim().split(/\s+/).filter(Boolean).length;
  const cjkChars = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const units = latinWords + cjkChars;

  return Math.max(1, Math.ceil(units / 350));
}

export function buildTableOfContents(contentHtml: string) {
  const toc: Array<{ id: string; text: string; level: 2 | 3 }> = [];
  const usedIds = new Map<string, number>();

  const withAnchors = contentHtml.replace(
    /<(h2|h3)>(.*?)<\/\1>/g,
    (_, tag: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const baseId =
        text
          .toLowerCase()
          .trim()
          .replace(/[\s]+/g, "-")
          .replace(/[^\w\-\u4e00-\u9fff]/g, "")
          .replace(/-+/g, "-") || "section";
      const count = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      const level = Number(tag.slice(1)) as 2 | 3;

      toc.push({ id, text, level });

      return `<${tag} id="${id}">${inner}</${tag}>`;
    },
  );

  return {
    contentHtml: withAnchors,
    toc,
  };
}

export function enhanceCodeBlocks(contentHtml: string) {
  return contentHtml.replace(/<pre>([\s\S]*?)<\/pre>/g, (block) => {
    const languageMatch = block.match(/language-([\w-]+)/);
    const languageLabel = formatCodeLanguage(languageMatch?.[1]);

    return `<div class="article-code-block"><div class="article-code-header"><span class="article-code-dot" aria-hidden="true"></span><span class="article-code-language">${languageLabel}</span></div>${block}</div>`;
  });
}
