import Ember from 'ember';

/**
 * A helper method for creating FieldObject instances, linked to
 * a particular field and record.
 *
 * @method fieldObjectFactory
 * @param  {models/detail-field} fieldDef   The field definition record
 * @param  {DS.Model} record                The actual data record to display
 * @return {FieldObject}                    A `FieldObject` for the given field and record
 */
function fieldObjectFactory(fieldDef, record) {
  var recordFieldPath = 'record.' + fieldDef.get('field');

  /**
   * @class FieldObject
   */
  return Ember.Object.extend({
    /**
     * The `value` is a computed property returning the value
     * of this particular field from the `record`.
     * NB that the second dependent key is a variable, as it is
     * different for each fieldDef
     *
     * @property value
     */
    value: Ember.computed(['field', recordFieldPath], function () {
      return this.get(recordFieldPath);
    }),

    isNumeric: Ember.computed.equal('fieldDef.type', 'number'),
    isDate: Ember.computed.equal('fieldDef.type', 'date'),
    isBoolean: Ember.computed.equal('fieldDef.type', 'boolean'),
    isOption: Ember.computed.equal('fieldDef.type', 'option') //added isOption, to detect 'option' type

  }).create({
    /**
     * @property fieldDef
     * @type {models/detail-field}
     */
    fieldDef: fieldDef,
    /**
     * @property record
     * @type {DS.Model}
     */
    record: record
  });
}

/**
 * A component for displaying a data record as a list of fields,
 * driven by a `models/detail-field` record.
 *
 * @class components/render-fields
 * @extends {Ember.Component}
 */
export default Ember.Component.extend({
  /**
   * An array of `detail-field` records.
   * Should be passed in to component.
   *
   * @property fields
   * @type {Array[models/detail-field]}
   */
  fields: null,

  /**
   * The data record to display.
   * Should be passed in to component.
   *
   * @property record
   * @type {DS.Model}
   */
  record: null,

  /**
   * Whether the component is in currently in `edit` mode
   *
   * @property isEditing
   * @type {Boolean}
   */
  isEditing: false,

  tagName: 'dl',

  classNames: ['dl-horizontal'],

  /**
   * Computed property, mapping the `fields` to an array of extended `FieldObjects`
   *
   * @property fieldObjects
   * @type {Array[FieldObject]}
   */
  fieldObjects: Ember.computed('fields', function () {
    var fields = this.get('fields');
    var record = this.get('record');
    return fields.map(function (field) {
      return fieldObjectFactory(field, record);
    });
  }),

  //Added the Role "drop down" menu item data here, might be a better jobs for a controller and data in a model or server mocks
  selectedRole: null,
  roles: [{
    roleName: 'Tech Manager'
  }, {
    roleName: 'Product Owner'
  }, {
    roleName: 'Sales Manager'
  }, {
    roleName: 'HR Manager'
  }],

  actions: {
    edit: function edit() {
      this.set('isEditing', true);
    },
    save: function save() {
      this.set('isEditing', false);
      this.get('record').save();
    }
  }

});