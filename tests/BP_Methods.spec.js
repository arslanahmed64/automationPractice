let methods = require('../POM/BP_Methods.js');
let global = require('../POM/BP_Global.js');

describe('Methods-Test-Suite', function () {
    it('Go to BP Methods Tab', function () {
        browser.waitForAngularEnabled(false);
        global.getBP();
        global.switchIframe();
        methods.methodsTabClick();
        browser.sleep(2000);
    });

    it('Methods Add Cases - Validations', function () {
        browser.waitForAngularEnabled(false);
        methods.clickAddMethods();
        methods.saveMethod();
        methods.verifyBlankName();
        methods.existingMethodName();
        methods.saveMethod();
        methods.verifyExistingAlert();
        methods.methodNameLength();
        browser.sleep(2000);
    });

    it('Methods Add Cases', function () {
        browser.waitForAngularEnabled(false);
        methods.addValidMethodName();
        methods.addDescription();
        methods.invalidMethodFormula();
        methods.saveMethod();
        methods.verifyInvalidFormulaCheck();
        methods.emptyFormula();
        methods.saveMethod();
        methods.verifyInvalidFormulaCheck();
        methods.correctFormula();
        methods.saveMethod();
        browser.sleep(2000);
    });

    it('Not Used Methods Update Cases', function () {
        browser.waitForAngularEnabled(false);
        methods.editMethodBtn();
        methods.updateMethod();
        methods.saveMethod();
        methods.acceptAlert();
        methods.verifyMethodUpdated();
        methods.deleteMethod();
        methods.acceptAlert();
        browser.sleep(2000);
    });

    it('Used Methods Update Cases', function () {
        browser.waitForAngularEnabled(false);
        methods.editUsedMethod();
        methods.saveMethod();
        browser.sleep(10000);
    });
})