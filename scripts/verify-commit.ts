import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const commitVerificationCommands = [
  "tsx --test tests/next-config.test.ts tests/lib/redirects.test.ts tests/lib/site.test.ts tests/lib/content/home.test.ts",
  "npm run build",
] as const;

export async function runCommitVerification(
  runCommand: (command: string) => Promise<void> | void = (command) => {
    execSync(command, { stdio: "inherit" });
  },
) {
  for (const command of commitVerificationCommands) {
    await runCommand(command);
  }
}

async function main() {
  await runCommitVerification();
}

const isMainModule =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
}
