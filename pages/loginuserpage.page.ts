import { expect, type Locator, type Page } from '@playwright/test';

export class LoginUserPage {
    public readonly page: Page;
    public readonly userName: Locator;
    public readonly userPassword: Locator;
    public readonly loginButton: Locator;
    public readonly logoutItem: Locator;
    public readonly logoutButton: Locator;
    public readonly error_msg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.getByRole('textbox', { name: 'Username' });
        this.userPassword = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutItem = page.locator('.oxd-userdropdown');
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
        this.error_msg = page.getByRole('alert').locator('div').filter({ hasText: 'Invalid credentials' });
    }
    async gotoLogin() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
    async loginCredentials(username: string, password: string) {
        await this.userName.fill(username);
        await this.userPassword.fill(password);
    }
    async loginBtn() {
        await this.loginButton.click();
    }
    async logoutItemBtn() {
        await this.logoutItem.click({ timeout: 3000 });
    }
    async logoutBtn() {
        await this.logoutButton.click({ timeout: 3000 });
    }
    async verifyerr_msg() {
        return await expect(this.error_msg.getByText('Invalid credentials')).toBeVisible();
    }
}