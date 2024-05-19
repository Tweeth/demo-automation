# Automation testing boilerplate

This is a ready-to-go repository for setting up an automation testing for any project. It contains all the required depedencies: Playwright, Typescript, Prettier and Linters. It also has a preset project structure that we use in automation. By default it has 6 device projects and will run all the tests for each of them: Chromium (Chrome, Brave etc.) desktop, Gecko (Firefox etc.) desktop, WebKit (Safari etc.) desktop, iOS tablet, Android mobile & iOS mobile. You can tweak the projects in the global Playwright config or create more configs for different groups of tests.

## How to use boilerplate

1. Use `git clone <SSH creds>` to clone this project to your machine.
2. Run `npm install` to install all the required dependencies.
3. Add `creds.json` file to the `test-data` folder with a structure similar to this:

```
{
  "staging": {
    "http_username": "http_username",
    "http_password": "http_password",
    "email": "email",
    "password": "password"
  },  
  "prod": {
    "http_username": "http_username",
    "http_password": "http_password",
    "email": "email",
    "password": "password"
  }
}
```
These are credentials that will be used to pass HTTPAuth and to authorize in your project. Usually it is recommended to create a separate account for autotests that is not used manually.

4. Work with the repository, make your commits, then push them to your own repo.

## Available commands

List of preset commands is short and contains only basics:

- `npm run dbg [EMAIL="your@email"] [PASS="yourpassword"]` to debug autotests on staging (will run in headed mod for Chromium only);
- `npm run stg [EMAIL="your@email"] [PASS="yourpassword"]` to run autotests on staging;
- `npm run prd [EMAIL="your@email"] [PASS="yourpassword"]` to run autotests on production.

`EMAIL` and `PASS` parameters are optional and used to override default credentials. Credentials from `creds.json` will be used if no custom parameters were provided.

## Project structure

- `framework` folder is for anything related to automation framework: POM models, fixtures, utils and helpers;
  - `fixtures` folder for additional test fixtures;
  - `models` folder for POM models;
  - `utils` folder for all helper/API/data methods that are not part of POM models;
- `test-data` for any information that could be required for autotests;
  - `creds.json` file is for any sensitive information like emails, logins, passwords, tokens etc.; should be local and .gitignore'd;
  - `data.json` file is for any pieces of information that are used throughout the project: element sizes, dummy personal details etc.;
  - `routes.json` file is for storing URL paths, so that they could be re-used;
  - `text.json` file is for any text pieces for text matchers: button texts, headers, page names etc.;
- `test-report` folder would contain an auto-generated HTML report, all the data and traces required for it; should be local and .gitignore'd;
- `test-results` folder would contain screenshots, videos and pixel comparisons for all the failed tests (for successful tests data is wiped); should be local and .gitignore'd;
- `tests` folder is for tests themselves;
  - `e2e` folder is for end-to-end test scenarios;
  - `ui` folder is for screenshot comparison tests;
- `debug.config.ts` file should contain configuration for debugging test run;
- `global-setup.ts` file should contain all the code that is running before ALL the tests; usually it handles authorizing and passing cookies;
- `playwright.config.ts` file should contain global configuration; usually it also contains configuration for regular test run.
>>>>>>> 0245917 (Creating boilerplate)
