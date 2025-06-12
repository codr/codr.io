import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { queryByLabelText } from '@testing-library/dom';
import Footer from './Footer.astro';

describe('Footer', () => {
  it('can be imported', () => {
    expect(Footer).toBeDefined();
  });

  it('renders social links with proper attributes', async () => {
    const element = await renderFooter();

    // Check accessibility attributes
    expect(queryByLabelText(element, 'GitHub')).toBeDefined();
    expect(queryByLabelText(element, 'Twitter')).toBeDefined();
    expect(queryByLabelText(element, 'Bluesky')).toBeDefined();
    expect(queryByLabelText(element, 'LinkedIn')).toBeDefined();
  });

  async function renderFooter() {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);

    // Create a DOM element to hold our rendered HTML
    const element = document.createElement('div');
    element.innerHTML = html;
    return element;
  }
}); 