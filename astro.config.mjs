import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://codr.io',
  base: '/',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  experimental: {
    chromeDevtoolsWorkspace: true,
  },
});
