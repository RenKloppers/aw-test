import DS from 'ember-data';

//DS - Ember data name space
export default DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    street: DS.attr('string'),
    city: DS.attr('string'),
    role: DS.attr('string'),
    active: DS.attr('boolean')
});
