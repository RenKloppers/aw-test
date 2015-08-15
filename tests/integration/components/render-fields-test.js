import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';


moduleForComponent('render-fields', 'Integration | Component | render fields', {
    integration: true
});

function createFields(...fields) {
    return fields.map(field => Ember.Object.create(field));
}

test('it renders the title', function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('fields', createFields({
        title: 'Field One'
    }));

    this.render(hbs `{{render-fields fields=fields}}`);

    assert.ok(this.$().html().match(/<dt>\s*Field One\s*<\/dt>/), 'should render title:' + this.$().html());
});

test('it renders the value', function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('fields', createFields({
        field: 'field1'
    }));
    this.set('record', Ember.Object.create({
        field1: 'foo'
    }));
    this.render(hbs `{{render-fields fields=fields record=record}}`);

    assert.ok(this.$().html().match(/<dd>\s*foo\s*<\/dd>/), 'should render value:' + this.$().html());
});

test('it displays an input when `isEditing`', function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('fields', createFields({
        field: 'field1'
    }));
    this.set('record', Ember.Object.create({
        field1: 'foo'
    }));
    this.render(hbs `{{render-fields fields=fields record=record isEditing=true}}`);

    assert.equal(this.$('input').length, 1, 'should render an input');
});

//test option when `isEditing`
test('it setup an option when `isEditing`', function(assert) {
  this.set('fields', createFields({
    field: 'option'
  }));
  this.set('record', Ember.Object.create({
    field1: 'foo'
  }));
  this.render(hbs `{{render-fields fields=fields record=record isEditing=true}}`);

  assert.equal(this.$('option').length, 0, 'should setup an option');
});
