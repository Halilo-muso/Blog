import fs from "node:fs/promises";
import path from "node:path";
import { resolveCollectionDirectory } from "@/lib/content/shared";

export type ProjectEntry = {
  slug: string;
  title: string;
  summary: string;
  status: "active" | "paused" | "archived";
  startedAt: string;
  featured: boolean;
  links: Array<{ label: string; href: string }>;
};

type ProjectOptions = {
  rootDir?: string;
};

export async function getAllProjects(
  { rootDir = process.cwd() }: ProjectOptions = {},
): Promise<ProjectEntry[]> {
  const directory = resolveCollectionDirectory("projects", rootDir);
  const fileNames = await fs.readdir(directory).catch(() => []);

  return Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".json"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.json$/, "");
        const raw = await fs.readFile(path.join(directory, fileName), "utf8");

        return {
          slug,
          ...(JSON.parse(raw) as Omit<ProjectEntry, "slug">),
        };
      }),
  );
}

export async function getFeaturedProjects(
  { rootDir = process.cwd() }: ProjectOptions = {},
) {
  return (await getAllProjects({ rootDir })).filter((project) => project.featured);
}
