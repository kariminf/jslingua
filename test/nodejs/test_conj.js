var JsLingua = require('../../jslingua.js');


var Cls = JsLingua.getService("Morpho", "ara");
var f = JsLingua.Cls.Morpho.Feature;
var morpho = new Cls();
var opts = [
    {"person":f.Person.First, "number": f.Number.Singular},
    {"person":f.Person.First, "number": f.Number.Plural},
    
    {"person":f.Person.Second, "number": f.Number.Singular, "gender": f.Gender.Masculine},
    {"person":f.Person.Second, "number": f.Number.Singular, "gender": f.Gender.Feminine},
    {"person":f.Person.Second, "number": f.Number.Dual, "gender": f.Gender.Masculine},
    {"person":f.Person.Second, "number": f.Number.Dual, "gender": f.Gender.Feminine},
    {"person":f.Person.Second, "number": f.Number.Plural, "gender": f.Gender.Masculine},
    {"person":f.Person.Second, "number": f.Number.Plural, "gender": f.Gender.Feminine},
    
    {"person":f.Person.Third, "number": f.Number.Singular, "gender": f.Gender.Masculine},
    {"person":f.Person.Third, "number": f.Number.Singular, "gender": f.Gender.Feminine},
    {"person":f.Person.Third, "number": f.Number.Dual, "gender": f.Gender.Masculine},
    {"person":f.Person.Third, "number": f.Number.Dual, "gender": f.Gender.Feminine},
    {"person":f.Person.Third, "number": f.Number.Plural, "gender": f.Gender.Masculine},
    {"person":f.Person.Third, "number": f.Number.Plural, "gender": f.Gender.Feminine},
    
];

var tenses = [f.Tense.Past, f.Tense.Present, f.Tense.Future];
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