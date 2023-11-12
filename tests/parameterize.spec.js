// @ts-check
import { test } from './my-test';
const { expect } = require("@playwright/test");

// for paramterized DEMO
const accounts = [
  {number: "0123456789", password: "1234", expectedBalance: 10}, // Actual Balance = 10
  {number: "1234567890", password: "1234", expectedBalance: 30}, // Actual Balance = 5
  {number: "2345678901", password: "1234", expectedBalance: 50}, // Actual Balance = 50
  {number: "3456789012", password: "1234", expectedBalance: 100}, // Actual Balance = 20
  {number: "4567890123", password: "1234", expectedBalance: 80}, // Actual Balance = 80
]

for (const account of accounts){
  test(`check balance with account ${account.number}`, async ({ page }) => {
    // test(`check balance`, async ({ page, accNumber, pass, expectedBalance }) => {
    const {number, password, expectedBalance} = account

    await page.goto("http://localhost:3000");
  
    // Fill account number and password
    await page.getByLabel("Account Number").fill(number);
    await page.getByLabel("Password").fill(password);
  
    // Click submit to login
    await page.getByRole("button", { name: "Login" }).click();
  
    // await page.waitForTimeout(5000);
  
    await expect(page.locator('h1:below(:text("Balance"))')).toHaveText(expectedBalance.toString());
  });
}

// for parameterized project DEMO
test(`check balance`, async ({ page, number, password, expectedBalance }) => {
  
  await page.goto("http://localhost:3000");

  // Fill account number and password
  await page.getByLabel("Account Number").fill(number);
  await page.getByLabel("Password").fill(password);

  // Click submit to login
  await page.getByRole("button", { name: "Login" }).click();

  // await page.waitForTimeout(5000);

  await expect(page.locator('h1:below(:text("Balance"))')).toHaveText(expectedBalance.toString());
});

