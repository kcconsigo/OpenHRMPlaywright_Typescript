import { expect, type Locator, type Page } from '@playwright/test';
import { pimlocators } from "../weblocators/pimuserlocators";


export class PIMUserPage {
    readonly page: Page;
    readonly successfullyMsg: Locator

    constructor(page: Page) {
        this.page = page;
        this.successfullyMsg = page.getByText('Successfully Saved');
    }
    async PimTab() {
        await this.page.locator(pimlocators.pimmenu).nth(1).click();
    }
    async addEmpTab() {
        await this.page.locator(pimlocators.addempTab).nth(2).click();
    }
    async addEmployeeDetails(
        firstName: string,
        middleName: string, 
        lastName: string, 
        empID: number, 
        nationality: string, 
        maritalstatus: string
    ): Promise<void> {
        await this.page.locator(pimlocators.EmpFirstName).fill(firstName);
        await this.page.locator(pimlocators.EmpMidName).fill(middleName);
        await this.page.locator(pimlocators.EmpLastName).fill(lastName);
        await this.page.locator(pimlocators.EmpID).fill(String(empID));
        await this.page.locator(pimlocators.EmpbuttonSave).click();
        await expect(this.successfullyMsg.getByText('Successfully Saved')).toBeVisible();
    }
    async employeeListlandingTab(firstName: string) {
        await this.page.locator(pimlocators.pimmenu).nth(1).click();
        await this.page.locator(pimlocators.listEmpNavTab).nth(1).click();
        await this.page.locator(pimlocators.listEmployeeName).nth(0).getByPlaceholder('Type for hints...')
            .nth(0)
            .fill(firstName);
        const Empnames: Locator = this.page.locator(pimlocators.listEmployeeNameSelect).getByRole('option', { name: firstName });
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
}
