import { test, expect } from '@playwright/test';

test('adding a habit by name shows it in the list', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read 10 pages');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Read 10 pages' })).toBeVisible();
});

test('adding with an empty name shows an error and adds nothing', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByText('No habits yet')).toBeVisible();
  await expect(page.locator('.habit-row')).toHaveCount(0);
});

test('an added habit is still there after a reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Stretch');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.reload();
  await expect(page.getByRole('listitem').filter({ hasText: 'Stretch' })).toBeVisible();
});
