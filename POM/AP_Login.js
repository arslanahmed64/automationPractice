let globalObjects = require('../POM/AP_Global')
let loginpage = function () {

    let until = protractor.ExpectedConditions;
    let email = element(by.id('email'));
    let password = element(by.id('passwd'));
    let submitLogin = element(by.id('SubmitLogin'));
    let redirecturl = "http://automationpractice.com/index.php"

    this.Enter_Email = async ()=> {
        browser.wait(until.visibilityOf(email), 20000, 'Email Field Not Visible');
        await username.sendKeys(globalObjects.email());
    };
    this.Enter_Password = async ()=> {
        browser.wait(until.visibilityOf(password), 10000, 'Password Field Not Visible');
        password.sendKeys("admin1");
    };
    this.submitLoginBtn = async ()=> {
        browser.wait(until.visibilityOf(submitLogin), 10000, 'Continue btn Not Visible');
        await submitLogin.click();
    };
    this.rurl = function () {
        browser.wait(until.urlContains(redirecturl), 30000, 'Redirect URL not same');
    };

};
module.exports = new loginpage();