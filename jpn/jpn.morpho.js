(function () {

  var Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Morpho = require("../morpho.js");
    module.exports = JpnMorpho;
  } else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.addService("Morpho", "jpn", JpnMorpho);
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
  var Formality = Object.freeze({
    plain: 0,
    polite: 1,
    formal: 2
  });


  function JpnMorpho() {
    Morpho.call(this, "jpn");
  }

  JpnMorpho.prototype = Object.create(Morpho.prototype);
  var Me = JpnMorpho.prototype;

  Me.constructor = JpnMorpho;

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

  //https://en.wikipedia.org/wiki/Japanese_pronouns
  //TODO pronouns problem in Japanese
  Me.getPronounOpts = function(){
    return [
        {person:P.First, number: N.Singular}, //私
    ];
  }

  //var C = Object.freeze;

  //=================
  //Conjugation zone
  //=================

  //https://en.wikipedia.org/wiki/Japanese_verb_conjugation
  //Override conjugate function
  Me.conjugate = function(verb, opts){

    var begin = "";
    var end = "";

    if (opts.tense == T.Past){

    } else {

    }

    var result = begin + verb + end;

    return result;

  }

  /**
   * @Override
   * [getPronounName description]
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  Me.getPronounName = function(opts){

    switch (opts.person) {
      case P.First:
      return "";

      case P.Second:
      return "";

      case P.Third:
      return "";

    }
    return "";
  }

  Me.stem = function(word){

    var result = word;
    return result;
  }



}());
