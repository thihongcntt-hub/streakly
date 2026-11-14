import { test, expect } from '@playwright/test';

if (process.env.QA_SLOW_MO) test.use({ screenshot: 'on', video: 'on', launchOptions: { slowMo: Number(process.env.QA_SLOW_MO) } }); // only while QA records evidence

const DAY_ONE = new Date('2026-03-02T10:00:00');
const DAY_TWO = new Date('2026-03-03T10:00:00');

test('Done today checkbox is unchecked by default', async ({ page }) => {
  await page.clock.setFixedTime(DAY_ONE);
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('checkbox', { name: 'Done today' })).not.toBeChecked();
});

test('checking shows a checkmark and keeps the Done today label', async ({ page }) => {
  await page.clock.setFixedTime(DAY_ONE);
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read');
  await page.getByRole('button', { name: 'Add' }).click();
  const box = page.getByRole('checkbox', { name: 'Done today' });
  await box.check();
  const row = page.locator('.habit-row');
  await expect(row).toHaveClass(/habit-row--done/);
  const checkmark = await row.locator('.habit-name').evaluate((el) => getComputedStyle(el, '::before').content);
  expect(checkmark).toContain('\u2713');
  const label = await page.locator('.done-toggle').evaluate((el) => getComputedStyle(el, '::after').content);
  expect(label).toContain('Done today');
  await expect(box).toBeChecked();
});

test('unchecking returns the row to unchecked', async ({ page }) => {
  await page.clock.setFixedTime(DAY_ONE);
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read');
  await page.getByRole('button', { name: 'Add' }).click();
  const box = page.getByRole('checkbox', { name: 'Done today' });
  await box.check();
  await box.uncheck();
  await expect(box).not.toBeChecked();
  const row = page.locator('.habit-row');
  await expect(row).not.toHaveClass(/habit-row--done/);
  const checkmark = await row.locator('.habit-name').evaluate((el) => getComputedStyle(el, '::before').content);
  expect(checkmark).not.toContain('\u2713');
});

test('checked state survives a reload', async ({ page }) => {
  await page.clock.setFixedTime(DAY_ONE);
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('checkbox', { name: 'Done today' }).check();
  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Done today' })).toBeChecked();
});

test('checked state does not carry over to the next day', async ({ page }) => {
  await page.clock.setFixedTime(DAY_ONE);
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('checkbox', { name: 'Done today' }).check();
  await page.clock.setFixedTime(DAY_TWO);
  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Done today' })).not.toBeChecked();
});

test('checking one habit leaves other habits unchanged', async ({ page }) => {
  await page.clock.setFixedTime(DAY_ONE);
  await page.goto('/');
  await page.getByRole('textbox', { name: 'New habit' }).fill('Read');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox', { name: 'New habit' }).fill('Run');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.locator('.habit-row').nth(0).getByRole('checkbox', { name: 'Done today' }).check();
  await expect(page.locator('.habit-row').nth(0).getByRole('checkbox', { name: 'Done today' })).toBeChecked();
  const runRow = page.locator('.habit-row').nth(1);
  await expect(runRow.getByRole('checkbox', { name: 'Done today' })).not.toBeChecked();
  const runCheckmark = await runRow.locator('.habit-name').evaluate((el) => getComputedStyle(el, '::before').content);
  expect(runCheckmark).not.toContain('\u2713');
});
