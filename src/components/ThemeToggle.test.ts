import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getByLabelText, getByRole } from '@testing-library/dom';
import ThemeToggle from './ThemeToggle.astro';

describe('ThemeToggle', () => {
  it('can be imported', () => {
    expect(ThemeToggle).toBeDefined();
  });

  it('renders an accessible toggle button', async () => {
    const element = await renderThemeToggle();

    const button = getByRole(element, 'button');
    expect(button.id).toBe('theme-toggle');
    expect(getByLabelText(element, 'Switch to dark theme')).toBe(button);
  });

  async function renderThemeToggle() {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ThemeToggle);

    const element = document.createElement('div');
    element.innerHTML = html;
    return element;
  }
});
