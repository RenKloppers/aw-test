define('aw-framework-test/tests/integration/components/render-fields-test', ['ember-qunit', 'ember'], function (ember_qunit, Ember) {

    'use strict';

    ember_qunit.moduleForComponent('render-fields', 'Integration | Component | render fields', {
        integration: true
    });

    function createFields() {
        for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
            fields[_key] = arguments[_key];
        }

        return fields.map(function (field) {
            return Ember['default'].Object.create(field);
        });
    }

    ember_qunit.test('it renders the title', function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.on('myAction', function(val) { ... });

        this.set('fields', createFields({
            title: 'Field One'
        }));

        this.render(Ember['default'].HTMLBars.template((function () {
            return {
                meta: {
                    'revision': 'Ember@1.13.3',
                    'loc': {
                        'source': null,
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 31
                        }
                    }
                },
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createComment('');
                    dom.appendChild(el0, el1);
                    return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                    dom.insertBoundary(fragment, 0);
                    dom.insertBoundary(fragment, null);
                    return morphs;
                },
                statements: [['inline', 'render-fields', [], ['fields', ['subexpr', '@mut', [['get', 'fields', ['loc', [null, [1, 23], [1, 29]]]]], [], []]], ['loc', [null, [1, 0], [1, 31]]]]],
                locals: [],
                templates: []
            };
        })()));

        assert.ok(this.$().html().match(/<dt>\s*Field One\s*<\/dt>/), 'should render title:' + this.$().html());
    });

    ember_qunit.test('it renders the value', function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.on('myAction', function(val) { ... });

        this.set('fields', createFields({
            field: 'field1'
        }));
        this.set('record', Ember['default'].Object.create({
            field1: 'foo'
        }));
        this.render(Ember['default'].HTMLBars.template((function () {
            return {
                meta: {
                    'revision': 'Ember@1.13.3',
                    'loc': {
                        'source': null,
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 45
                        }
                    }
                },
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createComment('');
                    dom.appendChild(el0, el1);
                    return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                    dom.insertBoundary(fragment, 0);
                    dom.insertBoundary(fragment, null);
                    return morphs;
                },
                statements: [['inline', 'render-fields', [], ['fields', ['subexpr', '@mut', [['get', 'fields', ['loc', [null, [1, 23], [1, 29]]]]], [], []], 'record', ['subexpr', '@mut', [['get', 'record', ['loc', [null, [1, 37], [1, 43]]]]], [], []]], ['loc', [null, [1, 0], [1, 45]]]]],
                locals: [],
                templates: []
            };
        })()));

        assert.ok(this.$().html().match(/<dd>\s*foo\s*<\/dd>/), 'should render value:' + this.$().html());
    });

    ember_qunit.test('it displays an input when `isEditing`', function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.on('myAction', function(val) { ... });

        this.set('fields', createFields({
            field: 'field1'
        }));
        this.set('record', Ember['default'].Object.create({
            field1: 'foo'
        }));
        this.render(Ember['default'].HTMLBars.template((function () {
            return {
                meta: {
                    'revision': 'Ember@1.13.3',
                    'loc': {
                        'source': null,
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 60
                        }
                    }
                },
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createComment('');
                    dom.appendChild(el0, el1);
                    return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                    dom.insertBoundary(fragment, 0);
                    dom.insertBoundary(fragment, null);
                    return morphs;
                },
                statements: [['inline', 'render-fields', [], ['fields', ['subexpr', '@mut', [['get', 'fields', ['loc', [null, [1, 23], [1, 29]]]]], [], []], 'record', ['subexpr', '@mut', [['get', 'record', ['loc', [null, [1, 37], [1, 43]]]]], [], []], 'isEditing', true], ['loc', [null, [1, 0], [1, 60]]]]],
                locals: [],
                templates: []
            };
        })()));

        assert.equal(this.$('input').length, 1, 'should render an input');
    });

    //test option when `isEditing`
    ember_qunit.test('it setup an option when `isEditing`', function (assert) {
        this.set('fields', createFields({
            field: 'option'
        }));
        this.set('record', Ember['default'].Object.create({
            field1: 'foo'
        }));
        this.render(Ember['default'].HTMLBars.template((function () {
            return {
                meta: {
                    'revision': 'Ember@1.13.3',
                    'loc': {
                        'source': null,
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 60
                        }
                    }
                },
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createComment('');
                    dom.appendChild(el0, el1);
                    return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                    dom.insertBoundary(fragment, 0);
                    dom.insertBoundary(fragment, null);
                    return morphs;
                },
                statements: [['inline', 'render-fields', [], ['fields', ['subexpr', '@mut', [['get', 'fields', ['loc', [null, [1, 23], [1, 29]]]]], [], []], 'record', ['subexpr', '@mut', [['get', 'record', ['loc', [null, [1, 37], [1, 43]]]]], [], []], 'isEditing', true], ['loc', [null, [1, 0], [1, 60]]]]],
                locals: [],
                templates: []
            };
        })()));

        assert.equal(this.$('option').length, 0, 'should setup an option');
    });

});