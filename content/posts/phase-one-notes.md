---
title: "Phase 1 build notes"
date: "2026-04-04"
summary: "A short record of the Phase 1 stack: Next.js 15, Tailwind CSS, filesystem Markdown, and why the project starts simple."
tags:
  - nextjs
  - phase-1
published: true
---

This phase only has one goal: make the blog usable before trying to make it
perfect.

## Current stack

1. Next.js 15 App Router for the page structure
2. Tailwind CSS for styling
3. Local Markdown files for content
4. Vercel for deployment

## Why not start with a database

Because the main question right now is not where content lives. The real
question is whether the writing and publishing flow feels stable enough to use
every week.

For a personal blog, a filesystem approach has a few clear advantages:

- easy to understand
- easy to back up
- easy to migrate later

## The important boundary

This version is intentionally simple.

Once writing, updating, and publishing feel natural, it becomes much easier to
move into better typography, richer metadata, code highlighting, or even a more
complex backend.
