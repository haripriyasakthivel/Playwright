import { test, expect } from './TestDataFixture'
import { Getstartedpage } from './pages/getstarted.page'
import { Generateimagepage } from './pages/generateimage.page'
import { Imagegeneratedpage } from './pages/imagegenerated.page'
import { Sharegeneratedimagepage } from './pages/sharegeneratedimage.page'

test.describe("Text to Image Generation Flow", () => {

    test('Verify generating Ducati images from the given text prompt', async ({ page, promptvalue, personaldetails }) => {
        test.setTimeout(60000) //setting timeout to max 1 minute for this particular test instead of updating the global timeout as the image generation will take around 1min time. 
        //Initialise all the pages class
        const getstartedpage = new Getstartedpage(page)
        const generateimagepage = new Generateimagepage(page)
        const imagegeneratedpage = new Imagegeneratedpage(page)
        const sharegeneratedimagepage = new Sharegeneratedimagepage(page)
        /*
        //Step1: Go to the site and start
        */
        //Go to the website
        await getstartedpage.gotoWebsite()
        //Verify expected page and title are loaded successfully
        await expect(page).toHaveURL(getstartedpage.getCurrentPageUrl())
        await expect(page).toHaveTitle("Scrambler Ducati meets Artificial Intelligence")
        //close the cookie popup if present
        await getstartedpage.closeCookiePopUp()
        //Click start to create button
        await getstartedpage.clickOnGetSarted()
        //Verify image generation page is loaded successfully
        await expect(page).toHaveURL(/.*create/)
        await expect(getstartedpage.getHeading()).toBeVisible()

        /*
        //Step2: Input prompt and start image generation
        */
        //Fill the prompt and click generate
        const random = Math.floor(Math.random() * promptvalue.length);
        await generateimagepage.fillPrompt(promptvalue[random])
        await generateimagepage.clickOnGenerateBtn()
        //Verify generation is in process 
        await expect(generateimagepage.getGeneratingBtnLabel()).toBeVisible()

        /*
        //Step3: Wait for the generated images to load and Fill in the personal details to share the generated image
        */
        //Wait for URL with create id
        await page.waitForURL(/\/create\/[a-f0-9-]{36}$/);
        await expect(imagegeneratedpage.getProgressState()).toBeVisible()
        //Wait for image generation and verify the images count
        await imagegeneratedpage.waitForGeneratedImage()
        await expect(imagegeneratedpage.getImageHeading()).toBeVisible()
        await expect(imagegeneratedpage.getGeneratedImage()).toHaveCount(4)
        //Submit the details to select the image
        await expect(imagegeneratedpage.getPersonalDetailsHeading()).toBeVisible()
        await imagegeneratedpage.enterFirstname(personaldetails.fname)
        await imagegeneratedpage.enterLastname(personaldetails.lname)
        await imagegeneratedpage.enterEmail(personaldetails.email)
        await imagegeneratedpage.selectCountry(personaldetails.country)
        await imagegeneratedpage.acceptPrivacyPolicy()
        await imagegeneratedpage.clickOnsubmit()
        //Select the first image and click next
        await expect(imagegeneratedpage.getThankyouMessage()).toBeVisible()
        await imagegeneratedpage.selectFirstGeneratedImage()
        await imagegeneratedpage.clickOnNextBtn()

        /*
        //Step4: Download/Share the generated image
        */
        await page.waitForURL(/\/create\/[a-f0-9-]{36}\/share\/[a-f0-9-]{36}$/);
        //Verify image is selected and download option is present
        await expect(page).toHaveURL(/\/create\/[a-f0-9-]{36}\/share\/[a-f0-9-]{36}$/)
        await expect(sharegeneratedimagepage.downloadBtn).toBeVisible()
        //Click on download
        await sharegeneratedimagepage.clickOnDownloadBtn()
        //Download button is not functioning to validate the image resolution 
        //Hence, Selecting the image element and checking its resolution
        const resolution = await page.evaluate(() => {
            const img = document.querySelector('img');
            return img ? { width: img.naturalWidth, height: img.naturalHeight } : null;
        });
        console.log(`Webpage image resolution: ${resolution?.width} x ${resolution?.height}`);
        expect(resolution?.width).toBe(2880)
        expect(resolution?.height).toBe(1620)
    })

})