import { Page, Locator, expect } from '@playwright/test'
import text from '@test-data/text.json'
import route from '@test-data/routes.json'
import creds from '@test-data/creds.json'

export default class MyAccountPage {
  readonly page: Page
  readonly contactInformationBlock: Locator
  readonly firstLastNameInfo: Locator
  readonly editContactInfBtn: Locator
  readonly changePasswordBtn: Locator

  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly saveButton: Locator

  readonly successAlert: Locator

  readonly currentPasswordField: Locator
  readonly newPasswordField: Locator
  readonly confirmNewPasswordField: Locator
  readonly changePasswordCheckbox: Locator
  readonly changeEmailCheckbox: Locator
  readonly changeEmailBlock: Locator
  readonly emailField: Locator


  constructor(page: Page) {
    this.page = page
    this.contactInformationBlock = page.locator('div.box.box-information')
    this.firstLastNameInfo = this.contactInformationBlock.locator('p')
    this.editContactInfBtn = this.contactInformationBlock.getByRole('link', {name: 'Edit'})
    this.changePasswordBtn = this.contactInformationBlock.getByRole('link', {name: 'Change Password'})

    this.firstNameField = page.locator('#firstname')
    this.lastNameField = page.locator('#lastname')
    this.saveButton = page.getByRole('button', {name: 'Save'})
    this.successAlert = page.getByRole('alert').filter({hasText: text.my_account.success_alert})

    this.currentPasswordField = page.locator('#current-password')
    this.newPasswordField = page.locator('#password')
    this.confirmNewPasswordField = page.locator('#password-confirmation')
    this.changePasswordCheckbox = page.getByRole('checkbox', {name: 'Change Password'})
    this.changeEmailCheckbox = page.getByRole('checkbox', {name: 'Change Email'})
    this.changeEmailBlock = page.locator('fieldset.fieldset.password')
    this.emailField = page.locator('#email')
  }


  async changeAccountInfData(newFirstName: string, newLastName: string) {
    await this.page.goto(route.profile.account)
    await this.editContactInfBtn.click()
    await this.page.waitForURL(route.profile.edit_account_inf)

    await this.firstNameField.fill('')
    await this.firstNameField.fill(newFirstName)

    await this.lastNameField.fill('')
    await this.lastNameField.fill(newLastName)
    await this.saveButton.click()

    await this.page.waitForURL(route.profile.account)
    await expect(this.successAlert,
      'Success alert message about changing account infromation is displayed'
    ).toBeVisible()
  }


  async changePassword(currentPassword: string, newPassword: string) {
    await this.page.goto(route.profile.account)
    await this.changePasswordBtn.click()
    await this.page.waitForURL(route.profile.edit_password)

    await expect(this.changePasswordCheckbox,
      'Change Password checkbox is checked'
    ).toBeChecked()

    await this.currentPasswordField.fill(currentPassword)
    await this.newPasswordField.fill(newPassword)
    await this.confirmNewPasswordField.fill(newPassword)
    await this.saveButton.click()

    await this.page.waitForURL(route.authentication.sign_in)
    await expect(this.successAlert,
      'Success alert message about changing account infromation is displayed'
    ).toBeVisible()
  }

  async changeEmail(newEmail: string) {
    await this.page.goto(route.profile.edit_account_inf)
    await this.changeEmailCheckbox.check()

    await expect(this.changeEmailBlock,
      'Change Email block is appeared on page'
    ).toBeVisible()

    await this.emailField.fill('')
    await this.emailField.fill(newEmail)
    await this.currentPasswordField.fill(creds.password)
    await this.saveButton.click()

    await this.page.waitForURL(route.authentication.sign_in)
    await expect(this.successAlert,
      'Success alert message about changing account information is displayed'
    ).toBeVisible()
  }
}
 