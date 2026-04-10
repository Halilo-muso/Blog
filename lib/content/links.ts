import fs from "node:fs/promises";
import path from "node:path";
import { resolveCollectionDirectory } from "@/lib/content/shared";

export type LinkEntry = {
  slug: string;
  label: string;
  href: string;
  description: string;
  kind: "profile" | "music" | "contact" | "other";
  featured: boolean;
};

type LinkOptions = {
  rootDir?: string;
};

export async function getAllLinks(
  { rootDir = process.cwd() }: LinkOptions = {},
): Promise<LinkEntry[]> {
  const directory = resolveCollectionDirectory("links", rootDir);
  const fileNames = await fs.readdir(directory).catch(() => []);

  return Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".json"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.json$/, "");
        const raw = await fs.readFile(path.join(directory, fileName), "utf8");

        return {
          slug,
          ...(JSON.parse(raw) as Omit<LinkEntry, "slug">),
        };
      }),
  );
}

export async function getFeaturedLinks(
  { rootDir = process.cwd() }: LinkOptions = {},
) {
  return (await getAllLinks({ rootDir })).filter((link) => link.featured);
}
