(function () {

  //TODO see https://en.wikipedia.org/wiki/English_irregular_verbs#List
  var Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Morpho = require("../morpho.js");
    module.exports = EngMorpho;
  } else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.addService("Morpho", "eng", EngMorpho);
  }

  //Different global features
  var F = Morpho.Feature;
  var T = F.Tense;
  var M = F.Mood;
  var V = F.Voice;
  var N = F.Number;
  var A = F.Aspect;
  var G = F.Gender;
  var P = F.Person;

  function EngMorpho() {
    Morpho.call(this, "eng");
  }

  EngMorpho.prototype = Object.create(Morpho.prototype);
  var Me = EngMorpho.prototype;

  Me.constructor = EngMorpho;

  Me.getTenseName = function(tense){
    switch (tense) {
      case T.Past:
        return "past";
      case T.Present:
        return "present";
      case T.Future:
        return "future";
    }

    return "";
  }

  Me.getPronounOpts = function(){
    return [
        {person:P.First, number: N.Singular}, //I
        {person:P.First, number: N.Plural}, //We

        {person:P.Second},//You

        {person:P.Third, number: N.Singular, gender: G.Masculine},//He
        {person:P.Third, number: N.Singular, gender: G.Feminine},//She
        {person:P.Third, number: N.Singular, gender: G.Neuter},//It
        {person:P.Third, number: N.Plural}//They
    ];
  }

  //var C = Object.freeze;

  //=================
  //Conjugation zone
  //=================


  function isIrregular (verb) {

    return verb;
  }

  //Override conjugate function
  Me.conjugate = function(verb, opts){

    var begin = "";
    var end = "";

    switch (opts.tense) {

      case T.Present:
      if (opts.person == P.Third && opts.number === N.Singular){
        verb = verb.replace(/([^aeuio])y$/, "$1ie");
        verb = verb.replace(/(s|z|sh|dg|tch|j|[^aeui]o)$/, "$1e");
        end += "s";
      }
      //TODO be, have
      break;

      case T.Past:
      verb = verb.replace(/([^aeuio])y$/, "$1i");
      verb = verb.replace(/c$/, "ck");
      verb = verb.replace(/([aeuio])([^aeuiohwxy])$/, "$1$2$2");
      if (verb.endsWith("e")) end = "d";
      else end = "ed";
      //TODO more to be done here
      break;

      case T.Future:
      begin = "will ";
      break;

    }//swich(tense)

    var result = begin + verb + end;

    return result;

  }

  Me.getPronounName = function(opts){

    switch (opts.person) {
      case P.First:
      if (opts.number === N.Singular) return "I";
      else return "We";

      case P.Second:
      return "You";

      case P.Third:
      if (opts.number == N.Singular) {
        switch (opts.gender) {
          case G.Masculine: return "He";
          case G.Feminine: return "She";
          default: return "It";
        }
      } else return "They";

    }
    return "";
  }

  Me.stem = function(stemmer, word){
    var isAvailable = false;
    const AVAILABLE_STEMMERS =  {porterStemmer: 'English proter stemmr'}

    isAvailable = stemmer in AVAILABLE_STEMMERS
    if (!isAvailable) {
      throw "JsLingua does not support "+stemmer+" or the name of stemmer incorrect see available stemmers list";
    }else {
      switch (stemmer) {
        case "porterStemmer": {
          /*
            To validate this implementation,I rely largely on these resources:
            url1: http://snowballstem.org/algorithms/porter/stemmer.html
            url2: https://github.com/kristopolous/Porter-Stemmer/blob/master/PorterStemmer1980.js
          */
          var step2list = {
                           "ational" : "ate",
                           "tional" : "tion",
                           "enci" : "ence",
                           "anci" : "ance",
                           "izer" : "ize",
                           "bli" : "ble",
                           "alli" : "al",
                           "entli" : "ent",
                           "eli" : "e",
                           "ousli" : "ous",
                           "ization" : "ize",
                           "ation" : "ate",
                           "ator" : "ate",
                           "alism" : "al",
                           "iveness" : "ive",
                           "fulness" : "ful",
                           "ousness" : "ous",
                           "aliti" : "al",
                           "iviti" : "ive",
                           "biliti" : "ble",
                           "logi" : "log"
                         },
                         step3list = {
                                       "icate" : "ic",
                                       "ative" : "",
                                       "alize" : "al",
                                       "iciti" : "ic",
                                       "ical" : "ic",
                                       "ful" : "",
                                       "ness" : ""
                         },
                         c = "[^aeiou]",          // consonant
                         v = "[aeiouy]",          // vowel
                         C = c + "[^aeiouy]*",    // consonant sequence
                         V = v + "[aeiou]*",      // vowel sequence
                         mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
                         meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
                         mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
                         s_v = "^(" + C + ")?" + v;                   // vowel in stem

          function dummyDebug() {}

          function realDebug() {
              console.log(Array.prototype.slice.call(arguments).join(' '));
          }
          function porterStemmer(word, debug){
          var stemmed,
              suffix,
              firstch,
              re,
              re2,
              re3,
              re4,
              debugFunction,
              origword = word;

              if (debug) {
                debugFunction = realDebug;
              } else {
                debugFunction = dummyDebug;
              }

              if (word.length < 3) { return word; }

              firstch = word.substr(0,1);
              if (firstch == "y") {
                word = firstch.toUpperCase() + word.substr(1);
              }
              // Step 1a
              re = /^(.+?)(ss|i)es$/;
              re2 = /^(.+?)([^s])s$/;

              if (re.test(word)) {
                word = word.replace(re,"$1$2");
                debugFunction('1a',re, word);

              } else if (re2.test(word)) {
                word = word.replace(re2,"$1$2");
                debugFunction('1a',re2, word);
              }

              // Step 1b
              re = /^(.+?)eed$/;
              re2 = /^(.+?)(ed|ing)$/;
              if (re.test(word)) {
                var fp = re.exec(word);
                re = new RegExp(mgr0);
                if (re.test(fp[1])) {
                  re = /.$/;
                  word = word.replace(re,"");
                  debugFunction('1b',re, word);
                }
              } else if (re2.test(word)) {
                var fp = re2.exec(word);
                stemmed = fp[1];
                re2 = new RegExp(s_v);
                if (re2.test(stemmed)) {
                  word = stemmed;
                  debugFunction('1b', re2, word);

                  re2 = /(at|bl|iz)$/;
                  re3 = new RegExp("([^aeiouylsz])\\1$");
                  re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");

                  if (re2.test(word)) {
                    word = word + "e";
                    debugFunction('1b', re2, word);

                  } else if (re3.test(word)) {
                    re = /.$/;
                    word = word.replace(re,"");
                    debugFunction('1b', re3, word);

                  } else if (re4.test(word)) {
                    word = word + "e";
                    debugFunction('1b', re4, word);
                  }
                }
              }

              // Step 1c
              re = new RegExp("^(.*" + v + ".*)y$");
              if (re.test(word)) {
                var fp = re.exec(word);
                stemmed = fp[1];
                word = stemmed + "i";
                debugFunction('1c', re, word);
              }

              // Step 2
              re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
              if (re.test(word)) {
                var fp = re.exec(word);
                stemmed = fp[1];
                suffix = fp[2];
                re = new RegExp(mgr0);
                if (re.test(stemmed)) {
                  word = stemmed + step2list[suffix];
                  debugFunction('2', re, word);
                }
              }

              // Step 3
              re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
              if (re.test(word)) {
                var fp = re.exec(word);
                stemmed = fp[1];
                suffix = fp[2];
                re = new RegExp(mgr0);
                if (re.test(stemmed)) {
                  word = stemmed + step3list[suffix];
                  debugFunction('3', re, word);
                }
              }

              // Step 4
              re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
              re2 = /^(.+?)(s|t)(ion)$/;
              if (re.test(word)) {
                var fp = re.exec(word);
                stemmed = fp[1];
                re = new RegExp(mgr1);
                if (re.test(stemmed)) {
                  word = stemmed;
                  debugFunction('4', re, word);
                }
              } else if (re2.test(word)) {
                var fp = re2.exec(word);
                stemmed = fp[1] + fp[2];
                re2 = new RegExp(mgr1);
                if (re2.test(stemmed)) {
                  word = stemmed;
                  debugFunction('4', re2, word);
                }
              }

              // Step 5
              re = /^(.+?)e$/;
              if (re.test(word)) {
                var fp = re.exec(word);
                stemmed = fp[1];
                re = new RegExp(mgr1);
                re2 = new RegExp(meq1);
                re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
                if (re.test(stemmed) || (re2.test(stemmed) && !(re3.test(stemmed)))) {
                  word = stemmed;
                  debugFunction('5', re, re2, re3, word);
                }
              }

              re = /ll$/;
              re2 = new RegExp(mgr1);
              if (re.test(word) && re2.test(word)) {
                re = /.$/;
                word = word.replace(re,"");
                debugFunction('5', re, re2, word);
              }

              // and turn initial Y back to y
              if (firstch == "y") {
                word = firstch.toLowerCase() + word.substr(1);
              }

              return word;
          }
          var result = porterStemmer(word,debug=true);
          return result;
        }
        default: return word
      }
    }
  }

}());
