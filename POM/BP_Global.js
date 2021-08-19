let globalObjects = function (){

    let until = protractor.ExpectedConditions;
    let iframe = element(by.tagName('iframe'));

    this.randomNumber = function (length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJK LMNOPQR STUVWXYZabc defgh ijklmnop qrstuvw xyz0123456789#$%^&*()_+';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

this.getBP = function () {
    browser.get('https://arslan-appboxdev1.atlassian.net/projects/SSP?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.appbox.ai.backlog.prioritization__backlog-prioritization-project');
}

this.switchIframe = function () {
    browser.wait(until.visibilityOf(iframe), 10000, 'iframe Not Visible');
    browser.driver.switchTo().frame(iframe.getWebElement());
}
}
//commenting this
module.exports = new globalObjects();
