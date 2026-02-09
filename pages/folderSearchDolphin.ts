import { Page, expect } from "@playwright/test";
import { step } from "../utilities/utility";

export class FolderSearchDolphin {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private branchCode = "//input[@id='BranchCode']";
  private folderNo = "//input[@id='FoldNo']";
  private searchButton = "//button[@data-testid='persistentEdObjsearchBtn']";
  private initEnquiry = "//tr//td[@role='gridcell'][2]";
  private searchResultRow = "//tr[@class='dxbl-grid-focused-row']";
  private addViaGridButton = "//button[@id='FolderItems_addBtnOnly']";
  private addViaGridPlusIcon = "//button[@title='Add item via grid  [Ins]']";
  private dropDown = "//select[@id='drop-down-chooser-form__drop']";
  private okButtonForDropDown =
    "//div[@class='drop-down-chooser-form__buttons']//button[contains(.,'OK')]";
  private airlineInput = "//input[contains(@name,'strAirlineCode')]";
  private airlineFirstDropDownOtion =
    "(//li[@role='option' and normalize-space()])[1]";
  private startPointInput = "//input[contains(@name,'strStartPointCode')]";
  private startPointFirstDropdownOption =
    "(//li[@role='option' and contains(@id,'strStartPointCode')])[1]";
  private endPointSearchIcon =
    "//input[contains(@name,'strEndPointCode')]/following-sibling::div[contains(@class,'dxbl-btn-group')]//button[contains(@title,'full search')]";
  private searchInput = "//input[@id='SmartSearchFilter']";
  private useButton = "(//button[@title='Use'])[1]";
  private classSearchIcon =
    "//input[contains(@name,'strClassCode')]/following-sibling::div[contains(@class,'dxbl-btn-group')]//button[contains(@title,'full search')]";
  private classKOption = "//td[@role='gridcell' and normalize-space()='K']";
  private travellerDropdown =
    "//button[@title='Open or close the drop-down window']";
  private travellerOption =
    "//li[@role='option' and contains(.,'Playwright Emptyfolder Mr')]";
  private issueDateInput = "//input[contains(@id, 'ctIssueDate')]";
  private sellInput = "//input[contains(@id, 'lfFiTotSellAmt')]";
  private validationButton =
    "//button[@id='FolderItems_validateEditCommandBtn']";
  private revertButton = "//button[@title='Revert  [Esc]']";
  private editButton = "//button[@title='Edit in grid  [Enter]']";
  private moreActionsButton = "//button[@title='More actions']";
  private deleteButton =
    "//div[@role='menuitem' and contains(., 'Delete [Del]')]";
  private okButtonForDelete = "//button[@type='submit' and contains(., 'OK')]";
  private startDateInput = "//input[contains(@id,'ctStartDate')]";
  private startItemTypeName = "//input[contains(@id,'strItemTypeName')]";
  private endDateInput = "//input[contains(@id,'ctEndDate')]";
  private startTimeInput = "//input[contains(@id,'ctStartTime')]";
  private endTimeInput = "//input[contains(@id,'ctEndTime')]";
  private itemsRows =
    "(//table[@class='dxbl-grid-table dxbl-grid-row-hover-enabled']//tbody)[2]";
  private itemsCount =
    "//div[@data-id='items']//span[@class='ed-grid__header-count']";
  private totalsSection = "//div[@data-id='totals']";
  private MiscellaneousDataSection = "//div[@data-id='misc-data']";
  private folderSavedMessage="//div[@class='dxbl-toast-text-content']//div[contains(., 'Folder saved successfully.')]"
  private saveFolderButton="//button[@title='Save folder']";
  private editFolderHeading="//h1[@class='edobj-edit-form-header__title' and contains(., 'Editing folder')]"


  @step("Search for folder in Folders Page")
  async searchForFolder(branchCode: string, folderNo: any) {
    await this.page.fill(this.branchCode, branchCode);
    await this.page.fill(this.folderNo, String(folderNo));
    await this.page.click(this.searchButton);
  }

  @step("Verify search result")
  async veriyfySearchResult() {
    await this.page.locator(this.searchResultRow).isVisible();
  }

  @step("Open searched folder")
  async openSearchedFolder() {
    await this.page.dblclick(this.initEnquiry);
  }

  @step("Select value from dropdown to add item via grid")
  async selectValueFromDropDown(value: string) {
    await this.page.click(this.addViaGridButton);
    // await this.page.click(this.addViaGridPlusIcon);
    await this.page.selectOption(this.dropDown, value);
    await this.page.click(this.okButtonForDropDown);
  }

