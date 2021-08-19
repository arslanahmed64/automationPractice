let global = require('../POM/BP_Global.js')
let gridPage = function () {

    let until = protractor.ExpectedConditions;
    let filterType = element(by.className('search-type'));
    let jqlInput = element(by.xpath('/html/body/app-root/app-project/div/div/app-grid/div/div[1]/div/app-jql-filter/div/input'));
    let savedFiltersDropdown = element(by.className('saved-filters'));
    let basicFilters = element(by.className('input-group'));
    let issueTable = element(by.className('tableFixHead'));
    let basicSearchBtn = element(by.className('basic-search-btn'));
    let jqlEditorBtn = element(by.xpath('/html/body/app-root/app-project/div/div/app-grid/div/div[1]/div/app-jql-filter/div/button[2]'));
    let jqlEditorIframe = element(by.id('connect-app-jql-editor-frame-id'));
    let jqlEditorInput = element(by.id('advanced-search'));
    let jqlEditSearch = element(by.className('search-button'));
    let jqlEditTable = element(by.id('issuetable'));
    let jqlErrorMessage = element(by.className('aui-message error'));
    let useJQLToPrioritizeBtn = element(by.id('connect-app-jql-editor-submit-id'));
    let JQLEditorCancelBtn = element(by.id('connect-app-jql-editor-cancel-id'));
    let searchSavedFilter = element(by.className('saved-filters'));
    let savedFilterList = element(by.xpath('/html/body/app-root/app-project/div/div/app-grid/div/div[1]/div/app-saved-filter/div/ng-multiselect-dropdown/div/div[2]/ul[2]/li[1]'));
    let score = element(by.xpath('/html/body/app-root/app-project/div/div/app-grid/div/div[3]/div/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div[1]/div[4]'))


    //Score Objects
    let impactColumnSelect = element(by.xpath('/html/body/app-root/app-project/div/div/app-grid/div/div[3]/div/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div[1]/div[5]/app-label-cell/div/div/select'));
    let confidenceColumnSelect = element(by.xpath('/html/body/app-root/app-project/div/div/app-grid/div/div[3]/div/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div[1]/div[6]/app-label-cell/div/div/select'))
    let easeColumnSelect = element(by.xpath('/html/body/app-root/app-project/div/div/app-grid/div/div[3]/div/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div[1]/div[7]/app-label-cell/div/div/select'))

    this.selectJQLFilter = function () {
        browser.wait(until.visibilityOf(filterType), 10000, 'Select Filter not Visible');
        filterType.element(by.cssContainingText('option', 'JQL')).click();
        expect(filterType.getAttribute('value')).toEqual("jql");
        expect(jqlInput.isDisplayed()).toBe(true);
    }

    this.selectSavedFilter = function () {
        browser.wait(until.visibilityOf(filterType), 10000, 'Saved Filter not Visible');
        filterType.element(by.cssContainingText('option', 'Saved')).click();
        expect(filterType.getAttribute('value')).toEqual("filters");
        browser.wait(until.visibilityOf(savedFiltersDropdown), 10000, 'Saved Filters Option not visible');
        expect(savedFiltersDropdown.isDisplayed()).toBe(true);
    }

    this.selectBasicFilter = function () {
        browser.wait(until.visibilityOf(filterType), 10000, 'Saved Filter not Visible');
        filterType.element(by.cssContainingText('option', 'Basic')).click();
        expect(filterType.getAttribute('value')).toEqual("basic");
        browser.wait(until.visibilityOf(basicFilters), 10000, 'Basic Filters Option not visible');
        expect(basicFilters.isDisplayed()).toBe(true);
    }

    this.searchBasic = function () {
        expect(issueTable.isPresent()).toBe(false);
        browser.wait(until.visibilityOf(basicSearchBtn), 10000, 'Basic Search Button');
        basicSearchBtn.click();
    }

    this.verifySearch = function () {
        browser.wait(until.visibilityOf(issueTable), 10000, 'Issue Table not visible');
        expect(issueTable.isDisplayed()).toBe(true);
    }

    //Open JQL Filter Popup

    this.jqlEditor = function () {
        browser.wait(until.visibilityOf(jqlEditorBtn), 10000, 'JQL Editor button not visible');
        browser.wait(until.elementToBeClickable(jqlEditorBtn), 10000, 'JQL Editor button not Clickable');
        jqlEditorBtn.click();
    }
    this.switchJQLIframe = function () {
        browser.switchTo().defaultContent();
        browser.wait(until.visibilityOf(jqlEditorIframe), 10000, 'iframe Not Visible');
        browser.driver.switchTo().frame(jqlEditorIframe.getWebElement());
    }

    this.cancelJQLPopup = function () {
        browser.switchTo().defaultContent();
        browser.wait(until.visibilityOf(JQLEditorCancelBtn), 10000, 'JQL Editor button not visible');
        JQLEditorCancelBtn.click();
    }

    //Valid JQL Search

    this.jqlEditInput = function () {
        browser.wait(until.visibilityOf(jqlEditorInput), 10000, 'JQL Editor Input not visible');
        jqlEditorInput.clear();
        jqlEditorInput.sendKeys('type = bug AND summary ~ SSP-13');
    }

    this.searchJqlEdit = function () {
        browser.wait(until.visibilityOf(jqlEditSearch), 10000, 'JQL Editor Search not visible');
        jqlEditSearch.click();
    }

    this.verifyAdvancedSearch = function () {
        browser.wait(until.visibilityOf(jqlEditTable), 10000, 'JQL Table not visible');
        expect(jqlEditTable.getText()).toContain('SSP-13');
    }

    //Invalid JQL Search
    this.invalidJqlEditInput = function () {
        browser.wait(until.visibilityOf(jqlEditorInput), 10000, 'JQL Editor Input not visible');
        jqlEditorInput.clear();
        jqlEditorInput.sendKeys(' != Done');
    }

    this.verifyJQLErrorMessage = function () {
        browser.wait(until.visibilityOf(jqlErrorMessage), 10000, 'Error message not visible');
        expect(jqlErrorMessage.getText()).toContain('Error');
    }

    //USE JQL And Verify search working
    this.clickUseJQLBtn = function () {
        browser.switchTo().defaultContent();
        browser.wait(until.visibilityOf(useJQLToPrioritizeBtn), 10000, 'Use JQL Btn not visible');
        useJQLToPrioritizeBtn.click();
    }

    this.verifyJQLFilteredResults = function () {
        browser.wait(until.textToBePresentInElement(issueTable, 'SSP-13'), 5000);
        expect(issueTable.getText()).toContain('SSP-13');
    }


    //Saved Filters
    this.searchWithSavedFilter = function () {
        searchSavedFilter.click();
    }

    this.selectBugs = function () {
        savedFilterList.click();
    }

    this.verifySavedFilterResults = function () {
        browser.wait(until.textToBePresentInElement(issueTable, 'SSP-17'), 5000);
        expect(issueTable.getText()).toContain('SSP-17');
    }

    //Score Verification
    this.selectImpact = function () {
        browser.wait(until.visibilityOf(impactColumnSelect), 10000, 'Impact Dropdown not Visible');
        impactColumnSelect.element(by.cssContainingText('option', 'High')).click();
    }

    this.selectConfidence = function () {
        browser.wait(until.visibilityOf(confidenceColumnSelect), 10000, 'Impact Dropdown not Visible');
        confidenceColumnSelect.element(by.cssContainingText('option', 'Very Low')).click();
    }

    this.selectEase = function () {
        browser.wait(until.visibilityOf(easeColumnSelect), 10000, 'Impact Dropdown not Visible');
        easeColumnSelect.element(by.cssContainingText('option', 'Medium')).click();
    }

    this.getScoreVerify = function() {
        expect(score.getText()).toContain('128');
    }

}
//comment
module.exports = new gridPage();