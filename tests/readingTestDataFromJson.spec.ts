import { chromium, test, expect } from "@playwright/test";
import fs from 'fs';

// Read test data from JSON file
const jsonPath="testdata/data.json";
const loginTestData: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe("Login data driven tests", async() => {

    for (const {email, password, validity} of loginTestData) {

    test(`Login test${email} and ${password}`, async () => {
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext({
        viewport: { width: 1500, height: 720 },
      });
      const page = await context.newPage();

      await page.goto("https://demowebshop.tricentis.com/login");

      await page.locator("#Email").fill(email);
      await page.locator("#Password").fill(password);
      await page.locator("//input[@value='Log in']").click();

      if (validity.toLowerCase() === "valid") {
        const logoutLink = await page.locator("a[href='/logout']");
        await expect(logoutLink).toBeVisible();
      } else {
        const errorMessage = await page.locator(".validation-summary-errors");
        await expect(errorMessage).toBeVisible();

        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
      }

      await browser.close();
    });
  }
});
