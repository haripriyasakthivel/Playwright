import { type Locator, type Page } from "@playwright/test";
export class Imagegeneratedpage {
    readonly page: Page
    readonly progressMessage: Locator
    readonly generatedImage: string
    readonly imageHeading: Locator
    readonly personalDetailsHeading: Locator
    readonly firstname: Locator
    readonly lastname: Locator
    readonly email: Locator
    readonly country: Locator
    readonly privacyPolicy: Locator
    readonly submit: Locator
    readonly thankyouMessage: Locator
    readonly nextBtn: Locator


    constructor(page: Page) {
        this.page = page
        this.progressMessage = page.getByRole('heading', { name: 'Your Generation is in progress. It may take up to a minute.', exact: false })
        this.generatedImage = 'div button img[alt="generated image"]'
        this.imageHeading = page.getByRole('heading', { name: 'PICK YOUR FAVOURITE GENERATIONS' })
        this.personalDetailsHeading = page.getByRole('heading', { name: "Enter your details" })
        this.firstname = page.getByRole('textbox', { name: 'First Name' })
        this.lastname = page.getByRole('textbox', { name: 'Last Name' })
        this.email = page.getByRole('textbox', { name: 'Email' })
        this.country = page.locator('select[name="country"]:visible')
        this.privacyPolicy = page.locator('#privacy-policy-check:visible')
        this.submit = page.locator('button[type="submit"]:visible')
        this.thankyouMessage = page.getByRole('heading', { name: "Thank you!" })
        this.nextBtn = page.getByRole('button', { name: 'Next' })
    }

    getProgressState(): Locator {
        return this.progressMessage
    }

    async waitForGeneratedImage() {
        await this.page.waitForSelector(this.generatedImage, { state: 'visible' });
    }

    getImageHeading(): Locator {
        return this.imageHeading
    }

    getGeneratedImage(): Locator {
        return this.page.locator(`${this.generatedImage}:visible`)
    }

    getPersonalDetailsHeading(): Locator {
        return this.personalDetailsHeading
    }

    async enterFirstname(firstname: string) {
        await this.firstname.fill(firstname)

    }

    async enterLastname(lastname: string) {
        await this.lastname.fill(lastname)

    }

    async enterEmail(email) {
        await this.email.fill(email)

    }

    async selectCountry(country: string) {
        const element = this.country
        await element.selectOption(country)

    }

    async acceptPrivacyPolicy() {
        await this.privacyPolicy.check()
    }

    async clickOnsubmit() {
        await this.submit.click()
    }

    getThankyouMessage(): Locator {
        return this.thankyouMessage
    }

    async selectFirstGeneratedImage() {
        await this.page.locator(`${this.generatedImage}:visible`).first().click()
    }

    async clickOnNextBtn() {
        await this.nextBtn.click()
    }

}