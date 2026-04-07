import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/feed.xml", label: "RSS" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-surface)_76%,transparent)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-3xl tracking-[-0.04em] text-[var(--color-text)]">
            Shalilo
          </Link>
          <p className="hidden text-xs uppercase tracking-[0.28em] text-[var(--color-muted)] md:block">
            Notes, posts, direction
          </p>
        </div>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_82%,transparent)] p-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-[var(--color-soft-text)] transition duration-300 hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
