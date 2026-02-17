import { chromium,expect, test } from "@playwright/test";
import { FolderSearchDolphin } from "../pages/folderSearchDolphin";
import { HomePageDolphin } from "../pages/homePageDolphin";
import { LoginPageDolphin } from "../pages/loginPageDolphin";
import testData from "../testdata/data-QAErnie.json";

let branchCode = testData.branchCode;
let folderNo = testData.folderNo;


test("Visual comparison for Webflow", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1530, height: 730 },
  });
  const page = await context.newPage();

  const loginPageDolphin = new LoginPageDolphin(page);
  const homePageDolphin = new HomePageDolphin(page);
  const folderSearchDolphin = new FolderSearchDolphin(page);

  await loginPageDolphin.gotoDolphinLoginPage();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  await expect(page).toHaveScreenshot("Dolphin-Login-1.png", { maxDiffPixelRatio: 0.2 });
  await loginPageDolphin.logIntoDolphinApp(
    process.env.USER_NAME!,
    process.env.PASSWORD!,
  );

  await expect(page).toHaveScreenshot("Dolphin-Home-1.png", { maxDiffPixelRatio: 0.2 });
  await homePageDolphin.navigateToFoldersPage();
  await page.waitForTimeout(3000);
  await expect(page).toHaveScreenshot("Dolphin-Folders-1.png", { maxDiffPixelRatio: 0.2 });

  await folderSearchDolphin.searchForFolder(branchCode, folderNo);
  await page.waitForTimeout(2000);
  await expect(page).toHaveScreenshot(["Dolphin-SearchResults-1.png"], { maxDiffPixelRatio: 0.2 });
  await expect(page).toHaveScreenshot("Dolphin-SearchResults-2.png");
  
});
