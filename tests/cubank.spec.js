// @ts-check
const { test, expect } = require("@playwright/test");

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
  await page.getByLabel("Please put your amount:").nth(1).fill("10"); // bad practice but work for now
  // await page.getByLabel("Please put your amount").fill("2");
  await page.getByRole('button', { name: 'Confirm' }).nth(1).click(); // bad practice but work for now

  await expect(page.locator('h1:below(:text("Balance"))')).toHaveText("0");
});

const accounts = [
  {number: "0123456789", password: "1234", expectedBalance: 10}, // Actual Balance = 10
  {number: "1234567890", password: "1234", expectedBalance: 30}, // Actual Balance = 5
  {number: "2345678901", password: "1234", expectedBalance: 50}, // Actual Balance = 50
  {number: "3456789012", password: "1234", expectedBalance: 100}, // Actual Balance = 20
  {number: "4567890123", password: "1234", expectedBalance: 80}, // Actual Balance = 80
]

for (const account of accounts){
  test(`check balance with account ${account.number}`, async ({ page }) => {
    await page.goto("http://localhost:3000");
  
    // Fill account number and password
    await page.getByLabel("Account Number").fill(account.number);
    await page.getByLabel("Password").fill(account.password);
  
    // Click submit to login
    await page.getByRole("button", { name: "Login" }).click();
  
    // await page.waitForTimeout(5000);
  
    await expect(page.locator('h1:below(:text("Balance"))')).toHaveText(account.expectedBalance.toString());
  });
}