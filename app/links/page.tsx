import type { Metadata } from "next";
import { LinkCard } from "@/components/link-card";
import { getAllLinks } from "@/lib/content/links";

export const metadata: Metadata = {
  title: "Links",
  description: "External profiles and contact exits for Shalilo.",
  alternates: {
    canonical: "/links",
  },
};

export default async function LinksPage() {
  const links = await getAllLinks();

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">Links</p>
        <h1 className="font-display text-5xl tracking-tight">Elsewhere</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
          External profiles, listening trails, and the exits that connect this site to the rest of the web.
        </p>
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        {links.map((link) => (
          <LinkCard key={link.slug} link={link} />
        ))}
      </section>
    </div>
  );
}
