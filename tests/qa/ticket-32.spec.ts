import { test, expect } from '@playwright/test';

if (process.env.QA_SLOW_MO) test.use({ screenshot: 'on', video: 'on', launchOptions: { slowMo: Number(process.env.QA_SLOW_MO) } }); // only while QA records evidence

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
  await expect(page.locator('.habit-row')).toHaveCount(1);
  await expect(input).toHaveValue('');
});

test('every habit added earlier is still listed after a reload', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'New habit' });
  const names = ['Run', 'Journal', 'Sleep early'];
  for (let i = 0; i < names.length; i++) {
    await input.fill(names[i]);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('.habit-row')).toHaveCount(i + 1);
  }
  await page.reload();
  await expect(page.locator('.habit-row')).toHaveText(names);
});

test('two habits added one after another are both listed', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'New habit' });
  const addButton = page.getByRole('button', { name: 'Add' });
  await input.fill('Run');
  await addButton.click();
  await expect(page.locator('.habit-row')).toHaveCount(1);
  await input.fill('Journal');
  await addButton.click();
  await expect(page.locator('.habit-row')).toHaveCount(2);
  await expect(page.getByText('Run', { exact: true })).toBeVisible();
  await expect(page.getByText('Journal', { exact: true })).toBeVisible();
});
