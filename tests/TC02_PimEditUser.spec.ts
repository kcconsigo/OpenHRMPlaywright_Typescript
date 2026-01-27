import { test, expect } from '@playwright/test';
import { LoginUserPage } from '../pages/loginuserpage.page';
import { PIMEditUserPage } from '../pages/pimedituserpage.page';
import credentials from '../utils/credentials.json';
import editpim from '../utils/pimedituser.json';

for (const editpimdettails of editpim){
test(`Admin should allow to edit pim users details ${editpimdettails.editfirstName}, ${editpimdettails.editmiddleName}, ${editpimdettails.editlastName}, ${editpimdettails.editempID},${editpimdettails.editnationality[1]}, ${editpimdettails.editmaritalstatus[0]},${editpimdettails.editgender[0]},`,{tag: '@SmokeTesting'}, async ({ page }) =>{
    const loginuserpage = new LoginUserPage(page);
    await loginuserpage.gotoLogin();
    await loginuserpage.loginCredentials(credentials.validCredentials.username, credentials.validCredentials.password);
    await loginuserpage.loginBtn();
    await loginuserpage.logoutItemBtn();

    const pimedituserpage = new PIMEditUserPage(page);
    await pimedituserpage.editPimTab();
    await pimedituserpage.employeeListlandingTab(editpimdettails.editusername);
    await pimedituserpage.searchButtonClick();
    await pimedituserpage.clickCheckboxButton();
    await pimedituserpage.updatePersonalDetails(editpimdettails.editfirstName, editpimdettails.editmiddleName, editpimdettails.editlastName, editpimdettails.editempID, editpimdettails.editnationality[1], editpimdettails.editmaritalstatus[0],editpimdettails.editgender[0],editpimdettails.editdob[0]);
    await pimedituserpage.clickSaveButton();
    await loginuserpage.logoutItemBtn();
    await loginuserpage.logoutBtn();
});
}