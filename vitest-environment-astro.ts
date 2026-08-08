// A custom Vitest test environment for testing Astro components.
//
// Vitest's built-in `happy-dom` environment sets up real `document`/`window`
// globals, but it also tells Vite to transform every imported module for the
// browser (Vite's "client" environment). The Astro Container API can only
// render `.astro` components when they're transformed for the server (Vite's
// "ssr" environment) — under a client transform, `container.renderToString()`
// throws `NoMatchingRenderer`.
//
// This re-exports the built-in `happy-dom` environment unchanged, except for
// `viteEnvironment`, so tests get both: genuine DOM globals typed against the
// real `lib.dom` types (no casts needed to use `@testing-library/dom`), and
// working Astro component rendering.
//
// See https://github.com/withastro/astro/issues/14895
import { builtinEnvironments } from 'vitest/runtime';
import type { Environment } from 'vitest/environments';

export default {
  ...builtinEnvironments['happy-dom'],
  viteEnvironment: 'ssr',
} satisfies Environment;
