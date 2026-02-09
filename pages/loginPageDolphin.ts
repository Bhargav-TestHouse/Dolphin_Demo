import { Page, expect } from "@playwright/test";
import { step } from "../utilities/utility";

export class LoginPageDolphin {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  } 

  private usernameInput = "#username";
  private passwordInput = "#password";
  private loginButton = "//button[@title='Login']";
  



  @step("Navigate to Dolphin Login Page")
  async gotoDolphinLoginPage() {
    await this.page.goto(process.env.BASE_URL!);
  }

  @step("Log into Dolphin Application")
  async logIntoDolphinApp(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

    @step("Take screenshot of login page")
  async takeLoginPageScreenshot() {
    await expect(this.page).toHaveScreenshot(["ScreenshotsForTC001","loginPage.png"]);
  }

}