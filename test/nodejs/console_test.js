var langList = [
  require("../../ar/ar.lang.js"), //ArLang
  require("../../ja/ja.lang.js") //JaLang
];

var transList = [
  require("../../ar/ar.trans.js"), //ArLang
  require("../../ja/ja.trans.js") //JaLang
];

var langTest = {
  "Arabic": "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار",
  "Japanese": "皆さん、こんにちは"
};

var langTrans = {
  "Arabic": "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار",
  "Japanese": "しゃしん うち つづく ふえん ひゃく じゃない じむしょ ぢゃ"
};

console.log("");
console.log("Testing Lang module ...");
console.log("=======================");
for (var i=0; i< langList.length; i++){
  var lang = new langList[i];
  console.log("Language " + lang.getLangName() + ":");
  console.log("103987 = " + lang.pronounceNumber(103987));

  console.log("");
}

console.log("");
console.log("Testing Trans module ...");
console.log("=======================");
var i;
for (i=0; i< transList.length; i++){
  var trans = new transList[i];
  var langName = trans.getLangName();
  var methods = trans.availableMethods();
  var j;
  for (j = 0; j < methods.length; j++){
    var method = methods[j];
    console.log(langName + ": " + method);
    trans.setCurrentMethod(method);
    if (langName in langTrans){
      var srcT = langTrans[langName];
      var transT = trans.transliterate(srcT);
      console.log(srcT + " ==trans==> " + transT);
      console.log(transT + " ==untrans==> " + trans.untransliterate(transT));
    }
    console.log("");
  }
}
