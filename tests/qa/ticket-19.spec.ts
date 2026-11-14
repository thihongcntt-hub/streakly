import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: Number(process.env.QA_SLOW_MO) || 0 } }); // slower only while QA records evidence

test("The app opens with the Streakly heading", async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Streakly' })).toBeVisible();
});

test("The habit list section is visible", async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your habits' })).toBeVisible();
});
