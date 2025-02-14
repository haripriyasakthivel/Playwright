import { type Locator, type Page } from "@playwright/test";
export class Getstartedpage {
    readonly page: Page
    readonly getStartedBtn: Locator
    readonly closeCookieBtn: Locator
    readonly heading: Locator


    constructor(page: Page) {
        this.page = page
        this.getStartedBtn = page.getByRole('link', { name: 'Start to create' })
        this.closeCookieBtn = page.getByRole('button', { name: 'Close' })
        this.heading = page.getByRole('heading', { name: 'CREATE YOUR CUSTOM SCRAMBLER DUCATI' })
    }

    async gotoWebsite() {
        await this.page.goto('https://hacktheicon.scramblerducati.com/')
    }

    async closeCookiePopUp() {
        if (await this.closeCookieBtn) {
            await this.closeCookieBtn.click()
        }
    }

    async clickOnGetSarted() {
        await this.getStartedBtn.click()
    }

    getHeading(): Locator {
        return this.heading
    }

    getCurrentPageUrl(): string {
        return this.page.url()
    }
}