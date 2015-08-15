define('aw-framework-test/controllers/controller', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  /**
   * Created by Ren on 04/08/2015.
   */

  exports['default'] = Ember['default'].Controller.extend({

    selectedCountry: null,
    currentCities: null,
    countries: [{
      name: 'United States',
      cities: ['Chicago', 'Miami']
    }, {
      name: 'Brazil',
      cities: ['Sao Paulo', 'Rio de Janeiro']
    }],
    selectedCountryChanged: (function () {
      this.set('currentCities', this.get('selectedCountry.cities'));
    }).observes('selectedCountry')

  });

});