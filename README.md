# Shalilo Blog

A personal site built in public while learning frontend, writing notes, and turning practice into a fuller personal space.

## Scripts

```bash
npm run dev
npm run build
npx eslint app lib components tests next.config.ts
npm run test
npm run verify:commit
```

## Commit Verification

Enable the repository-managed Git hooks once per clone:

```bash
git config core.hooksPath .githooks
```

After setup, every `git commit` runs:

```bash
npm run verify:commit
```

That command checks:

- targeted site-health tests for config, redirects, site config, and homepage aggregation
- a production `next build`

If any step fails, the commit is blocked. To bypass intentionally for an emergency or local-only checkpoint, use:

```bash
git commit --no-verify
```

Use bypass sparingly. The default path should remain the verified path.
