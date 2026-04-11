import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  commitVerificationSteps,
  runCommitVerification,
} from "../../scripts/verify-commit.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const expectedBuildStep =
  process.platform === "win32"
    ? {
        label: "production build",
        command: process.env.ComSpec ?? "cmd.exe",
        args: ["/d", "/s", "/c", "npm.cmd run build"],
      }
    : {
        label: "production build",
        command: "npm",
        args: ["run", "build"],
      };

test("commit verification runs the expected site-health steps in order", async () => {
  const calls: Array<(typeof commitVerificationSteps)[number]> = [];

  await runCommitVerification(async (step) => {
    calls.push(step);
  });

  assert.deepEqual(commitVerificationSteps, [
    {
      label: "site-health tests",
      command: process.execPath,
      args: [
        path.join(repoRoot, "node_modules", "tsx", "dist", "cli.mjs"),
        "--test",
        "tests/next-config.test.ts",
        "tests/lib/redirects.test.ts",
        "tests/lib/site.test.ts",
        "tests/lib/content/home.test.ts",
      ],
    },
    expectedBuildStep,
  ]);
  assert.deepEqual(calls, [...commitVerificationSteps]);
});

test("commit verification stops after the first failing step", async () => {
  const calls: Array<(typeof commitVerificationSteps)[number]> = [];

  await assert.rejects(
    runCommitVerification(async (step) => {
      calls.push(step);
      throw new Error(`boom: ${step.label}`);
    }),
    /boom: site-health tests/,
  );

  assert.deepEqual(calls, [commitVerificationSteps[0]]);
});
