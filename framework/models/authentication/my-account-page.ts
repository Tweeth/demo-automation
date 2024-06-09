import { Page, Locator } from '@playwright/test'
import text from '@test-data/text.json'

export default class MyAccountPage {
  readonly page: Page
  readonly contactInformationBlock: Locator
  readonly firstLastNameInfo: Locator
  readonly editContactInfBtn: Locator
  readonly changePasswordBtn: Locator


  constructor(page: Page) {
    this.page = page
    this.contactInformationBlock = page.locator('div.box.box-information p')
    this.firstLastNameInfo = this.contactInformationBlock.locator('p')
    this.editContactInfBtn = this.contactInformationBlock.getByRole('link', {name: 'Edit'})
    this.changePasswordBtn = this.contactInformationBlock.getByRole('link', {name: 'Change Password'})
  }
}
