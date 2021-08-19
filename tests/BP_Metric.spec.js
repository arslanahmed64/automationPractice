let metric = require('../POM/BP_Metrics.js');
let global = require('../POM/BP_Global.js');

describe('Metric-Test-Suite', function () {
    it('Go to BP Metric Tab', function () {
        browser.waitForAngularEnabled(false);
        global.getBP();
        global.switchIframe();
        metric.clickMetricTab();
        browser.sleep(2000);
    });

    it('Add Metric - Star', function () {
        browser.waitForAngularEnabled(false);
        metric.createMetricBtn();
        metric.selectStarMetricAndName();
        metric.metricDescription();
        metric.saveMetric();
        browser.sleep(2000);
    });

    it('Add Metric - Number', function () {
        browser.waitForAngularEnabled(false);
        metric.createMetricBtn();
        metric.selectNumberMetricAndName();
        metric.metricDescription();
        metric.saveMetric();
        browser.sleep(2000);
    });

    it('Add Metric - Label', function () {
        browser.waitForAngularEnabled(false);
        metric.createMetricBtn();
        metric.selectLabelMetricAndName();
        metric.labelNames();
        metric.metricDescription();
        metric.saveMetric();
        browser.sleep(2000);
    });

    it('Add Metric - Number', function () {
        browser.waitForAngularEnabled(false);
        metric.createMetricBtn();
        metric.selectCheckboxMetricAndName();
        metric.metricDescription();
        metric.saveMetric();
        browser.sleep(2000);
    });

    it('Add Metric Popup - Validations', function () {
        browser.waitForAngularEnabled(false);
        metric.createMetricBtn();
        metric.verifyEmptyNameAlert();
        metric.metricNameLength();
        metric.duplicateMetricName();
        metric.metricRange();
        metric.minMaxDiff();
        metric.cancelMetricPopup();
        browser.sleep(5000);
    });

    it('Label Metric Popup - Validations', function () {
        browser.waitForAngularEnabled(false);
        metric.createMetricBtn();
        metric.selectLabelMetricAndName();
        metric.labelNameRequired();
        metric.OneLabelRequired();
        metric.cancelMetricPopup();
        metric.deleteMetrics();
        metric.usedMetric();
        browser.sleep(5000);
    });
});