let loginpage = function () {

    let until = protractor.ExpectedConditions;
    let username = element(by.id('username'));
    let password = element(by.id('password'));
    let uContinuebtn = element(by.id('login-submit'));
    let redirecturl = 'https://start.atlassian.com';

    this.get = function (url) {
        browser.get(url);
    };
    this.Enter_Username = function (user) {
        browser.wait(until.visibilityOf(username), 20000, 'Username Field Not Visible');
        username.sendKeys(user);
    };
    this.Enter_Password = function (pass) {
        browser.wait(until.visibilityOf(password), 10000, 'Password Field Not Visible');
        password.sendKeys(pass);
    };
    this.usubmit = function () {
        browser.wait(until.visibilityOf(uContinuebtn), 10000, 'Continue btn Not Visible');
        uContinuebtn.click();
    };
    this.rurl = function () {
        browser.wait(until.urlContains(redirecturl), 30000, 'URL');
    };

};
module.exports = new loginpage();