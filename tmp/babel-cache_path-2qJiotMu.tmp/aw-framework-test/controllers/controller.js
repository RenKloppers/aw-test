/**
 * Created by Ren on 04/08/2015.
 */

import Ember from 'ember';

export default Ember.Controller.extend({

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