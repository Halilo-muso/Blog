import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tsxCliPath = path.join(repoRoot, "node_modules", "tsx", "dist", "cli.mjs");

const buildStep =
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

export const commitVerificationSteps = [
  {
    label: "site-health tests",
    command: process.execPath,
    args: [
      tsxCliPath,
      "--test",
      "tests/next-config.test.ts",
      "tests/lib/redirects.test.ts",
      "tests/lib/site.test.ts",
      "tests/lib/content/home.test.ts",
    ],
  },
  buildStep,
];

export async function runCommitVerification(runStep = defaultRunStep) {
  for (const step of commitVerificationSteps) {
    await runStep(step);
  }
}

function defaultRunStep(step) {
  const result = spawnSync(step.command, step.args, {
    cwd: repoRoot,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${step.label} failed with exit code ${result.status ?? 1}`);
  }
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  runCommitVerification().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