  @step("Adding ticket details in folder")
  async addingTicketsdetails(
    airlineCode: string,
    startPoint: any,
    endPoint: string,
    classCode: string,
    issueDate: any,
    sellAmount: any,
  ) {
    let airlineView = await this.page.locator(this.airlineInput);
    await airlineView.scrollIntoViewIfNeeded();

    await this.page.fill(this.airlineInput, airlineCode);
    await this.page.waitForTimeout(1000);
    await this.page.click(this.airlineFirstDropDownOtion);
    await this.page.fill(this.startPointInput, startPoint);
    await this.page.click(this.startPointFirstDropdownOption);
    await this.page.click(this.endPointSearchIcon);
    await this.page.fill(this.searchInput, endPoint);
    await this.page.click(this.searchButton);
    await this.page.click(this.useButton);
    await this.page.click(this.classSearchIcon);
    await this.page.fill(this.searchInput, classCode);
    await this.page.click(this.searchButton);
    await this.page.dblclick(this.classKOption);
    await this.page.click(this.travellerDropdown);
    await this.page.click(this.travellerOption);
    //await this.page.fill(this.issueDateInput, String(issueDate));
    await this.page.click(this.issueDateInput);
    await this.page.keyboard.press("H");
    await this.page.fill(this.sellInput, String(sellAmount));
  }

  @step("Verifying Validate and Revert buttons functionality")
  async verifyingValidateAndRevertButtons() {
    await expect(this.page.locator(this.validationButton)).toBeVisible();
    await expect(this.page.locator(this.revertButton)).toBeVisible();

    await this.page.click(this.validationButton);
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator(this.validationButton)).toBeHidden();
    await expect(this.page.locator(this.revertButton)).toBeHidden();
    await expect(this.page.locator(this.editButton).nth(2)).toBeVisible();
  }

  @step("Take screenshot of folder search page")
  async takeFolderSearchPageScreenshot() {
    await this.page.waitForTimeout(1000);
    await expect(this.page).toHaveScreenshot(["ScreenshotsForTC001","folderSearchPage.png"], {
      mask: [
        this.page.locator(this.itemsRows),
        this.page.locator(this.itemsCount),
        this.page.locator(this.totalsSection),
        this.page.locator(this.MiscellaneousDataSection),
      ],
    maxDiffPixelRatio: 0.03,
    });
  }

  @step("Adding Air details in folder")
  async addingAirDetails(
    value: string,
    airlineCode: string,
    flightNo: any,
    startPoint: string,
  ) {
    await this.page.click(this.addViaGridPlusIcon);
    await this.page.selectOption(this.dropDown, value);
    await this.page.click(this.okButtonForDropDown);
    await this.page.locator(this.startItemTypeName).click();

    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.type(airlineCode);
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.type(String(flightNo));
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.type(startPoint);
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Control+Alt+F");
    await this.page.locator(this.searchInput).click();
    await this.page.keyboard.type("JF");
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");

    await this.page.locator(this.startDateInput).click();
    await this.page.keyboard.type("T");
    const startDate_Value = await this.page
      .locator(this.startDateInput)
      .inputValue();
    console.log("Start Date value is: " + startDate_Value);
    await expect(startDate_Value).toBe("09FEB26");
    await this.page.keyboard.press("H");
    const startDate_Value1 = await this.page
      .locator(this.startDateInput)
      .inputValue();
    console.log("Start Date new value is: " + startDate_Value1);
    await expect(startDate_Value1).toBe("09MAR26");

    await this.page.locator(this.startTimeInput).click();
    await this.page.keyboard.type("1930");

    await this.page.locator(this.endDateInput).click();
    await this.page.keyboard.type("H");
    const endDate_Value = await this.page
      .locator(this.endDateInput)
      .inputValue();
    console.log("End Date value is: " + endDate_Value);
    await expect(endDate_Value).toBe("09MAR26");
    await this.page.keyboard.type("A");
    const endDate_Value1 = await this.page
      .locator(this.endDateInput)
      .inputValue();
    console.log("End Date value is: " + endDate_Value1);
    await expect(endDate_Value1).toBe("10MAR26");

    await this.page.locator(this.endTimeInput).click();
    await this.page.keyboard.type("0745");

    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.type("Y");
    await this.page.keyboard.press("Enter");
  }

//   async savingFolderFromKeyboard() {

//     await this.page.keyboard.press("Alt+S");
//     await expect(this.page.locator(this.folderSavedMessage)).toBeVisible();
//   }

  @step("Saving folder from save button")
  async savingFolderFromSaveButton() {
    await this.page.click(this.saveFolderButton);
    await this.page.waitForTimeout(1000);
    await expect(this.page.locator(this.folderSavedMessage)).toBeVisible();
  }

  @step("Deleting added item from folder")
  async deletingAddedItem() {
    await this.page.locator(this.moreActionsButton).nth(4).click();
    await this.page.click(this.deleteButton);
    await this.page.locator(this.okButtonForDelete).nth(1).click();
  }

  @step("Deleting added item from folder using keyboard")
  async deletingAddedItemViaKeyboard() {
    await this.page.locator(this.editFolderHeading).click(); 
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press("Control+M"); 
    await this.page.keyboard.press("3"); 
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Shift+Tab");
    await this.page.keyboard.press("Enter");

  }

  @step("Verify all items are deleted from folder")
  async verifyAllItemsAreDeleted() {
    await expect(this.page.locator(this.addViaGridButton)).toBeVisible(); 
  }
}
