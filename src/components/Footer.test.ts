import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Footer from './Footer.astro';

describe('Footer', () => {
  it('can be imported', () => {
    expect(Footer).toBeDefined();
  });

  it('renders social links with proper attributes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    // Check accessibility attributes
    expect(result).toContain('aria-label="GitHub"');
    expect(result).toContain('aria-label="Twitter"');
    expect(result).toContain('aria-label="Bluesky"');
    expect(result).toContain('aria-label="LinkedIn"');
  });
}); 