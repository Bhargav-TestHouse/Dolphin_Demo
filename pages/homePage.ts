import { Page } from "@playwright/test";
import { step } from "../utilities/utility";

export class HomePage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private myAccountLink = "//a[@data-toggle='dropdown']//span[contains( . , 'My account')]";
  private loginButton = "text=Login";
  private searchForProductsInput = "(//div[@class='flex-fill']//input[@aria-label='Search For Products'])[1]"
  private searchButton = "(//button[@type='submit'])[1]"
  private firstProductFromSearchResults = "(//div[@class='carousel-item active']//img[@title='HTC Touch HD'])[1]"
  private addToCartButton = "(//div[@class='product-action']//button[@title='Add to Cart']//i[@class='fas fa-shopping-cart'])[1]"
  private viewCartLinkButton = "//a[text()='View Cart ']"

  /**
   * To Open URL on browser
   */
  @step("Navigate to Demo Ecart Application")
  async gotoDemoEcart(baseURL: string) 
  {
    await this.page.goto(baseURL);
  }

  @step("Navigate to Login Page from Home Page")
  async navigateToLoginPage() 
  {
    await this.page.hover(this.myAccountLink);
    await this.page.click(this.loginButton);
  }

  @step("Search Product and Add to Cart")
  async searchProduct(productName: string) 
  {
    await this.page.locator(this.searchForProductsInput).fill(productName)
    await this.page.locator(this.searchButton).click(); 
    await this.page.locator(this.firstProductFromSearchResults).hover();
    await this.page.locator(this.addToCartButton).click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(this.viewCartLinkButton).click();
  }

}