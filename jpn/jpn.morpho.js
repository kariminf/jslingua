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
  var Tense = F.Tense;
  var Mood = F.Mood;
  var Voice = F.Voice;
  var GNumber = F.Number;
  var Aspect = F.Aspect;
  var Gender = F.Gender;
  var Person = F.Person;

  var C = Object.freeze;
  var Formality = C({
    Pl: "plain",
    Po: "polite",
    Fo: "formal"
  });

  var VType = C({
    V1: "ichidan",
    V5: "godan"
  });


  function JpnMorpho() {
    Morpho.call(this, "jpn");
    Morpho.newStemmer.call(this, "jslinguaJpnStemmer", "JsLingua Japanese stemmer", jslinguaJpnStemmer);
  }

  JpnMorpho.prototype = Object.create(Morpho.prototype);
  var Me = JpnMorpho.prototype;

  Me.constructor = JpnMorpho;

  //

  //=================
  //Conjugation zone
  //=================


  Me.getForms = function(){
    return {
      "Present": { // go
        mood: Mood.Indi,
        tense: Tense.Pr,
        aspect: Aspect.P
      },
      "Past": { //went
        mood: Mood.Indi,
        tense: Tense.Pa,
        aspect: Aspect.P
      },
      "Present continuous": { //is going
        mood: Mood.Indi,
        tense: Tense.Pr,
        aspect: Aspect.C
      },
      "Past continuous": {//was going
        mood: Mood.Indi,
        tense: Tense.Pa,
        aspect: Aspect.C
      },
      "Provision": {// Condition //TODO Provision
        mood: Mood.Indi
      },
      "Condition": { //Second type of condition
        mood: Mood.Cond
      },
      "Imperative": {// go
        mood: Mood.Impe
      },
      "Volutional": {//let's go //TODO volutional
        mood: Mood.Indi
      },
      "Causative": {// make go //TODO causative
        mood: Mood.Indi
      },
      "Potential": {// I can go
        mood: Mood.Pote
      }
    };
  }

  Me.getConjugModel = function(){
    //Past and Present are defaults
    return {
      rows: ["Voice", "Formality"],
      cols: ["Negation"]
    };
  }

  function getFormalityOpts(){
    return [
      {formality: Formality.Pl},
      {formality: Formality.Po},
      {formality: Formality.Fo}
    ];
  }

  Me.getOptLists = function(optLabel){
    if (optLabel === "Formality") return getFormalityOpts();
    return Morpho.prototype.getOptLists.call(this, optLabel);
  }

  Me.getOptName = function(optLabel, opts){
    if (optLabel === "Formality"){
      if(opts.formality) return opts.formality;
      return "";
    }
    return Morpho.prototype.getOptName.call(this, optLabel, opts);
  }

  //https://en.wikipedia.org/wiki/Japanese_pronouns
  //TODO pronouns problem in Japanese
  Me.getPronounOpts = function(){
    return [
      {person:Person.F, number: GNumber.S}, // watashi
      {person:Person.F, number: GNumber.P}, //watashi-tachi
      {person:Person.S, number: GNumber.S}, //anata
      {person:Person.S, number: GNumber.P}, //anata-tachi
      {person:Person.T, number: GNumber.S, gender:Gender.M}, //kare
      {person:Person.T, number: GNumber.S, gender:Gender.F}, //kanojo
      {person:Person.T, number: GNumber.P} //karera
    ];
  }


  Me.getPronounName = function(opts){
    switch (opts.person) {
      case Person.F:
      if (opts.number === GNumber.S) return "私";
      else return "私たち";

      case Person.S:
      if (opts.number === GNumber.S) return "あなた";
      else return "あなたたち";

      case Person.T:
      if (opts.number == GNumber.S) {
        switch (opts.gender) {
          case Gender.M: return "彼";
          case Gender.F: return "彼女";
          default: return "彼";
        }
      } else return "彼ら";

    }
    return "";
  }


  var
  uSound = "うるくむぬすつぶぐず",
  iSound = "いりきみにしちびぎじ",
  eSound = "えれけめねせてべげず",//verify the last + れ
  tSound = "っっいんんしっんいじ",//verify ず
  aSound = "わらかまなさたばがじ";//verify ず

  function basicForm(verb, sound, vtype){

    var end = verb.slice(-1);

    if(uSound.indexOf(end) < 0) return "";

    if(vtype === VType.V1) return verb.slice(0, -1);


    return verb.slice(0, -1) + sound.charAt(uSound.indexOf(end));

  }

  function tForm(verb, teta, vtype){

    var end = verb.slice(-1);

    if(uSound.indexOf(end) < 0) return "";

    var res = "て";
    if(uSound.indexOf(end) > 6 ){
      res = "で";
      if(teta) res = "だ";
    }
    else if(teta) res = "た";

    if(vtype === VType.V1) return verb.slice(0, -1) + res;

    res = tSound.charAt(uSound.indexOf(end)) + res;

    return verb.slice(0, -1) + res;

  }

  function verifyType(verb, opts){
    if(opts.vtype && opts.vtype in VType) return;
    //TODO detect the type
    opts.vtype = VType.V5;

  }

  //https://en.wikipedia.org/wiki/Japanese_verb_conjugation
  //Override conjugate function
  Me.conjugate = function(verb, opts){

    var begin = "";
    var end = "";

    verifyType(verb, opts);

    var vtype =  opts.vtype;

    /*
    if(opts.potential){
      verb = basicForm(verb, aSound, vtype) + "せる";
      vtype = VType.V1;
    }*/

    if(opts.voice === Voice.P){
      verb = basicForm(verb, aSound, vtype) + "れる";
      vtype = VType.V1;
    }

    switch (opts.mood) {

      case Mood.Indi:

      if(opts.aspect === Aspect.C){
        begin = tForm(verb, 0, vtype);
        vtype = VType.V1;
        verb = "いる";
      }

      switch (opts.formality) {
        case Formality.Po:
        verb = basicForm(verb, iSound, vtype);
        end = "ます";
        if(opts.tense === Tense.Pa) end = "ました";
        if(opts.negated){
          end = "ません";
          if(opts.tense === Tense.Pa) end += "でした";
        }
        break;

        case Formality.Pl:
        if(opts.tense === Tense.Pa) end = "ました";
        if(opts.negated){
          verb = basicForm(verb, aSound, vtype);
          if(opts.tense === Tense.Pa) end = "なかった";
          else end = "ない";
        } else {
          if(opts.tense === Tense.Pa){
            verb = tForm(verb, 1, vtype);//TA
            end = "";
          }
        }
        break;

        default:
        verb = "";
        begin = "";
        end = "";

      }//End Indiative Mood
      break;

      case Mood.Impe: //Begin Imperative Mood

      switch (opts.formality) {
        case Formality.Po:
        verb = tForm(verb, 0, vtype);
        if(opts.negated) end = "ないで";
        end += "下さい";
        break;

        case Formality.Pl:
        if(opts.negated) end = "な";
        //TODO suru, zuru, ichidan and kuru have different imperative
        else verb = basicForm(verb, eSound, vtype);
        break;

        default:
        verb = "";
        begin = "";
        end = "";
      }


      break;
      default:
      verb = "";
      begin = "";
      end = "";

    }

    var result = begin + verb + end;

    return result;

  }


  function jslinguaJpnStemmer(word){
    var stem = word;
    return stem;
  }



}());
