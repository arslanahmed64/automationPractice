// configuration file.

var HtmlScreenshotReporter = require('../node_modules/protractor-html-reporter-2');
var jasmineReporters = require('../node_modules/jasmine-reporters');

var reportsDirectory = 'reports';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport';

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--start-maximized', '--user-data-dir=/Users/arslanahmed/Desktop/Chromepath'] 
      
    },
  },
    // 'browserName': 'firefox',
    // 'moz:firefoxOptions': {
    //   'args': ['--start-maximized']

    // }
    // multiCapabilities: [
    //   {
    //       shardTestFiles: false,
    //       maxInstances: 1,
    //       browserName: 'chrome',
    //       maxSessions: 1,
    //       'args': ['--start-maximized']
    //   },
    //   {
    //       shardTestFiles: false,
    //       maxInstances: 1,
    //       browserName: 'firefox',
    //       maxSessions: 1,
    //       'args': ['--start-maximized']
    //   }
    // ],
  
  onPrepare: function () {
    browser.driver.manage().window().maximize();

    //Reporting
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: reportsDirectory + '/xml',
      filePrefix: 'xmlOutput'
    }));

    var fs = require('../node_modules/fs-extra');
    if (!fs.existsSync(dashboardReportDirectory)) {
      fs.mkdirSync(dashboardReportDirectory);
    }

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

  },

  //Reporting
  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');
      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: dashboardReportDirectory,
        outputFilename: 'index',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
    });
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/Login.spec.js','../tests/BP_Metric.spec.js', '../tests/BP_Methods.spec.js', '../tests/BP_Grid.spec.js'],

  suites: {
    metric_test_suite: ['../tests/Login.spec.js','../tests/BP_Metric.spec.js'],
    methods_test_suite: ['../tests/Login.spec.js','../tests/BP_Methods.spec.js'],
    grid_test_suite: ['../tests/Login.spec.js','../tests/BP_Grid.spec.js'],
    login: '../tests/Login.spec.js'
  },

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000,
    includeStackTrace: true
  }

  //Reporting


};
