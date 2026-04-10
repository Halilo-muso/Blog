import { getFeaturedLinks } from "@/lib/content/links";
import { getRecentNotes } from "@/lib/content/notes";
import { getRecentPosts } from "@/lib/content/posts";
import { getFeaturedProjects } from "@/lib/content/projects";

type HomeOptions = {
  rootDir?: string;
};

export async function getHomepageOverview(
  { rootDir = process.cwd() }: HomeOptions = {},
) {
  const [posts, notes, projects, links] = await Promise.all([
    getRecentPosts(3, { rootDir }),
    getRecentNotes(3, { rootDir }),
    getFeaturedProjects({ rootDir }),
    getFeaturedLinks({ rootDir }),
  ]);

  return { posts, notes, projects, links };
}
