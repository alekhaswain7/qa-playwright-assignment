import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsTitle = page.getByText('Products', { exact: true });
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async addProductToCart(productName: string) {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await product.getByRole('button', { name: /Add to cart/i }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = this.page.locator('.inventory_item_price');

    const prices = await priceElements.allTextContents();

    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }

  async getFirstProductPrice(): Promise<number> {
    const firstPrice = await this.page
      .locator('.inventory_item_price')
      .first()
      .textContent();

    return Number(firstPrice?.replace('$', ''));
  }
}