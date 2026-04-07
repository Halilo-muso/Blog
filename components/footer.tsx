export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel)]/72 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-[var(--color-soft-text)] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>Shalilo · Built slowly, shipped deliberately.</p>
        <p>Next.js 15 · Tailwind CSS · Markdown · RSS</p>
      </div>
    </footer>
  );
}
