import { test, expect } from '@playwright/test';
import { LoginUserPage } from '../pages/loginuserpage.page';
import { AdminUserPage } from '../pages/adminuserpage.page';
import credentials from '../utils/credentials.json';
import adminuser from '../utils/adminuser.json';

for (const admindetailspage of adminuser) {
    test(`should allow me to create Admin ${credentials.validCredentials.username}, ${credentials.validCredentials.password}, ${admindetailspage.EmpName}, ${admindetailspage.UserName},${admindetailspage.Password},${admindetailspage.ConfirmPassword}`, async ({ page }) => {
        const loginuserpage = new LoginUserPage(page);
        await loginuserpage.gotoLogin();
        await loginuserpage.loginCredentials(credentials.validCredentials.username, credentials.validCredentials.password);
        await loginuserpage.loginBtn();
        const adminuserpage = new AdminUserPage(page);
        await adminuserpage.AdminTab();
        await adminuserpage.selectUserRoleAndUserStatus();
        await adminuserpage.createNewEmployeeInputTextFields(admindetailspage.EmpName, admindetailspage.UserName, admindetailspage.Password, admindetailspage.ConfirmPassword);
        await adminuserpage.clickSavebtn();
        await loginuserpage.logoutItemBtn();
        await loginuserpage.logoutBtn();
    });
}
export { expect } from '@playwright/test';