import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who Shalilo is, what this site is for, and why it is being built.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
      <section className="space-y-4">
        <h1 className="font-display text-5xl tracking-tight">About</h1>
        <p className="text-base leading-8 text-[var(--color-soft-text)]">{siteConfig.about.intro}</p>
      </section>
      {siteConfig.about.sections.map((section) => (
        <section
          key={section.title}
          className="space-y-3 rounded-[1.7rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6"
        >
          <h2 className="font-display text-3xl tracking-tight">{section.title}</h2>
          <p className="text-sm leading-7 text-[var(--color-soft-text)]">{section.body}</p>
        </section>
      ))}
    </div>
  );
}
