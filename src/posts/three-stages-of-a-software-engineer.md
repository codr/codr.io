---
title: Three Stages of a Software Engineer
date: 2026-09-07
description: Most engineers learn to make it run. Many master production. Fewer still write for the future.
---

# Three Stages of a Software Engineer

Every software engineer, at some point, has uttered four words with complete sincerity: "It works on my machine."

It's a punchline now. But it points to something real, a stage of development every engineer passes through. And if you pay attention, there are three of them.

## Stage 1: Works on my machine

This is where everyone starts. The goal is simple: make the code run. Make the tests pass. Make the feature exist. You're solving the puzzle in front of you, and your laptop is the entire universe.

Nothing wrong with this. You have to learn to walk before you can run. But it's a self-centered mode of engineering. The environment is you, the user is you, the definition of "working" is entirely personal.

The code works. You just can't ship it anywhere.

## Stage 2: Works in production

This is the professional unlock. You learn about environments, CI/CD, configuration, logging, monitoring, error handling, scaling. You stop thinking about your machine and start thinking about the machine, the one your users actually touch.

This is where most engineers land. It's genuinely hard-won. Shipping software that works reliably for real users is not a small thing. Most companies are grateful to have engineers who can operate at this level.

But there's a third stage.

## Stage 3: Works in five years

Stage 3 engineers think about the people who will read, change, and extend this code long after they're gone. Maybe that's a teammate. Maybe it's a stranger. Maybe it's themselves.

This is where the canon starts to matter. Books like Robert C. Martin's _Clean Code_, Martin Fowler's _Refactoring_, and the timeless _The Pragmatic Programmer_ by Hunt and Thomas stop being things you mean to read and become things you feel the urgency of. You've been the person who inherited someone's clever, undocumented mess at 2am. You refuse to be the person who leaves it.

Writing code is easy. Writing code that someone else can confidently change two years from now? That's craft.

Stage 3 is a fundamentally different orientation. You're no longer coding for the machine, or even for the users — you're coding for the future maintainer. You're encoding intent, not just logic. You're treating your codebase as a form of communication.

## Why most engineers stop at stage 2

Stage 2 gets rewarded. Shipping gets celebrated. Velocity gets measured. Nobody sends you a congratulations Slack when your code is effortlessly extended eighteen months later.

Stage 3 requires a kind of ego-dissolution that doesn't come naturally. You have to care about outcomes you won't see, for people you may never meet, in situations you can't fully predict. You have to write for someone else's comprehension, not your own satisfaction.

In a way, it mirrors a pattern you see in any long personal growth arc: early stages are about proving yourself and surviving. Later stages are about contributing to something beyond yourself. The engineers who reach stage 3 aren't just better coders, they think differently about what code is for.

The good news: stage 3 is learnable. It doesn't require genius. It requires deliberate practice, a willingness to be humbled by your own past code, and the discipline to slow down just enough to make it legible.

Your future colleague, the one who inherits your work at 11pm on a Wednesday, is counting on you.

## Further reading

- **[Clean Code][clean-code]** — Robert C. Martin. The definitive argument for writing code as a craft. Opinionated, occasionally controversial, always useful.
- **[Refactoring: Improving the Design of Existing Code][refactoring]** — Martin Fowler. The practical manual for making messy code legible without breaking it. A must for anyone who's inherited a codebase.
- **[The Pragmatic Programmer][pragprog]** — Andrew Hunt & David Thomas. Timeless principles for engineers who want to think about their work, not just execute it.
- **[A Philosophy of Software Design][aposd]** — John Ousterhout. A sharp, contrarian counterpoint to _Clean Code_. Essential reading once you're ready to question the canon.

[clean-code]: https://www.oreilly.com/library/view/clean-code-a/9780136083238/
[refactoring]: https://martinfowler.com/books/refactoring.html
[pragprog]: https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/
[aposd]: https://web.stanford.edu/~ouster/cgi-bin/aposd.php
