define('aw-framework-test/routes/details', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {
            //fetch all of the detail-fields to drive the layout,
            //and the contact details to display
            return Ember['default'].RSVP.hash({
                fields: this.store.findAll('detail-field'),
                //just load a single contact, hard-coded to id: 2
                //TODO: know it's just a test but will be nice to do something defferent with the initial value,
                //  maybe lets look at a random number generator with max value
                data: this.store.find('contact', '2')
            });
        }
    });

});