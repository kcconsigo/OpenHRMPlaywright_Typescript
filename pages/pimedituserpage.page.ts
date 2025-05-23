import { expect, type Locator, type Page } from '@playwright/test';
import { pimlocators } from "../weblocators/pimuserlocators";
export class PIMEditUserPage {
    readonly page: Page;
    readonly pimmenu: Locator
    readonly addempTab: Locator
    readonly EmpFirstName: Locator
    readonly EmpMidName: Locator
    readonly EmpLastName: Locator
    readonly EmpID: Locator
    readonly EditGender: Locator
    readonly EmpbuttonSave: Locator
    readonly EmpInfoSave: Locator
    readonly listEmployeeName: Locator
    readonly listEmployeeNameSelect: Locator
    readonly listEmpSearchbtn: Locator
    readonly editEmplistbtn: Locator
    readonly successfullyMsg: Locator

    constructor(page: Page) {
        this.page = page;
        this.successfullyMsg = page.getByText('Successfully Updated');
    }
    async editPimTab() {
        await this.page.locator(pimlocators.pimmenu).nth(1).click();
    }
    async employeeListlandingTab(editfirstName: string) {
        await this.page.locator(pimlocators.listEmployeeName).getByPlaceholder('Type for hints...')
            .nth(0)
            .fill(editfirstName);
        const Empnames: Locator = this.page.locator(pimlocators.listEmployeeNameSelect).getByRole('option', { name: editfirstName });
        await Empnames.waitFor({ state: 'visible' });
        for (let i = 0; i < await Empnames.count(); i++) {
            if (await Empnames.isVisible()) {
                await Empnames.nth(i).click();
                return Empnames;
            }
            return i;
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
    async addEmployeeDetails(editfirstName: string, editmiddleName: string, editlastName: string, editempID: string, editnationality: string, editmaritalstatus: string, editgender: string) {
        await this.page.locator(pimlocators.editEmplistbtn).nth(0).click();
        await this.page.locator(pimlocators.EmpFirstName).fill(editfirstName);
        await this.page.locator(pimlocators.EmpMidName).fill(editmiddleName);
        await this.page.locator(pimlocators.EmpLastName).fill(editlastName);
        await this.page.locator(pimlocators.EmpID).fill(editempID);
        await this.page.locator('.oxd-select-text').first().click();
        await this.page.getByRole('option', { name: editnationality }).click();
        await this.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        await this.page.getByRole('option', { name: editmaritalstatus }).click();
        await this.page.locator('div').filter({ hasText: /^Employee IdOther Id$/ }).getByRole('textbox').first().fill(editempID);
        await this.page.locator('div').filter({ hasText: editgender }).nth(2).click();
        await expect(async () => {
            await this.page.locator(pimlocators.EmpInfoSave).click({ timeout: 1000 });
        }).toPass();
        await expect(this.page.getByText('Successfully Updated')).toHaveText('Successfully Updated');
    }
}