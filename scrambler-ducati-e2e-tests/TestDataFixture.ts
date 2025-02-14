import { test as baseTest } from "@playwright/test"
export { expect } from '@playwright/test'
type FixtureData = {
    promptvalue: any
    personaldetails: any

}

export const test = baseTest.extend<FixtureData>({
    promptvalue: ["Black and White Ducati", "Ducati in Forest look", "Woman riding a Ducati"],
    personaldetails: {
        fname: "Hari",
        lname: "Sakthivel",
        email: "hari.sakthivel+123@gmail.com",
        country: "Australia"
    }
})

