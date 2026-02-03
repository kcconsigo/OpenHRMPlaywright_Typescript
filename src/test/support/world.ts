// src/test/support/world.ts
import { setWorldConstructor } from '@cucumber/cucumber';
import { Page, Browser } from '@playwright/test';

export class CustomWorld {
  page!: Page;
  browser!: Browser;
}

setWorldConstructor(CustomWorld);