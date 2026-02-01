import { expect, type Locator, type Page } from '@playwright/test';

export class LoginUserPage {
    public readonly page: Page;
    public readonly userName: Locator;
    public readonly userPassword: Locator;
    public readonly loginButton: Locator;
    public readonly logoutItem: Locator;
    public readonly logoutButton: Locator;
    public readonly error_msg: Locator;
    public readonly error_group_msg1: Locator;
    public readonly error_group_msg2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.getByRole('textbox', { name: 'Username' });
        this.userPassword = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutItem = page.locator('.oxd-userdropdown');
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
        this.error_msg = page.getByRole('alert').locator('div').filter({ hasText: 'Invalid credentials' });
        this.error_group_msg1 = page.locator('.oxd-input-group__message').filter({ hasText: 'Required' }).first();
        this.error_group_msg2 = page.locator('.oxd-input-group__message').filter({ hasText: 'Required' }).last();
    }
    async gotoLogin() : Promise<void>{
        await this.page.goto(process.env.WEB_URL_QA || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await expect(this.page).toHaveURL(process.env.WEB_URL_QA || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
    async loginCredentials(
        username: string, 
        password: string
    ): Promise<void> {
        await this.userName.fill(username);
        await this.userPassword.fill(password);
    }
    async loginBtn(): Promise<void> {
        await this.loginButton.click();
    }
    async logoutItemBtn() : Promise<void>{
        await this.logoutItem.click({ timeout: 10000 });
    }
    async logoutBtn() : Promise<void>{
        await this.logoutButton.click();
    }
    async verifyErrorMessage(): Promise<string> {
        const errorMessage = this.error_msg.getByText('Invalid credentials');
        await expect(errorMessage).toBeVisible();
        return await errorMessage.textContent() || '';
    }
    async verifyErrorGroupMessage(): Promise<string> {
        const errorGroupMessage = this.error_group_msg1.getByText('Required', { exact: true });
        await expect(errorGroupMessage).toBeVisible();
        return await errorGroupMessage.textContent() || '';
    }
    async verifyErrorGroupMessage2(): Promise<string> {
        const errorGroupMessage = this.error_group_msg2.getByText('Required', { exact: true });
        await expect(errorGroupMessage).toBeVisible();
        return await errorGroupMessage.textContent() || '';
    }
}