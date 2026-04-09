# Dual Stream Portal Design

Date: 2026-04-10
Status: Draft approved in conversation, written for review
Scope: Phase 1 architecture and information design for expanding the site from a single blog into a multi-page personal site

## 1. Context

The long-term goal remains unchanged: move the current site toward the public experience direction of `https://innei.in/en`, without mechanically cloning its implementation details.

Based on the current codebase and the target site's public pages reviewed on April 10, 2026, the current project is no longer blocked on basic blog capability. The article-reading layer is already relatively mature. The main gap is no longer "can it act like a blog" but "can it act like a fuller personal space".

This design therefore focuses on the next structural step:

- keep the current article system as the formal writing layer
- add a second writing stream for process-oriented content
- introduce independent pages for projects, about, and links
- reposition the homepage as a portal instead of a blog landing page

## 2. Chosen Direction

The selected direction is:

- Overall path: rebuild the product map first
- First page set: `About + Projects + Notes/Says + Links`
- Notes/Says type: mixed, allowing short and mid-length entries
- Blog vs Notes boundary: defined by writing intent, not by length
- Homepage role: half portal, half content overview
- Homepage priority: `Identity -> Latest Blog -> Latest Notes -> Projects -> Links`
- First-phase completion standard: stabilize the content model and list structure first, then let pages grow from that structure

The chosen architecture pattern is `Dual Stream Portal`.

## 3. Site Architecture

### Primary routes

The first-phase site map is:

- `/` homepage overview
- `/blog` formal writing archive
- `/notes` process-oriented writing archive
- `/projects` project index
- `/about` stable self-description page
- `/links` external identity and contact page

### Route responsibilities

`/`
- Acts as the main overview page
- Introduces identity
- Shows recent formal writing
- Shows recent process-oriented writing
- Surfaces selected projects
- Surfaces selected external links

`/blog`
- Holds formal, more complete, more durable writing
- Keeps the current reading experience direction
- Should not be diluted by status-like updates

`/notes`
- Holds process, observations, temporary thinking, stage updates, and lightweight outputs
- Must exist as an independent stream, not as a disguised category under blog

`/projects`
- Shows things being built or already built
- Must read as a project collection, not a post archive

`/about`
- Provides stable personal context
- Explains who the author is, what they are building, and why this site exists
- Does not need to act as a time-based feed

`/links`
- Collects external identity and outbound destinations
- Keeps homepage links curated and lightweight
- Avoids turning the homepage into a link dump

## 4. Content Boundary Design

### Blog

A `Blog` entry is defined by intent:

- complete expression
- more coherent structure
- content worth long-term preservation
- content meant to stand as a durable piece of writing

It is not defined by word count.

### Notes

A `Note` entry is defined by intent:

- process
- observation
- idea
- state update
- stage reflection
- lighter publication intent

It is also not defined by word count.

This means:

- a long note can still remain in `Notes` if it is process-oriented
- a relatively short piece can still belong in `Blog` if it is complete and durable in intent

This boundary prevents the content model from degenerating into a simple long-form versus short-form split.

## 5. Homepage Design Role

The homepage is not a pure blog archive and not a shortened about page.

Its role is:

- identity introduction
- current writing overview
- current thinking overview
- selected building signals
- selected external exits

The homepage should read like one sentence:

"This is who I am. These are the formal things I have been writing. These are the process-oriented things I am thinking through. These are some things I am building. If you want to continue, here are the next doors."

### Homepage module order

The homepage module order is fixed for this phase:

1. Identity
2. Latest Blog
3. Latest Notes
4. Projects
5. Links

### Rationale

This order fits the desired author-centered positioning:

- identity comes first so visitors understand whose space this is
- formal writing comes before notes because it carries the strongest authorial signal
- notes come next to show activity, process, and ongoing thought
- projects and links follow as extensions of the same personal space

## 6. Page-Level Minimum Requirements

### `/blog`

Minimum requirement:

