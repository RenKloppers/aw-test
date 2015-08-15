define('aw-framework-test/components/render-fields', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  function fieldObjectFactory(fieldDef, record) {
    var recordFieldPath = 'record.' + fieldDef.get('field');

    /**
     * @class FieldObject
     */
    return Ember['default'].Object.extend({
      /**
       * The `value` is a computed property returning the value
       * of this particular field from the `record`.
       * NB that the second dependent key is a variable, as it is
       * different for each fieldDef
       *
       * @property value
       */
      value: Ember['default'].computed(['field', recordFieldPath], function () {
        return this.get(recordFieldPath);
      }),

      isNumeric: Ember['default'].computed.equal('fieldDef.type', 'number'),
      isDate: Ember['default'].computed.equal('fieldDef.type', 'date'),
      isBoolean: Ember['default'].computed.equal('fieldDef.type', 'boolean'),
      isOption: Ember['default'].computed.equal('fieldDef.type', 'option') //added isOption, to detect 'option' type

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
  exports['default'] = Ember['default'].Component.extend({
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
    fieldObjects: Ember['default'].computed('fields', function () {
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

});