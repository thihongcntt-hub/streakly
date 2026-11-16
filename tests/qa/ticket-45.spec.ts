import { test, expect } from '@playwright/test';

if (process.env.QA_SLOW_MO) test.use({ screenshot: 'on', video: 'on', launchOptions: { slowMo: Number(process.env.QA_SLOW_MO) } }); // only while QA records evidence


test('shows a text field and an Add habit button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'Habit name' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
});

test('typing Read and pressing Add habit adds a row and clears the field', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Habit name' });
  await input.fill('Read');
  await page.getByRole('button', { name: 'Add habit' }).click();
  await expect(
    page.getByRole('listitem').filter({ has: page.getByText('Read', { exact: true }) })
  ).toHaveCount(1);
  await expect(input).toHaveValue('');
});

test('Add habit button is disabled while the text field is empty', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Add habit' });
  await expect(button).toBeDisabled();
  await page.getByRole('textbox', { name: 'Habit name' }).fill('Read');
  await expect(button).toBeEnabled();
});

test('whitespace-only name keeps Add habit disabled and adds no row', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Habit name' }).fill('   ');
  await expect(page.getByRole('button', { name: 'Add habit' })).toBeDisabled();
  await expect(page.getByRole('listitem')).toHaveCount(0);
});

test('habit Read is still listed after reloading the page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Habit name' }).fill('Read');
  await page.getByRole('button', { name: 'Add habit' }).click();
  await expect(
    page.getByRole('listitem').filter({ has: page.getByText('Read', { exact: true }) })
  ).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole('listitem').filter({ has: page.getByText('Read', { exact: true }) })
  ).toHaveCount(1);
});
