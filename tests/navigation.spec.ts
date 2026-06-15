import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
});

test('all navigation links work', async ({ page }) => {
  await page.goto('/');

  const hrefs = await page.locator('nav a[href^="/"]').evaluateAll(links =>
    links.map(link => link.getAttribute('href'))
  );

  const uniqueHrefs = [...new Set(hrefs)].filter(Boolean);

  for (const href of uniqueHrefs) {
    const response = await page.goto(href!);
    expect(response?.status()).toBeLessThan(400);
    await expect(page).not.toHaveURL(/404/);
  }
});
