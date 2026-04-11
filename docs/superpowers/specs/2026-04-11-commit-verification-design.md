# Commit Verification Design

Date: 2026-04-11
Status: Draft approved in conversation, written for review
Scope: Add a repository-owned pre-commit verification flow that blocks commits when core site health checks fail, while still allowing intentional bypass via Git's native `--no-verify`

## 1. Context

The current site architecture has already expanded beyond a single blog into a multi-page personal site with dedicated `blog`, `notes`, `projects`, `links`, and `about` routes.

That shift changes the main failure mode. The project is no longer mostly at risk of "missing a page idea". It is more at risk of introducing breakage while editing content structure, routing, configuration, or homepage aggregation.

The next useful improvement is therefore not another surface feature. It is a commit-time guardrail that catches obvious site-health regressions before they land in git history.

## 2. Chosen Direction

The selected direction is:

- trigger verification on every commit attempt
- focus the first version on site breakage, not content policy or SEO completeness
- block commits by default when checks fail
- preserve a deliberate escape hatch through `git commit --no-verify`
- keep the implementation lightweight and repository-owned

This is a commit verification design, not a full release pipeline design.

## 3. Problem Definition

The first version of the workflow is meant to catch failures such as:

- route generation or rendering breakage
- invalid Next configuration behavior
- redirect regressions
- broken homepage aggregation or site configuration assumptions
- production build failures

It is not meant to catch every possible quality issue.

Specifically, phase 1 does not target:

- frontmatter completeness rules
- link availability checks
- image existence checks
- SEO field completeness
- deployment-only failures outside local build coverage

## 4. User Experience Goals

The desired commit experience is:

1. Developer runs `git commit`
2. Repository-owned checks run automatically
3. If checks pass, commit continues normally
4. If checks fail, commit is blocked with readable command output
5. If the developer intentionally needs to bypass the guardrail, they can use `git commit --no-verify`

The system should feel strict by default, but not trapped.

## 5. Verification Scope

The pre-commit flow should run a medium-cost verification set.

### Included checks

The first version should include:

- a targeted automated test subset covering core site-health behavior
- a production build check via `next build`

### Required test coverage

The targeted test subset should include the repository tests that most directly protect structural site behavior:

- `tests/next-config.test.ts`
- `tests/lib/redirects.test.ts`
- `tests/lib/site.test.ts`
- `tests/lib/content/home.test.ts`

These tests cover:

- Next config expectations
- redirect behavior
- site-level content expectations
- homepage content aggregation

### Build coverage

The flow should run `npm run build` after the targeted tests pass.

This ensures the commit hook catches issues that only appear during production compilation or static route generation, not just unit-level failures.

## 6. Performance Boundary

The accepted runtime target is medium cost:

- roughly 30 to 90 seconds for a normal successful run

This is intentionally slower than a minimal lint-only hook, because the purpose is to stop structural site breakage early.

However, the design should avoid unnecessary expansion beyond that cost envelope in phase 1.

That means:

- do not run the entire test suite by default
- do not add network-dependent checks
- do not add nonessential content validation

## 7. Architecture

The implementation should be split into three repository-owned layers.

### Layer 1: Verification command

`package.json` should expose a dedicated script entry for commit verification.

Recommended command name:

- `verify:commit`

Its responsibility is to run the targeted test subset first and the production build second.

This keeps the source of truth for "what commit verification means" in one place.

### Layer 2: Git hook

A versioned `pre-commit` hook should call the repository verification command.

Its responsibility is only:

- invoke the verification command
- exit nonzero when verification fails

The hook must not become a second place where verification logic is duplicated.

### Layer 3: Installation path

The repository should use a lightweight hook installation approach based on a versioned hooks directory and Git `core.hooksPath`.

This is preferred over a heavier dependency-driven approach because:

- the repo only needs a small amount of hook behavior
- the workflow should stay transparent
- the project does not currently need extra hook tooling complexity

## 8. Preferred Technical Direction

The preferred setup is:

- store hooks in a repository-owned directory such as `.githooks/`
- configure Git to use that directory through `core.hooksPath`
- document the one-time setup command for contributors

This direction is preferred over Husky for phase 1 because it reduces dependency surface and keeps the mechanism obvious to inspect and debug.

## 9. Failure And Bypass Behavior

### Failure behavior

When any verification step fails:

- the commit must stop
- the failing command output should remain visible in the terminal
- the developer should not need to inspect hidden logs to understand what broke

### Bypass behavior

The only supported bypass in phase 1 is:

- `git commit --no-verify`

No custom environment flags or secondary bypass mechanisms should be added in the first version.

This keeps the mental model simple and consistent with Git defaults.

## 10. Documentation Requirements

The repository documentation should explain:

- what runs during commit verification
- why those checks were chosen
- that failures block commits by default
- how to intentionally bypass with `--no-verify`
- when bypass should be used sparingly
- how to enable hooks on a fresh clone

The documentation does not need to become a long process manual. It only needs to make setup and expectations explicit.

## 11. Out Of Scope

The following are explicitly out of scope for this design:

- converting commit verification into a full CI system
- pre-push verification strategy
- release or deploy gates
- content linting rules
- SEO auditing
- external link checking
- accessibility automation
- image or asset existence auditing

These may be valid future improvements, but they are separate problems and should not be bundled into this first commit-time workflow.

## 12. Success Criteria

This design is successful when:

- commit attempts automatically run the chosen site-health checks
- broken redirects, Next config regressions, homepage aggregation regressions, or production build failures stop the commit
- normal commits remain tolerable in runtime for local development
- developers retain a clear intentional bypass using `git commit --no-verify`
- the verification logic lives in the repository, not as undocumented local machine behavior

## 13. Risks And Guardrails

### Risk: hook becomes too heavy

If the hook absorbs too many unrelated checks, developers will bypass it routinely and the guardrail loses credibility.

Guardrail:

- keep phase 1 limited to targeted tests plus production build

### Risk: verification logic gets duplicated

If commands are split across `package.json`, hook scripts, and ad hoc docs, maintenance will drift.

Guardrail:

- keep the check sequence defined in one repository script
- make the hook a thin caller only

### Risk: setup is inconsistent across clones

If contributors do not enable the hook path, the safety net silently disappears.

Guardrail:

- document the setup step clearly
- use a repository-owned hooks directory rather than unstored local hooks

## 14. Recommended Next Planning Boundary

The implementation plan for this design should cover:

- adding the verification script entry
- adding and documenting the versioned pre-commit hook
- defining the exact targeted test command
- documenting setup and bypass usage
- verifying the workflow with both a passing run and an intentional failure case
