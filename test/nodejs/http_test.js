function htmlEntities(str) {
    return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

var JsLingua = require('../../jslingua');

var test = {
  "ara": "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار",
  "jpn": "皆さん、こんにちは"
};

var Cls;//The class
var i; //Used to
var langs;

var resp = "<!DOCTYPE html>\n<html>\n<head>\n";
resp += '<meta charset="UTF-8">\n';
resp += '<title>Test server</title>\n';
resp += '</head>\n<body>\n';

resp += "Testing Info module ..." + "<br>\n";
resp += "=======================" + "<br>\n";

langs = JsLingua.serviceLanguages("Info");
for (var i=0; i< langs.length; i++){
  resp += + "<br>\n";
  resp += "Language " + langs[i] + ":" + "<br>\n";
  Cls = JsLingua.getService("Info", langs[i]);
  var info = new Cls();
  resp += "Name: " + info.getName() + "<br>\n";
  resp += "Family: " + info.getFamily() + "<br>\n";
  resp += "Branch: " + info.getBranch() + "<br>\n";
  resp += "Writing direction: " + info.getDir() + "<br>\n";
  resp += "Words order: " + info.getWordOrder() + "<br>\n";
  resp += "Native speakers: " + info.getPopulation() + "<br>\n";
  resp += "Official in: " + info.getLocations().join() + "<br>\n";
  resp += "Dialects: " + info.getDialects().join() + "<br>\n";
}

resp += "<br>\n";
resp += "<br>\n";
resp += "Testing Lang module ..." + "<br>\n";
resp += "=======================" + "<br>\n";

langs = JsLingua.serviceLanguages("Lang");
for (var i=0; i< langs.length; i++){
  resp += "<br>\n";
  resp += "Language " + langs[i] + ":" + "<br>\n";
  Cls = JsLingua.getService("Lang", langs[i]);
  var lang = new Cls();
  resp += "103987 = " + lang.pronounceNumber(103987) + "<br>\n";
  if (langs[i] in test){
    var txt = test[langs[i]];
    resp += txt + "is:" + "<br>\n";
    var charsets = lang.availableCharSets();
    var j;
    for(j=0; j < charsets.length; j++){
      resp += "all " + charsets[j] + ": " + lang.allCharSetFunction(charsets[j])(txt) + "<br>\n";
      resp += "containing " + charsets[j] + ": " + lang.containsCharSetFunction(charsets[j])(txt) + "<br>\n";
    }
  }
}

resp += "<br>\n";
resp += "<br>\n";
resp += "Testing Trans module ..." + "<br>\n";
resp += "=======================" + "<br>\n";

langs = JsLingua.serviceLanguages("Trans");
for (var i=0; i< langs.length; i++){
  resp += "<br>\n";
  resp += "Language " + langs[i] + ":" + "<br>\n";
  Cls = JsLingua.getService("Trans", langs[i]);
  var trans = new Cls();
  var methods = trans.availableMethods();
  var j;
  for (j = 0; j < methods.length; j++){
    var method = methods[j];
    resp += langs[i] + ": " + method + "<br>\n";
    trans.setCurrentMethod(method);
    if (langs[i] in test){
      var srcT = test[langs[i]];
      var transT = trans.transliterate(srcT);
      resp += htmlEntities(srcT + " ==trans==> " + transT) + "<br>\n";
      resp += htmlEntities(transT + " ==untrans==> " + trans.untransliterate(transT)) + "<br>\n";
    }
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
resp += ('Server running at http://127.0.0.1:3000/');
