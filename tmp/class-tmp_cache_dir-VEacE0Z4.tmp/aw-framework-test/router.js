define('aw-framework-test/router', ['exports', 'ember', 'aw-framework-test/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('list');
    this.route('details');
  });

  exports['default'] = Router;

});