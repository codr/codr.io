# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build (used by E2E tests)
npm run lint         # Lint with oxlint
npm run lint:fix     # Lint with oxlint, applying auto-fixes
npm run format       # Format with oxfmt
npm run format:check # Check formatting with oxfmt, no writes (used by CI)
npm run typecheck    # Type-check with tsc (no emit)
npm test             # Run unit tests once
npm run test:watch   # Unit tests in watch mode
npm run test:e2e     # Run Playwright E2E tests (requires built site)
```

To run a single unit test file:

```sh
npx vitest run src/components/Header.test.ts
```

## Architecture

This is a personal portfolio site built with **Astro 5** and **Tailwind CSS 4** (via Vite plugin, not PostCSS). Deployed automatically to GitHub Pages on push to `main` — CI runs lint, format-check, and unit tests before build.

**Linting:** [oxlint](https://oxc.rs) lints `.ts`/`.js`/`.mjs` files and the frontmatter script of `.astro` files (config in `.oxlintrc.json`). It does not lint Astro templates themselves. Run `npm run lint`.

**Formatting:** [oxfmt](https://oxc.rs) formats JS/TS/JSON/YAML/Markdown/CSS files (config in `.oxfmtrc.json`, `singleQuote: true` to match the codebase). Like oxlint, it does not yet support `.astro` files — those are left to the `astro-build.astro-vscode` extension in-editor. Run `npm run format` (writes) or `npm run format:check` (CI).

**Feature flags:** `src/config/features.ts` exports a `FEATURES` const used at build time. Currently controls `SHOW_HEADER_LINKS` (nav links for Projects/Blog — disabled by default). Toggle flags here to expose in-progress sections.

**Testing setup:**

- Unit tests use Vitest + `happy-dom` + Astro's `experimental_AstroContainer` to render `.astro` components to HTML, then query with `@testing-library/dom`.
- E2E tests use Playwright against `npm run preview` (the built site, not dev server). Tests run against Chromium, Firefox, and WebKit.

**Posts:** Markdown files in `src/posts/` — currently only `plant-cam.md` exists. No blog listing page is wired up yet (gated behind `SHOW_HEADER_LINKS`).
