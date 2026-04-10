import type { ProjectEntry } from "@/lib/content/projects";

export function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <article className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">{project.status}</p>
      <h3 className="mt-4 font-display text-3xl tracking-tight">{project.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-soft-text)]">{project.summary}</p>
      {project.links.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--color-border)] px-4 py-2 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
