import { test, expect } from '@playwright/test';

test('shows the app with an empty habit list', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Streakly' })).toBeVisible();
  await expect(page.getByText('No habits yet')).toBeVisible();
});

test('marks today in the week strip', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('group', { name: 'This week' }).locator('.day')).toHaveCount(7);
  await expect(page.locator('[aria-current="date"]')).toHaveCount(1);
});
