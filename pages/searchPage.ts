import { Page, expect, Locator } from "@playwright/test";
import { step } from "../utilities/utility";

export class SearchPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private homeHeading: Locator;
    private foldersLink: Locator;
    private searchFolderButton: Locator;
    private branchCodeInput: Locator;
    private folderNoInput: Locator;
    private searchButton: Locator;
    private folderPTCell: Locator;
    private travellersTab: Locator;
    private travellersLink: Locator;
    private notesTab: Locator;
    private notesHeading: Locator;
    private totalsTab: Locator;
    private totalsHeading: Locator;
    private itemsTab: Locator;
    private itemsHeading: Locator;
    private itemsLink: Locator;
    private editInFormButton: Locator;
    private editItemHeading: Locator;
    private miscDataHeading: Locator;
    private customerTransactions: Locator;
    private vendorTransactions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole("textbox", { name: "User name" });
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.homeHeading = page.getByRole("heading", { name: "Home" });
        this.foldersLink = page.getByRole("link").filter({ hasText: "Folders" });
        this.searchFolderButton = page.getByTestId("SearchFolder");
        this.branchCodeInput = page.getByRole("searchbox", { name: "Branch code" });
        this.folderNoInput = page.getByRole("searchbox", { name: "Folder no" });
        this.searchButton = page.getByTestId("persistentEdObjsearchBtn");
        this.folderPTCell = page.getByRole("gridcell", { name: "PT" });
        this.travellersTab = page.getByText("2Travellers");
        this.travellersLink = page.getByRole("link", { name: "Travellers" });
        this.notesTab = page.getByText("5Notes");
        this.notesHeading = page.getByRole("heading", { name: "Notes" });
        this.totalsTab = page.getByText("4Totals");
        this.totalsHeading = page.getByRole("heading", { name: "Totals" });
        this.itemsTab = page.getByText("3Items");
        this.itemsHeading = page.getByRole("heading", { name: "Items" });
        this.itemsLink = page.getByRole('link', { name: 'Items' });
        this.editInFormButton = page.getByRole("button", { name: "Edit in form [Ctrl + Enter]" });
        this.editItemHeading = page.getByRole("heading", { name: "Editing item - ticket" });
        this.miscDataHeading = page.getByRole("heading", { name: "Misc. data" });
        this.customerTransactions = page.getByText("1Customer transactions");
        this.vendorTransactions = page.getByRole("listitem").filter({ hasText: "1Vendor transactions" });
    }

    @step("Login to application")
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.homeHeading).toBeVisible();
    }

    @step("Navigate to Folders")
    async navigateToFolders() {
        await this.foldersLink.click();
    }

    @step("Open Folder Search")
    async openFolderSearch() {
        await this.searchFolderButton.click();
    }

    @step("Enter Branch Code")
    async enterBranchCode(branchCode: string) {
        await this.branchCodeInput.fill(branchCode);
    }

    @step("Enter Folder Number")
    async enterFolderNumber(folderNo: string) {
        await this.folderNoInput.fill(folderNo);
    }

    @step("Click Search")
    async clickSearch() {
        await this.searchButton.click();
    }

    @step("Verify Folder Search Result")
    async verifyFolderSearchResult() {
        await expect(this.folderPTCell).toBeVisible();
    }

    @step("Open Folder")
    async openFolder() {
        await this.folderPTCell.dblclick();
        await expect(this.travellersTab).toBeVisible();
    }

    @step("Open Travellers Tab")
    async openTravellersTab() {
        await this.travellersTab.click();
        await expect(this.travellersLink).toBeVisible();
    }

    @step("Open Notes Tab")
    async openNotesTab() {
        await this.notesTab.click();
        await expect(this.notesHeading).toBeVisible();
    }

    @step("Open Totals Tab")
    async openTotalsTab() {
        await this.totalsTab.click();
        await expect(this.totalsHeading).toBeVisible();
    }

    @step("Open Items Tab")
    async openItemsTab() {
        await this.itemsTab.click();
        await expect(this.itemsHeading).toBeVisible();
    }

    @step("Use keyboard shortcut")
    async useKeyboardShortcut(primary: string, secondary: string) {
        await this.page.keyboard.press(primary);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press(secondary);
    }

    @step("Verify Misc Data")
    async verifyMiscData() {
        await expect(this.miscDataHeading).toBeVisible();
    }

    @step("Verify Customer Transactions")
    async verifyCustomerTransactions() {
        await expect(this.customerTransactions).toBeVisible();
    }

    @step("Verify Items")
    async verifyItems() {
        await expect(this.itemsHeading).toBeVisible();
    }

    @step("Open Item Header Link")
    async openItemLink() {
        await this.itemsLink.click();
        await this.verifyItems();
    }

    @step("Open Edit Item Form")
    async openEditItemForm() {
        await expect(this.editInFormButton.first()).toBeVisible();
        await this.editInFormButton.first().click();
        await expect(this.editItemHeading).toBeVisible();
    }

    @step("Verify Vendor Transactions")
    async verifyVendorTransactions() {
        await expect(this.vendorTransactions).toBeVisible();
    }

    @step("Take screenshot of folder search results page")
    async takeFolderSearchResultsScreenshot() {
        await expect(this.page)
            .toHaveScreenshot(["ScreenshotsForTC003", "folderSearchResults.png"]);
    }

    @step("Take screenshot of opened folder page")
    async takeFolderOpenedScreenshot() {
        await expect(this.page)
            .toHaveScreenshot(["ScreenshotsForTC003", "folderOpened.png"]);
    }

    @step("Take screenshot of items tab page")
    async takeItemsTabScreenshot() {
        await expect(this.page)
            .toHaveScreenshot(["ScreenshotsForTC003", "itemsTab.png"]);
    }

    @step("Take screenshot of misc data page")
    async takeMiscDataScreenshot() {
        await expect(this.page)
            .toHaveScreenshot(["ScreenshotsForTC003", "miscData.png"]);
    }

    @step("Take screenshot of vendor transactions page")
    async takeVendorTransactionsScreenshot() {
        await expect(this.page)
            .toHaveScreenshot(["ScreenshotsForTC003", "vendorTransactions.png"]);
    }
}