- clear archive list
- continued use of the existing reading-experience foundation
- list emphasis on title, summary, date, and category
- no need to overload the list with extra noise

Goal:

- durable writing archive

### `/notes`

Minimum requirement:

- independent list page
- independent content source
- first phase should still keep a legible list structure, ideally with titles or clear summaries
- should not be reduced to a hidden subsection of blog

Goal:

- active stream of process-oriented publication

### `/projects`

Minimum requirement for each project entry:

- `title`
- `summary`
- `status`
- at least one related link

Optional for later:

- `startedAt`
- stack
- cover image
- stage history

Goal:

- make the builder identity visible

### `/about`

Minimum requirement:

- who the author is
- what the author is doing
- why this site exists

Goal:

- stable anchor for personal identity

### `/links`

Minimum requirement:

- external profile links
- music/social/contact exits where relevant
- short descriptions where useful

Goal:

- structured outbound identity page

## 7. First-Phase Data Model

The site should stop treating every future page as a variation of `posts`.

Phase 1 should introduce four distinct content collections:

- `Post`
- `Note`
- `Project`
- `Link`

### `Post`

Purpose:

- powers `/blog`

Direction:

- keep current fields and article rendering direction

### `Note`

Purpose:

- powers `/notes`

Reason for separation:

- notes are not a category of post
- the selected boundary is writing intent, not topical grouping

### `Project`

Purpose:

- powers `/projects`

Suggested minimum fields:

- `title`
- `summary`
- `status`
- `startedAt`
- `links`
- `featured`

### `Link`

Purpose:

- powers `/links`
- can also feed the homepage links section

Suggested minimum fields:

- `label`
- `href`
- `description`
- `kind`
- `featured`

### Content storage direction

The first phase should remain local-content driven.

Do not introduce:

- database storage
- CMS
- complex admin backend

A suitable content structure direction is:

- `content/posts`
- `content/notes`
- `content/projects`
- `content/links`

## 8. Implementation Boundary For This Phase

### In scope

- separate content models for post, note, project, and link
- create the independent list pages required by the new architecture
- restructure homepage around stable content sources
- add about page as the stable identity page
- make navigation reflect the new site map

### Out of scope

Do not treat these as part of the first phase:

- comments
- search
- complex motion systems
- CMS
- database
- heavy homepage decoration
- aggressively experimental note presentation

## 9. Execution Order

The recommended execution order is:

1. split the content model into `Post / Note / Project / Link`
2. create the independent list pages for notes, projects, and links
3. restructure the homepage using those new sources
4. add the about page last in this phase

### Why this order

If pages are created before the content model is stabilized, the project risks building four page shells that later need to be reworked.

This order keeps the foundation stable first, then lets UI and page structure grow from that foundation.

## 10. Success Criteria

This phase is successful when:

- the site no longer reads as a single-stream blog
- blog and notes are clearly distinct in purpose
- projects, about, and links each have a justified place in the system
- the homepage acts like a personal overview page rather than a blog landing page
- the structure feels closer to a personal space and not just a content archive

## 11. Risks And Guardrails

### Risk: fake expansion

If independent routes are added without independent data boundaries, the site will look larger without becoming structurally clearer.

Guardrail:

- separate content sources before doing broad page polish

### Risk: blog and notes collapse into each other

If notes are implemented as only a category, the intended writing-intent boundary will erode.

Guardrail:

- implement notes as their own content collection and route

### Risk: homepage becomes crowded

If every possible module is added at once, the homepage may become a dashboard without narrative clarity.

Guardrail:

- preserve the fixed module order for phase 1
- keep each section intentionally small

## 12. Reference Note

This design was informed by the current public-facing structure and signals of `https://innei.in/en` as observed on April 10, 2026, including the visible coexistence of formal posts, notes, projects/friends/says-style entry points, and a homepage that behaves like a broader personal space.

The goal is directional alignment, not one-to-one replication.
