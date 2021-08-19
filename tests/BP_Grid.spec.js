let gridPage = require('../POM/BP_Grid');
let methods = require('../POM/BP_Methods.js');
let global = require('../POM/BP_Global.js');

describe('Grid-Test-Suite', function () {
    it('Go to BP Grid Tab', function () {
        browser.waitForAngularEnabled(false);
        global.getBP();
        global.switchIframe();
        browser.sleep(2000);
    });

    it('Select Different Filters', function () {
        browser.waitForAngularEnabled(false);
        gridPage.selectJQLFilter();
        gridPage.selectSavedFilter();
        gridPage.selectBasicFilter();
        browser.sleep(2000);
    });

    it('Basic Filter', function () {
        browser.waitForAngularEnabled(false);
        gridPage.searchBasic();
        gridPage.verifySearch();
        gridPage.selectJQLFilter();
        gridPage.jqlEditor();
        gridPage.switchJQLIframe();
        gridPage.jqlEditInput();
        gridPage.searchJqlEdit();
        gridPage.verifyAdvancedSearch();
        browser.sleep(2000);
    });

    it('Invalid JQL Search', function () {
        gridPage.invalidJqlEditInput();
        gridPage.searchJqlEdit();
        gridPage.verifyJQLErrorMessage();
    });

    it('Valid JQL Editor Search', function () {
        gridPage.jqlEditInput();
        gridPage.searchJqlEdit();
        gridPage.verifyAdvancedSearch();
        gridPage.clickUseJQLBtn();
        global.switchIframe();
        gridPage.verifySearch();
        gridPage.verifyJQLFilteredResults();
        browser.sleep(2000);
    });

    it('Saved Filters', function(){
        gridPage.selectSavedFilter();
        gridPage.searchWithSavedFilter();
        gridPage.selectBugs();
        gridPage.verifySavedFilterResults();
        gridPage.selectImpact();
        gridPage.selectConfidence();
        gridPage.selectEase();
        gridPage.getScoreVerify();
        browser.sleep(2000);
    });

    it('Reset Scores', function(){
        methods.methodsTabClick();
        methods.secondMethodClick();
        methods.acceptAlert();
        browser.switchTo().defaultContent();
        methods.waitForSuccessMessage();
        global.switchIframe();
        methods.firstMethodClick();
        methods.acceptAlert();
        browser.switchTo().defaultContent();
        methods.waitForSuccessMessage();
        global.switchIframe();
        browser.sleep(2000);
    })

});