import { describe, it, expect, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { queryByLabelText } from '@testing-library/dom';
import Header from './Header.astro';

describe('Header', () => {

  it('can be imported', () => {
    expect(Header).toBeDefined();
  });

  it('renders basic structure and home link', async () => {
    const element = await renderHeader();

    // Check logo and home link using DOM queries
    expect(queryByLabelText(element, 'codr.io')).toBeDefined();

    expect(queryByLabelText(element, 'Home')).toBeDefined();
  });

  it('does not render Projects and Blog links when feature flag is off', async () => {
    const element = await renderHeader();

    // Check that links don't exist using DOM queries
    expect(queryByLabelText(element, 'Projects')).toBeNull();
    expect(queryByLabelText(element, 'Blog')).toBeNull();
  });

  it('renders Projects and Blog links when feature flag is on', async () => {
    // Mock the FEATURES object
    vi.mock('../config/features', () => ({
      FEATURES: {
        SHOW_HEADER_LINKS: true
      }
    }));

    const element = await renderHeader();
    
    // Check that links exist using DOM queries
    expect(queryByLabelText(element, 'Projects')).toBeDefined();
    expect(queryByLabelText(element, 'Blog')).toBeDefined();

    // Clean up mock
    vi.resetModules();
  });

  async function renderHeader() {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);

    // Create a DOM element to hold our rendered HTML
    const element = document.createElement('div');
    element.innerHTML = html;
    return element;
  }
}); 