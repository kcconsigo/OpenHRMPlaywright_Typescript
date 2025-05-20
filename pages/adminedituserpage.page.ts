import { expect, type Locator, type Page } from '@playwright/test';
import { adminlocators } from '../weblocators/adminuserlocators';



export class AdminEditUserPage {
  readonly page: Page;
  readonly adminmenu: Locator;
  readonly empAddButton: Locator;
  readonly userRoleSelectOptions: Locator;
  readonly userStatus: Locator;
  readonly userEmpName: Locator;
  readonly userEmpNameSelect: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly comfirmPassword: Locator;
  readonly submitBtbnSave: Locator;
  readonly userRoleField: Locator;
  readonly userStatusField: Locator;
  readonly successfullyMsg: Locator;
  readonly successfullyEditInfoMsg: Locator;
  readonly successfullyDeletedUser: Locator;
  readonly NorecordsFound: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userRoleField = page.getByRole('option', { name: 'Admin' });
    this.userStatusField = page.getByRole('option', { name: 'Enabled' });
    this.successfullyMsg = page.getByText('Successfully Saved');
    this.successfullyEditInfoMsg = page.getByText('SuccessSuccessfully Updated×');
    this.successfullyDeletedUser = page.getByText('SuccessSuccessfully Deleted×');
    this.NorecordsFound = page.getByText('InfoNo Records Found×');
  }
  async AdminTab() {
    await this.page.locator(adminlocators.adminmenu).nth(0).click();
  }
  async AdminUserListlandingTab(editfirstName: string) {
        
  }

}