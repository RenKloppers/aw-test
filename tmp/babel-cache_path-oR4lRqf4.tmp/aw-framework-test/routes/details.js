import Ember from 'ember';

export default Ember.Route.extend({
    model: function model() {
        //fetch all of the detail-fields to drive the layout,
        //and the contact details to display
        return Ember.RSVP.hash({
            fields: this.store.findAll('detail-field'),
            //just load a single contact, hard-coded to id: 1
            data: this.store.find('contact', '2') //TODO fix hardcode initial value
        });
    }
});