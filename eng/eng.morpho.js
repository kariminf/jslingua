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

  Me.stem = function(word){

    var result = word;
    return result;
  }



}());
