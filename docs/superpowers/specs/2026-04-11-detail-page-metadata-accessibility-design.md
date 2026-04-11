# Detail Page Metadata Accessibility Design

Date: 2026-04-11
Status: Draft approved in conversation, written for review
Scope: Improve semantic structure and screen reader readability for metadata on blog detail pages and notes detail pages

## 1. Context

The site now has stable blog and notes detail pages, plus a basic pre-commit verification flow. The next useful quality improvement is not another route. It is making the most important reading surfaces easier to understand with assistive technology.

Within accessibility work, this design is intentionally narrow. It does not try to solve all keyboard, color, audit, or component-level issues at once. It focuses only on metadata semantics and metadata reading quality on the two detail page families:

- `app/blog/[slug]/page.tsx`
- `app/notes/[slug]/page.tsx`

## 2. Chosen Direction

The selected direction is:

- prioritize metadata semantics over broad layout refactoring
- limit phase 1 to blog detail and notes detail pages
- improve screen reader output without changing information architecture
- use server-rendered HTML tests to lock in the semantics

This is an accessibility refinement project, not a visual redesign project.

## 3. Problem Definition

The current detail pages already expose the right information visually, but visually correct content is not automatically semantically clear.

The first version of this work is meant to improve how assistive technology understands and reads:

- dates
- reading time
- tags
- return links
- previous and next article links
- decorative separators, arrows, and visual-only symbols

The goal is to remove ambiguity and extra noise from detail page metadata.

## 4. User Experience Goals

For a screen reader user on a blog or note detail page, metadata should behave like meaningful page information instead of a row of loosely connected text fragments.

That means:

- dates should be announced as dates with machine-readable backing
- reading time should be announced as one understandable phrase
- tag groups should read like a set of related items
- decorative punctuation or icons should not add noise
- navigation links should have clear accessible names

The visual layout may stay largely the same, but the reading experience should become more explicit and less cluttered.

## 5. In-Scope Pages And Elements

### Included page families

- blog detail pages under `app/blog/[slug]/page.tsx`
- notes detail pages under `app/notes/[slug]/page.tsx`

### Included metadata elements

- published date
- reading time
- tag collection
- back link text
- previous and next article links
- decorative separators and icons inside metadata or navigation labels

## 6. Out Of Scope

The following are explicitly out of scope for this design:

- homepage accessibility work
- list page accessibility work
- keyboard interaction changes
- focus management changes
- color contrast changes
- full heading-structure redesign
- full table-of-contents accessibility redesign
- sitewide audit tooling

These may become later accessibility subprojects, but they should not be bundled into this first metadata-focused pass.

## 7. Semantic Design Rules

Phase 1 should establish a small, consistent set of semantic rules shared by both detail page families.

### Dates

Published dates should use semantic `time` elements with a valid `dateTime` attribute.

The visible text can remain localized and user-friendly, but the underlying markup should be machine-readable and explicit.

### Reading time

Reading time should be announced as a complete phrase instead of scattered visual fragments.

If the visible UI uses separate styling or decorative separators, the accessible output should still read as one coherent unit such as "5 minute read".

### Tags

Tags should be presented as a semantic collection rather than a loose series of styled tokens.

The preferred first-phase direction is:

- a labeled metadata subsection or list grouping
- tag items represented with list semantics

If tag links already exist or are added later, the group should still preserve collection semantics.

### Decorative elements

Decorative separators, arrows, bullets, and icons that do not convey unique meaning should not be announced.

The preferred first-phase rule is:

- decorative elements should be hidden from assistive technology with `aria-hidden="true"` when they are purely visual

### Navigation labels

Back links and previous/next links should expose clear accessible names.

The accessible name should communicate destination or role clearly, not rely on decorative arrows or surrounding layout for meaning.

## 8. Architectural Direction

This work should be split into three small implementation units.

### Unit 1: Detail page metadata composition

The page components should assemble the metadata in a clearer semantic structure.

They are responsible for:

- grouping related metadata
- choosing the right semantic elements
- passing explicit labels where needed

### Unit 2: Shared metadata rules

Where blog and notes pages repeat the same metadata semantics, the implementation should converge on one minimal pattern rather than drifting into two separate structures.

This does not require a large abstraction. A small helper or shared fragment is acceptable if it reduces duplication without hiding the markup intent.

### Unit 3: Regression tests

The repository should add tests that inspect server-rendered HTML and verify that the semantic requirements remain true.

The tests should protect against silent regressions where a future refactor preserves appearance but breaks meaning.

## 9. Testing Strategy

The preferred first-phase testing strategy is static HTML inspection using the current repository style.

Tests should verify facts such as:

- detail pages render `time` elements for dates
- date elements include `dateTime`
- tags render as list structures
- decorative elements used only for presentation are hidden from assistive technology
- accessible labels for back or adjacent navigation remain explicit

This design intentionally avoids introducing a heavier browser automation stack for the first pass.

## 10. Success Criteria

This design is successful when:

- blog detail metadata uses semantic date markup
- notes detail metadata uses semantic date markup
- reading time reads as a coherent phrase to assistive technology
- tags are exposed as a clear collection
- decorative metadata separators and arrows do not create extra screen reader noise
- back and adjacent navigation labels remain understandable without relying on visual symbols
- automated tests cover these expectations

## 11. Risks And Guardrails

### Risk: semantic changes drift between blog and notes

If each page family is edited independently, the site may end up with similar-looking but inconsistent accessibility behavior.

Guardrail:

- use one shared semantic rule set for metadata

### Risk: accessibility changes accidentally alter layout

If semantic work is mixed with visual cleanup, the scope will expand and review becomes harder.

Guardrail:

- keep phase 1 focused on markup and accessible naming
- avoid unrelated style changes

### Risk: decorative text remains exposed

Even a visually minor separator or arrow can create repeated noise when read aloud.

Guardrail:

- review metadata and navigation fragments specifically for `aria-hidden` opportunities

## 12. Recommended Next Planning Boundary

The implementation plan for this design should cover:

- identifying the exact metadata blocks in blog and notes detail pages
- adding failing HTML-output tests for semantic metadata requirements
- implementing the shared metadata semantics with minimal duplication
- verifying both full test suite and targeted page semantics after the change
