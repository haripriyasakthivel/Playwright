import { type Locator, type Page } from "@playwright/test";
export class Generateimagepage {
    readonly page: Page
    readonly promtBox: Locator
    readonly generateBtn: Locator
    readonly btnLabel: Locator


    constructor(page: Page) {
        this.page = page
        this.promtBox = page.getByRole('textbox')
        this.generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
        this.btnLabel = page.getByRole('button', { name: 'Generating...' })
    }

    async fillPrompt(input: string) {
        await this.promtBox.fill(input)
    }

    async clickOnGenerateBtn() {
        await this.generateBtn.click()
    }

    getGeneratingBtnLabel(): Locator {
        return this.btnLabel
    }

}