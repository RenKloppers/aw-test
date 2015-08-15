/* jshint ignore:start */

define('aw-framework-test/config/environment', ['ember'], function(Ember) {
  var prefix = 'aw-framework-test';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("aw-framework-test/tests/test-helper");
} else {
  require("aw-framework-test/app")["default"].create({"LOG_ACTIVE_GENERATION":false,"LOG_VIEW_LOOKUPS":false,"rootElement":"#ember-testing","name":"aw-framework-test","version":"0.0.0+f66b2353"});
}

/* jshint ignore:end */
