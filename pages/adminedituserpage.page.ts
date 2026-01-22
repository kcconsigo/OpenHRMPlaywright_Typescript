import { expect, type Locator, type Page } from '@playwright/test';
import { adminlocators } from '../weblocators/adminuserlocators';

export class AdminEditUserPage {
  readonly page: Page;
  readonly adminmenu!: Locator;
  readonly empAddButton!: Locator;
  readonly userRoleSelectOptions!: Locator;
  readonly userStatus!: Locator;
  readonly userEmpName!: Locator;
  readonly userEmpNameSelect!: Locator;
  readonly username!: Locator;
  readonly password!: Locator;
  readonly listEmpSearchbtn!: Locator;
  readonly listEmployeeNameSelect!: Locator;
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
    this.successfullyEditInfoMsg = page.getByText('SuccessSuccessfully Updated×');
    this.successfullyDeletedUser = page.getByText('SuccessSuccessfully Deleted×');
    this.NorecordsFound = page.getByText('InfoNo Records Found×');
  }
  async AdminTab() {
    await this.page.locator(adminlocators.adminmenu).nth(0).click();
  }
  async AdminUserListlandingTab(EditEmpName: string) {
    await this.page.locator(adminlocators.userEmpName).getByPlaceholder('Type for hints...')
    .nth(0)
    .fill(EditEmpName);
            const Empnames: Locator = this.page.locator(adminlocators.listEmployeeNameSelect).getByRole('option', { name: EditEmpName });
            await Empnames.waitFor({ state: 'visible' });
            for (let i = 0; i < await Empnames.count(); i++) {
                if (await Empnames.isVisible()) {
                    await Empnames.nth(i).click();
                    return Empnames;
                }
                return i;
            }
            await expect(async () => {
                await this.page.locator(adminlocators.listEmpSearchbtn).click({ timeout: 1000 });
            }).toPass();
                    await this.page.mouse.wheel(0, 100);
        await this.page.mouse.move(20, 40);
        await this.page.locator('.oxd-table-row > div').first().click();
        let rowList = await this.page.locator('.oxd-table-body > div.oxd-table-card').all();
        for (const admin of rowList) {
            console.log(await admin.textContent());
        }
  }
}