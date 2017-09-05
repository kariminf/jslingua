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
  Voice = F.Voice,
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
      suffix: ["ُ", "ُ", "ُ", "ِينَ", "َانِ", "َانِ", "ُونَ", "ْنَ", "ُ", "ُ", "َانِ", "َانِ", "ُونَ", "ْنَ"]
    },
    [Tense.Pa]: {
      prefix: [],
      suffix: ["ْتُ", "ْنَا", "ْتَ", "ْتِ", "ْتُمَا", "ْتُمَا", "ْتُمْ", "ْتُنَّ", "َ", "َتْ", "َا", "َتَا", "ُوا", "ْنَ"]
    }
  };

  /**
   * A function that gives the pronoun index in conjugation table
   * @method getPronounIndex
   * @param  {object}        opts contains person, number and gender
   * @return {number}             a number from 0 to 13
   */
  function getPronounIndex(opts) {

    if (opts.person === Person.F) {
      if (opts.number === GNumber.S) return 0;
      else return 1;
    }

    let personIdx = (Object.values(Person).indexOf(opts.person)-1) * 6;
    let numberIdx = Object.values(GNumber).indexOf(opts.number) * 2;
    let genderIdx = Object.values(Gender).indexOf(opts.gender);

    return personIdx + numberIdx + genderIdx + 2;
  }


  /**
   * An object to be a midium between different functions
   * @type {Object}
   */
  let verbInfo = {
    /**
     * The verb
     * @type {String}
     */
    verb: "",
    /**
     * The filtered verb
     * @type {String}
     */
    filter: "",
    /**
     * The length of the verb
     * @type {Number}
     */
    len: 0,
    /**
     * Weak beginning
     * @type {Boolean}
     */
    wb: false,
    /**
     * Weak middle
     * @type {Boolean}
     */
    wm: false,
    /**
     * Weak ending
     * @type {Boolean}
     */
    we: false,
    /**
     * Mudaaf
     * @type {Boolean}
     */
    m: false
  };

  function verbTypes(verb) {
    //delete spaces
    verb = verb.trim();

    if (verb === verbInfo.verb) return;

    verbInfo.verb = verb;

    //replace Alif madda
    let filteredVerb = verb.replace("آ", "أا");
    //Muda33af
    filteredVerb = (/َ?ّ$/.test(verb))? filteredVerb + filteredVerb.slice(-1): filteredVerb;
    //delete diacretics
    filteredVerb = filteredVerb.replace(/[َُِّْ]/gi, "");//fat,dam,kas,shad,sukun

    verbInfo.filter = filteredVerb;


    verbInfo.len = filteredVerb.length;

    //detect if the verb with weak begining
    verbInfo.wb = /^[او]/.test(filteredVerb);//alif does not belong to mithal, but it has the same
    //yaa is ommited since it will not be deleted

    //detect if the verb has a weak middle
    verbInfo.wm = /[اآ].$/.test(filteredVerb);

    //detect if the verb has a weak ending
    verbInfo.we = /[اى]$/.test(filteredVerb);

    //detect if muda33af
    verbInfo.m = /َّ?$/.test(verb);

    console.log(verb);

  }

  function affixHandler(conjVerb, opts, pronounIdx) {
    let suffix = "";
    if (opts.negated) {
      let end = (opts.tense === Tense.Pa)? "ْ": "َ";
      suffix = conjAffix[Tense.Pr].suffix[pronounIdx];
      if (/[^ْ]ن[َِ]$/.test(suffix)) {//delete nuun with negation when not preceded by sukuun
        suffix = suffix.slice(0, -2);
        if (suffix.endsWith("و")) suffix += "ا";
      } //Otherwise add fatha for present, sukuun for past
      else suffix = suffix.slice(0, -1) + end;
      opts.tense = Tense.Pr;
      conjVerb.dV = "ْ";
    }
    else {
      suffix = conjAffix[opts.tense].suffix[pronounIdx];
    }
    conjVerb.s = suffix;

    let prefix = conjAffix[opts.tense].prefix[pronounIdx];
    if(! prefix) prefix = "";
    conjVerb.p = prefix;
  }


  function weakBeginHandler(conjVerb, opts) {
    let verb = conjVerb.v;
    if (opts.tense === Tense.Pr) {
      verb = verb.slice(1);//verb starts with alif
      conjVerb.dV = "";
    }
    conjVerb.v = verb;
  }

  function weakMiddleHandler(conjVerb, opts, pronounIdx) {

    let verb = conjVerb.v,
    weakType = weakMiddleOrigin(verb, verbInfo.filter),
    diacV = "َُِ"[weakType],
    diacR = "";


    if (opts.tense === Tense.Pa) {
      diacR = (verbInfo.len === 3)? "ُ": "َ";

      if (pronounIdx === 13 || pronounIdx < 8) {
        verb = verb.replace(/^(.+)ا(.َ?)$/, "$1$2");
        if (verb.startsWith("آ")) verb = "أ" + verb.slice(1);
        if (weakType === 0) diacV = "ِ";
      }
      else {
        diacR = "";
        diacV = "َ";
      }
    }
    else {//Present
      let weakChar = "اوي"[weakType];
      //with plural feminine; delete the weakChar
      if ([7, 13].indexOf(pronounIdx) > -1) weakChar = "";

      verb = verb.replace(/^(.+)ا(.َ?)$/, "$1" + weakChar + "$2");
    }

    conjVerb.v = verb;
    conjVerb.dV = diacV;
    conjVerb.dR = diacR;

  }

  function weakEndHandler(conjVerb, opts) {
    let verb = conjVerb.v;
    if (opts.tense === Tense.Pa) conjVerb.dR = "َ";
    verb = verb.slice(0, -1);
    if (verbInfo.filter.endsWith("ى")) verb += "ي";//TODO fix
    else verb += "و";//TODO fix
    //Sometimes it is not a

    conjVerb.v = verb;
  }

  function mudaafHandler(conjVerb, opts) {
    let verb = conjVerb.v;
    if (opts.tense === Tense.Pr) {
      verb = verb.replace(/َ$/, "");
      conjVerb.dV = "ُ";
      conjVerb.dR = "";
    } else {
      conjVerb.dR = "َ";
      verb = verb.replace(/^(.*)(.)َّ?$/, "$1$2َ$2ْ");
    }

    conjVerb.v = verb;

  }

  function voiceHandler(conjVerb, opts) {
    if (opts.voice === Voice.P) {
      if (opts.tense === Tense.Pa) {
        conjVerb.dV = "ُ";
        conjVerb.dR = "ِ";
      }
      else {
        conjVerb.p = conjVerb.p.slice(0, -1) + "ُ";
      }

    }
  }

  function verbLengthHandler(conjVerb, opts) {
    let verb = conjVerb.v,
    filteredVerb = verbInfo.filter,
    diacV = conjVerb.dV,
    diacR = conjVerb.dR,
    prefix = conjVerb.p;

    if (verbInfo.len === 3) {
      diacR = "X"; //delete the vocal due to dictionary dependency
      if (! /[^أعحه][^أعحه]$/g.test(filteredVerb))
      if (/.ُ.[َُِ]?$/g.test(verb)) diacR = ""; //no change
      //explanation: verbs with three letters and have a dhamma
      //don't change the dhamma in present
    }
    else if (conjVerb.len > 3 && filteredVerb.startsWith("ت")) diacR = ""; //no change

    if (opts.tense === Tense.Pr) {

      if (verbInfo.len < 4 || ! filteredVerb.startsWith("ت")) {
        //sukuun
      }

      if (verbInfo.len === 4) {
        //verb = verb.replace(/^(.)[َُِْ]?/, "$1ْ");
        verb = verb.replace(/^.َ?/, "");
        prefix = prefix.slice(0, -1) + "ُ";
        diacV = "ْ";
      }
    }
    else { //past
      //verb = verb.replace(/^(.)[َُِْ]?/, "$1َ");//This, for indicative active
      //TODO passive

      if (conjVerb.len === 4) {
        diacR = "َ";
      }

    }

    conjVerb.v = verb;
    verbInfo.filter = filteredVerb;
    conjVerb.dV = diacV;
    conjVerb.dR = diacR;
    conjVerb.p = prefix;
  }

  function diacreticsHandler(conjVerb) {
    let diacV = conjVerb.dV,
    diacR = conjVerb.dR,
    verb = conjVerb.v;

    if (diacR) {
      if (diacR === "X") diacR = "";//delete current one
      verb = verb.replace(/(.)[َُِْ]?(.)[َُِْ]?$/, "$1" + diacR + "$2");
    }

    if (diacV) {
      if (diacV === "X") diacV = "";//delete current one
      verb = verb.replace(/^(.)[َُِْ]?/, "$1" + diacV);
    }

    conjVerb.v = verb;
  }

  /**
   * [conjugate description]
   * @method conjugate
   * @param  {[type]}  verb [description]
   * @param  {[type]}  opts [description]
   * @return {[type]}       [description]
   */
  Me.conjugate = function(verb, opts) {

    verbTypes(verb);

    let filteredVerb = verbInfo.filter;

    //Future is prefix + present
    let future = 0;
    if (opts.tense === Tense.Fu) {
      future = 1;
      opts.tense = Tense.Pr;
    }

    let pronounIdx = getPronounIndex(opts);

    let conjVerb = {
      v: verb,
      s: "",
      p: "",
      dV: (opts.tense === Tense.Pr)? "ْ": "َ",
      dR: "ِ",
      dB: "ِ"//kasra for the char before last
    };

    affixHandler(conjVerb, opts, pronounIdx);

    if (verbInfo.wb) weakBeginHandler(conjVerb, opts);

    if (verbInfo.wm) weakMiddleHandler(conjVerb, opts, pronounIdx);

    if (verbInfo.we) weakEndHandler(conjVerb, opts);

    if (verbInfo.m) mudaafHandler(conjVerb, opts);

    voiceHandler(conjVerb, opts);

    //detect if the verb has a weak middle
    //let weakMiddle = false;


    verbLengthHandler(conjVerb, opts);

    diacreticsHandler(conjVerb);

    //naqis normalization
    if (verbInfo.we) weakEndNormalization(conjVerb, pronounIdx, opts.tense);

    let result = conjVerb.p + conjVerb.v + conjVerb.s;

    //Normalization of alif
    result = conjNormakizeAlif(result);

    if (future) result = "سَوْفَ " + result;


    return result.trim();

  };

  /**
   * Normalizing alif after conjugation
   * @static
   * @private
   * @method conjNormakizeAlif
   * @param  {string}          verb conjugated verb
   * @return {string}               verb with alif normalization
   */
  function conjNormakizeAlif(verb) {
    //order is important, don't change
    verb = verb.replace(/أْوِ/, "ؤُو");
    verb = verb.replace(/أَأْ/, "آ");
    verb = verb.replace(/أَا/, "آ");
    verb = verb.replace("أِي", "ئِي");
    verb = verb.replace(/ِأ(.?)/, "ئ$1");
    verb = verb.replace(/أُو/, "ؤُو");
    verb = verb.replace(/أُو/, "ؤُو");
    verb = verb.replace(/([ِي])ء([َُِْ].)/, "$1ئ$2");
    verb = verb.replace(/اءُ?و/, "اؤُو");

    return verb;
  }

  //verbs taken from Shereen Khoja stemmer
  //http://zeus.cs.pacificu.edu/shereen/research.htm
  const midWaw = {
    "أب": 1, "أج": 1, "أد": 1, "أر": 1, "أز": 1, "أش": 1, "أض": 1, "أف": 1, "أق": 1, "أل": 1, "أن": 1, "أه": 1, "أي": 1,

    "بب": 1, "بح": 1, "بخ": 1, "بر": 1, "بز": 1, "بس": 1, "بش": 1, "بص": 1, "بغ": 1, "بق": 1, "بل": 1,

    "تب": 1, "تج": 1, "تق": 1,

    "ثب": 1, "ثر": 1, "ثل": 1, "ثي": 1,

    "جب": 1, "جح": 1, "جد": 1, "جر": 1, "جز": 1, "جس": 1, "جط": 1, "جع": 1, "جف": 1, "جق": 1, "جل": 1, "جن": 1, "جو": 1, "جي": 1,

    "حب": 1, "حت": 1, "حث": 1, "حج": 1, "حذ": 1, "حز": 1, "حس": 1, "حش": 1, "حص": 1, "حط": 1, "حف": 1, "حق": 1, "حك": 1, "حل": 1, "حم": 1, "حي": 1,

    "خج": 1, "خخ": 1, "خذ": 1, "خر": 1, "خص": 1, "خض": 1, "خل": 1, "خن": 1, "خو": 1, "خي": 1,

    "دء": 1, "دب": 1, "دح": 1, "دخ": 1, "دد": 1, "در": 1, "دس": 1, "دش": 1, "دط": 1, "دغ": 1, "دف": 1, "دق": 1, "دك": 1, "دل": 1, "دم": 1, "دن": 1, "دي": 1,

    "ذب": 1, "ذد": 1, "ذق": 1, "ذي": 1,

    "رب": 1, "رث": 1, "رج": 1, "رح": 1, "رد": 1, "رز": 1, "رس": 1, "رض": 1, "رع": 1, "رغ": 1, "رق": 1, "رل": 1, "رم": 1, "ري": 1,

    "زج": 1, "زح": 1, "زر": 1, "زغ": 1, "زق": 1, "زل": 1, "زم": 1, "زن": 1, "زي": 1,

    "سء": 1, "سج": 1,  "سخ": 1, "سد": 1,  "سط": 1, "سع": 1, "سغ": 1, "سف": 1, "سق": 1, "سك": 1, "سم": 1, "سي": 1,

    "شب": 1, "شر": 1, "شش": 1, "شط": 1, "شظ": 1, "شف": 1, "شق": 1, "شك": 1, "شل": 1, "شم": 1, "شه": 1, "شي": 1,

    "صب": 1, "صت": 1, "صج": 1, "صح": 1, "صص": 1, "صع": 1, "صغ": 1, "صف": 1, "صل": 1, "صم": 1, "صن": 1,

    "ضء": 1, "ضج": 1, "ضر": 1, "ضي": 1,

    "طح": 1, "طد": 1, "طس": 1, "طع": 1, "طف": 1, "طق": 1, "طل": 1, "طي": 1,

    "عج": 1, "عد": 1, "عذ": 1, "عر": 1, "عز": 1, "عص": 1, "عض": 1, "عق": 1, "عل": 1, "عم": 1, "عن": 1, "عه": 1, "عي": 1,

    "غء": 1, "غر": 1, "غز": 1, "غش": 1, "غص": 1, "غط": 1, "غغ": 1, "غل": 1, "غي": 1,

    "فت": 1, "فج": 1, "فح": 1, "فد": 1, "فر": 1, "فز": 1, "فط": 1, "فع": 1, "فف": 1, "فق": 1, "فل": 1, "فه": 1,

    "قب": 1, "قت": 1, "قد": 1, "قر": 1, "قش": 1, "قص": 1, "قض": 1, "قط": 1, "قع": 1, "قق": 1, "قل": 1, "قم": 1, "قن": 1, "قه": 1, "قي": 1,

    "كب": 1, "كخ": 1, "كر": 1, "كز": 1, "كس": 1, "كش": 1, "كع": 1, "كف": 1, "كك": 1, "كم": 1, "كن": 1, "كي": 1,

    "لب": 1, "لث": 1, "لج": 1, "لح": 1, "لذ": 1, "لز": 1, "لس": 1, "لص": 1, "لط": 1, "لع": 1, "لف": 1, "لك": 1, "لم": 1, "لي": 1,

    "مء": 1, "مت": 1, "مج": 1, "مر": 1, "من": 1, "مه": 1,

    "نء": 1, "نب": 1, "نت": 1, "نح": 1, "نخ": 1, "ند": 1, "نر": 1, "نس": 1, "نش": 1, "نص": 1, "نط": 1, "نع": 1, "نف": 1, "نق": 1,  "نن": 1, "نه": 1, "نو": 1, "ني": 1,

    "هت": 1, "هد": 1, "هر": 1, "هس": 1, "هش": 1, "هع": 1, "هل": 1, "هن": 1, "هو": 1, "هي": 1,

    "يد": 1, "يم": 1
  },
  midYaa = {
    "أب": 1, "أد": 1, "أر": 1, "أس": 1, "أض": 1, "أك": 1, "أل": 1, "أم": 1, "أن": 1,

    "بت": 1, "بد": 1, "بض": 1, "بع": 1, "بن": 1,

    "تح": 1, "تر": 1, "تس": 1, "تل": 1, "تم": 1, "ته": 1,

    "جء": 1, "جش": 1, "جف": 1,

    "حث": 1, "حد": 1, "حر": 1, "حض": 1, "حف": 1, "حق": 1, "حك": 1, "حن": 1, "حو": 1, "حي": 1,

    "خب": 1, "خس": 1, "خش": 1, "خط": 1, "خل": 1, "خم": 1,

    "دث": 1, "دك": 1, "دن": 1,

    "ذع": 1, "ذل": 1,

    "رب": 1, "رس": 1, "رش": 1, "رع": 1, "رف": 1, "رل": 1, "رن": 1, "ري": 1,

    "زت": 1, "زح": 1, "زد": 1, "زز": 1, "زغ": 1, "زف": 1, "زق": 1, "زن": 1, "زي": 1,

    "سب": 1, "سح": 1, "سخ": 1, "سر": 1, "سف": 1, "سل": 1,

    "شب": 1, "شت": 1, "شح": 1, "شخ": 1, "شد": 1, "شط": 1, "شع": 1, "شف": 1, "شق": 1, "شل": 1, "شم": 1, "شن": 1,

    "صب": 1, "صح": 1, "صد": 1, "صر": 1, "صص": 1, "صع": 1, "صف": 1,

    "ضر": 1, "ضع": 1, "ضف": 1, "ضق": 1, "ضم": 1,

    "طب": 1, "طح": 1, "طر": 1, "طش": 1, "طع": 1, "طن": 1,

    "عب": 1, "عث": 1, "عر": 1, "عس": 1, "عش": 1, "عط": 1, "عف": 1, "عن": 1, "عه": 1, "عي": 1,

    "غب": 1, "غث": 1, "غد": 1, "غر": 1, "غض": 1, "غط": 1, "غظ": 1, "غل": 1, "غم": 1, "غن": 1, "غي": 1,

    "فء": 1, "فد": 1, "فش": 1, "فض": 1, "فظ": 1, "فف": 1, "فل": 1, "فن": 1,

    "قء": 1, "قح": 1, "قر": 1, "قس": 1, "قش": 1, "قض": 1, "قظ": 1, "قف": 1, "قن": 1, "قي": 1,

    "كد": 1, "كر": 1, "كس": 1, "كف": 1, "كل": 1, "كي": 1,

    "لث": 1, "لس": 1, "لق": 1, "لل": 1, "لن": 1, "لي": 1,

    "مح": 1, "مد": 1, "مر": 1, "مز": 1, "مس": 1, "مط": 1, "مع": 1, "مل": 1, "من": 1,

    "نق": 1, "نك": 1, "ني": 1,

    "هء": 1, "هب": 1, "هت": 1, "هج": 1, "هر": 1, "هش": 1, "هض": 1, "هط": 1, "هف": 1, "هل": 1, "هم": 1,

    "وب": 1, "ول": 1
  };

  /**
   * This object is used to save the last weak middle verb and its type.
   * This will optimize the process time when looking for the type of the
   * same used verb.
   * @private
   * @static
   * @type {Object}
   */
  let weakMiddleStack = {
    verb: "",
    res: ""
  };

  /**
   * Giving the type of weak middle verb
   * @private
   * @static
   * @method weakMiddleOrigin
   * @param  {string}         verb   the verb as introduced by user
   * @param  {string}         noDiac the verb filtered from vocalization, split shadda and split alif madda
   * @return {number}                an integer representing the origin of the middle alif:
   * <ul>
   * <li>0: alif itself</li>
   * <li>1: waw</li>
   * <li>2: Yaa</li>
   * </ul>
   */
  function weakMiddleOrigin(verb, noDiac) {

    //This is used for optimization
    if (weakMiddleStack.verb === verb) return weakMiddleStack.res;

    weakMiddleStack.verb = verb;

    if (noDiac.length > 3) {//Always yaa
      weakMiddleStack.res = 2;
      return 2;
    }

    let noWeek = noDiac[0] + noDiac[2];
    let res = 0;

    if (midWaw[noWeek]) res = 1;
    else if (midYaa[noWeek]) res = 2;

    weakMiddleStack.res = res;
    return res;
  }

  /**
   * Normalization of weak-end verbs
   * @static
   * @private
   * @method weakEndNormalization
   * @param  {object}             conjVerb       [description]
   * @param  {number}             pronounIdx [description]
   * @param  {Tense}             tense      [description]
   */
  function weakEndNormalization(conjVerb, pronounIdx, tense) {

    let verb = conjVerb.v,
    prefix = conjVerb.p,
    suffix = conjVerb.s;

    if (tense === Tense.Pa) {

      if (pronounIdx === 8) {
        prefix = suffix = "";
        let ending = verb.slice(-1);
        verb = verb.slice(0, -1);
        if (ending === "ي") verb += "ى";
        else verb += "ا";
      }
      else if ([9, 11, 12].indexOf(pronounIdx) > -1) {
        verb = verb.slice(0, -1);
        if (/[وي]$/.test(verb)) verb = verb.slice(0, -1);
      }
    }
    else {
      if ([0, 1, 2, 8, 9].indexOf(pronounIdx) > -1) suffix = "";
      else if ([3, 6, 12].indexOf(pronounIdx) > -1) {
        verb = verb.slice(0, -1);
        if (/[وي]$/.test(verb)) verb = verb.slice(0, -1);
      }
    }

    conjVerb.v = verb;
    conjVerb.p = prefix;
    conjVerb.s = suffix;

  }

  /**
   * List of Arabic personal pronouns
   * @private
   * @static
   * @type {Array}
   */
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
