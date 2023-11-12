// @ts-check
const { test, expect } = require("@playwright/test");

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