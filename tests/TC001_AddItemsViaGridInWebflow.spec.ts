import { chromium, expect, test } from "@playwright/test";
import { LoginPageDolphin } from "../pages/loginPageDolphin";
import { HomePageDolphin } from "../pages/homePageDolphin";
import { FolderSearchDolphin } from "../pages/folderSearchDolphin";
import { readEnvControl, WebflowTestRow } from "../utilities/utility";
import { readExcelData } from "../utilities/utility";

const excelPath = "testdata/data-QAErnie.xlsx";
const webflowTestData = readExcelData<WebflowTestRow>(
  excelPath,
  "AddingItemsToWebflow",
);

const envControl = readEnvControl(excelPath, "EnvControl");

test("Add items via Grid in Webflow", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1530, height: 730 },
  });
  const page = await context.newPage();

  const loginPageDolphin = new LoginPageDolphin(page);
  const homePageDolphin = new HomePageDolphin(page);
  const folderSearchDolphin = new FolderSearchDolphin(page);

  await loginPageDolphin.gotoDolphinLoginPage();
  await loginPageDolphin.takeLoginPageScreenshot();
  await loginPageDolphin.logIntoDolphinApp(
    process.env.USER_NAME!,
    process.env.PASSWORD!,
  );
  await page.waitForTimeout(1000);
  await homePageDolphin.takeHomePageScreenshot();

  await homePageDolphin.navigateToFoldersPage();

  for (const row of webflowTestData) {
    if (row.run.toLowerCase() !== "yes") {
      console.log(
        `⏭️ Skipping row | BranchCode=${row.BranchCode}, FolderNo=${row.FolderNo}, run=${row.run}`,
      );
      continue;
    }

    await folderSearchDolphin.searchForFolder(row.BranchCode, row.FolderNo);
    await folderSearchDolphin.veriyfySearchResult();
    await folderSearchDolphin.openSearchedFolder();
    await page.waitForLoadState("networkidle");

    await folderSearchDolphin.selectValueFromDropDown(row.DropDown);
    await folderSearchDolphin.addingTicketsdetails(row.Airline, row.StartPoint, row.EndPoint, row.Class, row.IssueDate,row.Sell);
    await folderSearchDolphin.verifyingValidateAndRevertButtons();

    await folderSearchDolphin.addingAirDetails(row.DropDown1, row.Airline, row.FlightNo, row.StartPoint);
    await folderSearchDolphin.takeFolderSearchPageScreenshot()
    await folderSearchDolphin.savingFolderFromSaveButton();

    await folderSearchDolphin.deletingAddedItem();
    await folderSearchDolphin.deletingAddedItem();

    await folderSearchDolphin.savingFolderFromSaveButton();
    await folderSearchDolphin.verifyAllItemsAreDeleted();
  }

  await page.waitForTimeout(3000);
});
