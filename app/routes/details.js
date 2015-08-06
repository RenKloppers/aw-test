import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        //fetch all of the detail-fields to drive the layout,
        //and the contact details to display
        return Ember.RSVP.hash({
            fields: this.store.findAll('detail-field'),
            //just load a single contact, hard-coded to id: 2
            //TODO: know it's just a test but will be nice to do something defferent with the initial value,
            //  maybe lets look at a random number generator with max value
            data: this.store.find('contact', '2')
        });
    }
});
