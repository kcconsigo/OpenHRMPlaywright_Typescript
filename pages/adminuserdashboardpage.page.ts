import { expect, type Locator, type Page } from '@playwright/test';
import { admindashboardlocators } from '../weblocators/adminuserdetailslocators';

export class AdminUserDashboardPage {
    readonly page: Page;
    readonly adminmenu: Locator;

    constructor(page: Page) {
        this.page = page;
    }
    async AdminTabPage() {
        await this.page.locator(admindashboardlocators.adminmenu).nth(0).click();
    }
    async admindetailsRecords() {
        await this.page.mouse.wheel(0, 100);
        await this.page.mouse.move(20, 40);
        await this.page.locator('.oxd-table-row > div').first().click();
        let rowList = await this.page.locator('.oxd-table-body > div.oxd-table-card').all();
        for (const admin of rowList) {
            console.log(await admin.textContent());
        }
    }

}