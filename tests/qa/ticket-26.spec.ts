import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: Number(process.env.QA_SLOW_MO) || 0 } }); // slower only while QA records evidence

test('Adding a habit by name shows it in the list', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read 10 pages');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByText('Read 10 pages', { exact: true })).toBeVisible();
});

test('Clicking Add with an empty name shows an error and adds no habit', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('alert')).toHaveText('Habit name is required');
  await expect(page.getByText('No habits yet')).toBeVisible();
});

test('Clicking Add with only spaces in the name shows an error and adds no habit', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('   ');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('alert')).toHaveText('Habit name is required');
  await expect(page.getByText('No habits yet')).toBeVisible();
});

test('An added habit is still in the list after a page reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Stretch');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByText('Stretch', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('Stretch', { exact: true })).toBeVisible();
});
