import { expect, type Locator, type Page } from '@playwright/test';
import { adminlocators } from '../weblocators/adminuserlocators';

export class AdminUserPage {
  readonly page: Page;
  readonly adminmenu!: Locator;
  readonly empAddButton!: Locator;
  readonly userRoleSelectOptions!: Locator;
  readonly userStatus!: Locator;
  readonly userEmpName!: Locator;
  readonly userEmpNameSelect!: Locator;
  readonly username!: Locator;
  readonly password!: Locator;
  readonly comfirmPassword!: Locator;
  readonly submitBtbnSave!: Locator;
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
    this.successfullyEditInfoMsg = page.getByText('SuccessSuccessfully Updated');
    this.successfullyDeletedUser = page.getByText('SuccessSuccessfully Deleted');
    this.NorecordsFound = page.getByText('InfoNo Records Found');
  }
  async AdminTab() {
    await this.page.locator(adminlocators.adminmenu).nth(0).click();
    await this.page.locator(adminlocators.empAddButton).nth(2).click();
  }
  async selectUserRoleAndUserStatus() {
    await this.page.locator(adminlocators.userRoleSelectOptions).nth(0).click();
    await this.userRoleField.click();
    await this.page.locator(adminlocators.userStatus).nth(1).click();
    await this.userStatusField.click();
  }
  async createNewEmployeeInputTextFields(EmpName: string, UserName: string, Password: string, ConfirmPassword: string) {
    await this.page.locator(adminlocators.userEmpName).getByPlaceholder('Type for hints...').fill(EmpName);
    const EmpNameSelectList: Locator = this.page.locator(adminlocators.userEmpNameSelect).getByRole('option', { name: EmpName });
    for (let i = 0; i < await EmpNameSelectList.count(); ++i) {
      if (await EmpNameSelectList.isVisible()) {
        await EmpNameSelectList.nth(i).click();
        return EmpNameSelectList;
      }
      return i;
    }
    await this.page.locator(adminlocators.userEmpNameSelect).getByRole('option', { name: EmpName }).click()
    await this.page.locator(adminlocators.username).nth(1).fill(UserName);
    await this.page.locator(adminlocators.password).nth(2).fill(Password);
    await this.page.locator(adminlocators.comfirmPassword).nth(3).fill(ConfirmPassword);
  }
  async clickSavebtn() {
    await expect(async () => {
      await this.page.locator(adminlocators.submitBtbnSave).nth(0).click();
      await expect(this.page.getByText('Successfully Saved')).toHaveText('Successfully Saved');
    }).toPass();
  }
  async loadingSpinner() {
    await expect(async () => {
      const webLoadingSpinnerLocator = this.page.locator('.oxd-loading-spinner-container');
      await webLoadingSpinnerLocator.waitFor();
    }).toPass();

  }
}