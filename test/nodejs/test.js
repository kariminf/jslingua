var JsLingua = require('../../jslingua');

var test = {
  "ara": "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار",
  "jpn": "皆さん、こんにちは"
};

var Cls;//The class
var i; //Used to
var langs;


console.log("Testing Info module ...");
console.log("=======================");

langs = JsLingua.serviceLanguages("Info");
for (var i=0; i< langs.length; i++){
  console.log("");
  console.log("Language " + langs[i] + ":");
  Cls = JsLingua.getService("Info", langs[i]);
  var info = new Cls();
  console.log("Name: " + info.getName());
  console.log("Family: " + info.getFamily());
  console.log("Branch: " + info.getBranch());
  console.log("Writing direction: " + info.getDir());
  console.log("Words order: " + info.getWordOrder());
  console.log("Native speakers: " + info.getPopulation());
  console.log("Official in: " + info.getLocations().join());
  console.log("Dialects: " + info.getDialects().join());
}

console.log("");
console.log("");
console.log("Testing Lang module ...");
console.log("=======================");

langs = JsLingua.serviceLanguages("Lang");
for (var i=0; i< langs.length; i++){
  console.log("");
  console.log("Language " + langs[i] + ":");
  Cls = JsLingua.getService("Lang", langs[i]);
  var lang = new Cls();
  console.log("103987 = " + lang.pronounceNumber(103987));
  if (langs[i] in test){
    var txt = test[langs[i]];
    console.log(txt + "is:");
    var charsets = lang.availableCharSets();
    var j;
    for(j=0; j < charsets.length; j++){
      console.log("all " + charsets[j] + ": " + lang.allCharSetFunction(charsets[j])(txt));
      console.log("containing " + charsets[j] + ": " + lang.containsCharSetFunction(charsets[j])(txt));
    }
  }
}

console.log("");
console.log("");
console.log("Testing Trans module ...");
console.log("=======================");

langs = JsLingua.serviceLanguages("Trans");
for (var i=0; i< langs.length; i++){
  console.log("");
  console.log("Language " + langs[i] + ":");
  Cls = JsLingua.getService("Trans", langs[i]);
  var trans = new Cls();
  var methods = trans.availableMethods();
  var j;
  for (j = 0; j < methods.length; j++){
    var method = methods[j];
    console.log(langs[i] + ": " + method);
    trans.setCurrentMethod(method);
    if (langs[i] in test){
      var srcT = test[langs[i]];
      var transT = trans.transliterate(srcT);
      console.log(srcT + " ==trans==> " + transT);
      console.log(transT + " ==untrans==> " + trans.untransliterate(transT));
    }
  }
}
