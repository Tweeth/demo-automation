import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
import credsFile from '@test-data/creds.json'

const creds = process.env.ENV === 'staging' ? credsFile.staging : credsFile.prod

const config: PlaywrightTestConfig = {
  // Global setup to generate an authorized session
  globalSetup: require.resolve('./global-setup'),

  workers: 1,
  retries: 0,
  timeout: 60 * 1000,
  forbidOnly: false,
  outputDir: 'test-results/',
  reporter: [['html', { open: 'always', outputFolder: './test-report' }]],

  // Ignores serial notation; consider disabling this in case of flakiness
  fullyParallel: false,

  expect: {
    timeout: 15 * 1000,

    // Allowed screenshot difference; should be supervised to prevent false positives
    toHaveScreenshot: { maxDiffPixelRatio: 0.1 }
  },

  use: {
    actionTimeout: 15 * 1000,
    baseURL:
      process.env.ENV === 'staging'
        ? 'https://playwright.dev/docs/intro'
        : 'https://playwright.dev/docs/intro',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

    viewport: { height: 1600, width: 900 },

    httpCredentials: {
      username: creds.http_username,
      password: creds.http_password
    },

    storageState: 'test-data/storage-state.json'
  },

  projects: [
    {
      name: 'chrome',
      use: {
        headless: false,
        ...devices['Desktop Chrome']
      }
    }
  ]
}

export default config
