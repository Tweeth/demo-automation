import { Locator, Page, expect } from '@playwright/test'
import routes from '@test-data/routes.json'
import creds from '@test-data/creds.json'
import text from '@test-data/text.json'

import {
  getPhoneNumber,
  generateRandomEmail,
  getString
} from '@utils/generate-meths'

export default class CreateAccountPage {
  readonly page: Page
  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly confirmPasswordField: Locator
  readonly createAccountButton: Locator

  readonly firstNameError: Locator
  readonly lastNameError: Locator
  readonly emailError: Locator
  readonly passwordError: Locator
  readonly confirmPasswordError: Locator
  readonly emailUsedAlert: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameField = page.locator('#firstname')
    this.lastNameField = page.locator('#lastname')
    this.emailField = page.locator('#email_address')
    this.passwordField = page.locator('#password')
    this.confirmPasswordField = page.locator('#password-confirmation')
    this.createAccountButton = page.getByTitle('Create an Account')

    this.firstNameError = page.locator('#firstname-error')
    this.lastNameError = page.locator('#lastname-error')
    this.emailError = page.locator('#email_address-error')
    this.passwordError = page.locator('#password-error')
    this.confirmPasswordError = page.locator('#password-confirmation-error')
    this.emailUsedAlert = page.getByRole('alert').filter({hasText: text.authentication.email_used})

  }

  async createAccount(email?: string, firstName?: string, lastName?: string) {
    await this.page.goto(routes.authentication.create_account);

    const generatedFirstName = firstName || getString();
    const generatedLastName = lastName || getString();
    const generatedEmail = email || generateRandomEmail();

    await this.firstNameField.fill(generatedFirstName);
    await this.lastNameField.fill(generatedLastName);
    await this.emailField.fill(generatedEmail);
    await this.passwordField.fill(creds.password);
    await this.confirmPasswordField.fill(creds.password);
    await this.createAccountButton.click();
    await this.page.waitForLoadState()
  }
}
