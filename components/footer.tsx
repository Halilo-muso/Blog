export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel)]/65 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-[var(--color-soft-text)] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>静かな森 · Phase 1 毛坯房版本</p>
        <p>Built with Next.js 15, Tailwind CSS, Markdown</p>
      </div>
    </footer>
  );
}
