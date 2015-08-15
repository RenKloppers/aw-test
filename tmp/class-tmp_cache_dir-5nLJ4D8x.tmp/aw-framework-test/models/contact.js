define('aw-framework-test/models/contact', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].Model.extend({
        firstName: DS['default'].attr('string'),
        lastName: DS['default'].attr('string'),
        street: DS['default'].attr('string'),
        city: DS['default'].attr('string'),
        role: DS['default'].attr('string'), //might need 'option' here?
        active: DS['default'].attr('boolean')
    });

});