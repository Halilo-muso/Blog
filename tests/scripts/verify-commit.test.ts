import assert from "node:assert/strict";
import test from "node:test";
import {
  commitVerificationCommands,
  runCommitVerification,
} from "../../scripts/verify-commit";

test("commit verification runs the expected site-health commands in order", async () => {
  const calls: string[] = [];

  await runCommitVerification(async (command) => {
    calls.push(command);
  });

  assert.deepEqual(commitVerificationCommands, [
    "tsx --test tests/next-config.test.ts tests/lib/redirects.test.ts tests/lib/site.test.ts tests/lib/content/home.test.ts",
    "npm run build",
  ]);
  assert.deepEqual(calls, [...commitVerificationCommands]);
});

test("commit verification stops after the first failing command", async () => {
  const calls: string[] = [];

  await assert.rejects(
    runCommitVerification(async (command) => {
      calls.push(command);
      throw new Error(`boom: ${command}`);
    }),
    /boom: tsx --test tests\/next-config.test.ts tests\/lib\/redirects.test.ts tests\/lib\/site.test.ts tests\/lib\/content\/home.test.ts/,
  );

  assert.deepEqual(calls, [
    "tsx --test tests/next-config.test.ts tests/lib/redirects.test.ts tests/lib/site.test.ts tests/lib/content/home.test.ts",
  ]);
});
