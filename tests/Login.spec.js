let loginpage = require('../POM/JiraLogin_Objects');

describe('Login to Jira', function () {
    it('Go to Login URL', function () {
        browser.waitForAngularEnabled(false);
        loginpage.get('https://id.atlassian.com/login');
        loginpage.Enter_Username('arslandev@yopmail.com');
        loginpage.usubmit();
        loginpage.Enter_Password('admin123');
        loginpage.usubmit();
        loginpage.rurl();
    });
});