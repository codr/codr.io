---
title: Small PRs Are a Coordination Primitive
date: 2026-04-19
description: A pull request isn't a unit of code. It's a unit of coordination.
---

# Small PRs Are a Coordination Primitive

> A pull request isn't a unit of code. It's a unit of coordination.

We usually argue for small PRs on grounds of reviewability: they're easier to read, understand, test, and approve. All true, and all incomplete.

A PR is a request for someone else to spend attention on your work. Its real cost isn't its line count. It's the context it demands from everyone else.

## What a PR actually asks for

When I open a PR, I'm asking a reviewer to understand what I'm trying to accomplish, understand the code around it, judge whether my approach makes sense, verify that it works, think about what I might have missed, and then live with the result.

The larger and more interconnected the change, the more of that context the reviewer has to build from scratch. A twenty-line PR is a small ask. A two-thousand-line PR asks someone to temporarily join your project.

## The coordination budget

Every team has a fixed amount of engineering attention. Review consumes some of it. A team that spends enormous attention reviewing every change has less left for building, debugging, mentoring, and architecture.

Small PRs make that budget go further, not mainly because each one is easier to read, but because fewer people need to hold the whole problem in their head at the same time.

## Small doesn't mean trivial

A small PR doesn't mean a small piece of work. Large projects can and usually should be decomposed into many small changes.

> The size of the project and the size of the coordination request don't have to be the same.

## The deeper point

We tend to optimize development around the person writing the code: how quickly can I make this change? The better question is how much work I'm creating for everyone who has to understand, review, integrate, and eventually change it.

Small PRs make that cost visible and keep it low. The best ones don't just make code easier to review. They make collaboration cheaper.
