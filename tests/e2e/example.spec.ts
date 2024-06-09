import { test, expect } from '@fixtures/authentication-fixture'
import {
  generateRandomEmail,
  getString
} from '@utils/generate-meths'
import routes from '@test-data/routes.json'
import creds from '@test-data/creds.json'
import text from '@test-data/text.json'

test('check successful account creation ', async ({ page, createAccountPage }) => {
  await createAccountPage.createAccount()
  await expect(page).toHaveURL(routes.profile.account)
});

test('check unsuccessful new customer account creation for email which was already in use', async ({ page, createAccountPage, headerPage }) => {
  const randomEmail = generateRandomEmail()
  await createAccountPage.createAccount(randomEmail)
  await headerPage.logOutFromAccount()
  await createAccountPage.createAccount(randomEmail)
  await expect(createAccountPage.emailUsedAlert).toBeVisible()
});

test('check successful sign in to existing account', async ({ page, createAccountPage, headerPage, signInPage }) => {
  const randomEmail = generateRandomEmail()
  await createAccountPage.createAccount(randomEmail)
  await headerPage.logOutFromAccount()
  await signInPage.signInToAccount(randomEmail, creds.password)
  await expect(page).toHaveURL(routes.profile.account)
});

test('check unsuccessful sign in to customer account with correct email and wrong password', async ({ page, createAccountPage, headerPage, signInPage }) => {
  const randomEmail = generateRandomEmail()
  const randomPassword = getString()
  await createAccountPage.createAccount(randomEmail)
  await headerPage.logOutFromAccount()
  await signInPage.signInToAccount(randomEmail, randomPassword)
  await expect(signInPage.wrongCredsAlert).toBeVisible()
});

test('сheck that correct Account Information data is displayed on the "My Account" page after account creation', async ({ page, createAccountPage, myAccountPage }) => {
  const randomEmail = generateRandomEmail()
  const randomFirstName = getString()
  const randomLastName = getString()
  await createAccountPage.createAccount(randomEmail, randomFirstName, randomLastName)

  await expect(myAccountPage.contactInformationBlock, 
    'Correct First name is displayed on the Contact Information block'
  ).toContainText(randomFirstName)
  await expect(myAccountPage.contactInformationBlock, 
    'Correct Last name is displayed on the Contact Information block'
  ).toContainText(randomLastName)
  await expect(myAccountPage.contactInformationBlock,
    'Correct Email is displayed on the Contact Information block'
  ).toContainText(randomEmail)
});
