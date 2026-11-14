import { test, expect, type Page } from '@playwright/test';

async function addHabit(page: Page) {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read');
  await page.getByRole('button', { name: 'Add' }).click();
}

test('Done today checkbox is unchecked by default', async ({ page }) => {
  await addHabit(page);
  await expect(page.getByRole('checkbox', { name: 'Done today' })).not.toBeChecked();
});

test('checking shows a checkmark and keeps the Done today label', async ({ page }) => {
  await addHabit(page);
  await page.getByRole('checkbox', { name: 'Done today' }).check();
  await expect(page.locator('.habit-row')).toHaveClass(/habit-row--done/);
  await expect(page.getByRole('checkbox', { name: 'Done today' })).toBeChecked();
});

test('unchecking returns the row to unchecked', async ({ page }) => {
  await addHabit(page);
  const box = page.getByRole('checkbox', { name: 'Done today' });
  await box.check();
  await box.uncheck();
  await expect(box).not.toBeChecked();
  await expect(page.locator('.habit-row')).not.toHaveClass(/habit-row--done/);
});

test('checked state survives a reload', async ({ page }) => {
  await addHabit(page);
  await page.getByRole('checkbox', { name: 'Done today' }).check();
  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Done today' })).toBeChecked();
});
