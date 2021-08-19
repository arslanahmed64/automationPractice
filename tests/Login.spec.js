let loginpage = require('../POM/AP_Login');
let global = require('../POM/AP_Global');

describe('Login to Automation Practice', function () {
    it('Get Automation Practice & Login', function () {
        browser.waitForAngularEnabled(false);
        global.getAP();
        loginpage.Enter_Email();
        loginpage.Enter_Password();
        loginpage.submitLoginBtn();
        loginpage.rurl();
    });
});