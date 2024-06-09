import CreateAccountPage from '@models/authentication/create-account-page'
import HeaderPage from '@models/authentication/header-page'
import SignInPage from '@models/authentication/sign-in-page'
import MyAccountPage from '@models/authentication/my-account-page'
import { test as authenticationFixture } from '@playwright/test'

type Pages = {
  signInPage: SignInPage
  createAccountPage: CreateAccountPage
  headerPage: HeaderPage
  myAccountPage: MyAccountPage
}

const testPages = authenticationFixture.extend<Pages>({
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page))
  },
  createAccountPage: async ({ page }, use) => {
    await use(new CreateAccountPage(page))
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page))
  },
  myAccountPage : async ({ page }, use) => {
    await use(new MyAccountPage(page))
  }
})

export const test = testPages
export const expect = testPages.expect
