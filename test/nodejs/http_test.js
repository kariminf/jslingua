function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

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

var resp = "<!DOCTYPE html>\n<html>\n<head>\n";
resp += '<meta charset="UTF-8">\n';
resp += '<title>Test server</title>\n';
resp += '</head>\n<body>\n';
resp += "Testing Lang module ...<br>\n";
resp += "=======================<br>\n";
for (var i=0; i< langList.length; i++){
  var lang = new langList[i];
  resp += "Language " + lang.getLangCode() + ":<br>\n";
  resp += "103987 = " + lang.pronounceNumber(103987) + "<br>\n";

  resp += "<br>\n";
}

resp += "<br>\n";
resp += "Testing Trans module ...<br>\n";
resp += "=======================<br>\n";

var i;
for (i=0; i< transList.length; i++){
  var trans = new transList[i];
  var langCode = trans.getLangCode();
  var methods = trans.availableMethods();
  var j;
  for (j = 0; j < methods.length; j++){
    var method = methods[j];
    resp += langCode + ": " + method + "<br>\n";
    trans.setCurrentMethod(method);
    if (langCode in langTrans){
      var srcT = langTrans[langCode];
      var transT = trans.transliterate(srcT);
      resp += htmlEntities(srcT + " ==trans==> " + transT) + "<br>\n";
      resp += htmlEntities(transT + " ==untrans==> " + trans.untransliterate(transT)) + "<br>\n";
    }
    resp += "<br>\n";
  }
}

resp += '</body>\n<html>';

var http = require("http");

http.createServer(function (request, response) {

   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/html'});

   // Send the response body as "Hello World"

   response.end(resp);
}).listen(3000);

// Console will print the message
console.log('Server running at http://127.0.0.1:3000/');
