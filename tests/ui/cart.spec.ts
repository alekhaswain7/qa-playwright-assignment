import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart Tests', () => {

  test('User can add two products to the cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.navigate();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await expect(productsPage.productsTitle).toBeVisible();

    await productsPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await productsPage.addProductToCart(
      'Sauce Labs Bike Light'
    );

    await expect(productsPage.cartBadge).toHaveText('2');
  });

});