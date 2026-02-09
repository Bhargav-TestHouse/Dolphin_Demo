/*Pre-requisite: Install 'xlsx' package using npm install xlsx

*/

import { test, expect } from "@playwright/test";
import { readExcelData, readEnvControl, LoginTestRow } from "../utilities/utility";
import { shouldExecute } from "../utilities/executionControl";

// // Read test data from Excel file
// //file---> workbook ---> sheet ---> rows & columns

// const excelPath="testdata/data-UAT.xlsx";
// const workbook = XLSX.readFile(excelPath);
// const sheetNames = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetNames];

// //Convert sheet data to JSON
// const loginTestData: any = XLSX.utils.sheet_to_json(worksheet);
// console.log(loginTestData);
const excelPath = "testdata/data-UAT.xlsx";
const loginTestData = readExcelData<LoginTestRow>(excelPath, "LoginData");

const envControl = readEnvControl(excelPath, "EnvControl");


// console.log(loginTestData);
// console.log("CURRENT ENV =", process.env.ENV);



test.describe("Login data driven tests", () => {
  
    for (const row of loginTestData) {
        const {email, password, validity, run, env} = row as {email: string, password: string, validity: string, run: string, env: string};        
    
    test(`Login test${email} and ${password}`, async ({page}) => {
      if (!shouldExecute(row, envControl)) {
        test.skip(
          true,
          `Skipped via Excel → run=${row.run}, env=${row.env}`
        );
      }


      await page.goto("https://demowebshop.tricentis.com/login");

      await page.locator("#Email").fill(email);
      await page.locator("#Password").fill(password);
      await page.locator("//input[@value='Log in']").click();

      if (validity.toLowerCase() === "valid") {
        const logoutLink = await page.locator("a[href='/logout']");
        await expect(logoutLink).toBeVisible();
      } else {
        const errorMessage = await page.locator(".validation-summary-errors");
        await expect(errorMessage).toBeVisible();

        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
      }

    });
  }
});
