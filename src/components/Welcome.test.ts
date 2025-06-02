import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import Welcome from './Welcome.astro';

describe('Welcome', () => {
  it('can be imported', () => {
    expect(Welcome).toBeDefined();
  });
  
  it('renders the welcome message', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(Welcome);

    expect(result).toContain("Hi, I'm Cody 👋");
    expect(result).toContain('software engineer');
  });
}); 