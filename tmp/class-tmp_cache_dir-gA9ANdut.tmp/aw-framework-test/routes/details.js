define('aw-framework-test/routes/details', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {
            //fetch all of the detail-fields to drive the layout,
            //and the contact details to display
            return Ember['default'].RSVP.hash({
                fields: this.store.findAll('detail-field'),
                //just load a single contact, hard-coded to id: 1
                data: this.store.find('contact', '1')
            });
        }
    });

});