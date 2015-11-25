define(function (require) {
  var Common = require('../../../support/pages/Common');
  var SettingsPage = require('../../../support/pages/SettingsPage');
  var expect = require('intern/dojo/node!expect.js');
  var Promise = require('bluebird');

  return function (bdd, scenarioManager) {
    bdd.describe('creating and deleting default index', function describeIndexTests() {
      var common;
      var settingsPage;
      var remote;

      bdd.before(function () {
        common = new Common(this.remote);
        settingsPage = new SettingsPage(this.remote);
        remote = this.remote;

        return scenarioManager.reload('emptyKibana')
        .then(function () {
          return settingsPage.navigateTo();
        });
      });

      bdd.describe('index pattern creation', function indexPatternCreation() {
        bdd.before(function () {
          return settingsPage.createIndexPattern();
        });

        bdd.it('should allow setting advanced settings', function () {
          return settingsPage.clickAdvancedTab()
          .then(function () {
            return settingsPage.setAdvancedSetting('dateFormat:tz', 'American/Phoenix');
            // expect(patternName).to.be('logstash-*');
          })
          .catch(common.handleError(this));
        });




      });
    });
  };
});