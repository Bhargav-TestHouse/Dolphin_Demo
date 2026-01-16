import { Page, test } from "@playwright/test";

export class Utility {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
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
