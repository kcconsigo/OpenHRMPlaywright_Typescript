import { expect, type Locator, type Page } from '@playwright/test';
import { pimlocators } from "../weblocators/pimuserlocators";

export class PIMEditUserPage {
    readonly page: Page;
    readonly successfullyMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successfullyMsg = page.getByText('Successfully Updated');
    }
    async editPimTab() {
        await this.page.locator(pimlocators.pimmenu).nth(1).click();
    }
    async employeeListlandingTab(editfirstName: string) {
        await this.page.locator(pimlocators.listEmployeeName).nth(0).getByPlaceholder('Type for hints...')
            .nth(0)
            .fill(editfirstName);
        const Empnames: Locator = this.page.locator(pimlocators.listEmployeeNameSelect).getByRole('option', { name: editfirstName });
        await Empnames.waitFor({ state: 'visible' });
        for (let i = 0; i < await Empnames.count(); i++) {
            const empname = Empnames.nth(i);
            if (await empname.isVisible()) {
            await empname.nth(i).click();
            break;
            }
        }
        await this.page.locator(pimlocators.listEmpSearchbtn).click();
        await this.page.mouse.wheel(0, 100);
        await this.page.mouse.move(20, 40);

        await this.page.locator('.oxd-table-row > div').first().click();
        let rowList = await this.page.locator('.oxd-table-body > div.oxd-table-card').all();
        for (const admin of rowList) {
            console.log(await admin.textContent());
        }
    }
    async updatePersonalDetails(
        editfirstName: string, 
        editmiddleName: string, 
        editlastName: string, 
        editempID: number, 
        editnationality: string, 
        editmaritalstatus: string, 
        editgender: string,
        editdob: string
    ): Promise<void> {
        await this.page.locator(pimlocators.editEmplistbtn).nth(0).click();
        await this.page.locator(pimlocators.EmpFirstName).fill(editfirstName);
        await this.page.locator(pimlocators.EmpMidName).fill(editmiddleName);
        await this.page.locator(pimlocators.EmpLastName).fill(editlastName);
        await this.page.locator(pimlocators.EmpID).fill(String(editempID));
        await this.page.locator(pimlocators.nationalityDropdown).nth(0).click();
        await this.page.getByRole('option', { name: editnationality }).click();
        await this.page.locator(pimlocators.maritalDropdown).nth(1).click();
        await this.page.getByRole('option', { name: editmaritalstatus }).click();
        await this.page.locator('label').filter({ hasText: editgender }).nth(0).click();
        await this.page.getByPlaceholder('yyyy-dd-mm', { exact: true }).nth(1).fill(editdob);
        await expect(async () => {
            await this.page.locator(pimlocators.EmpInfoSave).click({ timeout: 1000 });
        }).toPass();
        await expect(this.page.getByText('Successfully Updated')).toBeVisible();
        await expect(async () => {
            const webLoadingSpinnerLocator = this.page.locator('.oxd-loading-spinner-container');
            await webLoadingSpinnerLocator.waitFor({ state: 'hidden', timeout: 60000 });
            }).toPass();
    }
}