import { test, expect } from '@playwright/test';

test('shows a text field and an Add habit button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'Habit name' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
});

test('adds a habit and clears the field', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Habit name' });
  await input.fill('Read');
  await page.getByRole('button', { name: 'Add habit' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Read' })).toBeVisible();
  await expect(input).toHaveValue('');
});

test('disables Add habit while the field is empty', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Add habit' });
  await expect(button).toBeDisabled();
  await page.getByRole('textbox', { name: 'Habit name' }).fill('Read');
  await expect(button).toBeEnabled();
});

test('keeps the habit after reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Habit name' }).fill('Read');
  await page.getByRole('button', { name: 'Add habit' }).click();
  await page.reload();
  await expect(page.getByRole('listitem').filter({ hasText: 'Read' })).toBeVisible();
});
