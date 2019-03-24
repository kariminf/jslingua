(function () {

  "use strict";

  //==========================================
  // EXPORTING MODULE
  //==========================================

  let Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Morpho = require("../morpho.js");
    module.exports = AraMorpho;
  }
  else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.aserv("morpho", "ara", AraMorpho);
  }

  //==========================================
  // CONSTANTS
  //==========================================

  //Different global features
  const F = Morpho.Feature,
  Tense = F.Tense,
  Mood = F.Mood,
  Voice = F.Voice,
  GNumber = F.Number,
  //Aspect = F.Aspect,
  Gender = F.Gender,
  Person = F.Person;

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

  //length one prefixes
  const isriP1 = ["ل", "ب", "ف", "س", "و", "ي", "ت", "ن", "ا"],
  //length two prefixes
  isriP2 = ["ال", "لل"],
  //length three prefixes
  isriP3 = ["كال", "بال", "ولل", "وال"],
  //length one suffixes
  isriS1 = ["ة", "ه", "ي", "ك", "ت", "ا", "ن"],
  //length two suffixes
  isriS2 = ["ون", "ات", "ان", "ين", "تن", "كم", "هن", "نا", "يا", "ها", "تم",
  "كن", "ني", "وا", "ما", "هم"],
  //length three suffixes
  isriS3 = ["تمل", "همل", "تان", "تين", "كمل"];



  //==========================================
  // INNER VARIABLES
  //==========================================

  /**
   * An object to be a medium between different functions
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

  //==========================================
  // CLASS CONSTRUCTOR
  //==========================================

  //var g;

  /**
   * Arabic language morphology
   *
   * @class AraMorpho
   * @extends Morpho
   */
  function AraMorpho() {
    Morpho.call(this, "ara");
    Morpho._nStem.call(this, "isri", "ISRI Arabic stemmer", __IsriAraStemmer);
    //Morpho._nStem.call(this, "jslingua", "JsLingua Arabic stemmer", __jslinguaAraStemmer);

    Morpho._nConv.call(this, "sing2pl", "Singular noun to Plural", __singular2plural);
    //Morpho._nConv.call(this, "sing2dual", "Singular noun to Dual", __singular2dual);

    this.ssplitter = /([.؟!])(?:\s+|$)/;

    //g = this.g;
  }

  AraMorpho.prototype = Object.create(Morpho.prototype);
  let Me = AraMorpho.prototype;
  Me.constructor = AraMorpho;

  //==========================================
  // STATIC FUNCTIONS
  //==========================================


  //==========================================
  // STEMMING FUNCTIONS
  //==========================================


  //==========================================
  // JSLINGUA STEMMER FUNCTIONS
  //==========================================

  /*let JsLinguaPS = {
    //templates
    "t": [
      /^ل[أنتي](.*)ن$/,

    ],
    //prifixes
    "p": [
      //3 length prefix
      isriP3,

    ]
  };

  */

  function __jsStem(word, startingList, endingList) {
    let l = "^(" + startingList.join("|") + ")";
    l = l + "(.*)(" + endingList.join("|") + ")$";
    l = new RegExp(l);

    let m;

    if (notNull(m = l.exec(word))) {
      let taa = m[3].startsWith("ت")? "ة": "";
      return m[2] + taa;
    }

    return word;
  }


  /**
   * A method for Arabic stemming which aims to use regex as much as possible
   *
   * @method __jslinguaAraStemmer
   * @private
   * @static
   * @memberof AraMorpho
   * @param  {String}          word the word to be stemmed
   * @return {String}               The stem
   */
  function __jslinguaAraStemmer(word) {
    let stem = word;

    stem = __jsStem(stem, isriP3, isriS3);//6

    stem = __jsStem(stem, isriP3, isriS2);//5

    stem = __jsStem(stem, isriP2, isriS3);//5

    stem = __jsStem(stem, isriP2, isriS2);//4

    stem = __jsStem(stem, isriP3, isriS1);//4

    stem = __jsStem(stem, isriP1, isriS3);//4

    stem = __jsStem(stem, isriP2, isriS1);//3

    stem = __jsStem(stem, isriP1, isriS2);//3

    stem = __jsStem(stem, isriP3, []);//3

    stem = __jsStem(stem, [], isriS3);//3

    stem = __jsStem(stem, isriP1, isriS1);//2

    stem = __jsStem(stem, isriP2, []);//2

    stem = __jsStem(stem, [], isriS2);//2

    stem = __jsStem(stem, isriP1, []);//1

    stem = __jsStem(stem, [], isriS1);//1

    return stem;//0
  }


  //==========================================
  // ISRI STEMMER FUNCTIONS
  //==========================================

  function __IsriAraStemmer(word) {
    let stem = word,
    norm = AraMorpho.prototype.norm;
    //normalization
    stem = norm(stem, "voc");
    //Stop words: ignore

    //remove length three and length two prefixes in this order
    stem = IsriPre32(stem);
    //remove length three and length two suffixes in this order
    stem = IsriSuf32(stem);
    //remove connective ‘و’ if it precedes a word beginning with ‘و’
    stem = IsriWaw(stem);
    //normalize initial hamza to bare alif
    stem = norm(stem, "ihamza");

    if (stem.length < 4) return stem;

    switch (stem.length) {
      case 4: return IsriProW4(stem);
      case 5:
      stem = IsriProW53(stem);
      return IsriEndW5(stem);
      case 6:
      stem = IsriProW6(stem);
      return IsriEndW6(stem);
      case 7:
      stem = IsriSuf1(stem);
      if (stem.length === 7) stem = IsriPre1(stem);
      if (stem.length === 6) {
        stem = IsriProW6(stem);
        stem = IsriEndW6(stem);
      }
      return stem;

      default: return stem;

    }
  }

  //remove length three and length two prefixes in this order
  function IsriPre32(word) {
    if (word.length >= 6) {
      for (let i in isriP3)
        if (word.startsWith(isriP3[i])) return word.slice(3);
    }

    if (word.length >= 5) {
      for (let i in isriP2) {
        if (word.startsWith(isriP2[i])) return word.slice(2);
      }
    }

    return word;
  }

  //remove length three and length two suffixes in this order
  function IsriSuf32(word) {
    if (word.length >= 6) {
      for (let i in isriS3)
        if (word.endsWith(isriS3[i])) return word.slice(0, -3);
    }

    if (word.length >= 5) {
      for (let i in isriS2) {
        if (word.endsWith(isriS2[i])) return word.slice(0, -2);
      }
    }

    return word;
  }

  //remove connective ‘و’ if it precedes a word beginning with ‘و’
  function IsriWaw(word) {
    if (word.length >= 4 && word.startsWith("وو")) return word.slice(1);
    return word;
  }

  //process length four patterns and extract length three roots
  function IsriProW4(word) {
    //مفعل
    if (word.startsWith("م")) return word.slice(1);
    //فاعل
    if (/^.ا/.test(word)) return word[0] + word.slice(2);
    // فعال - فعول - فعيل
    if (/^..[اوي]/.test(word)) return word.slice(0, -2) + word[3];
    //فعلة
    if (word[3] === "ة") return word.slice(0, -1);
    //normalize short sufix
    word = IsriSuf1(word);
    //normalize short prefix
    if (word.length === 4) word = IsriPre1(word);

    return word;

  }

  //normalize short sufix
  function IsriSuf1(word) {
    for (let i in isriS1)
      if (word.endsWith(isriS1[i]))
        return word.slice(0, -1);
    return word;
  }

  //normalize short prefix
  function IsriPre1(word) {
    for (let i in isriP1)
      if (word.startsWith(isriP1[i]))
        return word.slice(1);
    return word;
  }

  //process length five patterns and extract length three roots
  function IsriProW53(word) {
    let m;
    // افتعل - افاعل
    if (notNull(m = /^ا(.)[ات](.+)$/.exec(word))) return m[1] + m[2];
    // مفعول - مفعال - مفعيل
    if (notNull(m = /^م(..)[اوي](.)$/.exec(word))) return m[1] + m[2];
    // مفعلة - تفعلة - افعلة
    if (notNull(m = /^[متا](.+)ة$/.exec(word))) return m[1];
    // مفتعل - يفتعل - تفتعل
    if (notNull(m = /^[ميت](.)ت(.+)$/.exec(word))) return m[1] + m[2];
    // مفاعل - تفاعل
    if (notNull(m = /^[مت](.)ا(.+)$/.exec(word))) return m[1] + m[2];
    // فعولة - فعالة
    if (notNull(m = /^(..)[وا](.)ة$/.exec(word))) return m[1] + m[2];
    // انفعل - منفعل
    if (notNull(m = /^[ام]ن(.+)$/.exec(word))) return m[1];
    //افعال
    if (notNull(m = /^ا(..)ا(.)$/.exec(word))) return m[1] + m[2];
    //فعلان
    if (notNull(m = /^(...)ان$/.exec(word))) return m[1];
    //تفعيل
    if (notNull(m = /^ت(..)ي(.)$/.exec(word))) return m[1] + m[2];
    //فاعول
    if (notNull(m = /^(.)ا(.)و(.)$/.exec(word))) return m[1] + m[2] + m[3];
    //فواعل
    if (notNull(m = /^(.)وا(..)$/.exec(word))) return m[1] + m[2];
    //فعائل
    if (notNull(m = /^(..)ائ(.)$/.exec(word))) return m[1] + m[2];
    //فاعلة
    if (notNull(m = /^(.)ا(..)ة$/.exec(word))) return m[1] + m[2];
    //فعالي
    if (notNull(m = /^(..)ا(.)ي$/.exec(word))) return m[1] + m[2];

    //normalize short sufix
    word = IsriSuf1(word);
    //normalize short prefix
    if (word.length === 5) word = IsriPre1(word);

    return word;
  }

  //ending step (word of length five)
  function IsriEndW5(word) {
    if (word.length === 4) return IsriProW4(word);
    if (word.length === 5) return IsriProW54(word);
    return word;
  }

  //process length five patterns and extract length four roots
  function IsriProW54(word) {
    let m;
    //تفعلل - افعلل - مفعلل
    if (notNull(m = /^[تام](.+)$/.exec(word))) return m[1];
    //فعللة
    if (notNull(m = /^(.+)ة$/.exec(word))) return m[1];
    //فعالل
    if (notNull(m = /^(..)ا(..)$/.exec(word))) return m[1] + m[2];

    return word;
  }

  //process length six patterns and extract length three roots
  function IsriProW6(word) {
    let m;
    //مستفعل - استفعل
    if (notNull(m = /^[ام]ست(.+)$/.exec(word))) return m[1];
    //مفعالة
    if (notNull(m = /^م(..)ا(.)ة$/.exec(word))) return m[1] + m[2];
    //افتعال
    if (notNull(m = /^ا(.)ت(.)ا(.)$/.exec(word))) return m[1] + m[2] + m[3];
    //افعوعل
    if (notNull(m = /^ا(.)(.)و\2(.)$/.exec(word))) return m[1] + m[2] + m[3];
    //تفاعيل
    if (notNull(m = /^ت(.)ا(.)ي(.)$/.exec(word))) return m[1] + m[2] + m[3];

    //normalize short sufix
    word = IsriSuf1(word);
    //normalize short prefix
    if (word.length === 6) word = IsriPre1(word);

    return word;
  }

  //ending step (word of length six)
  function IsriEndW6(word) {
    if (word.length === 5) {
      word = IsriProW53(word);
      return IsriEndW5(word);
    }

    if (word.length === 6) return IsriProW64(word);

    return word;
  }

  //process length six patterns and extract length four roots
  function IsriProW64(word) {
    let m;
    //افعلال
    if (notNull(m = /^ا(...)ا(.)$/.exec(word))) return m[1] + m[2];
    //متفعلل
    if (notNull(m = /^مت(.+)$/.exec(word))) return m[1];

    return word;
  }

  //==========================================
  // CONVERTION FUNCTIONS
  //==========================================


  //https://blogs.transparent.com/arabic/broken-plural-in-arabic/
  //https://en.wikipedia.org/wiki/Broken_plural
  /**
   * Transforms a singular noun to plural
   *
   * @method __singular2plural
   * @private
   * @static
   * @memberof AraMorpho
   * @param  {String}        noun The noun to be transformed to plural
   * @return {String}             Plural form of the given noun
   */
  function __singular2plural(noun){
    let pattern = __find_pattern(noun);
    let nodiac = noun.replace(/[َُِْ]/g, "");
    nodiac = nodiac.replace(/(.)ّ/g, "$1$1");
    switch (pattern) {
      case "CiCaAC" || "CaCiICah": // "CaCiICah" two cases, one shared with "CiCaACah"
        return nodiac[0] + "ُ" + nodiac[1] + "ُ" + nodiac[3];
      //case "CaCiIC" //three cases
      case "CuCCah" || "CaCCah":
        return nodiac[0] + "ُ" + nodiac[1] + "َ" + nodiac[2];
      case "CiCCah":
        return nodiac[0] + "ِ" + nodiac[1] + "َ" + nodiac[2];
      case "CiCC":
        if (nodiac[1] == nodiac[2]) pattern = "CiIC";
      case "CiIC":
        return nodiac[0] + "ِ" + nodiac[1] + "َ" + nodiac[2] + "َة";
      //case "CiCC" || "CuCC" || "CaCC": //three cases
      case "CaCaC" || "CaCaCah":
        return "أَ" + nodiac[0] + "ْ" + nodiac[1] + "َا" + nodiac[2];
      case "CaCuUC":
        return "أَ" + nodiac[0] + "ْ" + nodiac[1] + "ِ" + nodiac[3] + "َة";
      case "CaACiC":
        return nodiac[0] + "ُ" + nodiac[2] + "َّا" + nodiac[3];
      case "CaACiCah":
        return nodiac[0] + "َوَا" + nodiac[2] + "ِ" + nodiac[3];
      case "CaACuUC":
        return nodiac[0] + "َوَا" + nodiac[2] + "ِي" + nodiac[4];
      case "CiCaACah": //|| "CaCiICah"
        return nodiac[0] + "َ" + nodiac[1] + "َائِ" + nodiac[3];
      case "CaCCaC" || "CuCCuC":
        return nodiac[0] + "َ" + nodiac[1] + "ْ" + nodiac[2] + "َ" + nodiac[3];
      case "maCCaC" || "maCCiC" || "miCCaCah":
        return nodiac[0] + "َ" + nodiac[1] + "َا" + nodiac[2] + "ِ" + nodiac[3];
      case (pattern.match(/^[Cm][aiu]CC(uU|aA|iI)C$/) || {}).input:
        return nodiac[0] + "َ" + nodiac[1] + "َا" + nodiac[2] + "ِي" + nodiac[4];
      default:
        if (noun.endsWith("ة")) return noun.slice(0, -1) + "ات";
        return noun + "ون" ;
    }
  }

  function __find_pattern(noun) {
    let meter = noun;
    meter = meter.replace("ا", "A");
    meter = meter.replace("ي", "I");
    meter = meter.replace("و", "U");
    meter = meter.replace(/^م/, "m");
    meter = meter.replace(/َ/g, "a").replace(/ِ/g, "i").replace(/ُ/g, "u");
    meter = meter.replace(/ْ/g, "").replace(/ة/g, "h");
    meter = meter.replace(/[^AIUaiumh]/g, "C");
    meter = meter.replace(/(.)ّ/g, "$1$1");
    meter = meter.replace(/[^C]+$/, "");

    return meter;
  }

  /**
   * Transforms a singular noun to dual
   *
   * @method __singular2dual
   * @private
   * @static
   * @memberof AraMorpho
   * @param  {String}        noun The noun to be transformed to dual
   * @return {String}             Plural form of the given noun
   */
  function __singular2dual(noun){
    if (noun.endsWith("ة")) noun = noun.slice(0, -1) + "ت";
    return noun + "ان" ;
  }

  //==========================================
  // CONJUGATION FUNCTIONS
  //==========================================

  Me._conj = function(verb, opts) {

    if (opts.mood === Mood.Imp) return __getImperative(verb, opts);

    __verbTypes(verb);

    if (__noConjugation(opts)) return "";

    //let filteredVerb = verbInfo.filter;

    //save the original tense
    let tense = opts.tense;

    //Future is prefix + present
    if (opts.tense === Tense.Fu) opts.tense = Tense.Pr;

    let pronounIdx = __getPronounIndex(opts);

    let conjVerb = {
      v: verb,
      t: opts.tense, //original tense
      s: "",
      p: "",
      dV: (opts.tense === Tense.Pr)? "ْ": "َ",
      dR: (opts.tense === Tense.Pr)? "ِ": "َ" /*,
      dB: ""*/
    };

    __affixHandler(conjVerb, opts, pronounIdx);

    __verbLengthHandler(conjVerb, opts);

    if (verbInfo.wb) __weakBeginHandler(conjVerb, opts);

    if (verbInfo.wm) __weakMiddleHandler(conjVerb, opts, pronounIdx);

    if (verbInfo.we) __weakEndHandler(conjVerb, opts, pronounIdx);

    if (verbInfo.m) __mudaafHandler(conjVerb, opts, pronounIdx);

    __voiceHandler(conjVerb, opts);

    //detect if the verb has a weak middle
    //let weakMiddle = false;

    __diacreticsHandler(conjVerb);

    //naqis normalization
    //if (verbInfo.we) weakEndNormalization(conjVerb, pronounIdx, opts.tense);

    let result = conjVerb.p;
    //The ending of a verb must not have diacritics; they are handled by suffix
    result += (/^[َُِْ]/.test(conjVerb.s))? conjVerb.v.replace(/[َُِْ]$/, ""): conjVerb.v;
    result += conjVerb.s;

    //Normalization of alif
    result = __conjNormalizeAlif(result);

    result = __conjNormalizeWaw(result);

    result = __conjNormalizeYaa(result);

    result = result.replace(/(.)ْ\1([َُِ])/, "$1ّ$2");

    if (! opts.noNegMark) {
      let begin = "";

      if (opts.negated) {
        begin = "لَمْ "; //past
        if (tense === Tense.Pr)  begin = "لَنْ ";
      }
      else if (tense === Tense.Fu) begin = "سَوْفَ ";

      result = begin  + result;
    }


    return result.trim();

  };

  function __getImperative(verb, opts) {
    if (__noConjugation(opts)) return "";

    let newOpts = Object.assign({}, opts);
    newOpts.mood = Mood.Ind;
    newOpts.tense = Tense.Pa;
    newOpts.voice = Voice.A;
    newOpts.negated = 1;
    newOpts.noNegMark = 1;
    let imp = AraMorpho.prototype.conjugate(verb, newOpts);
    if (opts.negated) return "لَا " + imp;
    imp = imp.slice(2);

    let begin = "";


    if (verbInfo.wb) {
      if (/^أ.{3}$/.test(verbInfo.filter)) begin = "أَ";
      else if (verbInfo.filter.startsWith("ا")) begin = "ا";
    }
    else if (!/[َُِ]/.test(imp[1]) && !/^ت.(ا.|.).$/.test(verbInfo.filter)) {
      begin = "ا";
    }

    return begin + imp;
  }

  //==========================================
  // CONJUGATION HANDLER FUNCTIONS
  //==========================================

  function __affixHandler(conjVerb, opts, pronounIdx) {
    let suffix = "";
    if (opts.negated) {
      let end = (opts.tense === Tense.Pa)? "ْ": "َ";
      suffix = conjAffix[Tense.Pr].suffix[pronounIdx];
      if (/[^ْ]ن[َِ]$/.test(suffix)) {//delete nuun with negation when not preceded by sukuun
        suffix = suffix.slice(0, -2);
        if (suffix.endsWith("و")) suffix += "ا";
      } //Otherwise add fatha for present, sukuun for past
      else if (! /ن[َِ]$/.test(suffix)) suffix = suffix.slice(0, -1) + end;
      opts.tense = Tense.Pr;
      conjVerb.dV = "ْ";
      conjVerb.dR = "ِ";
    }
    else {
      suffix = conjAffix[opts.tense].suffix[pronounIdx];
    }
    conjVerb.s = suffix;

    let prefix = conjAffix[opts.tense].prefix[pronounIdx];
    if(! prefix) prefix = "";
    conjVerb.p = prefix;
  }


  function __weakBeginHandler(conjVerb, opts) {
    let verb = conjVerb.v,
    filteredVerb = verbInfo.filter,
    len = verbInfo.len;

    if (opts.tense === Tense.Pr) {
      verb = (opts.voice === Voice.P && len ===3 && !filteredVerb.startsWith("أ"))? verb.replace(/^(.)[َُِْ]/, "$1"): verb.slice(1);
      //TODO verify verbs like akala
      /*if (len > 3 || !filteredVerb.startsWith("أ")) verb = verb.slice(1);
      if (opts.voice === Voice.P) {
        if (/^أ.{2}$/.test(filteredVerb)) verb += "أو"; //
      }*/


      if (/^ا.ت..$/.test(filteredVerb)) {
        conjVerb.dV = "َ";
      }

    }

    if (/^ا.{3}$/.test(filteredVerb)) {
      conjVerb.dV = "ْ";
    }

    conjVerb.v = verb;
  }

  function __weakMiddleHandler(conjVerb, opts, pronounIdx) {

    let verb = conjVerb.v,
    weakType = __weakMiddleOrigin(verb, verbInfo.filter),
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
      if (opts.voice !== Voice.P) {//weakType === 2 ||
        //with plural feminine; delete the weakChar
        if ([7, 13].indexOf(pronounIdx) > -1) weakChar = "";

        verb = verb.replace(/^(.+)ا(.َ?)$/, "$1" + weakChar + "$2");
      }
      else {
        diacV = "َ";
        diacR = "X";
      }

    }

    conjVerb.v = verb;
    conjVerb.dV = diacV;
    conjVerb.dR = diacR;

  }

  function __weakEndHandler(conjVerb, opts, pronounIdx) {
    let verb = conjVerb.v,
    diacR = conjVerb.dR;
    //if (opts.tense === Tense.Pa) conjVerb.dR = "َ";
    diacR = "َ";
    verb = verb.slice(0, -1);

    if (opts.voice === Voice.P) { //
      if (opts.tense === Tense.Pa || [4, 5, 7, 10, 11, 13].indexOf(pronounIdx) > -1) {
        verb +=  "ي";
        diacR = "ِ";
      }
      else verb += "ى";
      //verb += (opts.tense === Tense.Pa || [4, 5, 7, 10, 11, 13].indexOf(pronounIdx) > -1)? "ي": "ى";
    }
    else {
      if (verbInfo.filter.endsWith("ى")) {
        verb += "ي";//TODO fix
        if (opts.tense !== Tense.Pa) diacR = "ِ";
      }
      else {
        verb += "و";//TODO fix
        if (opts.tense !== Tense.Pa) diacR = "ُ";
      }

      //Sometimes it is not a
    }
    conjVerb.v = verb;
    conjVerb.dR = diacR;

    __conjNormalizeWeakEnd(conjVerb, pronounIdx, opts);
  }

  function __mudaafHandler(conjVerb, opts, pronounIdx) {
    let verb = conjVerb.v;
    if (opts.tense === Tense.Pr) {
      if ([7, 13].indexOf(pronounIdx) > -1) {
        verb = verb.replace(/^(.*)(.)َّ?$/, "$1$2َ$2ْ");
        conjVerb.dR = (verbInfo.len < 4)? "ُ": "ِ";
      }
      else {
        verb = verb.replace(/َ$/, "");
        if (verbInfo.len > 4) {
          conjVerb.dV = "ْ";
          conjVerb.dR = "َ";
        }
        else {
          conjVerb.dV = "ُ";
          conjVerb.dR = "";
        }
      }

    }
    else { //past
      if (pronounIdx === 13 || pronounIdx < 8) {
        conjVerb.dR = "َ";
        verb = verb.replace(/^(.*)(.)َّ?$/, "$1$2َ$2ْ");
      }
      else conjVerb.dR = "";

    }

    conjVerb.v = verb;

  }

  function __voiceHandler(conjVerb, opts) {

    if (opts.voice !== Voice.P) return;

    let suffix = conjVerb.s,
    verb = conjVerb.v;

    if (opts.tense === Tense.Pa) {
      conjVerb.dV = (verbInfo.wm)? "ِ": "ُ";
      conjVerb.dR = (verbInfo.wm)? "X": "ِ";

      if (/^أ.{3}$/.test(verbInfo.filter)) {
        conjVerb.dV = "ْ";//sukuun
        verb = verb.replace(/^أ[َُِْ]?/, "أُ");
      }
    }
    else { //present
      conjVerb.p = conjVerb.p.slice(0, -1) + "ُ";
      conjVerb.dR = (verbInfo.wm)? "X": "َ";
      if(verbInfo.we  && suffix.startsWith("ْ")) suffix = suffix.slice(1);
    }

    conjVerb.s = suffix;
    conjVerb.v = verb;

  }

  function __verbLengthHandler(conjVerb, opts) {
    let verb = conjVerb.v,
    filteredVerb = verbInfo.filter,
    diacV = conjVerb.dV,
    diacR = conjVerb.dR,
    prefix = conjVerb.p;

    if (verbInfo.len === 3) {
      diacR = "X"; //delete the vocal due to dictionary dependency
      if (! /[^أعحه][^أعحه]$/g.test(filteredVerb)) {
        if (/.ُ.[َُِ]?$/g.test(verb)) diacR = ""; //no change
        //explanation: verbs with three letters and have a dhamma
        //don't change the dhamma in present
      }

    }
    else if (filteredVerb.startsWith("ت")) diacR = "َ"; //no change

    if (opts.tense === Tense.Pr) {

      /*if (verbInfo.len < 4 || ! filteredVerb.startsWith("ت")) {
        //sukuun
      }*/

      if (verbInfo.len === 4) {
        //verb = verb.replace(/^(.)[َُِْ]?/, "$1ْ");
        //verb = verb.replace(/^.َ?/, "");
        prefix = prefix.slice(0, -1) + "ُ";
        diacV = (/^.َ?(ا|.ّ)/.test(verb))? "َ": "ْ";
        //console.log(verb, diacV);
      }
    }
    else { //past
      //verb = verb.replace(/^(.)[َُِْ]?/, "$1َ");//This, for indicative active
      //TODO passive

      if (verbInfo.len === 4) {
        diacR = "َ";
        if (filteredVerb.startsWith("أ")) diacV = "ْ";
      }
    }

    //past or present
    if (/^ان.{3}$/.test(filteredVerb)) {
      diacV = "َ"; //fatha for V vocalization
      //console.log(verb);
    }

    conjVerb.v = verb;
    verbInfo.filter = filteredVerb;
    conjVerb.dV = diacV;
    conjVerb.dR = diacR;
    conjVerb.p = prefix;
  }

  function __diacreticsHandler(conjVerb) {
    let diacV = conjVerb.dV,
    diacR = conjVerb.dR,
    verb = conjVerb.v,
    filteredVerb = verbInfo.filter,
    fverb = verb.replace(/[َُِّْ]/g, ""),
    len = verbInfo.len;

    let  noR = (verbInfo.wm && (fverb.length === 2));


    if (diacV) {
      if (diacV === "X") diacV = "";//delete current one

      if (fverb.length < 4 || /^.ا../.test(fverb)) verb = verb.replace(/^(.)[َُِْ]?/, "$1" + diacV);
      else if (fverb.startsWith("است")) verb = verb.replace(/(ا[َُِْ]?س[َُِْ]?ت)[َُِْ]?/, "$1" + diacV);
      else if (len === 5 && /^ا.{3}$/.test(filteredVerb)) verb = verb.replace(/^(ا?[َُِْ]?.)[َُِْ]?/, "$1" + diacV);
      else if (/ت.{3}/.test(fverb)) verb = verb.replace(/(.ّ?)[َُِْ]?(.[َُِْ]?)$/, "$1" + diacV + "$2");
      else verb = verb.replace(/(.*[^َُِْ])[َُِْ]?([^َُِْ][َُِْ]?[^َُِْ][َُِْ]?)$/, "$1" + diacV + "$2");
    }

    if (diacR && !noR) {
      if (diacR === "X") diacR = "";//delete current one
      //if (/^(تَ?.َ?.َ)َ?(.َ?)$/.test(verb)) verb = verb.replace(/^(تَ?.َ?.َ)َ?(.َ?)$/, "$1" + diacR + "$2");
      //if it is not muda33af with two chars
      if (verbInfo.we && fverb.length === 2) verb = verb.replace(/^(.[َُِْ]?.)[َُِْ]?/, "$1" + diacR);
      else if (! (verbInfo.m && fverb.length === 2)) verb = verb.replace(/(.ّ?)[َُِْ]?(.ّ?)[َُِْ]?$/, "$1" + diacR + "$2");

    }

    /*if (diacB) {
      if (diacV === "X") diacV = "";//delete current one
      verb = verb.replace(/^(.)[َُِْ]?/, "$1" + diacV);
    }*/

    conjVerb.v = verb;
  }

  //==========================================
  // CONJUGATION PREPROCESSOR FUNCTIONS
  //==========================================

  function __verbTypes(verb) {
    //delete spaces
    verb = verb.trim();

    verb = verb.replace(/^(.َ?.)َ?$/, "$1َّ");//if the verb has two chars add shadda in the end

    //verb = verb.replace(/^([^ا])[َُِ]?/, "$1َ"); //add fatha to the first char if not alif

    if (verb === verbInfo.verb) return;

    verbInfo.verb = verb;

    //replace Alif madda
    let filteredVerb = verb.replace("آ", "أا");
    //Muda33af
    filteredVerb = (/َ?ّ$/.test(verb))? filteredVerb + filteredVerb.slice(-1): filteredVerb;
    //delete diacretics
    filteredVerb = filteredVerb.replace(/[َُِّْ]/gi, "");//fat,dam,kas,shad,sukun

    verbInfo.filter = filteredVerb;


    verbInfo.len = filteredVerb.length + verb.replace(/[^ّ]/g, "").length;

    //detect if the verb with weak begining
    verbInfo.wb = /^[أاو]/.test(filteredVerb);//alif does not belong to mithal, but it has the same
    //yaa is ommited since it will not be deleted

    //detect if the verb has a weak middle
    verbInfo.wm = /[اآ].$/.test(filteredVerb);

    //detect if the verb has a weak ending
    verbInfo.we = /[اى]$/.test(filteredVerb);

    //detect if muda33af
    verbInfo.m = /َّ?$/.test(verb);

    //console.log(verbInfo);

  }

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
   *
   * @method __weakMiddleOrigin
   * @private
   * @static
   * @memberof AraMorpho
   * @param  {String}         verb   the verb as introduced by user
   * @param  {String}         noDiac the verb filtered from vocalization, split shadda and split alif madda
   * @return {Number}                an integer representing the origin of the middle alif:
   * <ul>
   * <li>0: alif itself</li>
   * <li>1: waw</li>
   * <li>2: Yaa</li>
   * </ul>
   */
  function __weakMiddleOrigin(verb, noDiac) {

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

  function __noConjugation(opts) {

    //Some verbs don't have a passive voice since they are not transitive
    //In Arabic, you can detect some of them using patterns
    if (opts.voice === Voice.P) {

      if (opts.mood === Mood.Imp) return true;

      if (verbInfo.len > 4) {
        let filteredVerb = verbInfo.filter;
        if (filteredVerb.startsWith("ت")) return true;
        if (/^ان.{3}$/.test(filteredVerb)) return true;
        if (/^ا.{3}$/.test(filteredVerb)) return true;
      }
    }

    //Imperative
    if (opts.mood === Mood.Imp) {
      if (opts.person !== Person.S) return true;
    }

    return false;
  }

  /**
   * A function that gives the pronoun index in conjugation table
   *
   * @method __getPronounIndex
   * @private
   * @memberof AraMorpho
   * @param  {Object}        opts contains person, number and gender
   * @return {Number}             a number from 0 to 13
   */
  function __getPronounIndex(opts) {

    if (opts.person === Person.F) {
      if (opts.number === GNumber.S) return 0;
      else return 1;
    }

    let personIdx = (Object.values(Person).indexOf(opts.person)-1) * 6;
    let numberIdx = Object.values(GNumber).indexOf(opts.number) * 2;
    let genderIdx = Object.values(Gender).indexOf(opts.gender);

    return personIdx + numberIdx + genderIdx + 2;
  }

  //==========================================
  // CONJUGATION NORMALIZATION FUNCTIONS
  //==========================================

  function __conjNormalizeYaa(verb) {
    //delete waw followed by sukun
    verb = verb.replace(/ِي(.ْ)/, "ِ$1");
    //delete sukuun on top of Yaa if preceeded by a kasra
    verb = verb.replace("ِيْ", "ِي");

    return verb;
  }


  function __conjNormalizeWaw(verb) {
    //delete waw followed by sukun
    verb = verb.replace(/ُو(.ْ)/, "ُ$1");
    //delete sukuun on top of waw if preceeded by a dhamma
    verb = verb.replace("ُوْ", "ُو");

    return verb;
  }

  /**
   * Normalizing alif after conjugation
   *
   * @method __conjNormalizeAlif
   * @private
   * @static
   * @memberof AraMorpho
   * @param  {String}          verb conjugated verb
   * @return {String}               verb with alif normalization
   */
  function __conjNormalizeAlif(verb) {
    //order is important, don't change
    verb = verb.replace(/أْوِ/, "ؤُو");
    verb = verb.replace(/أَأْ/, "آ");
    verb = verb.replace(/أَا/, "آ");
    verb = verb.replace("أِي", "ئِي");
    verb = verb.replace(/ِأ(.?)/, "ئ$1");
    verb = verb.replace(/(.)أُو/, "$1ؤُو"); //alif followed by waw, but not first
    verb = verb.replace(/([ِي])ء([َُِْ].)/, "$1ئ$2");
    verb = verb.replace(/اءُ?و/, "اؤُو");
    verb = verb.replace("ِا", "ِي");
    verb = verb.replace(/َا(.ْ)/, "َ$1");
    verb = verb.replace("ُا", "ُو");

    return verb;
  }

  function __conjNormalizeWeakEnd(conjVerb, pronounIdx, opts) {

    let verb = conjVerb.v,
    prefix = conjVerb.p,
    suffix = conjVerb.s,
    tense = opts.tense;

    if (tense === Tense.Pa) {
      if (opts.voice !== Voice.P)
      if (pronounIdx === 8) {
        prefix = suffix = "";
        let ending = verb.slice(-1);
        verb = verb.slice(0, -1);
        if (ending === "ي") verb += "ى";
        else verb += "ا";
      }
      else if ([9, 11, 12].indexOf(pronounIdx) > -1 ) {
        verb = verb.slice(0, -1);
        if (/[وي]$/.test(verb)) verb = verb.slice(0, -1);
      }
    }
    else {//present

      if ([0, 1, 2, 8, 9].indexOf(pronounIdx) > -1) {
        if (opts.negated && conjVerb.t === Tense.Pa) verb = verb.slice(0, -1);
        if (opts.voice === Voice.P || !opts.negated || conjVerb.t === Tense.Pa) suffix = "";
      }
      else if ([3, 6, 12].indexOf(pronounIdx) > -1) {
        verb = verb.slice(0, -1);
        if (/[وي]$/.test(verb)) verb = verb.slice(0, -1);
      }
    }

    conjVerb.v = verb;
    conjVerb.p = prefix;
    conjVerb.s = suffix;

  }

  //==========================================
  // CONJUGATION OPTIONS PUBLIC FUNCTIONS
  //==========================================

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

  Me.lform = function() {
    //super doesn't work here
    let superFrm = Morpho.prototype.lform.call(this);
    const araForms =  {
      "imp": {
        desc: "Imperative",
        mood: Mood.Imp
      }
    };

    return Object.assign({}, superFrm, araForms);
  };

  //==========================================
  // CONJUGATION OPTIONS PROTECTED FUNCTIONS
  //==========================================

  Me._gPpOpts = function() {
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

  Me._gPpName = function(opts) {
    return pronouns[__getPronounIndex(opts)];
  };

  //==========================================
  // NORMALIZATION FUNCTIONS
  //==========================================

  /**
   * Normalization method for Arabic: it helps delete vocalization
   * <ul>
   * <li> voc: delete vocalization </li>
   * <li> alef: Replace all alef variants with the simple alef </li>
   * <li> ihamza: Replace all beginning hamza variants with the simple alef </li>
   * <li> yeh: Relace the alif maqsorah with yeh </li>
   * <li> teh: Replace teh marbuta with heh </li>
   * <li> _: Delete tatweel </li>
   * </ul>
   * @method norm
   * @override
   * @memberof AraMorpho
   * @param  {String} word the word to be normalized
   * @param  {String} opts some options (optional) where each language defines its own
   * normalization options
   * @return {String}      normalized word
   **/
  Me.norm = function(word, opts) {
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

    //Replace initial hamza with alef
    if (opts.includes("ihamza")) {
      norm = norm.replace(/^[أإآ]/g, "ا");
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

  //==========================================
  // SEGMENTATION FUNCTIONS
  //==========================================

  /*
   * Segment a given text
   */

  /*
   * Tokenization is the same as morpho
   */

  //==========================================
  // HELPER FUNCTIONS
  //==========================================

  function notNull(obj) {
    return (obj != null);
  }



}());
