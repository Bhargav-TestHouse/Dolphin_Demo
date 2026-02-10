import { test, chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { SearchPage } from "../pages/searchPage";
import { readEnvControl, WebflowTestRow } from "../utilities/utility";
import { readExcelData } from "../utilities/utility";
import { LoginPageDolphin } from "../pages/loginPageDolphin";

const excelPath = "testdata/data-QAErnie.xlsx";
const webflowTestData = readExcelData<WebflowTestRow>(
    excelPath,
    "AddingItemsToWebflow",
);

const envControl = readEnvControl(excelPath, "EnvControl");

test("Search and Navigation Webflow Navigation test", async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1530, height: 730 },
    });
    const page = await context.newPage();
    const loginPageDolphin = new LoginPageDolphin(page);
    const searchpage = new SearchPage(page);

    await loginPageDolphin.gotoDolphinLoginPage();
    await loginPageDolphin.logIntoDolphinApp(
        process.env.USER_NAME!,
        process.env.PASSWORD!
    );
    await loginPageDolphin.takeLoginPageScreenshot();

    await searchpage.navigateToFolders();
    await searchpage.openFolderSearch();
    await searchpage.enterBranchCode("PT");
    await searchpage.enterFolderNumber("1002");
    await searchpage.clickSearch();
    await searchpage.verifyFolderSearchResult();
    await searchpage.takeFolderSearchResultsScreenshot();

    await searchpage.openFolder();
    await searchpage.openTravellersTab();
    await searchpage.openNotesTab();
    await searchpage.openTotalsTab();
    await searchpage.openItemsTab();
    await searchpage.takeItemsTabScreenshot();

    await searchpage.useKeyboardShortcut("Control+m", "6");
    await searchpage.verifyMiscData();

    await searchpage.useKeyboardShortcut("Control+m", "t+2");
    await searchpage.verifyCustomerTransactions();

    await searchpage.useKeyboardShortcut("Control+m", "t+1");
    await searchpage.verifyMiscData();

    await searchpage.useKeyboardShortcut("Control+m", "3");
    await searchpage.verifyItems();

    await searchpage.openItemLink();

    await searchpage.openEditItemForm();

    await searchpage.useKeyboardShortcut("Control+m", "t+2");
    await searchpage.verifyVendorTransactions();
    await searchpage.takeVendorTransactionsScreenshot();

    await searchpage.useKeyboardShortcut("Control+m", "b+2");
    await searchpage.verifyItems();

    await searchpage.useKeyboardShortcut("Control+m", "b+1");
    await searchpage.verifyItems();
});
