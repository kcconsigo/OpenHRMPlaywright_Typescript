import { expect, type Locator, type Page } from '@playwright/test';
import { pimlocators } from "../weblocators/pimuserlocators";

export class PIMDeleteUserPage {
    readonly page: Page;
    readonly deleteMsg: Locator

    constructor(page: Page) {
        this.page = page;
        this.deleteMsg = page.getByText('Successfully Deleted');     
    }
    async deletedPimTab() {
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
        await this.page.locator(pimlocators.deleteButton).nth(1).click();
        await this.page.locator(pimlocators.deleteYesButton).click();
        await expect(this.page.getByText('Successfully Deleted')).toBeVisible();        
    }
}
