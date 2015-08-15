import DS from 'ember-data';

export default DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    street: DS.attr('string'),
    city: DS.attr('string'),
    role: DS.attr('string'), //might need 'option' here?
    active: DS.attr('boolean')
});