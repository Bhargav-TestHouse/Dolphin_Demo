import { Page, expect } from "@playwright/test";
import { step } from "../utilities/utility";

export class HomePageDolphin {  
    private page: Page; 
    constructor(page: Page) {
        this.page = page;
    }

    private folders="//a[.//span[text()='Folders']]";
    private searchFolders="//li[@class='left-nav__list-item ']//span[contains(., 'Search folder')]";

    @step("Take screenshot of home page")
  async takeHomePageScreenshot() {
  await  expect(this.page).toHaveScreenshot(["ScreenshotsForTC001","homePage.png"]);
  }

    @step("Navigate to Folders Page")
    async navigateToFoldersPage(){
        await this.page.hover(this.folders);
        await this.page.click(this.searchFolders);
    }


}