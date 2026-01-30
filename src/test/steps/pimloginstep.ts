import { Given, When, Then } from "@cucumber/cucumber"
import { chromium, Browser, Page} from "@playwright/test";
import { LoginUserPage } from "../../../pages/loginuserpage.page";
import { PIMUserPage } from "../../../pages/pimuserpage.page";

let browser: Browser;
let page: Page;
let context: any;   

Given('I am on the login page using credentials', { timeout: 30 * 5000 }, async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    this.loginuserpage = new LoginUserPage(page);
        await this.loginuserpage.gotoLogin();
    });
When('I enter my {string} and {string} credentials', async function ( username: string, 
password: string ) {
    await this.loginuserpage.loginCredentials(username, password);
         });
When('I enter my {string} and {string} invalid credentials', async function ( username: string, 
password: string ) {
   await this.loginuserpage.loginCredentials(username, password);
    });
When('I enter my {string} and {string} empty fields', async function ( username: string, 
password: string ) {
    await this.loginuserpage.loginCredentials(username, password);
         });
When('I click the Login button', { timeout: 30 * 5000 }, async function () {
    await this.loginuserpage.loginBtn();
         });    
Then('I should be logged in', { timeout: 30 * 5000 }, async function () {
    const pimuserpage = new PIMUserPage(page);
    await pimuserpage.PimTab();
    await this.loginuserpage.logoutItemBtn();
    await this.loginuserpage.logoutBtn();
    await browser.close();
         });
Then('I should not be login and see {string} error message for invalid credentials', { timeout: 30 * 5000 }, async function (expectedMessage: string) {

    const actualErrorMessage = await this.loginuserpage.verifyErrorMessage();
    if (actualErrorMessage !== expectedMessage) {
        throw new Error(`Expected error message: ${expectedMessage}, but got: ${actualErrorMessage}`);
    }
    await browser.close();

    });

Then('I should not be login and see {string} error message for empty fields', { timeout: 30 * 5000 }, async function (expectedMessage: string) {

    const actualErrorGroupMessage = await this.loginuserpage.verifyErrorGroupMessage();
    if (actualErrorGroupMessage !== expectedMessage) {
        throw new Error(`Expected error group message: ${expectedMessage}, but got: ${actualErrorGroupMessage}`);
    }
    await browser.close();

    });        
