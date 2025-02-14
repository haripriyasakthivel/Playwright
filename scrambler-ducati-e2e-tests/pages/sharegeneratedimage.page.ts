import { type Locator, type Page } from "@playwright/test";
export class Sharegeneratedimagepage {
    readonly page: Page
    readonly downloadBtn: Locator


    constructor(page: Page) {
        this.page = page
        this.downloadBtn = page.getByRole('button', { name: 'Download' })
    }

    async clickOnDownloadBtn() {
        await this.downloadBtn.click()
    }
}


