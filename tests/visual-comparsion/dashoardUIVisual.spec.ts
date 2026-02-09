import { test, expect, chromium, Page, Browser, BrowserContext } from "@playwright/test";
import data from "../../test-data/test-data";

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
  await page.goto("web/index.php/auth/login");

  await page.fill("input[name='username']", process.env.USER_NAME!);
  await page.fill("input[name='password']", process.env.PASSWORD!);
  await page.click("button[type='submit']");

  await expect(page).toHaveURL(/dashboard\/index/);
  await expect(page.locator("img[alt='client brand banner']")).toBeVisible();
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
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("load");
  await page.evaluate(() => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  });

  await expect(page).toHaveScreenshot(`${testCaseId}_${stepName}.png`, {
    maxDiffPixelRatio: 0.05,
    animations: "disabled",
  });
}

test("TC-1 | Dashboard page validation", async () => {
  const TC = "TC-1";

  await takeStepScreenshot(page, TC, "dashboard-render");
});

test("TC-2 | E2E candidate recruitment flow", async () => {
  const TC = "TC-2";
  await page.setDefaultTimeout(600000);

  // Recruitment page
  await page.getByRole("link", { name: "Recruitment" }).click();
  await takeStepScreenshot(page, TC, "01-recruitment-page");

  // Add Candidate
  await page.getByRole("button", { name: " Add" }).click();
  await expect(page.getByRole("heading", { name: "Add Candidate" })).toBeVisible();
  await takeStepScreenshot(page, TC, "02-add-candidate-form");

  // Fill Candidate Details
  await page.getByRole("textbox", { name: "First Name" }).fill(data.firstname);
  await page.getByRole("textbox", { name: "Last Name" }).fill(data.lastname);
  await page.getByText("-- Select --").click();
  await page.locator("(//div[@role='listbox']//span)[last()]").click();
  await page.getByRole("textbox", { name: "Type here" }).first().fill(data.email);
  await page.locator("textarea").fill(data.note);
  await takeStepScreenshot(page, TC, "03-candidate-details-filled");

  // Save Candidate
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("heading", { name: "Application Stage" })).toBeVisible();
  await takeStepScreenshot(page, TC, "04-application-stage-initial");

  // Shortlist
  await page.getByRole("button", { name: "Shortlist" }).click();
  await expect(page.getByRole("heading", { name: "Shortlist Candidate" })).toBeVisible();
  await takeStepScreenshot(page, TC, "05-shortlist-dialog");

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("heading", { name: "Application Stage" })).toBeVisible();
  await takeStepScreenshot(page, TC, "06-shortlisted");

  // Schedule Interview
  await page.getByRole("button", { name: "Schedule Interview" }).click();
  await expect(page.getByRole("heading", { name: "Schedule Interview" })).toBeVisible();
  await takeStepScreenshot(page, TC, "07-schedule-interview-dialog");

  await page.getByRole("textbox").nth(5).fill(data.interviewtitle);
  await page.getByRole("textbox", { name: "Type for hints..." }).fill("A");
  await expect(page.locator("(//div[@role='listbox']//*)[1]")).toBeVisible();
  await page.locator("(//div[@role='listbox']//span)[3]").click();
  await page.waitForTimeout(2000);
  await page.locator("//input[@placeholder='yyyy-dd-mm']").click();
  await page.waitForTimeout(2000);
  await page.getByText('30').click();
  await page.getByRole('textbox', { name: 'hh:mm' }).click();
  await page.getByRole("textbox", { name: "Type here" }).fill(data.note);
  await takeStepScreenshot(page, TC, "08-interview-details-filled");

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("heading", { name: "Application Stage" })).toBeVisible();
  await takeStepScreenshot(page, TC, "09-interview-scheduled");

  // Interview Passed
  await page.getByRole("button", { name: "Mark Interview Passed" }).click();
  await expect(page.getByRole("heading", { name: "Mark Interview Passed" })).toBeVisible();
  await takeStepScreenshot(page, TC, "10-interview-passed-dialog");

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("heading", { name: "Application Stage" })).toBeVisible();
  await takeStepScreenshot(page, TC, "11-interview-passed");

  // Offer Job
  await page.getByRole("button", { name: "Offer Job" }).click();
  await expect(page.getByRole("heading", { name: "Offer Job" })).toBeVisible();
  await takeStepScreenshot(page, TC, "12-offer-job-dialog");

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("heading", { name: "Application Stage" })).toBeVisible();
  await takeStepScreenshot(page, TC, "13-offer-given");

  // Hire Candidate
  await page.getByRole("button", { name: "Hire" }).click();
  await expect(page.getByRole("heading", { name: "Hire Candidate" })).toBeVisible();
  await takeStepScreenshot(page, TC, "14-hire-dialog");

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Status: Hired")).toBeVisible();
  await takeStepScreenshot(page, TC, "15-candidate-hired");
});

test("TC-3 | Add user from admin page", async () => {
  const TC = "TC-3";

  //Admin page loaded
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
  await takeStepScreenshot(page, TC, "01-admin-page");

  //Add User form opened
  await page.getByRole('button', { name: ' Add' }).click();
  await expect(page.getByRole('heading', { name: 'Add User' })).toBeVisible();
  await takeStepScreenshot(page, TC, "02-add-user-form");

  //Fill form
  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'ESS' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('A');
  await expect(page.locator("(//div[@role='listbox']//*)[1]")).toBeVisible();
  await page.locator("(//div[@role='listbox']//span)[2]").click();
  await page.getByText('-- Select --').click();
  await page.getByRole('option', { name: 'Enabled' }).click();
  await page.getByRole('textbox').nth(2).fill(data.username);
  await page.getByRole('textbox').nth(3).fill(data.password);
  await page.getByRole('textbox').nth(4).fill(data.password);
  await takeStepScreenshot(page, TC, "03-form-filled");

  //User created successfully
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await takeStepScreenshot(page, TC, "04-user-created");

  //User appears in search results
  await page.getByRole('textbox').nth(1).fill(data.username);
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByText(data.username)).toBeVisible();
  await expect(page.getByText('(1) Record Found')).toBeVisible();
  await takeStepScreenshot(page, TC, "05-user-search-result");
});
