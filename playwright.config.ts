import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
import credsFile from '@test-data/creds.json'

//export const STORAGE_STATE = path.join(__dirname, 'test-data/storage-state.json');
//const creds = process.env.ENV === 'staging' ? credsFile.staging : credsFile.prod

const config: PlaywrightTestConfig = {
  workers: 3,
  retries: 0,
  timeout: 60 * 1000,
  forbidOnly: true,
  outputDir: 'test-results/',
  reporter: [
    ['html', { open: 'always', outputFolder: './test-report' }],
    ['allure-playwright']
],

  // Ignores serial notation; consider disabling this in case of flakiness
  fullyParallel: true,

  expect: {
    timeout: 15 * 1000,
    // Allowed screenshot difference; should be supervised to prevent false positives
    toHaveScreenshot: { maxDiffPixelRatio: 0.1 }
  },

  use: {
    actionTimeout: 15 * 1000,
    baseURL: 'https://magento.softwaretestingboard.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    headless: true,

    viewport: { height: 1600, width: 900 },
  },

  projects: [
    // {
    //   name: 'setup',
    //   testMatch: /global-setup\.ts/,
    //   teardown: 'teardown',
    // },
    // {
    //   name: 'teardown',
    //   testMatch: /global-teardown\.ts/,
    // },
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome']
      },
//      dependencies: ['setup'],
    }
  ]
}

export default config
