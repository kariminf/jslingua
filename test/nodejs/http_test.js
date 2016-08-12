function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

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

var resp = "<!DOCTYPE html>\n<html>\n<head>\n";
resp += '<meta charset="UTF-8">\n';
resp += '<title>Test server</title>\n';
resp += '</head>\n<body>\n';
resp += "Testing Lang module ...<br>\n";
resp += "=======================<br>\n";
for (var i=0; i< langList.length; i++){
  var lang = new langList[i];
  resp += "Language " + lang.getLangName() + ":<br>\n";
  resp += "103987 = " + lang.pronounceNumber(103987) + "<br>\n";

  resp += "<br>\n";
}

resp += "<br>\n";
resp += "Testing Trans module ...<br>\n";
resp += "=======================<br>\n";
for (var i=0; i< transList.length; i++){
  var trans = new transList[i];
  var langName = trans.getLangName();
  resp += "Language " + langName + ":<br>\n";
  if (langName in langTrans){
    resp += htmlEntities(langTrans[langName] + " ==trans==> " + trans.translaterate(langTrans[langName])) + "<br>\n";
  }
  if (langName in langUntrans){
    resp += htmlEntities(langUntrans[langName] + " ==untrans==> " + trans.untranslaterate(langUntrans[langName])) + "<br>\n";
  }
  resp += "<br>";
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
