define('aw-framework-test/tests/unit/models/detail-field-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('detail-field', 'Unit | Model | detail field', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    var store = this.store();
    assert.ok(!!model);
    assert.ok(!!store); // added store assert
  });

});