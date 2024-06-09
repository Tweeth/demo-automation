import { Locator, Page } from '@playwright/test'
import routes from '@test-data/routes.json'
import text from '@test-data/text.json'

export default class SignInPage {
  readonly page: Page
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly signInBtn: Locator
  readonly wrongCredsAlert: Locator

  constructor(page: Page) {
    this.page = page
    this.emailField = page.locator('#email')
    this.passwordField = page.getByTitle('Password')
    this.signInBtn = page.getByRole('button', {name: 'Sign In'})
    this.wrongCredsAlert = page.getByRole('alert').filter({hasText: text.authentication.wrong_creds})
  }

  async signInToAccount(email: string, password: string) {
    await this.page.goto(routes.authentication.sign_in)
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.signInBtn.click()
  }
}
