import { chromium, Locator, expect, request, Page } from '@playwright/test'
import credsFile from '@test-data/creds.json'

export function getString(): string {
  const length = Math.floor(Math.random() * 9) + 2; // Random legth from 2 to 10
  return Math.random().toString(36).substring(2, 2 + length);
}

export function generateRandomEmail(): string {
  const prefix = 'magentotest+';
  const randomString = Math.random().toString(36).substring(2, 6); // Random legth from 2 to 10
  const domain = '@maildrop.cc';
  return `${prefix}${randomString}${domain}`;
}

export function getPhoneNumber() {
  let midPart = ''
  for (let i = 0; i < 7; i++) {
    midPart += Math.floor(Math.random() * 10)
  }
  return '050' + midPart
}

export const checkEmailSentToMailbox = async (
  userEmail: string,
  emailName: string
) => {
  const userName = userEmail.split('@')[0]
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(`https://maildrop.cc/inbox/?mailbox=${userName}`)
  await page.waitForLoadState('networkidle')
  const emailNameLoc = page.getByText(emailName).nth(0)
  await expect(emailNameLoc, 'Email is received by User mailbox').toBeVisible()

  await emailNameLoc.click()
  await page.getByRole('button', { name: 'Delete' }).click()
  await page.getByRole('button', { name: 'Yes, Delete' }).click()
  await browser.close()
}

export const waitingForResponse = async (requestURL: string, page: Page) => {
  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes(requestURL) && resp.status() === 200
    )
  ])
}
