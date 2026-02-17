import { Page, test, expect } from "@playwright/test";
import * as XLSX from "xlsx";

export class Utility {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}

export type LoginTestRow = {
  email: string;
  password: string;
  validity: string;
  run: string;
  env: string;
};

export type EnvControlRow = {
  env: string;
  execute: string;
};

export type AddToCartRow = {
  baseURL: string;
  email: string;
  password: string;
  productname: string;
};

export interface WebflowTestRow {
  run: string;
  BranchCode: string;
  FolderNo: string;
  DropDown: string;
  Airline: string;
  StartPoint: string;
  EndPoint: string;
  Class: string;
  IssueDate: string;
  Sell: string;
  FlightNo: string;
  DropDown1: string;
}

export function delay(second: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
}


//Exporting decorators function for Steps Name
export function step(stepName?: string) {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(this: any, ...args: any[]) {
      const name =
        stepName || `${this.constructor.name}.${context.name as string}`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}

/**
 * Reads test data from Excel
 */
export function readExcelData<T>(
  filePath: string,
  sheetName: string
): T[] {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json<T>(worksheet);
}

/**
 * Reads EnvControl sheet and returns env → enabled map
 */
export function readEnvControl(
  filePath: string,
  sheetName: string
): Map<string, boolean> {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json<EnvControlRow>(worksheet);

  const envMap = new Map<string, boolean>();

  for (const row of rows) {
    envMap.set(
      row.env.trim().toLowerCase(),
      row.execute.trim().toLowerCase() === "yes"
    );
  }

  return envMap;
}

export function getTodayDate_DDMMMYY(): string {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = date
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
  const year = String(date.getFullYear()).slice(-2);

  return `${day}${month}${year}`;
}

export function getDateOneMonthFromToday(): string {
  const date = new Date();

  // Add 1 month
  date.setMonth(date.getMonth() + 1);

  const day = String(date.getDate()).padStart(2, '0');
  const month = date
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
  const year = String(date.getFullYear()).slice(-2);

  return `${day}${month}${year}`;
}

export function getDateOneMonthAndOneDayFromToday(): string {
  const date = new Date();

  // Add 1 month and 1 day
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() + 1);

  const day = String(date.getDate()).padStart(2, '0');
  const month = date
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
  const year = String(date.getFullYear()).slice(-2);

  return `${day}${month}${year}`;
}

 export async function takeStepScreenshot(
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
    maxDiffPixelRatio: 0.5,
    animations: "disabled",
  });

}

