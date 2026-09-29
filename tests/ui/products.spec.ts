import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products Tests', () => {

  test('Products can be sorted by price from low to high', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login
    await loginPage.navigate();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await expect(productsPage.productsTitle).toBeVisible();

    
    await productsPage.sortByPriceLowToHigh();

    // Get all displayed prices
    const prices = await productsPage.getProductPrices();

    // Find the lowest price
    const lowestPrice = Math.min(...prices);

    
    const firstProductPrice =
      await productsPage.getFirstProductPrice();

    // Verify first product has the lowest price
    expect(firstProductPrice).toBe(lowestPrice);
  });

});