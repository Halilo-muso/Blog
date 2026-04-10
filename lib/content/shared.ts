import path from "node:path";

export function resolveCollectionDirectory(collection: string, rootDir = process.cwd()) {
  return path.join(rootDir, "content", collection);
}

export function sortByDateDesc<T extends { date: string }>(items: readonly T[]) {
  return [...items].sort(
    (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
}
