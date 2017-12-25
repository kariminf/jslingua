(function () {

  "use strict";

  //TODO see https://en.wikipedia.org/wiki/English_irregular_verbs#List
  let Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Morpho = require("../morpho.js");
    module.exports = FraMorpho;
  } else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.addService("Morpho", "fra", FraMorpho);
  }

  //Different global features
  let F = Morpho.Feature,
  Tense = F.Tense,
  Mood = F.Mood,
  Voice = F.Voice,
  GNumber = F.Number,
  Aspect = F.Aspect,
  Gender = F.Gender,
  Person = F.Person;

  let g;

  function FraMorpho() {
    Morpho.call(this, "fra");
    Morpho.newStemmer.call(this, "porterStemmer", "French Snowball stemmr", snowballStemmer);

    //Morpho.addNounDeclension.call(this, "singularToPlural", singular2plural);
    g = this.g;
  }

  FraMorpho.prototype = Object.create(Morpho.prototype);
  let Me = FraMorpho.prototype;

  Me.constructor = FraMorpho;

  Me.getPronounOpts = function() {
    return [
        {person:Person.F, number: GNumber.S}, //Je
        {person:Person.S, number: GNumber.S},//Tu
        {person:Person.T, number: GNumber.S, gender: Gender.M},//Il
        {person:Person.T, number: GNumber.S, gender: Gender.F},//Elle
        {person:Person.F, number: GNumber.P}, //Nous
        {person:Person.S, number: GNumber.P},//Vous
        {person:Person.T, number: GNumber.P, gender: Gender.M}//Ils
        {person:Person.T, number: GNumber.P, gender: Gender.F},//Elles

    ];
  };


  Me.getPronounName = function(opts) {
    switch (opts.person) {
      case Person.F:
      if (opts.number === GNumber.S) return "Je";
      else return "Nous";

      case Person.S:
      if (opts.number === GNumber.S) return "Tu";
      return "Vous";

      case Person.T:
      let pl = (opts.number === GNumber.S)? "": "s";
      if (opts.gender === Gender.M) return "Il" + pl;
      return "Elle" + pl;
    }
    return "";
  };


  Me.getForms = function() {
    return  {
      
    };
  };

  //let C = Object.freeze;

  //=================
  //Conjugation zone
  //=================

  //Override conjugate function
  //TODO french conjugation
  Me.conjugate = function(verb, opts) {

    return verb;

  };

  //=========================================================
  //                 STEMMERS
  //=========================================================

  const vowels = "aeiouyâàëéêèïîôûù";

  //TODO complete snowball stemmer
  function snowballStemmer(word) {
    word = word.toLowerCase();
    return word;
  }

  //TODO normalization of words
  Me.normalize = function(word, _opts){
    return word;
  };


}());
