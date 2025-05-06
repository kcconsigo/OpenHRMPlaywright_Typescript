import { expect, type Locator, type Page } from '@playwright/test';
import { pimlocators } from "../weblocators/pimuserlocators";


export class PIMUserPage {
    readonly page: Page;
    readonly pimmenu: Locator
    readonly addempTab: Locator
    readonly EmpFirstName: Locator
    readonly EmpMidName: Locator
    readonly EmpLastName: Locator
    readonly EmpID: Locator
    readonly EmpbuttonSave: Locator
    readonly EmpInfoSave: Locator
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
        await this.page.locator(pimlocators.EmpFirstName).fill(firstName);
        await this.page.locator(pimlocators.EmpMidName).fill(middleName);
        await this.page.locator(pimlocators.EmpLastName).fill(lastName);
        await this.page.locator(pimlocators.EmpID).fill(empID);
        await expect(async () => {
            await this.page.locator(pimlocators.EmpbuttonSave).click({ timeout: 1000 });
        }).toPass();
        // await expect(this.successfullyMsg).toBeVisible();
        await expect(this.page.getByText('Successfully Saved')).toHaveText('Successfully Saved');
        await this.page.getByText('-- Select --').first().click();
        await this.page.getByRole('option', { name: nationality }).click();
        await this.page.getByText('-- Select --').first().click();
        await this.page.getByRole('option', { name: maritalstatus }).click();
        await this.page.locator(pimlocators.EmpInfoSave).click();
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
    }
}
