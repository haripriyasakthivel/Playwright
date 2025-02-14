This automation file demonstrates the end-to-end automation flow for Text-to-Image Generation on the Scrambler website using Playwright with TypeScript.

**Framework details:**
1. image-generation.spec.ts is the main test spec file that contains all the validations for the end-to-end flow
2. Implemented the Page Object Model (POM) design pattern using page classes to isolate web elements for each web page from the test logic
3. Maintained test data separately in TestDataFixture.ts

**How to run:**
1. To run on the test on all 3 browsers (chrome/firefox/safari) on headed mode  ```  npx playwright test --headed   ```
2. To run the test on UI mode   ```npx playwright test --ui```

**Screenshot of Localrun report:**

![Screenshot 2025-02-14 at 9 32 00 PM](https://github.com/user-attachments/assets/a8bfa8cd-dea4-43ec-9264-5245457677f9)


**Screen recording of Localrun:**

[screen-capture.webm](https://github.com/user-attachments/assets/cacebe0b-bde2-4d90-a86d-9fda0e35a6dd)



