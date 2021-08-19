let global = require('../POM/BP_Global.js')

let methodsObjects = function (){

    let until = protractor.ExpectedConditions;
    let random = Math.random().toString(36).substring(2, 7);
    let methodsTab = element(by.xpath('/html/body/app-root/app-project/div/nav[2]/div[2]/div/div/a[2]'));
    let addMethodsBtn = element(by.className('btn-primary'));
    let methodName = element(by.id('method-name'));
    let saveMethod = element(by.className('btn-outline-success'));
    let methodDescription = element(by.id('method-description'));
    let methodFormula = element(by.id('method-basic-formula'));
    let editMethod = element(by.xpath('/html/body/app-root/app-project/div/div/app-methods/div/table/tbody/tr[5]/td[6]/i[1]'));
    let methodPopup = element(by.className('cdk-overlay-pane'));
    let methodsTable = element(by.className('table'));
    let deleteCreatedMethod = element(by.xpath('/html/body/app-root/app-project/div/div/app-methods/div/table/tbody/tr[5]/td[6]/i[2]'));
    let editUsedMethod = element(by.xpath('/html/body/app-root/app-project/div/div/app-methods/div/table/tbody/tr[1]/td[6]/i'));
    let firstMethod = element(by.xpath('/html/body/app-root/app-project/div/div/app-methods/div/table/tbody/tr[1]/td[6]/span'));
    let secondMethod = element(by.xpath('/html/body/app-root/app-project/div/div/app-methods/div/table/tbody/tr[2]/td[6]/span'));
    let resetScoreToaster = element(by.className('aui-message-success'));


     
    this.methodsTabClick = function(){
        browser.wait(until.visibilityOf(methodsTab), 10000, 'Methods Tab not visible');
        methodsTab.click();
    }

    this.clickAddMethods = function(){
        browser.wait(until.visibilityOf(addMethodsBtn), 10000, 'Methods Tab not visible');
        addMethodsBtn.click();
    }

    this.existingMethodName = function(){
        browser.wait(until.visibilityOf(methodName), 10000, 'Methods Tab not visible');
        methodName.sendKeys('ICE');
        methodName.clear();
    }

    this.saveMethod = function(){
        browser.sleep(1000);
        browser.wait(until.visibilityOf(saveMethod), 10000, 'Methods Tab not visible');
        browser.actions().mouseMove(saveMethod).perform();
        saveMethod.click();
    }

    this.verifyExistingAlert = function(){
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toContain("Method name already in use, please choose a different name");
        alertDialog.accept();
    }

    this.verifyBlankName = function(){
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toContain("Method name is mandatory");
        alertDialog.accept();
    }

    this.methodNameLength = function () {
        methodName.sendKeys('Add New Auto--Metric to Check 32 Ch');
       // expect(methodName.getAttribute('value')).toEqual('Add New Auto--Metric to Check 32');
        methodName.clear();
    }

    this.addValidMethodName = function (){
        browser.wait(until.visibilityOf(methodName), 10000, 'Methods Tab not visible');
        methodName.sendKeys("Valid Method Name - "+random)
    }

    this.addDescription = function (){
        browser.wait(until.visibilityOf(methodDescription), 10000, 'Methods Tab not visible');
        methodDescription.sendKeys(global.randomNumber(512));
    }
    
    this.invalidMethodFormula = function(){
        browser.wait(until.visibilityOf(methodFormula), 10000, 'Methods Tab not visible');
        methodFormula.sendKeys('${Business Value}<->${Business Value}');
    }

    this.verifyInvalidFormulaCheck = function(){
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toContain("please check method formula");
        alertDialog.accept();
    }

    this.emptyFormula = function(){
        methodFormula.clear();
    }

    this.correctFormula = function(){
        browser.wait(until.visibilityOf(methodFormula), 10000, 'Methods Tab not visible');
        methodFormula.sendKeys('${Business Value}+${Impact}');
    }

    this.editMethodBtn = function(){
        browser.wait(until.visibilityOf(editMethod), 10000, 'Methods Tab not visible');
        editMethod.click();
    }

    this.updateMethod = function(){
        browser.sleep(2000);
        browser.wait(until.visibilityOf(methodName), 10000, 'Methods Tab not visible');
        methodName.clear();
        methodName.sendKeys(' - Updated');
        methodDescription.clear();
        methodDescription.sendKeys('It is Updated');
        methodFormula.sendKeys(' - ${Impact}');
    }

    this.verifyMethodUpdated = function(){
        browser.wait(until.invisibilityOf(methodPopup), 10000, 'Methods Tab not visible');
        expect(methodsTable.getText()).toContain('Updated');
        expect(methodsTable.getText()).toContain('It is Updated');
    }

    this.acceptAlert = function(){
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog = browser.switchTo().alert();
        alertDialog.accept();
    }

    this.deleteMethod = function(){
        browser.wait(until.visibilityOf(deleteCreatedMethod), 10000, 'Delete button not visible');
        deleteCreatedMethod.click();
    }

    this.editUsedMethod = function(){
        browser.wait(until.visibilityOf(editUsedMethod), 10000, 'Edit Button not visible');
        editUsedMethod.click();
        browser.wait(until.visibilityOf(methodName), 10000, 'Methods Tab not visible');
        methodName.sendKeys(' - Updated');
    }


    this.firstMethodClick = function(){
        browser.wait(until.visibilityOf(firstMethod), 10000, 'First Method not visible');
        firstMethod.click();
    }

    this.secondMethodClick = function(){
        browser.wait(until.visibilityOf(secondMethod), 10000, 'Second Method not visible');
        secondMethod.click();
    }

    this.waitForSuccessMessage = function(){
        browser.wait(until.visibilityOf(resetScoreToaster), 10000, 'Reset Success Toaster not visible');
    }



}
module.exports = new methodsObjects();