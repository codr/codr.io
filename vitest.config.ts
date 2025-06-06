/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    exclude: ['node_modules', 'dist', 'build', 'public', 'src/assets', '*.config.*', 'e2e', '.astro'],
    coverage: {
      exclude: ['node_modules', 'dist', 'build', 'public', 'src/assets', '*.config.*', 'e2e', '.astro'],
    },
  },
}); 