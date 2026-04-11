import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

test("commit verification is wired through package.json and the pre-commit hook", async () => {
  const packageJson = JSON.parse(
    await fs.readFile(path.join(repoRoot, "package.json"), "utf8"),
  ) as {
    scripts?: Record<string, string>;
  };
  const hook = await fs.readFile(path.join(repoRoot, ".githooks", "pre-commit"), "utf8");

  assert.equal(packageJson.scripts?.["verify:commit"], "node scripts/verify-commit.mjs");
  assert.match(hook, /^#!\/bin\/sh/m);
  assert.match(hook, /npm run verify:commit/);
});
