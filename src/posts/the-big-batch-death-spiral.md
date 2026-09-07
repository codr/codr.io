---
title: The Big Batch Death Spiral
date: 2026-06-02
description: Large PRs are usually treated as the problem. Often they're the symptom.
---

# The Big Batch Death Spiral

> Large PRs are usually treated as the problem. Often they're the symptom.

Everyone knows small PRs are easier to review. And yet almost every engineering organization eventually develops a problem with large ones.

The usual explanation is that engineers don't understand the value of small PRs. A better explanation: large PRs are a rational response to an expensive review process.

## The loop

An engineer finishes a small change and opens a PR. It sits for a day.

They learn something from this: opening a PR is expensive.

So next time they wait until they have more to submit. The PR is larger. The reviewer has more context to reconstruct. The review takes longer. The queue grows. The engineer becomes even less inclined to open small PRs.

Slow reviews → larger batches → harder reviews → slower reviews → even larger batches.

## What review latency actually costs

Latency doesn't just delay the current change. It changes how people work. Long review cycles produce more work in progress, more context switching, longer-lived branches, more merge conflicts, and harder debugging.

The organization drifts from continuous integration toward periodic integration.

## The loop underneath

There is often a second loop below the first.

Low confidence in tests → more manual verification → more review effort → slower reviews → larger PRs → more to verify.

Testing and review aren't independent problems. They're the same system.

## Why "just make smaller PRs" doesn't work

That advice treats the behavior as an individual failure. But if a PR takes two days to get reviewed, there is a real cost to opening ten small ones instead of one large one. People optimize around the bottlenecks they experience.

You can't exhort your way out of it. You have to make small PRs cheap:

- Faster review turnaround, with explicit expectations
- Automated checks reviewers can trust
- Reliable tests
- Clear ownership and smaller scopes of responsibility
- Tooling that makes incremental changes easy to review and merge

When reviews are fast, the economics invert. A 30-line PR opened now might merge before the engineer starts their next task. Small changes become the path of least resistance.

## Closing

Behavior is usually an adaptation to constraints. Large PRs may not mean engineers don't value small ones. They may mean the organization has made small ones too expensive.

So don't ask for smaller PRs. Reduce the cost of review, testing, and coordination — then watch what engineers do.
