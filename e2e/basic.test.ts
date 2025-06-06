import { test, expect } from '@playwright/test';

// Store console errors
let consoleErrors: string[] = [];

test.beforeEach(({ page }) => {
  consoleErrors = [];
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
});

test('verifies no console errors exist', async ({ page }) => {
  await page.goto('/');
  // Wait for any dynamic content to load
  await page.waitForLoadState('networkidle');
  
  expect(consoleErrors).toEqual([]);
});

test('loads all assets correctly', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  // Check background image loads
  const backgroundImg = page.locator('#background');
  await expect(backgroundImg).toBeVisible();
  
  // Check if the image actually loaded
  const imgResponse = await page.evaluate(() => {
    const img = document.querySelector('#background') as HTMLImageElement;
    return img?.complete && img?.naturalHeight !== 0;
  });
  expect(imgResponse).toBeTruthy();
});

test('validates internal navigation links', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Find all internal links (those starting with / or not having :// in them)
  const internalLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href]'));
    return links
      .map(link => link.getAttribute('href'))
      .filter((href): href is string => 
        href !== null && 
        (href.startsWith('/') || !href.includes('://'))
      );
  });

  // Remove duplicates
  const uniqueInternalLinks = [...new Set(internalLinks)];
  
  // Test each internal link
  for (const href of uniqueInternalLinks) {
    const response = await page.goto(href);
    const status = response?.status() ?? 0;
    
    expect(status, `Link ${href} should return 200`).toBe(200);
    
    // Check for client-side errors
    const errors = await page.evaluate(() => {
      const errorElements = document.querySelectorAll('.error, .not-found');
      return Array.from(errorElements).map(el => el.textContent);
    });
    
    expect(errors, `Link ${href} should not show error content`).toHaveLength(0);
  }
});

test('validates external social media links', async ({ page }) => {
  await page.goto('/');
  
  // Check social media links in footer
  const socialLinks = page.locator('.social-links a');
  const links = await socialLinks.all();
  
  for (const link of links) {
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/^https?:\/\//); // Should be absolute URLs
    
    // Check if link has an accessible name
    const ariaLabel = await link.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  }
});

test('displays correct content', async ({ page }) => {
  await page.goto('/');
  
  // Check main heading
  await expect(page.getByText("Hi, I'm Cody")).toBeVisible();
});
