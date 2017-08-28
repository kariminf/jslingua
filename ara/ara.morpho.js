(function () {

  "use strict";

  let Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Morpho = require("../morpho.js");
    module.exports = AraMorpho;
  }
  else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.addService("Morpho", "ara", AraMorpho);
  }

  //Different global features
  let F = Morpho.Feature,
  Tense = F.Tense,
  //Mood = F.Mood,
  //Voice = F.Voice,
  GNumber = F.Number,
  //Aspect = F.Aspect,
  Gender = F.Gender,
  Person = F.Person;

  //var g;
  function AraMorpho() {
    Morpho.call(this, "ara");
    Morpho.newStemmer.call(this, "jslinguaAraStemmer", "JsLingua Arabic stemmer", jslinguaAraStemmer);
    //g = this.g;
  }

  AraMorpho.prototype = Object.create(Morpho.prototype);
  let Me = AraMorpho.prototype;

  Me.constructor = AraMorpho;

  Me.getTenseName = function(tense) {
    switch (tense) {
      case Tense.Pa:
        return "الماضي";
      case Tense.Pr:
        return "المضارع";
      case Tense.Fu:
        return "المستقبل";
    }

    return "";
  };

  Me.getPronounOpts = function() {
    return [
        {person:Person.F, number: GNumber.S},
        {person:Person.F, number: GNumber.P},

        {person:Person.S, number: GNumber.S, gender: Gender.M},
        {person:Person.S, number: GNumber.S, gender: Gender.F},
        {person:Person.S, number: GNumber.D, gender: Gender.M},
        {person:Person.S, number: GNumber.D, gender: Gender.F},
        {person:Person.S, number: GNumber.P, gender: Gender.M},
        {person:Person.S, number: GNumber.P, gender: Gender.F},

        {person:Person.T, number: GNumber.S, gender: Gender.M},
        {person:Person.T, number: GNumber.S, gender: Gender.F},
        {person:Person.T, number: GNumber.D, gender: Gender.M},
        {person:Person.T, number: GNumber.D, gender: Gender.F},
        {person:Person.T, number: GNumber.P, gender: Gender.M},
        {person:Person.T, number: GNumber.P, gender: Gender.F}
    ];
  };

  //var C = Object.freeze;

  //=================
  //Conjugation zone
  //=================

  const conjAffix = {
    [Tense.Pr]: {
      prefix: ["أَ", "نَ", "تَ", "تَ", "تَ", "تَ", "تَ", "تَ", "يَ", "تَ", "يَ", "تَ", "يَ", "يَ"],
      suffix: ["ُ", "ُ", "ُ", "ِينَ", "َانِ", "َانِ", "ُون", "ْنَ", "ُ", "ُ", "َانِ", "َانِ", "ُونَ", "ْنَ"]
    },
    [Tense.Pa]: {
      prefix: [],
      suffix: ["ْتُ", "ْنَا", "ْتَ", "ْتِ", "ْتُمَا", "ْتُمَا", "ْتُمْ", "ْتُنَّ", "َ", "َتْ", "َا", "َتَا", "ُوا", "ْنَ"]
    }
  };

  const numberIndex = [
    [GNumber.S], [GNumber.D], [GNumber.P]
  ];


  /**
   * A function that gives the pronoun index in conjugation table
   * @method getPronounIndex
   * @param  {object}        opts contains person, number and gender
   * @return {number}             a number from 0 to 13
   */
  function getPronounIndex(opts){
    if(opts.person === Person.F){
      if(opts.number === GNumber.S) return 0;
      else return 1;
    }

    let personIdx = (Object.values(Person).indexOf(opts.person)-1) * 6;
    let numberIdx = Object.values(GNumber).indexOf(opts.number) * 2;
    let genderIdx = Object.values(Gender).indexOf(opts.gender);

    return personIdx + numberIdx + genderIdx + 2;
  }

  //Override conjugate function
  Me.conjugate = function(verb, opts) {
    //delete diacretics
    verb = verb.trim();
    let noDiac = verb.replace(/\u064E\u064F\u0650\u0651\u0652/gi, "");//fat,dam,kas,shad,sukun

    let len = noDiac.length;

    let begin = "",
    end = "",
    endDiac = "ُ";//Dhamma for present

    //Future is prefix + present
    let future = 0;
    if (opts.tense === Tense.Fu){
      future = 1;
      opts.tense = Tense.Pr;
    }

    let befLast = "ِ";//kasra for the char before last

    //detect if the verb with weak begining
    //let weekBegin = /^[اأو]/.test(noDiac);

    //detect if the verb has a week ending
    let weekEnd = /[يى]$/.test(noDiac);

    if(weekEnd){
      if (opts.tense === Tense.Pa) befLast = "َ";
      verb = verb.slice(0, -1) + "ي";
    }

    //detect if the verb has a week middle
    //let weekMiddle = false;


    if (len === 3){
      befLast = "X"; //delete the vocal due to dictionary dependency
      if (! /[^أعحه][^أعحه]$/g.test(noDiac))
      if(/.ُ.[َُِ]?$/g.test(verb)) befLast = ""; //no change
      //explanation: verbs with three letters and have a dhamma
      //don't change the dhamma in present
    }
    else if (len > 3 && noDiac.startsWith("ت")) befLast = ""; //no change

    if(opts.tense === Tense.Pr){
      if(/^[ا]/g.test(verb)) verb = verb.slice(1);
      if (len < 4 || ! noDiac.startsWith("ت")) {
        verb = verb.replace(/^(.)[َُِْ]?/, "$1ْ");
      }

      if(len === 4) {
        //verb = verb.replace(/^(.)[َُِْ]?/, "$1ْ");
        begin += "ُ";//Add dhamma
      }
    }

    let pronounIdx = getPronounIndex(opts);
    let suffix = conjAffix[opts.tense].suffix[pronounIdx];
    let prefix = conjAffix[opts.tense].prefix[pronounIdx];
    if(! prefix) prefix = "";
    let result = verb;

    if (befLast) {
      if(befLast === "X") befLast = "";
      result = result.replace(/(.)[َُِْ]?(.)[َُِْ]?$/, "$1" + befLast + "$2");
    }

    //result = result.replace(/[َ]?$/, endDiac);

    //result = begin + result + end;
    result = prefix + result + suffix;
    //Normalization of alif
    //order is important, don't change
    result = result.replace(/أَأْ/, "آ");
    result = result.replace(/أَا/, "آ");
    result = result.replace(/ِأِي/, "ئِي");
    result = result.replace(/ِأ(.?)/, "ئ$1");
    result = result.replace(/أُو/, "ؤُو");
    result = result.replace(/أُو/, "ؤُو");

    if (future) result = "سَوْفَ " + result;


    return result;

  };

  const pronouns = [
    "أَنَا", "نَحْنُ",
    "أَنْتَ", "أَنْتِ", "أَنْتُمَا", "أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ",
    "هُوَ", "هِيَ", "هُمَا", "هُمَا", "هُمْ", "هُنَّ"
  ];

  Me.getPronounName = function(opts) {
    return pronouns[getPronounIndex(opts)];
  };

  /**
   * Normalization method for Arabic: it helps delete vocalization
   * * voc: delete vocalization
   * * alef: Replace all alef variants with the simple alef
   * * yeh: Relace the alif maqsorah with yeh
   * * teh: Replace teh marbuta with heh
   * * _: Delete tatweel
   * @method normalize
   * @param  {string} word the word to be normalized
   * @param  {string} opts some options (optional) where each language defines its own
   * normalization options
   * @return {string}      normalized word
   **/
  Me.normalize = function(word, opts) {
    let norm = word.trim();

    //If no options are afforded, do all
    if (! opts || opts.length < 1) {
      opts = "voc,alef,yeh,teh,_";
    }

    //Delete vocals: fathah, kasrah, etc.
    if (opts.includes("voc")) {
      norm = norm.replace(/[َ ً ُ ٍ ْ ِ ٌ]/g, "");
    }

    //Replace all alef variants with the simple alef
    if (opts.includes("alef")) {
      norm = norm.replace(/[أإآ]/g, "ا");
    }

    //Relace the alif maqsorah with yeh
    if (opts.includes("yeh")) {
      norm = norm.replace(/[ى]/g, "ي");
    }

    //Replace teh marbuta with heh
    if (opts.includes("teh")) {
      norm = norm.replace(/[ة]/g, "ه");
    }

    //Delete tatweel
    if (opts.includes("_")) {
      norm = norm.replace(/[ـ]+/g, "");
    }

    return norm;

  };

  //=========================================================
  //                 STEMMERS
  //=========================================================

  /**
   * A method for Arabic stemming which aims to use regex as much as possible
   * @private
   * @static
   * @method jslinguaAraStemmer
   * @param  {[type]}          word [description]
   * @return {[type]}               [description]
   */
  function jslinguaAraStemmer(word) {
    let stem = word;
    return stem;
  }


}());
