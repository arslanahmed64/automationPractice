let registrationPage = require('../POM/AP_Registration');
let global = require('../POM/AP_Global');

describe('Register to Automation Practice', function () {
    it('Get Automation Practice & Open Registration Page', function () {
        browser.waitForAngularEnabled(false);
        global.getAP();
        registrationPage.enterEmail();
        registrationPage.clickCreate();
    });

    it('Enter Sign Up Details', function () {
       registrationPage.selectGender();
       registrationPage.fullName();
       registrationPage.verifyEmail();
       registrationPage.enterPassword();
       registrationPage.selectOptions();
       registrationPage.fillForm();
       registrationPage.submitAccount();
       registrationPage.signOutBtn();
    });
});