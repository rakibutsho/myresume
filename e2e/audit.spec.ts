import { test, expect } from '@playwright/test';

test.describe('Portfolio Visual & Layout Audit', () => {
  test('Capture full-page and verify zero console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // কনসোলে কোনো বড় এরর আছে কিনা চেক
    expect(consoleErrors).toEqual([]);

    // পুরো পেজের স্ক্রিনশট সেভ করা
    await page.screenshot({
      path: `audit-results/full-page-${page.viewportSize()?.width}.png`,
      fullPage: true,
    });
  });

  test('Check key sections visibility', async ({ page }) => {
    await page.goto('/');
    
    // সেকশন আইডিগুলো দৃশ্যমান কিনা যাচাই
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });
});