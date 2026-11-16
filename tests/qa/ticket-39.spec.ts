import { test, expect } from '@playwright/test';

if (process.env.QA_SLOW_MO) test.use({ screenshot: 'on', video: 'on', launchOptions: { slowMo: Number(process.env.QA_SLOW_MO) } }); // only while QA records evidence

test('adding a habit by name shows it in the list', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read 10 pages');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.locator('.habit-row')).toHaveText(['Read 10 pages']);
});

test('empty name shows "Habit name is required" and adds nothing', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('alert')).toHaveText('Habit name is required');
  await expect(page.getByText('No habits yet')).toBeVisible();
  await expect(page.locator('.habit-row')).toHaveCount(0);
});

test('three habits are listed in the order added', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'New habit' });
  for (const name of ['One', 'Two', 'Three']) {
    await input.fill(name);
    await page.getByRole('button', { name: 'Add' }).click();
  }
  await expect(page.locator('.habit-row')).toHaveText(['One', 'Two', 'Three']);
});

test('names longer than 60 characters are cut off without error', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('x'.repeat(70));
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.locator('.habit-row')).toHaveText(['x'.repeat(60)]);
  await expect(page.getByRole('alert')).toHaveCount(0);
});
