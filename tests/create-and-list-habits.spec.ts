import { test, expect } from '@playwright/test';

test('clicking Add shows a new row with the typed name', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Drink water');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.locator('.habit-row')).toHaveCount(1);
  await expect(page.locator('.habit-row').first()).toHaveText('Drink water');
});

test('the input is empty after a habit is added', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'New habit' });
  await input.fill('Meditate');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(input).toHaveValue('');
});

test('every habit added earlier is still listed after a reload', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'New habit' });
  for (const name of ['Run', 'Journal', 'Sleep early']) {
    await input.fill(name);
    await page.getByRole('button', { name: 'Add' }).click();
  }
  await page.reload();
  await expect(page.locator('.habit-row')).toHaveText(['Run', 'Journal', 'Sleep early']);
});
