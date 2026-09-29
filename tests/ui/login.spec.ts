import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {

  test('Standard user can login successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);

    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();

  });

  test('Locked out user cannot login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out.'
    );

    await expect(page).toHaveURL(/saucedemo.com\/?$/);

  });

});