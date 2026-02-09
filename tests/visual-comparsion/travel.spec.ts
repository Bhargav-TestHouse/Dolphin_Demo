import { test, expect, chromium, Page, Browser, BrowserContext } from '@playwright/test';

let page: Page;
let browser: Browser;
let context: BrowserContext;

test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
});

test.beforeEach(async () => {
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
    });

    page = await context.newPage();
    await page.goto('http://blazedemo.com/');
});

test.afterEach(async () => {
    await page.close();
    await context.close();
});

test.afterAll(async () => {
    await browser.close();
});

async function takeStepScreenshot(
    page: Page,
    testCaseId: string,
    stepName: string
) {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('load');
    await page.evaluate(() => {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });
    });

    await expect(page).toHaveScreenshot(`${testCaseId}_${stepName}.png`, {
        maxDiffPixelRatio: 0.05,
        animations: 'disabled',
    });
}

test('TC-1 Travel domain visual test', async () => {
    const TC = 'TC-1';

    // Home page
    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');
    await takeStepScreenshot(page, TC, '01-home-page');

    // Find flights
    await page.getByRole('button', { name: 'Find Flights' }).click();
    await expect(page.locator('h3')).toContainText('Flights from');
    await takeStepScreenshot(page, TC, '02-flight-results');

    // Choose first flight
    await page.getByRole('cell', { name: 'Choose This Flight' }).first().click();
    await expect(page.getByRole('heading', { name: 'Your flight from' })).toBeVisible();
    await takeStepScreenshot(page, TC, '03-purchase-page');

    // Fill purchase form
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Automation');
    await page.getByRole('textbox', { name: 'Address' }).fill('123 Main Street');
    await page.getByRole('textbox', { name: 'City' }).fill('Testing city');
    await page.getByRole('textbox', { name: 'State' }).fill('MP');
    await page.getByRole('textbox', { name: 'Zip Code' }).fill('123456');
    await page.getByRole('textbox', { name: 'Credit Card Number' }).fill('424242424242');
    await page.getByRole('textbox', { name: 'Month' }).fill('01');
    await page.getByRole('textbox', { name: 'Year' }).fill('2028');
    await page.getByRole('textbox', { name: 'Name on Card' }).fill('Auto Test');
    await takeStepScreenshot(page, TC, '04-filled-form');

    // Purchase flight
    await page.getByRole('button', { name: 'Purchase Flight' }).click();
    await expect(page.getByRole('heading', { name: 'Thank you for your purchase' })).toBeVisible();
    await takeStepScreenshot(page, TC, '05-confirmation-page');
});
