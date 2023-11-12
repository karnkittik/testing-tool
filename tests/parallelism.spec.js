// @ts-check
const { test, expect } = require("@playwright/test");

// test.describe.configure({ mode: 'parallel' });
test.describe.configure({ mode: 'serial' });

test("check title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "CU BANK" })).toBeVisible();
});

test("check balance", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Fill account number and password
  await page.getByLabel("Account Number").fill("1234567890");
  await page.getByLabel("Password").fill("1234");

  // Click submit to login
  await page.getByRole("button", { name: "Login" }).click();

  // await page.waitForTimeout(5000);

  await expect(page.locator('h1:below(:text("Balance"))')).toHaveText("10");
});

test("withdraw", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Fill account number and password
  await page.getByLabel("Account Number").fill("1234567890");
  await page.getByLabel("Password").fill("1234");

  // Click submit to login
  await page.getByRole("button", { name: "Login" }).click();

  // await page.waitForTimeout(5000);

  // await page.locator('input:below(:text("Withdraw"))').fill("2");
  await page.getByLabel("Please put your amount:").nth(1).fill("5"); // bad practice but work for now
  // await page.getByLabel("Please put your amount").fill("2");
  await page.getByRole('button', { name: 'Confirm' }).nth(1).click(); // bad practice but work for now

  await expect(page.locator('h1:below(:text("Balance"))')).toHaveText("0");
});
