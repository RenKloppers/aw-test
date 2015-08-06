import DS from 'ember-data';

export default DS.Model.extend({
    type: DS.attr('string'),
    title: DS.attr('string'),
    field: DS.attr('string')
});
