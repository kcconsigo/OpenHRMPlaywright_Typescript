import { expect, type Locator, type Page } from '@playwright/test';
import { pimlocators } from "../weblocators/pimuserlocators";


export class PIMUserPage {
    readonly page: Page;
    readonly pimmenu: Locator
    readonly addempTab: Locator
    readonly addEmpFirstName: Locator
    readonly addEmpMidName: Locator
    readonly addEmpLastName: Locator
    readonly addEmpID: Locator
    readonly addEmpbuttonSave: Locator
    readonly addEmpNationalityField: Locator
    readonly addEmpMaritalStatusField: Locator
    readonly addEmpInfoSave: Locator
    readonly listEmpNavTab: Locator
    readonly listEmployeeName: Locator
    readonly listEmployeeNameSelect: Locator
    readonly listEmpSearchbtn: Locator
    readonly editEmplistbtn: Locator
    readonly successfullyMsg: Locator

    constructor(page: Page) {
        this.page = page;
        this.successfullyMsg = page.getByText('SuccessSuccessfully Saved×');
    }
    async PimTab() {
        await this.page.locator(pimlocators.pimmenu).nth(1).click();
    }
    async addEmpTab() {
        await this.page.locator(pimlocators.addempTab).nth(2).click();
    }
    async addEmployeeDetails(firstName: string, middleName: string, lastName: string, empID: string, nationality: string, maritalstatus: string) {
        await this.page.locator(pimlocators.addEmpFirstName).fill(firstName);
        await this.page.locator(pimlocators.addEmpMidName).fill(middleName);
        await this.page.locator(pimlocators.addEmpLastName).fill(lastName);
        await this.page.locator(pimlocators.addEmpID).nth(4).fill(empID);
        await expect(async () => {
            await this.page.locator(pimlocators.addEmpbuttonSave).click({ timeout: 1000 });
        }).toPass();
        await expect(this.successfullyMsg).toBeVisible();
        await this.page.locator(pimlocators.addEmpNationalityField).nth(0).click();
        await this.page.getByRole('option', { name: nationality }).click();
        await this.page.locator(pimlocators.addEmpMaritalStatusField).nth(1).click();
        await this.page.getByRole('option', { name: maritalstatus }).click();
        await this.page.locator(pimlocators.addEmpInfoSave).nth(1).click();
    }
    async employeeListlandingTab(firstName: string) {
        await this.page.locator(pimlocators.pimmenu).nth(1).click();
        await this.page.locator(pimlocators.listEmpNavTab).nth(1).click();
        await this.page.locator(pimlocators.listEmployeeName).getByPlaceholder('Type for hints...')
            .nth(0)
            .fill(firstName);
        const Empnames: Locator = this.page.locator(pimlocators.listEmployeeNameSelect).getByRole('option', { name: firstName });
        for (let i = 0; i < await Empnames.count(); i++) {
            if (await Empnames.isVisible()) {
                await Empnames.nth(i).click();
                return Empnames;
            }
            return i;
        }
        await this.page.locator(pimlocators.listEmpSearchbtn).click();
        await this.page.locator(pimlocators.editEmplistbtn).nth(3).click();
    }

}
