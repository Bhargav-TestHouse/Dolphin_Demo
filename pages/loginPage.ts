import { Page } from "@playwright/test";
import { step } from "../utilities/utility";

export class LoginPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private emailInput = "//input[@name='email']";
  private passwordInput = "//input[@name='password']"
  private loginButton = "//input[@value='Login']"
  private homePageButton = "//a[@class='icon-left both nav-link']//div//span[contains(text(),' Home')]"
 

  @step("Log into Demo Ecart Application")
  async logIntoDemoEcart(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  @step("Navigate to Home Page from Login Page")
  async navigateToHomePage() {
    await this.page.click(this.homePageButton);
  } 




}