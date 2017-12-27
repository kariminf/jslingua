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
    Morpho.newStemmer.call(this, "snowballFrStemmer", "French Snowball stemmr", snowballStemmer);

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
        {person:Person.T, number: GNumber.P, gender: Gender.M},//Ils
        {person:Person.T, number: GNumber.P, gender: Gender.F}//Elles

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

  //http://snowball.tartarus.org/algorithms/french/stemmer.html
  const vowels = "aeiouyâàëéêèïîôûù";

  //TODO complete snowball stemmer
  function snowballStemmer(word) {

    //The word must be lower case
    //============================
    word = word.toLowerCase();

    //vowel marking: considering some vowels as cosonents
    //===================================================
    //TODO these are in conflect; fix may be using a loop rather than regexp
    word = word.replace("qu", "qU");
    word = word.replace(new RegExp("([" + vowels + "])([ui])([" + vowels + "])", "g"),
    function(match, p1, p2, p3, offset, string) {
      return p1 + p2.toUpperCase() + p3;
    }
    );
    word = word.replace(new RegExp("([" + vowels + "])y", "g"), "$1Y");
    word = word.replace(new RegExp("y([" + vowels + "])", "g"), "Y$1");


    //mark regions
    //============
    let rv = "", r1 = "", r2 = "";
    let m;
    let reg = new RegExp("^[" + vowels + "]{2}.(.*)$");
    if ((m = reg.exec(word)) != null) { //the word starts with two vowels
      rv = m[1];
    }
    else { //The word don't start with two vowels
      reg = new RegExp("^(par|col|tap)(.*)$");
      if ((m = reg.exec(word)) != null) rv = m[2];//if it starts with par, col or tap
      else { //otherwise, it's the string after the first vowel with is not a starting one
        reg = new RegExp("^.[^" + vowels + "]*" + "[" + vowels + "]" + "(.*)$");
        if ((m = reg.exec(word)) != null) rv = m[1];
      }
    }

    //R1 is the region after the first non-vowel following a vowel,
    //or the end of the word if there is no such non-vowel.
    reg = new RegExp("^[^" + vowels + "]*[" + vowels + "]+[^" + vowels + "](.*)$");
    if ((m = reg.exec(word)) != null) r1 = m[1];

    //R2 is the region after the first non-vowel following a vowel in R1,
    //or the end of the word if there is no such non-vowel
    if ((m = reg.exec(r1)) != null) r2 = m[1];

    console.log("rv= " + rv + ", r1= " + r1 + ", r2= " + r2);


    let pastWord = word;
    //Step 1
    let  processed = step1(word, rv, r1, r2);
    console.log(processed);

    if (processed.next) {
      word = step2(processed.stem, rv, r2);
    }

    if (word != pastWord) {
      //step3
      word = step3(word);
    }

    //The word hasn't been altered in any step
    if (word === pastWord) {
      //step4
      word = step4(word, rv, r2);
    }

    //Step 5: Undouble
    //If the word ends enn, onn, ett, ell or eill, delete the last letter
    if (/(?:enn|onn|ett|ei?ll)$/.test(word)) word = word.slice(0, -1);

    //Step 6: Un-accent
    //If the words ends é or è followed by at least one non-vowel, remove the accent from the e.
    word = word.replace(new RegExp("[éè]([^" + vowels + "]+)$"), "e$1");

    return word.toLowerCase();
  }

  function step4(word, rv, r2) {
    //ion
    if (r2.endsWith("ion") && /ion[st]$/.test(rv)) return word.slice(0, -3);
    //ier   ière   Ier   Ière
    {
      let m, reg = new RegExp("^.*([iI](?:er|ère))$");
      if ((m = reg.exec(word)) != null && rv.endsWith(m[1])) return word.slice(0, -m[1].length) + "i";
    }

    if (rv.endsWith("e")) return word.slice(0, -1);

    if (word.endsWith("gue") && rv.endsWith("e")) return word.slice(0, -1);


    return word;

  }

  function step3(word) {
    if (word.endsWith("Y")) return word.slice(0, -1) + "i";
    if (word.endsWith("ç")) return word.slice(0, -1) + "c";
    return word;
  }

  //Verb suffixes removal
  function step2(word, rv, r2) {
    let m, reg;

    //Step 2a: Verb suffixes beginning i
    //Search for the longest among the following suffixes and if found, delete if preceded by a non-vowel.
    //îmes   ît   îtes   i   ie   ies   ir   ira   irai   iraIent   irais
    //  irait   iras   irent   irez   iriez   irions   irons   iront   is
    //  issaIent   issais   issait   issant   issante   issantes   issants
    //   isse   issent   isses   issez   issiez   issions   issons   it
    reg = new RegExp("^.*[^" + vowels + "](îmes|ît|îtes|i|ies?|i[rst]|ir(?:as?|ai|ont)|iss(?:ante?s?|es?)|(ir|iss)(?:ai[st]|aIent|i?ons|i?ez|ent))$");
    if ((m = reg.exec(word)) != null) {
      if ((new RegExp("^[^" + vowels + "]" + m[1])).test(rv)) return stem:word.slice(0, -m[1].length);
    }

    //Step 2b: Other verb suffixes
    //ions: delete if in R2
    if (word.endsWith("ions") && r2.endsWith("ions")) return word.slice(0, -4);
    //é   ée   ées   és   èrent   er   era   erai   eraIent   erais   erait
    //eras   erez   eriez   erions   erons   eront   ez   iez
    reg = new RegExp("^.*(er|èrent|ée?s?|er(?:as?|ai[st]?|i?ez|i?ons|ont|aIent))$");
    if ((m = reg.exec(word)) != null) {
      if (rv.contains(m[1])) return stem:word.slice(0, -m[1].length);
    }
    //âmes   ât   âtes   a   ai   aIent   ais   ait   ant   ante   antes   ants
    //as   asse   assent   asses   assiez   assions
    reg = new RegExp("^.*(ât|â[tm]es|as?|ai[st]?|ante?s?|aIent|ass(?:es?|ent|iez|ions))$");
    if ((m = reg.exec(word)) != null && rv.contains(m[1])) {
      word = word.slice(0, -m[1].length);
      //if preceded by e, delete
      if (word.endsWith("e") && rv.contains("e" + m[1])) return word.slice(0, -1);
      return word;
    }


    return word;
  }

  //Standard suffix removal
  function step1(word, rv, r1, r2) {
    let m, reg;

    //ance   iqUe   isme   able   iste   eux   ances   iqUes   ismes   ables   istes
    reg = new RegExp("^.*(eux|ances?|iqUes?|ismes?|ables?|istes?)$");
    if ((m = reg.exec(word)) != null) {
      if (r2.endsWith(m[1])) return {stem:word.slice(0, -m[1].length), next:false};
    }

    //atrice   ateur   ation   atrices   ateurs   ations
    reg = new RegExp("^.*(atrices?|ateurs?|ations?)$");
    if ((m = reg.exec(word)) != null) {
      if (r2.endsWith(m[1])) {
        word = word.slice(0, -m[1].length);
        if (!word.endsWith("ic")) return {stem:word, next:false};
        if (r2.endsWith("ic" + m[1])) return {stem:word.slice(0, -2), next:false};
        return {stem:word.slice(0, -1) + "qU", next:false};
      }
    }

    //logie   logies
    reg = new RegExp("^.*log(ies?)$");
    if ((m = reg.exec(word)) != null) {
      if (r2.endsWith("log" + m[1])) return {stem:word.slice(0, -m[1].length), next:false};
    }

    //usion   ution   usions   utions
    reg = new RegExp("^.*u(sions?|tions?)$");
    if ((m = reg.exec(word)) != null) {
      if (r2.endsWith("u" + m[1])) return {stem:word.slice(0, -m[1].length), next:false};
    }

    //ence   ences
    reg = new RegExp("^.*en(ces?)$");
    if ((m = reg.exec(word)) != null) {
      if (r2.endsWith("en" + m[1])) return {stem:word.slice(0, -m[1].length) + "t", next:false};
    }

    //ement   ements
    reg = new RegExp("^.*(ements?)$");
    if ((m = reg.exec(word)) != null && rv.endsWith(m[1])) {
        //delete if in RV
        word = word.slice(0, -m[1].length);
        //if preceded by iv, delete if in R2 (and if further preceded by at, delete if in R2)
        if (r2.endsWith("iv" + m[1])) {//here word.endsWith("iv") ommited since r2 is the end
          word = word.slice(0, -2);
          if (r2.endsWith("ivat" + m[1])) return {stem:word.slice(0, -2), next:false};
          return {stem:word, next:false};
        }
        //if preceded by eus, delete if in R2, else replace by eux if in R1, otherwise,
        if (word.endsWith("eus")) {
          if (r2.endsWith("eus" + m[1])) return {stem:word.slice(0, -3), next:false};
          if (r2.endsWith("eus" + m[1])) return {stem:word.slice(0, -1) + "x", next:false};
        }
        //if preceded by abl or iqU, delete if in R2, otherwise,
        if ( (new RegExp("^.*(abl|iqU)" + m[1] + "$")).test(r2)) {
          return {stem:word.slice(0, -3), next:false};
        }
        //if preceded by ièr or Ièr, replace by i if in RV
        if ( (new RegExp("^.*[iI]èr" + m[1] + "$")).test(rv)) {
          return {stem:word.slice(0, -3) + "i", next:false};
        }
        //otherwise
        return {stem:word, next:false};
    }//end ement(s)

    //ité   ités
    reg = new RegExp("^.*(ités?)$");
    if ((m = reg.exec(word)) != null && r2.endsWith(m[1])) {
      //delete if in R2
      word = word.slice(0, -m[1].length);
      //if preceded by abil, delete if in R2, else replace by abl
      if (word.endsWith("abil")){
        if (r2.endsWith("abil" + m[1])) return {stem:word.slice(0, -4), next:false};
        return {stem:word.slice(0, -2) + "l", next:false};
      }
      //if preceded by ic, delete if in R2, else replace by iqU
      if (word.endsWith("ic")){
        word = word.slice(0, -2);
        if (r2.endsWith("ic" + m[1])) return {stem:word, next:false};
        return {stem:word + "iqU", next:false};
      }
      //if preceded by iv, delete if in R2
      if (r2.endsWith("iv" + m[1])) return {stem:word.slice(0, -2), next:false};
      //otherwise
      return {stem:word, next:false};
    }

    //if ive ifs ives
    reg = new RegExp("^.*(ifs?|ives?)$");
    if ((m = reg.exec(word)) != null && r2.endsWith(m[1])) {
      //delete if in R2
      word = word.slice(0, -m[1].length);
      //if preceded by at, delete if in R2
      if (r2.endsWith("at" + m[1])) {
        word = word.slice(0, 2);
        if (! word.endsWith("ic")) return {stem:word, next:false};
        //and if further preceded by ic, delete if in R2, else replace by iqU
        word = word.slice(0, 2);
        if (r2.endsWith("icat" + m[1])) return {stem:word, next:false};
        return {stem:word + "iqU", next:false};
      }
    }

    //eaux
    if (word.endsWith("eaux")) return {stem:word.slice(0, -1), next:false};

    //aux replace with al if in R1
    if (r1.endsWith("aux")) return {stem:word.slice(0, -2) + "l", next:false};

    //euse euses
    reg = new RegExp("^.*(euses?)$");
    if ((m = reg.exec(word)) != null) {
      //delete if in R2
      if (r2.endsWith(m[1])) return {stem:word.slice(0, -m[1].length), next:false};
      //else replace by eux if in R1
      if (r1.endsWith(m[1])) return {stem:word.slice(0, 2-m[1].length) + "x", next:false};
    }

    //issement issements
    reg = new RegExp("^.*[^" + vowels + "](issements?)$");
    if ((m = reg.exec(word)) != null) {
      //delete if in R1 and preceded by a non-vowel
      if (r1.endsWith(m[1])) return {stem:word.slice(0, -m[1].length), next:false};
    }

    // amment, emment
    reg = new RegExp("^.*([ae])mment$");
    if ((m = reg.exec(word)) != null) {
      //replace with ant, ent if in RV
      if (rv.endsWith(m[1] + "mment")) return {stem:word.slice(0, -5) + "nt", next:false};
    }

    // ment ments
    reg = new RegExp("^.*(ments?)$");
    if ((m = reg.exec(word)) != null) {
      //delete if preceded by a vowel in RV
      if ((new RegExp("^.*[" + vowels + "]" + m[1]) + "$").test(rv)) return {stem:word.slice(0, -m[1].length), next:false};
    }

    return {stem:word, next:true};
  }

  //TODO normalization of words
  Me.normalize = function(word, _opts){
    return word;
  };


}());
