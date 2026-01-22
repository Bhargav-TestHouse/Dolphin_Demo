import { Page, test } from "@playwright/test";
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
