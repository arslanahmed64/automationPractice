
let globalObjects = require('../POM/AP_Global')
let registrationPage = function () {

    let until = protractor.ExpectedConditions;
    let emailAddress = element(by.id("email_create"));
    let createBtn = element(by.id("SubmitCreate"));
    let registrationForm = element(by.id("account-creation_form"));
    let genderSelect = element.all(by.id('id_gender1'))
    let firstName = element(by.id("customer_firstname"));
    let lastName = element(by.id("customer_lastname"));
    let regEmail = element(by.id("email"));
    let regPassword = element(by.id("passwd"));
    let address = element(by.id("address1"));
    let city = element(by.id("city"));
    let postCode = element(by.id("postcode"));
    let mobilePhone = element(by.id("phone_mobile"));
    let submitAccount = element(by.id("submitAccount"));
    let welcomeMessage = element(by.xpath("/html/body/div/div[2]/div/div[3]/div/p"));
    let verifySignOutBtn = element(by.xpath("/html/body/div/div[1]/header/div[2]/div/div/nav/div[2]/a"));

    this.enterEmail = async () => {
        await emailAddress.sendKeys(globalObjects.email())
    }

    this.clickCreate = async () => {
        await browser.wait(until.elementToBeClickable(createBtn), 5000, "Create button not Clickable")
        await createBtn.click();
        await browser.wait(until.visibilityOf(registrationForm), 10000, "Registration form not visible")
    }

    this.selectGender = async () => {
        await genderSelect.first().click();
    }

    this.fullName = async () => {
        await firstName.sendKeys("John");
        await lastName.sendKeys("Doe");
    }

    this.verifyEmail = async () => {
        expect(regEmail.getAttribute('value')).toEqual(globalObjects.email());
    }

    this.enterPassword = async () => {
        await regPassword.sendKeys("admin1");
    }

    this.selectOptions = async () => {
        await element(by.cssContainingText('option', '5')).click();
        await element(by.cssContainingText('option', 'August')).click();
        await element(by.cssContainingText('option', '1990')).click();
        await element(by.cssContainingText('option', 'California')).click();
    }

    this.fillForm = async () => {

        await address.sendKeys("Street 1, Home 2, G9");
        await browser.actions().mouseMove(city).perform();
        await city.sendKeys("Islamabad");
        await browser.actions().mouseMove(postCode).perform();
        await postCode.sendKeys("51310");
        await browser.actions().mouseMove(mobilePhone).perform();
        await mobilePhone.sendKeys("923437676768");
    }

    this.submitAccount = async () => {
        await submitAccount.click();
        browser.wait(until.visibilityOf(welcomeMessage), 10000, "Welcome message not visible")
    }

    this.signOutBtn = async () => {
        expect(await verifySignOutBtn.getText()).toContain("Sign Out");
        await verifySignOutBtn.click();
    }

}
//comment
module.exports = new registrationPage();