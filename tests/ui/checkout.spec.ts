import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Tests', () => {

  test('User can complete the checkout successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await expect(productsPage.productsTitle).toBeVisible();

    // Add two products
    await productsPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await productsPage.addProductToCart(
      'Sauce Labs Bike Light'
    );

    await expect(productsPage.cartBadge).toHaveText('2');

    await productsPage.openCart();

    // Go to checkout
    await cartPage.proceedToCheckout();

    // Fill checkout form
    await checkoutPage.fillCheckoutInformation(
      'Alekha',
      'Swain',
      '760001'
    );

    // Continue to checkout overview
    await checkoutPage.continueToOverview();

    await checkoutPage.finishOrder();

    // Verify order confirmation
    await expect(
      checkoutPage.confirmationMessage
    ).toHaveText('Thank you for your order!');
  });
});