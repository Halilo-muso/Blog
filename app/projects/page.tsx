import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and builds from Shalilo.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">Projects</p>
        <h1 className="font-display text-5xl tracking-tight">Builds in public</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
          Ongoing experiments, shipped pages, and the projects growing around this site.
        </p>
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
