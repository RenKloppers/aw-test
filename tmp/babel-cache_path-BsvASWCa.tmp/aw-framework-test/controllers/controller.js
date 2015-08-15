//suggestion: create a controller for the option select item

//controller have proxy access to our data model
//will return data from model property (Ember.ObjectController - proxies to own properties then model property)

//suggestion: use a controller for language display
/*
// sample for switching langs
addLang: function(food) {
  var lang = this.controllerFor('contact').get('model'),
  langItems = lang.get('lang.langItems');
  ...
}
*/

//other controller usages (Ember.Controller - proxy to own property) and (Ember.ArrayController - list)