var JsLingua = require('../../jslingua.js');


var Cls = JsLingua.getService("Morpho", "ara");
var f = JsLingua.Cls.Morpho.Feature;
var morpho = new Cls();
var opts = morpho.getPronounOpts();

var tenses = morpho.getTenses();
var verb = "ذَهَبَ";

var i;
for (i=0; i< tenses.length; i++){
    var j;
  for(j=0; j<opts.length; j++){
      var opt = opts[j];
      opt.tense = tenses[i];
      var conj = morpho.conjugate(verb, opt);
      var pronoun = morpho.getPronoun(opt);
      console.log(pronoun + ": " + conj);
  }
}
