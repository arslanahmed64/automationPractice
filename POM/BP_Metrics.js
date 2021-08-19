let metricObjects = function () {

    let until = protractor.ExpectedConditions;
    let random = Math.random().toString(36).substring(2, 7);
    let random2 = Math.random().toString(36).substring(2, 7);
    let metricTab = element(by.xpath('/html/body/app-root/app-project/div/nav[2]/div[2]/div/div/a[3]'));
    let metricSearch = element(by.name('search'));
    let createMetric = element(by.className('btn-primary'));
    let metricName = element(by.id('metric-name'));
    let metricType = element(by.id('metric-type'));
    let metricSave = element(by.className('btn-outline-success'));
    let metricCancel = element(by.className('btn-outline-secondary'));
    let newMetricPop = element(by.className('cdk-overlay-pane'));
    let metricDescription = element(by.id('metric-description'));
    let bodyElement = element(by.xpath('/html/body'));
    let labelName = element(by.xpath('/html/body/div[2]/div[2]/div/mat-dialog-container/app-metric/div[1]/form/div[2]/div/table/tbody/tr/td[2]/input'));
    let labelName1 = element(by.xpath('/html/body/div[2]/div[2]/div/mat-dialog-container/app-metric/div[1]/form/div[2]/div/table/tbody/tr[2]/td[2]/input'));
    let addNewLabel = element(by.className('btn-outline-primary'));
    let metricNumberMin = element(by.id('metric-number-min'));
    let metricNumberMax = element(by.id('metric-number-max'));
    let deleteLabel = element(by.xpath('/html/body/div[2]/div[2]/div/mat-dialog-container/app-metric/div[1]/form/div[2]/div/table/tbody/tr/td[4]/i'));
    let deleteMetric = element(by.xpath('/html/body/app-root/app-project/div/div/app-metrics/div/table/tbody/tr[10]/td[6]/i[2]'));
    let usedMetric = element(by.xpath('/html/body/app-root/app-project/div/div/app-metrics/div/table/tbody/tr[1]/td[6]/i[2]'));



    

    this.clickMetricTab = function () {
        browser.wait(until.visibilityOf(metricTab), 10000, 'iframe Not Visible');
        metricTab.click();
    }

    this.metricSearch = function () {
        browser.wait(until.visibilityOf(metricSearch), 10000, 'Metric Search Box not visible');
        metricSearch.sendKeys('Impact');
        metricSearch.clear();
    }

    this.createMetricBtn = function () {
        browser.wait(until.visibilityOf(createMetric), 10000, 'Metric Button not visible');
        createMetric.click();
    }

    //Metric Names and Types
    this.selectStarMetricAndName = function () {
        browser.wait(until.visibilityOf(metricName), 10000, 'Metric Name field not visible');
        metricName.sendKeys("Star Metric " + random);
        metricType.element(by.cssContainingText('option', 'Star')).click();
        expect(metricType.getAttribute('value')).toEqual("2: Object");
    }

    this.selectNumberMetricAndName = function () {
        browser.wait(until.visibilityOf(metricName), 10000, 'Metric Name field not visible');
        metricName.sendKeys("Number Metric " + random);
        metricType.element(by.cssContainingText('option', 'Number')).click();
        expect(metricType.getAttribute('value')).toEqual("0: Object");
    }

    this.selectLabelMetricAndName = function () {
        browser.wait(until.visibilityOf(metricName), 10000, 'Metric Name field not visible');
        metricName.sendKeys("Label Metric " + random);
        metricType.element(by.cssContainingText('option', 'Label')).click();
        expect(metricType.getAttribute('value')).toEqual("1: Object");
    }

    this.labelNames = function () {
        labelName.sendKeys('Label 1');
        addNewLabel.click();
        labelName1.sendKeys('Label 1');
    }

    this.selectCheckboxMetricAndName = function () {
        browser.wait(until.visibilityOf(metricName), 10000, 'Metric Name field not visible');
        metricName.sendKeys("Checkbox Metric " + random);
        metricType.element(by.cssContainingText('option', 'Checkbox')).click();
        expect(metricType.getAttribute('value')).toEqual("3: Object");
    }

    this.metricDescription = function () {
        metricDescription.sendKeys('This is metric description for this particular metric')
    }

    this.saveMetric = function () {
        browser.sleep(5000);
        browser.wait(until.elementToBeClickable(metricSave), 10000, 'Metric Save Button not Visible');
        metricSave.click();
        browser.wait(until.invisibilityOf(newMetricPop), 10000, 'Popup Still Visible');
        expect(bodyElement.getText()).toContain(random);
    }

    this.verifyEmptyNameAlert = function () {
        browser.sleep(2000);
        metricSave.click();
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog1 = browser.switchTo().alert();
        expect(alertDialog1.getText()).toContain("Metric name is required");
        alertDialog1.accept();
    }

    this.metricNameLength = function () {
        metricName.sendKeys('Add New Auto--Metric to Check 32 Ch');
        expect(metricName.getAttribute('value')).toEqual('Add New Auto--Metric to Check 32');
        metricName.clear();
    }

    this.duplicateMetricName = function () {
        metricName.sendKeys('Impact');
        metricSave.click();
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog2 = browser.switchTo().alert();
        expect(alertDialog2.getText()).toContain("Metric name already in use, please choose a different name");
        alertDialog2.accept();
        metricName.clear();
    }

    this.metricRange = function () {
        metricName.sendKeys('Validation ' + random);
        metricNumberMin.sendKeys('1000');
        metricSave.click();
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog2 = browser.switchTo().alert();
        expect(alertDialog2.getText()).toContain("Min and Max should be between -999 and 999");
        alertDialog2.accept();
        metricNumberMin.clear();
        metricNumberMin.sendKeys('10');

        metricName.sendKeys('Validation ' + random);
        metricNumberMax.sendKeys('1000');
        metricSave.click();
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog3 = browser.switchTo().alert();
        expect(alertDialog3.getText()).toContain("Min and Max should be between -999 and 999");
        alertDialog3.accept();
        metricNumberMax.clear();
        metricNumberMax.sendKeys('1');
    }

    this.minMaxDiff = function () {
        metricSave.click();
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog4 = browser.switchTo().alert();
        expect(alertDialog4.getText()).toContain("Minimum value cannot be more than Maximum");
        alertDialog4.accept();
    }

    this.cancelMetricPopup = function () {
        metricCancel.click();
        browser.wait(until.invisibilityOf(newMetricPop), 10000, 'Popup Still Visible');
    }

    this.labelNameRequired = function (){
        browser.sleep(2000);
        metricName.clear();
        metricName.sendKeys(random2);
        metricSave.click();
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog5 = browser.switchTo().alert();
        expect(alertDialog5.getText()).toContain("Label is required");
        alertDialog5.accept();
    }

    this.OneLabelRequired = function (){
        deleteLabel.click();
        metricSave.click();
        browser.wait(until.alertIsPresent(), 5000);
        let alertDialog5 = browser.switchTo().alert();
        expect(alertDialog5.getText()).toContain("At least 1 label is required");
        alertDialog5.accept();
    }

    this.deleteMetrics = function (){
        for(let i=0; i<=3; i++){
            browser.wait(until.elementToBeClickable(deleteMetric), 10000, 'Delete Button not Visible');
            deleteMetric.click();
            let alertDialog6 = browser.switchTo().alert();
            alertDialog6.accept();
        }
    }

    this.usedMetric = function (){
        browser.wait(until.elementToBeClickable(usedMetric), 10000, 'Used Metric Delete Button not Visible');
        usedMetric.click();
        let alertDialog7 = browser.switchTo().alert();
        expect(alertDialog7.getText()).toContain("Cannot delete");
        alertDialog7.accept();
    }
}

module.exports = new metricObjects();