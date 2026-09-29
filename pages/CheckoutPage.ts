import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  
  readonly page: Page;

  // Checkout information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  // Checkout overview
  readonly finishButton: Locator;

  // Order confirmation
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Checkout information page
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');

    this.continueButton = page.getByRole('button', {
      name: 'Continue'
    });

    // Checkout overview page
    this.finishButton = page.getByRole('button', {
      name: 'Finish'
    });

    // Order confirmation page
    this.confirmationMessage = page.getByTestId('complete-header');
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }
}