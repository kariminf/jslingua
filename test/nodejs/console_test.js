var langList = [
  require("../../ara/ara.lang.js"), //AraLang
  require("../../jpn/jpn.lang.js") //JpnLang
];

var transList = [
  require("../../ara/ara.trans.js"), //AraLang
  require("../../jpn/jpn.trans.js") //JpnLang
];

var langTest = {
  "ara": "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار",
  "jpn": "皆さん、こんにちは"
};

var langTrans = {
  "ara": "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار",
  "jpn": "しゃしん うち つづく ふえん ひゃく じゃない じむしょ ぢゃ"
};

console.log("");
console.log("Testing Lang module ...");
console.log("=======================");
for (var i=0; i< langList.length; i++){
  var lang = new langList[i];
  console.log("Language " + lang.getLangCode() + ":");
  console.log("103987 = " + lang.pronounceNumber(103987));

  console.log("");
}

console.log("");
console.log("Testing Trans module ...");
console.log("=======================");
var i;
for (i=0; i< transList.length; i++){
  var trans = new transList[i];
  var langCode = trans.getLangCode();
  var methods = trans.availableMethods();
  var j;
  for (j = 0; j < methods.length; j++){
    var method = methods[j];
    console.log(langCode + ": " + method);
    trans.setCurrentMethod(method);
    if (langCode in langTrans){
      var srcT = langTrans[langCode];
      var transT = trans.transliterate(srcT);
      console.log(srcT + " ==trans==> " + transT);
      console.log(transT + " ==untrans==> " + trans.untransliterate(transT));
    }
    console.log("");
  }
}
