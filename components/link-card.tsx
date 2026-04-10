import type { LinkEntry } from "@/lib/content/links";

export function LinkCard({ link }: { link: LinkEntry }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">{link.kind}</p>
      <h3 className="mt-4 font-display text-3xl tracking-tight">{link.label}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-soft-text)]">{link.description}</p>
    </a>
  );
}
