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