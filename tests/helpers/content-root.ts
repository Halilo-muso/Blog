import os from "node:os";
import path from "node:path";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";

export async function withTempContentRoot(
  files: Record<string, string>,
  run: (rootDir: string) => Promise<void>,
) {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "shalilo-content-"));

  try {
    for (const [relativePath, value] of Object.entries(files)) {
      const absolutePath = path.join(rootDir, "content", relativePath);
      await mkdir(path.dirname(absolutePath), { recursive: true });
      await writeFile(absolutePath, value, "utf8");
    }

    await run(rootDir);
  } finally {
    await rm(rootDir, { recursive: true, force: true });
  }
}
