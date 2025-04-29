import { test, expect } from '@playwright/test';
import { LoginUserPage } from '../pages/loginuserpage.page';
import { PIMUserPage } from '../pages/pimuserpage.page';
import credentials from '../utils/credentials.json';
import pimdetails from '../utils/pimuser.json';

for (const pimdetailspage of pimdetails) {
  test(`Admin should allow me to create Pim Employees ${credentials.validCredentials.username},${credentials.validCredentials.password}, ${pimdetailspage.firstName}, ${pimdetailspage.middleName}, ${pimdetailspage.lastName}, ${pimdetailspage.empID},${pimdetailspage.nationality[2]}, ${pimdetailspage.maritalstatus[1]},`, { tag: '@SmokeTesting' }, async ({ page }) => {
    const loginuserpage = new LoginUserPage(page);
    await loginuserpage.gotoLogin();
    await loginuserpage.loginCredentials(credentials.validCredentials.username, credentials.validCredentials.password);
    await loginuserpage.loginBtn();

    const pimuserpage = new PIMUserPage(page);
    await pimuserpage.PimTab();
    await pimuserpage.addEmpTab();
    await pimuserpage.addEmployeeDetails(pimdetailspage.firstName, pimdetailspage.middleName, pimdetailspage.lastName, pimdetailspage.empID, pimdetailspage.nationality[2], pimdetailspage.maritalstatus[1]);
    await pimuserpage.employeeListlandingTab(pimdetailspage.firstName);
    await loginuserpage.logoutItemBtn();
    await loginuserpage.logoutBtn();
  });
}
export { expect } from '@playwright/test';

