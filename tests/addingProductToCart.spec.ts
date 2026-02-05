import { chromium, expect, test } from "@playwright/test";
import { step } from "../utilities/utility";
import { readExcelData, AddToCartRow } from "../utilities/utility";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

const excelPath = "testdata/data-UAT.xlsx";
// Read Excel sheet
const data = readExcelData<AddToCartRow>(excelPath, "AddToCart")[0];

// let baseURL = "https://ecommerce-playground.lambdatest.io/";
// let email = "kvbhargava9@gmail.com";
// let password = "Pass123$";
// let productname = "htc";

test('Adding product to cart', async () => {

    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext({ viewport: { width: 1500, height: 720 } });
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);


    await homePage.gotoDemoEcart(data.baseURL);

    await expect(page).toHaveScreenshot("HomePage.png");
    await expect(page.locator("//a[@title='Poco Electro']//img")).toHaveScreenshot("Company-Logo.png");

    await homePage.navigateToLoginPage();
    //await expect(page).toHaveScreenshot("LoginPage.png");
    await loginPage.logIntoDemoEcart(data.email, data.password);
    await loginPage.navigateToHomePage();
    await homePage.searchProduct(data.productname);

    await expect(page).toHaveScreenshot("CartPage-MaskQuantity.png",  {mask: [page.locator("//div[@class='input-group flex-nowrap']//input"),page.locator("(//table[@class='table table-bordered']//tbody//td[@class='text-right'])[1]"), page.locator("(//table[@class='table table-bordered']//tbody//td[@class='text-right'])[2]")], maxDiffPixelRatio: 0.03});
    await expect(page.locator("//table[@class='table table-bordered']")).toHaveScreenshot("CartTable-MaskQuantityAndPrice.png", {mask: [page.locator("//div[@class='input-group flex-nowrap']//input"),page.locator("(//table[@class='table table-bordered']//tbody//td[@class='text-right'])[1]"), page.locator("(//table[@class='table table-bordered']//tbody//td[@class='text-right'])[2]")],maxDiffPixelRatio: 0.07});
    
    await page.waitForTimeout(4000);
})

test("Interactions with inputs", async() => {

    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext({ viewport: { width: 1500, height: 720 } });
    const page = await context.newPage();

    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
    const messageInput =  await page.locator("input#user-message");
    //await messageInput.scrollIntoViewIfNeeded();
    console.log(await messageInput.getAttribute("placeholder"));
    expect(messageInput).toHaveAttribute("placeholder", "Please enter your Message");
    console.log("Before entering the value: "+ await messageInput.inputValue());

    await page.locator("//input[@id='user-message']").fill("Hi Bhargava");
    //await messageInput.fill("Hi Bhargava");
    console.log("After entering the value: "+ await messageInput.inputValue());

    await page.locator("//button[text()='Get Checked Value']").dblclick()
    await page.waitForTimeout(2000);
    const displayedMessage = await page.locator("//div[@id='user-message']//p[@id='message']")
    await console.log("Displayed message: "+ await displayedMessage.textContent());
    await expect(displayedMessage).toHaveText("Hi Bhargava");



    const sum1input = await page.locator("sum1");
    const sum2input = await page.locator("sum2");
    const getSumbtn = await page.locator("//button[text()='Get Sum']");

    let num1= 121;
    let num2= 546;
    await page.locator("//input[@placeholder='Please enter first value']").fill("" + num1);
    await page.locator("//input[@placeholder='Please enter second value']").fill("" + num2);
    await getSumbtn.dblclick();

    await page.waitForTimeout(2000);

    const result = await page.locator("//div[@id='user-message']//p[@id='addmessage']").textContent();
    await console.log(result);
    let expectedResult = num1+num2;
    await expect(result).toEqual(""+expectedResult);

    await browser.close();


    /*await homePage.gotoDemoEcart(baseURL);

    //await page.goto("https://ecommerce-playground.lambdatest.io/");
    await expect(page).toHaveScreenshot("HomePage.png");
    await expect(page.locator("//a[@title='Poco Electro']//img")).toHaveScreenshot("Company-Logo.png");

    await homePage.navigateToLoginPage();
    // await page.hover("//a[@data-toggle='dropdown']//span[contains( . , 'My account')]");
    // await page.click("text=Login");
    //await expect(page).toHaveScreenshot("LoginPage.png");

    await loginPage.logIntoDemoEcart(email, password);
    // await page.fill("//input[@name='email']", "kvbhargava9@gmail.com");
    // await page.fill("//input[@name='password']", "Pass123$");
    // await page.click("//input[@value='Login']");

    await loginPage.navigateToHomePage();
    //await page.locator("//a[@class='icon-left both nav-link']//div//span[contains(text(),' Home')]").click();

    await homePage.searchProduct(productname);
    // await page.locator("(//div[@class='flex-fill']//input[@aria-label='Search For Products'])[1]").fill("htc")
    // await page.locator("(//button[@type='submit'])[1]").click();

    // await page.locator("(//div[@class='carousel-item active']//img[@title='HTC Touch HD'])[1]").hover();
    // await page.locator("(//div[@class='product-action']//button[@title='Add to Cart']//i[@class='fas fa-shopping-cart'])[1]").click();
    // await page.waitForTimeout(1000);

    // await page.locator("//a[text()='View Cart ']").click();
    await expect(page).toHaveScreenshot("CartPage-MaskQuantity.png",  {mask: [page.locator("//div[@class='input-group flex-nowrap']//input"),page.locator("(//table[@class='table table-bordered']//tbody//td[@class='text-right'])[1]"), page.locator("(//table[@class='table table-bordered']//tbody//td[@class='text-right'])[2]")], maxDiffPixelRatio: 0.03});

    await expect(page.locator("//table[@class='table table-bordered']")).toHaveScreenshot("CartTable-MaskQuantityAndPrice.png", {mask: [page.locator("//div[@class='input-group flex-nowrap']//input"),page.locator("(//table[@class='table table-bordered']//tbody//td[@class='text-right'])[1]"), page.locator("(//table[@class='table table-bordered']//tbody//td[@class='text-right'])[2]")],maxDiffPixelRatio: 0.07});


    await page.waitForTimeout(4000);
*/

})
