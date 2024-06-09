import { Page, Locator } from '@playwright/test'
import text from '@test-data/text.json'

export default class HeaderEls {
  readonly page: Page
  readonly menuActionBtn: Locator
  readonly cart: Locator
  readonly logOutBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.menuActionBtn = page.locator("(//button[@class='action switch'])[1]")
    this.cart = page.getByTestId('cart-button')
    this.logOutBtn = page.getByRole('link').filter({hasText: 'Sign Out'})
  }

  async logOutFromAccount() {
    await this.menuActionBtn.click()
    await this.page.waitForLoadState()
    await this.logOutBtn.click()
  }
}
