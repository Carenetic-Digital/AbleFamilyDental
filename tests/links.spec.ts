import { test, expect } from '@playwright/test';

test('all internal links resolve', async ({ page }) => {
  await page.goto('/');

  const internalLinks = page.locator('a[href^="/"]');
  const hrefs = await internalLinks.evaluateAll(links =>
    links.map(link => link.getAttribute('href'))
  );

  const uniqueHrefs = [...new Set(hrefs)].filter(Boolean);

  for (const href of uniqueHrefs) {
    const response = await page.goto(href!);
    if (!response) continue; // same-page fragment navigation returns null
    expect(response.status(), `${href} returned ${response.status()}`).toBeLessThan(400);
  }
});

test('external links have security attributes', async ({ page }) => {
  await page.goto('/');

  const externalLinks = page.locator('a[href^="http"]');
  const count = await externalLinks.count();

  for (let i = 0; i < count; i++) {
    const link = externalLinks.nth(i);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  }
});
