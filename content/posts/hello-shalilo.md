---
title: "Hello, Shalilo"
date: "2026-04-05"
summary: "The first sample post for the blog, used to verify Markdown loading, routing, and reading pages."
category: "tech"
tags:
  - setup
  - writing
published: true
---

Welcome to Shalilo's blog.

This post is just a simple foundation stone for Phase 1. It confirms that the
main writing flow already works:

- the homepage can show recent posts
- `/blog` can list all published posts
- `/blog/[slug]` can render Markdown content
- the theme toggle works

## Why start with a simple shell

Trying to match a reference site too early usually slows everything down. A more
practical path is to finish the content structure first and improve visuals,
layout, and motion later.

## What comes next

Future phases can add:

- richer metadata and tags
- table of contents and post navigation
- syntax highlighting and image improvements
- more refined motion and typography

## A tiny code example

```ts
const phase = 2;
const status = phase >= 2 ? "improving" : "starting";
console.log(`The blog is ${status}.`);
```

The site is still minimal, but it is ready for writing.
