import path from "path";
import fs from "fs";

export function writeAllureEnvironment() {
  const resultsDir = path.join("test-results", "allure-results");

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const content = `
Environment=${process.env.TEST_ENV ?? "QAErnie"}
Browser=Chromium
Base.URL=${process.env.BASE_URL ?? "Not Set"}
User=${process.env.USER_NAME ?? "LocalUser"}
Executor=Playwright
  `.trim();

  fs.writeFileSync(
    path.join(resultsDir, "environment.properties"),
    content
  );
}
