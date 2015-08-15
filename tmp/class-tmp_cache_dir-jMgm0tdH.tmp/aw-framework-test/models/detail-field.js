define('aw-framework-test/models/detail-field', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].Model.extend({
        type: DS['default'].attr('string'),
        title: DS['default'].attr('string'),
        field: DS['default'].attr('string')
    });

});