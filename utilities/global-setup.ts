import { writeAllureEnvironment } from "./allure-helper";

async function globalSetup() {
  writeAllureEnvironment();
}

export default globalSetup;
