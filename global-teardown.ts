import { test as teardown, expect } from '@playwright/test'

teardown('do login', async ({ page }) => {
  await page.goto('/')

  // Write a logic to cleanup the environment after all the tests
  // If not needed, delete this file and remove teardown from projects
})
