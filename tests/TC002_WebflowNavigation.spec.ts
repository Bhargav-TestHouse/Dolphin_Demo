import { test, chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { LoginPageDolphin } from "../pages/loginPageDolphin";
import { SearchPage } from "../pages/searchPage";
import { takeStepScreenshot } from "../utilities/utility";
import { readEnvControl, WebflowTestRow } from "../utilities/utility";
import { readExcelData } from "../utilities/utility";

const excelPath = "testdata/data-QAErnie.xlsx";
const webflowTestData = readExcelData<WebflowTestRow>(
  excelPath,
  "AddingItemsToWebflow",
);


let browser: Browser;
let context: BrowserContext;
let page: Page;
let searchpage: SearchPage;

test.beforeAll(async () => {
    browser = await chromium.launch({
        headless: false,
    });
});

test.beforeEach(async () => {
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
    });

    page = await context.newPage();
    await page.goto("https://qa2.flightscanner.biz/QAErniewebflow");

    searchpage = new SearchPage(page);
});

test.afterEach(async () => {
    await page.close();
    await context.close();
});

test.afterAll(async () => {
    await browser.close();
});

test("TC-1 - Webflow 2 Navigation test", async () => {
    const TC = "TC-1";
    const loginPageDolphin = new LoginPageDolphin(page);

    await takeStepScreenshot(page, TC, "01_Login_successful");
     await loginPageDolphin.logIntoDolphinApp(
    process.env.USER_NAME!,
    process.env.PASSWORD!,
  );
    await takeStepScreenshot(page, TC, "02_Login_successful");

    await searchpage.navigateToFolders();
    await searchpage.openFolderSearch();
    await searchpage.enterBranchCode("PT");
    await searchpage.enterFolderNumber("1002");
    await searchpage.clickSearch();
    await searchpage.verifyFolderSearchResult();
    await takeStepScreenshot(page, TC, "03_Folder_search_results");

    await searchpage.openFolder();
    await takeStepScreenshot(page, TC, "04_Folder_opened");

    await searchpage.openTravellersTab();
    await takeStepScreenshot(page, TC, "05_Travellers_tab_active");

    await searchpage.openNotesTab();
    await takeStepScreenshot(page, TC, "06_Notes_tab_active");

    await searchpage.openTotalsTab();
    await takeStepScreenshot(page, TC, "07_Totals_tab_active");

    await searchpage.openItemsTab();
    await takeStepScreenshot(page, TC, "08_Items_tab_active");

    await searchpage.useKeyboardShortcut("Control+m", "6");
    await searchpage.verifyMiscData();
    await takeStepScreenshot(page, TC, "09_Misc_data_shortcut");

    await searchpage.useKeyboardShortcut("Control+m", "t+2");
    await searchpage.verifyCustomerTransactions();
    await takeStepScreenshot(page, TC, "10_Customer_transactions_visible");

    await searchpage.useKeyboardShortcut("Control+m", "t+1");
    await searchpage.verifyMiscData();
    await takeStepScreenshot(page, TC, "11_Back_to_misc_data");

    await searchpage.useKeyboardShortcut("Control+m", "3");
    await searchpage.verifyItems();
    await takeStepScreenshot(page, TC, "12_Items_shortcut");

    await searchpage.openItemLink();
    await takeStepScreenshot(page, TC, "13_Items_heading_visible");

    await searchpage.openEditItemForm();
    await takeStepScreenshot(page, TC, "14_Edit_item_form_open");

    await searchpage.useKeyboardShortcut("Control+m", "t+2");
    await searchpage.verifyVendorTransactions();
    await takeStepScreenshot(page, TC, "15_Vendor_transactions_visible");

    await searchpage.useKeyboardShortcut("Control+m", "b+2");
    await searchpage.verifyItems();
    await takeStepScreenshot(page, TC, "16_Back_to_items_level_1");

    await searchpage.useKeyboardShortcut("Control+m", "b+1");
    await searchpage.verifyItems();
    await takeStepScreenshot(page, TC, "17_Back_to_items_level_2");
});