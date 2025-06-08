import { describe, it, expect, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getByText, getByRole, queryByText } from '@testing-library/dom';
import Header from './Header.astro';
import { FEATURES } from '../config/features';

describe('Header', () => {
  async function renderHeader() {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header);
    
    // Create a DOM element to hold our rendered HTML
    const element = document.createElement('div');
    element.innerHTML = html;
    return element;
  }

  it('can be imported', () => {
    expect(Header).toBeDefined();
  });

  it('renders basic structure and home link', async () => {
    const element = await renderHeader();
    
    // Check logo and home link using DOM queries
    const logo = getByText(element, 'codr.io');
    expect(logo.tagName.toLowerCase()).toBe('a');
    expect(logo.getAttribute('href')).toBe('/');

    const homeLink = getByRole(element, 'link', { name: 'Home' });
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it.only('does not render Projects and Blog links when feature flag is off', async () => {
    const element = await renderHeader();
    
    // Check that links don't exist using DOM queries
    expect(queryByText(element, 'Projects')).toBeNull();
    expect(queryByText(element, 'Blog')).toBeNull();
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
    const projectsLink = getByRole(element, 'link', { name: 'Projects' });
    expect(projectsLink.getAttribute('href')).toBe('/projects');

    const blogLink = getByRole(element, 'link', { name: 'Blog' });
    expect(blogLink.getAttribute('href')).toBe('/blog');

    // Clean up mock
    vi.resetModules();
  });
}); 