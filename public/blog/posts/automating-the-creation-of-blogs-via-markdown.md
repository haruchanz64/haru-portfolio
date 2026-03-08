---
title: Automating the Creation of Blogs via Markdown
date: Feb 24, 2026
tags: #BuildTools #NodeJS #DeveloperExperience #Automation
---

As a "Systems & Backend Engineer," doing things manually feels like a chore. When I decided to add a devlog to my portfolio, I realized that manually updating a `posts.json` file every time I wrote a Markdown post was a recipe for an outdated blog.

## The Problem: Administrative Friction

In the middle of a chaotic week — handling Flutter UI bugs or Supabase database deadlocks — the last thing I want to do is open a JSON file and carefully type out metadata, making sure I don't miss a comma or a closing brace.

## The Solution: A Custom Node.js Build Pipeline

Instead of relying on third-party platforms like dev.to or Medium, I built a localized automation suite. This gives me full ownership of my data and allows the blog to live natively within my portfolio's architecture.

### 1. The Scaffold — [`create-new-posts.js`](https://github.com/haruchanz64/haru-portfolio/blob/main/create-new-posts.js)

I started by automating the file creation itself. I use a script that takes a title as a CLI argument, generates a URL-friendly slug, and injects a template with a pre-formatted YAML Frontmatter block.

```bash
node create-new-posts.js "My New Post"
```

**Result:** A clean `.md` file with the date and title already filled in.

### 2. The Intelligence — [`generate-blog-index.js`](https://github.com/haruchanz64/haru-portfolio/blob/main/generate-blog-index.js)

The "brain" of the operation is an indexer that scans my `/posts` directory. It doesn't just copy data — it processes it:

- **Word Count & Read Time:** Calculates `readTime` by analyzing the body text length, averaging 200 words per minute.
- **YAML Parsing:** Extracts metadata directly from the Markdown header.
- **Automated Indexing:** Generates a fresh `posts.json` that the frontend can consume instantly.

### 3. The Dynamic UI — [`blog-config.js`](https://github.com/haruchanz64/haru-portfolio/blob/main/js/blog-config.js)

On the frontend, the blog grid is no longer static. It fetches the generated `posts.json` and maps the data into UI cards, displaying the calculated read time and tags automatically.

## Why Build Instead of Buying?

You might ask: *Why not just use dev.to?* While platforms like dev.to are great for reach, they introduce a different kind of friction for a portfolio:

- **Full Ownership:** My content isn't locked behind a platform's database. It exists as simple Markdown files in my repo.
- **Branding Consistency:** I have 100% control over the CSS and the reader experience without worrying about platform-side UI changes.
- **Low-Level Understanding:** As a systems engineer, building the pipeline is as important as writing the content. It's a demonstration of my ability to build tooling that solves my own Developer Experience (DX) problems.

## Conclusion

For a solo dev in a startup, mental overhead is the enemy. By automating this handshake between raw text and the UI, I've removed the friction between having an idea and sharing it. It's a small systems win that keeps the focus where it belongs: on the engineering, not the administration.

> *"Automation isn't just about saving time; it's about preserving the energy to create."*