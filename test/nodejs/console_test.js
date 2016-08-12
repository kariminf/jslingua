var langList = [
  require("../../ar/ar.lang.js"), //ArLang
  require("../../ja/ja.lang.js") //JaLang
];

var transList = [
  require("../../ar/ar.trans.js"), //ArLang
  require("../../ja/ja.trans.js") //JaLang
];

var langTest = {
  "Arabic": "أهلا بالجميع",
  "Japanese": "皆さん、こんにちは"
};

var langTrans = {
  "Arabic": "أهلا بالجميع",
  "Japanese": "みなさん、こんにちは"
};

var langUntrans = {
  "Arabic": "*ahaba Eumaru <ilaY Als~uwqi",
  "Japanese": "tanaka san ha ie ni kaerimasu"
}

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
for (var i=0; i< transList.length; i++){
  var trans = new transList[i];
  var langName = trans.getLangName();
  console.log("Language " + langName + ":");
  if (langName in langTrans){
    console.log(langTrans[langName] + " ==trans==> " + trans.translaterate(langTrans[langName]));
  }
  if (langName in langUntrans){
    console.log(langUntrans[langName] + " ==untrans==> " + trans.untranslaterate(langUntrans[langName]));
  }
  console.log("");
}
