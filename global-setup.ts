// import { STORAGE_STATE } from 'playwright.config'

import { test as setup, expect } from '@playwright/test'
import credsFile from '@test-data/creds.json'


setup('do login', async ({ page }) => {
  await page.goto('/')

  // Write an actual login logic here; add an expect to ensure that sign in is successful
  // NOTE: You can use fixtures now in global setup and teardown as well.

//  await page.context().storageState({ path: STORAGE_STATE })
})
