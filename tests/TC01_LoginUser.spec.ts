import { test, expect } from '@playwright/test';
import { LoginUserPage } from '../pages/loginuserpage.page';
import credentials from '../utils/credentials.json';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.google.com/');
});
test(`Admin should be allow to enter valid credentials ${credentials.validCredentials.username}, ${credentials.validCredentials.password},`, async ({ page }) => {
  const loginuserpage = new LoginUserPage(page);
  await loginuserpage.gotoLogin();
  await loginuserpage.loginCredentials(credentials.validCredentials.username, credentials.validCredentials.password);
  await loginuserpage.loginBtn();
  await loginuserpage.logoutItemBtn();
  await loginuserpage.logoutBtn();
});
test(`should not allow me to enter invalid credentials ${credentials.invalidCredentials.username}, ${credentials.invalidCredentials.password}`, async ({ page }) => {
  const loginuserpage = new LoginUserPage(page);
  await loginuserpage.gotoLogin();
  await loginuserpage.loginCredentials(credentials.invalidCredentials.username, credentials.invalidCredentials.password);
  await loginuserpage.loginBtn();
  await loginuserpage.verifyerr_msg();
});
export { expect } from '@playwright/test';