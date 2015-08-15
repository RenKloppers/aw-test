/* jshint ignore:start */

/* jshint ignore:end */

define('aw-framework-test/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].JSONAPIAdapter.extend({
        namespace: 'api'
    });

});
define('aw-framework-test/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'aw-framework-test/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
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
define('aw-framework-test/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('aw-framework-test/controllers/controller', function () {

	'use strict';

	//suggestion create a controller for the drop down item...

});
define('aw-framework-test/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('aw-framework-test/helpers/lang-helper', function () {

  'use strict';

  //suggestion to use a helper to display language
  /*

   <div>{{format-language code langCode="tr"}}</div>
   or
   {{show-lang lang=(format-language code langCode="tr")}}


    export default Ember.Helper.extend({
       compute(params, hash) {
       let language = params[0];
       let langCode = hash.language;
       return '{language}{langCode}';
     }
   });
   */

});
define('aw-framework-test/initializers/export-application-global', ['exports', 'ember', 'aw-framework-test/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('aw-framework-test/instance-initializers/app-version', ['exports', 'aw-framework-test/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('aw-framework-test/models/contact', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].Model.extend({
        firstName: DS['default'].attr('string'),
        lastName: DS['default'].attr('string'),
        street: DS['default'].attr('string'),
        city: DS['default'].attr('string'),
        role: DS['default'].attr('string'),
        active: DS['default'].attr('boolean')
    });

});
define('aw-framework-test/models/detail-field', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].Model.extend({
        type: DS['default'].attr('string'),
        title: DS['default'].attr('string'),
        field: DS['default'].attr('string')
    });

});
define('aw-framework-test/router', ['exports', 'ember', 'aw-framework-test/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('list');
    this.route('details');
  });

  exports['default'] = Router;

});
define('aw-framework-test/routes/details', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {
            //fetch all of the detail-fields to drive the layout,
            //and the contact details to display
            return Ember['default'].RSVP.hash({
                fields: this.store.findAll('detail-field'),
                //just load a single contact, hard-coded to id: 2
                //TODO: know it's just a test but will be nice to do something defferent with the initial value,
                //  maybe lets look at a random number generator with max value
                data: this.store.find('contact', '2')
            });
        }
    });

});
define('aw-framework-test/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 12
            },
            "end": {
              "line": 8,
              "column": 56
            }
          },
          "moduleName": "aw-framework-test/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode("Home");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 12
            },
            "end": {
              "line": 9,
              "column": 61
            }
          },
          "moduleName": "aw-framework-test/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode("Details");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 10
          }
        },
        "moduleName": "aw-framework-test/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","page-header");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Welcome to the AgilityWorks JS Framework Test");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","navbar navbar-default");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container-fluid");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","nav navbar-nav");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0,1,1);
        morphs[1] = dom.createMorphAt(element0,3,3);
        morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],["tagName","li"],0,null,["loc",[null,[8,12],[8,68]]]],
        ["block","link-to",["details"],["tagName","li"],1,null,["loc",[null,[9,12],[9,73]]]],
        ["content","outlet",["loc",[null,[14,0],[14,10]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('aw-framework-test/templates/components/render-fields', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"type","button");
          dom.setAttribute(el1,"class","btn btn-default");
          var el2 = dom.createTextNode("Save");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [
          ["element","action",["save"],[],["loc",[null,[3,50],[3,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"type","button");
          dom.setAttribute(el1,"class","btn btn-default");
          var el2 = dom.createTextNode("Edit");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["edit"],[],["loc",[null,[5,50],[5,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 13,
                  "column": 12
                },
                "end": {
                  "line": 15,
                  "column": 14
                }
              },
              "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","input",[],["type","checkbox","checked",["subexpr","@mut",[["get","field.value",["loc",[null,[14,48],[14,59]]]]],[],[]]],["loc",[null,[14,16],[14,61]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          var child0 = (function() {
            return {
              meta: {
                "revision": "Ember@1.13.3",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 16,
                    "column": 14
                  },
                  "end": {
                    "line": 23,
                    "column": 14
                  }
                },
                "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                return morphs;
              },
              statements: [
                ["inline","view",["select"],["content",["subexpr","@mut",[["get","roles",["loc",[null,[18,26],[18,31]]]]],[],[]],"optionLabelPath","content.roleName","selection",["subexpr","@mut",[["get","selectedRole",["loc",[null,[20,28],[20,40]]]]],[],[]],"prompt","Select a role"],["loc",[null,[17,16],[21,42]]]]
              ],
              locals: [],
              templates: []
            };
          }());
          var child1 = (function() {
            return {
              meta: {
                "revision": "Ember@1.13.3",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 23,
                    "column": 14
                  },
                  "end": {
                    "line": 25,
                    "column": 12
                  }
                },
                "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                return morphs;
              },
              statements: [
                ["inline","input",[],["value",["subexpr","@mut",[["get","field.value",["loc",[null,[24,30],[24,41]]]]],[],[]]],["loc",[null,[24,16],[24,43]]]]
              ],
              locals: [],
              templates: []
            };
          }());
          return {
            meta: {
              "revision": "Ember@1.13.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 15,
                  "column": 14
                },
                "end": {
                  "line": 26,
                  "column": 12
                }
              },
              "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["block","if",[["get","field.isOption",["loc",[null,[16,20],[16,34]]]]],[],0,1,["loc",[null,[16,14],[25,19]]]]
            ],
            locals: [],
            templates: [child0, child1]
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 8
              },
              "end": {
                "line": 27,
                "column": 8
              }
            },
            "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","field.isBoolean",["loc",[null,[13,18],[13,33]]]]],[],0,1,["loc",[null,[13,12],[26,19]]]]
          ],
          locals: [],
          templates: [child0, child1]
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 28,
                  "column": 12
                },
                "end": {
                  "line": 30,
                  "column": 12
                }
              },
              "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","if",[["get","field.value",["loc",[null,[29,21],[29,32]]]],"Yes","No"],[],["loc",[null,[29,16],[29,45]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 30,
                  "column": 12
                },
                "end": {
                  "line": 32,
                  "column": 12
                }
              },
              "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["content","field.value",["loc",[null,[31,16],[31,31]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 8
              },
              "end": {
                "line": 33,
                "column": 8
              }
            },
            "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","field.isBoolean",["loc",[null,[28,18],[28,33]]]]],[],0,1,["loc",[null,[28,12],[32,19]]]]
          ],
          locals: [],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("dt");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("dd");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]),1,1);
          return morphs;
        },
        statements: [
          ["content","field.fieldDef.title",["loc",[null,[10,8],[10,32]]]],
          ["block","if",[["get","isEditing",["loc",[null,[12,14],[12,23]]]]],[],0,1,["loc",[null,[12,8],[33,15]]]]
        ],
        locals: ["field"],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 36,
            "column": 0
          }
        },
        "moduleName": "aw-framework-test/templates/components/render-fields.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","isEditing",["loc",[null,[2,6],[2,15]]]]],[],0,1,["loc",[null,[2,0],[6,7]]]],
        ["block","each",[["get","fieldObjects",["loc",[null,[9,8],[9,20]]]]],[],2,null,["loc",[null,[9,0],[35,9]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('aw-framework-test/templates/details', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "aw-framework-test/templates/details.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Details");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","render-fields",[],["fields",["subexpr","@mut",[["get","model.fields",["loc",[null,[3,23],[3,35]]]]],[],[]],"record",["subexpr","@mut",[["get","model.data",["loc",[null,[3,43],[3,53]]]]],[],[]]],["loc",[null,[3,0],[3,55]]]],
        ["content","outlet",["loc",[null,[5,0],[5,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('aw-framework-test/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 69,
            "column": 0
          }
        },
        "moduleName": "aw-framework-test/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Home");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Congratulations! If you can see this in your browser you've successfully installed and run the application");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("First, check out the current functionality:\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ol");
        dom.setAttribute(el3,"type","a");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Head to 'Details'");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("In the code, take a look at:\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("code");
        var el8 = dom.createTextNode("templates/details");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("code");
        var el8 = dom.createTextNode("models/detail-field,contact");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("code");
        var el8 = dom.createTextNode("server/mocks/detail-fields,contacts");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("code");
        var el8 = dom.createTextNode("components/render-fields");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("code");
        var el8 = dom.createTextNode("templates/components/render-fields");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("em");
        var el6 = dom.createTextNode("Task:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" Fix the bug that is preventing the 'First Name' from appearing");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Background to existing functionality:\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("A mobile application for a travelling ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("em");
        var el6 = dom.createTextNode("sales rep");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(", to enable them to manage\n            contact data for their customers.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("For each of our clients, the list of data fields held\n            against a contact will vary, therefore these fields should be configurable. This is setup\n            and managed by the ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("em");
        var el6 = dom.createTextNode("app administrator");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("In order that");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" I always have up-to-date information about my customers' contacts");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("As a");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" sales rep");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("I want");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" to view and edit this information");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("---");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("In order that");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" I can provide my users with relevant information");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("As an");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" app administrator");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("I want");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" to be able to configure the fields that are available in the app");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("Task:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" A request has been received that, instead of a free-entry text field, the 'Role'\n    should be selectable from a set of options. Implement this, based on the following:\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("In order that");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" I can easily switch a contact's role");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("As a");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" sales rep");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("I want");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" to be able to select a new role from a set of options");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("--");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("In order that");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" I can provide my users with a relevant list of roles");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("As an");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" app administrator");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("strong");
        var el6 = dom.createTextNode("I want");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" to be able to adjust the list of available roles");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("(assume that the data will be managed elsewhere, but mock up the api and some example data in the\n            same way as ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("code");
        var el6 = dom.createTextNode("render-fields");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(")");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("Task:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Once you're done, ensure that all tests still pass (and even better, add some of your own), make sure your code is all committed. Bring that code along to the interview.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("Task:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Prepare, for discussion at interview, a design for improvements to this app to enable the UI to be internationalised into multiple languages. Present this in the way you feel best suited. You might want to include consideration of:\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Necessary data objects");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Patterns to use and avoid");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Helper functions and UI components");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,5,5,contextualElement);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[68,0],[68,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('aw-framework-test/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/components/render-fields.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/render-fields.js should pass jshint', function() { 
    ok(true, 'components/render-fields.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/controllers/controller.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/controller.js should pass jshint', function() { 
    ok(true, 'controllers/controller.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/helpers/lang-helper.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/lang-helper.js should pass jshint', function() { 
    ok(true, 'helpers/lang-helper.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/helpers/resolver', ['exports', 'ember/resolver', 'aw-framework-test/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('aw-framework-test/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/helpers/start-app', ['exports', 'ember', 'aw-framework-test/app', 'aw-framework-test/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('aw-framework-test/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
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

    //TODO: double check this is 100% - added checkbox when `isEditing`
    ember_qunit.test('it displays an checkbox when `isEditing`', function (assert) {

        this.set('fields', createFields({
            field: 'field2'
        }));
        this.set('record', Ember['default'].Object.create({
            field2: 'active'
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

        assert.equal(this.$('input').length, 1, 'should render an input checkbox');
    });

});
define('aw-framework-test/tests/integration/components/render-fields-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components');
  test('integration/components/render-fields-test.js should pass jshint', function() { 
    ok(true, 'integration/components/render-fields-test.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/models/contact.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/contact.js should pass jshint', function() { 
    ok(true, 'models/contact.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/models/detail-field.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/detail-field.js should pass jshint', function() { 
    ok(true, 'models/detail-field.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/routes/details.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/details.js should pass jshint', function() { 
    ok(true, 'routes/details.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/test-helper', ['aw-framework-test/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('aw-framework-test/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    //assert.ok(adapter); //before
    assert.ok(!!adapter); //double check this is right?
  });
  //

});
define('aw-framework-test/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/unit/models/contact-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('contact', 'Unit | Model | contact', {
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
define('aw-framework-test/tests/unit/models/contact-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/contact-test.js should pass jshint', function() { 
    ok(true, 'unit/models/contact-test.js should pass jshint.'); 
  });

});
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
define('aw-framework-test/tests/unit/models/detail-field-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/detail-field-test.js should pass jshint', function() { 
    ok(true, 'unit/models/detail-field-test.js should pass jshint.'); 
  });

});
define('aw-framework-test/tests/unit/routes/details-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:details', 'Unit | Route | details', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aw-framework-test/tests/unit/routes/details-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/details-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/details-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('aw-framework-test/config/environment', ['ember'], function(Ember) {
  var prefix = 'aw-framework-test';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("aw-framework-test/tests/test-helper");
} else {
  require("aw-framework-test/app")["default"].create({"name":"aw-framework-test","version":"0.0.0+f66b2353"});
}

/* jshint ignore:end */
//# sourceMappingURL=aw-framework-test.map