import { test, expect } from '@playwright/test';
import { LoginUserPage } from '../pages/loginuserpage.page';
import { AdminUserDashboardPage } from '../pages/adminuserdashboardpage.page';
import credentials from '../utils/credentials.json';


test(`should allow me to select Admin details ${credentials.validCredentials.username}, ${credentials.validCredentials.password}`,{tag: '@SanityTesting'}, async ({ page }) => {
  const loginuserpage = new LoginUserPage(page);
  await loginuserpage.gotoLogin();
  await loginuserpage.loginCredentials(credentials.validCredentials.username, credentials.validCredentials.password);
  await loginuserpage.loginBtn();
  const adminuserdashboardpage = new AdminUserDashboardPage(page);
  await adminuserdashboardpage.AdminTabPage();
  await adminuserdashboardpage.admindetailsRecords();
  await loginuserpage.logoutItemBtn();
  await loginuserpage.logoutBtn();
});