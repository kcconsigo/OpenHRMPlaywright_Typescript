import { test, expect } from '@playwright/test';

test('Fixtures and its test scenarios with browser', async ({ browser }) => {
    const context = await browser.newContext({baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', colorScheme: 'dark'});
    const page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
})
test('Fixtures and its test scenarios with page', async ({ page }) => {
    await page.goto('https://www.google.com/');
})