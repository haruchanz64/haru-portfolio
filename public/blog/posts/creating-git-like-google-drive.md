---
title: Creating Git-like Google Drive
date: Mar 08, 2026
tags: #Software #CLI #Architecture
---

This project, [gdrive-cli](https://github.com/haruchanz64/gdrive-cli), is a Git-inspired CLI built around a simple idea:

> structured file backup, but with Git-like commands.

It started as a joke inspired by my SHS workflow, where we shared code through Google Drive folders instead of Git remotes.

## Why this exists

Our old process looked like this:

- upload files to Drive,
- rename versions manually (`final`, `final-final`, `final-final-FIXED`),
- hope nobody overwrites the latest copy.

So I built `gdrive-cli` to simulate a cleaner developer experience on top of that model.

## What it actually is (and isn’t)

`gdrive-cli` is:

- a **snapshot/backup-oriented** CLI,
- with **Git-like UX** (`init`, `status`, `commit`, `push`, etc.),
- backed by **local metadata** for tracking state.

`gdrive-cli` is not:

- a full Git implementation,
- a replacement for Git branching/merge internals,
- a production-grade VCS.

## Technical approach

### 1) Command-driven CLI

The tool uses a command dispatcher with isolated handlers.  
Each command performs deterministic file and state operations.

### 2) Metadata-based state

Instead of Git objects, it stores repository state in a custom metadata directory:

- tracked files,
- snapshot records,
- remote config/mapping.

### 3) Snapshot commits

A “commit” is treated as a snapshot manifest:

- scan files,
- normalize/filter paths,
- store metadata/checksum references,
- persist snapshot history.

### 4) Drive-style sync semantics

Push/pull behaves like controlled folder synchronization:

- detect changed files,
- upload/update remote copies,
- map local snapshot metadata to remote state.

## Trade-offs

**Pros**

- easy mental model,
- good CLI architecture practice,
- useful for backup-first workflows.

**Cons**

- no real commit graph/merge engine,
- weaker conflict semantics than Git,
- intentionally limited scope.

## Takeaway

Even as a parody, this project is a practical systems exercise in:

- CLI ergonomics,
- filesystem operations,
- metadata schema design,
- sync pipeline thinking.

In short: it’s the SHS Google Drive workflow, rebuilt with cleaner tooling and Git-like habits.
