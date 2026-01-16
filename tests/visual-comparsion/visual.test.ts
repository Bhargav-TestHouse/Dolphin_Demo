import { chromium, expect, test } from "@playwright/test";


test('visual comparison', async () => {

    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');

    await expect(page).toHaveScreenshot('playwright-homepage.png', {maxDiffPixelRatio: 0.03});
    await expect(await page.locator(".hero--primary").textContent()).toMatchSnapshot("HeadingSnapshot.txt");


    await browser.close();  
})

test('visual comparison 2', async () => {

    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();   

    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot("MaskPage1.png", {mask: [page.locator("//table[@id='table1']//tbody//tr//td[4]")]});





})