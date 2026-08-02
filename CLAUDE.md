# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build (used by E2E tests)
npm test             # Run unit tests once
npm run test:watch   # Unit tests in watch mode
npm run test:e2e     # Run Playwright E2E tests (requires built site)
```

To run a single unit test file:
```sh
npx vitest run src/components/Header.test.ts
```

## Architecture

This is a personal portfolio site built with **Astro 5** and **Tailwind CSS 4** (via Vite plugin, not PostCSS). Deployed automatically to GitHub Pages on push to `main` — CI runs unit tests before build.

**Styling approach:** Tailwind utility classes and component-scoped `<style>` blocks coexist throughout `.astro` files. Dark mode uses `@media (prefers-color-scheme: dark)`.

**Feature flags:** `src/config/features.ts` exports a `FEATURES` const used at build time. Currently controls `SHOW_HEADER_LINKS` (nav links for Projects/Blog — disabled by default). Toggle flags here to expose in-progress sections.

**Testing setup:**
- Unit tests use Vitest + `happy-dom` + Astro's `experimental_AstroContainer` to render `.astro` components to HTML, then query with `@testing-library/dom`.
- E2E tests use Playwright against `npm run preview` (the built site, not dev server). Tests run against Chromium, Firefox, and WebKit.

**Posts:** Markdown files in `src/posts/` — currently only `plant-cam.md` exists. No blog listing page is wired up yet (gated behind `SHOW_HEADER_LINKS`).
