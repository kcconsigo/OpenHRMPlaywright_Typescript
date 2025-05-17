import { test, expect } from '@playwright/test';
import { LoginUserPage } from '../pages/loginuserpage.page';
import { PIMDeleteUserPage } from '../pages/pimdeleteuserpage.page';
import credentials from '../utils/credentials.json';
import deletepim from '../utils/pimedituser.json';

for (const deletepimuser of deletepim){
test(`Admin should allow to delete pim users ${deletepimuser.editfirstName}`, async ({ page }) => {
    
    const loginuserpage = new LoginUserPage(page);
    await loginuserpage.gotoLogin();
    await loginuserpage.loginCredentials(credentials.validCredentials.username, credentials.validCredentials.password);
    await loginuserpage.loginBtn();
    await loginuserpage.logoutItemBtn();

    const pimdeleteuserpage = new PIMDeleteUserPage(page);
    await pimdeleteuserpage.deletedPimTab();
    await pimdeleteuserpage.employeeListlandingTab(deletepimuser.editfirstName);
    // await pimdeleteuserpage.deletePimEmpployees();
    await loginuserpage.logoutItemBtn();
    await loginuserpage.logoutBtn();
});
}
