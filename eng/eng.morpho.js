(function () {

  "use strict";

  //==========================================
  // EXPORTING MODULE
  //==========================================

  let Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Morpho = require("../morpho.js");
    module.exports = EngMorpho;
  } else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.aserv("morpho", "eng", EngMorpho);
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
  Aspect = F.Aspect,
  Gender = F.Gender,
  Person = F.Person;

  //https://en.wikipedia.org/wiki/List_of_English_irregular_verbs
  //TODO will, can, shall

  const beHave = {
    "be":  {
      Pr: ["am", "is", "are"],
      Pa: ["was", "was", "were"],
      Pp: "been"
    },
    "have":  {
      Pr: ["have", "has", "have"],
      Pa: ["had", "had", "had"],
      Pp: "had"
    }
  },
  irregular2 = {
    "bet": 1, "bid": 1, "broadcast": 1, "burst": 1,  "cast": 1, "clad": 1,
    "clearcut": 1, "cost": 1, "crosscut": 1, "cut": 1, "fit": 1, "handset": 1,
    "hit": 1, "hurt": 1, "intercut": 1, "let": 1, "lipread": 1, "podcast": 1,
    "precast": 1, "proofread": 1, "put": 1, "quit": 1, "read": 1, "retrofit": 1,
    "set": 1, "shed": 1, "shut": 1, "simulcast": 1, "slit": 1, "spit": 1,
    "split": 1, "spread": 1, "sublet": 1, "telecast": 1, "thrust": 1,
    "typecast": 1, "typeset": 1, "webcast": 1, "wed": 1
  },
  irregular3 = {
    "babysit": "babysat", "bend": "bent", "beseech": "besought",
    "besprenge": "besprent", "bind": "bound", "bleed": "bled",
    "breastfeed": "breastfed", "breed": "bred", "bring": "brought",
    "build": "built", "buy": "bought", "catch": "caught",
    "cling": "clung", "creep": "crept", "deal": "dealt",
    "dig": "dug", "feed": "fed", "feel": "felt",
    "fight": "fought", "find": "found", "flee": "fled",
    "fling": "flung", "forthlead": "forthled", "forthtell": "forthtold",
    "get": "got", "hamstring": "hamstrung", "handspring": "handsprung",
    "hang": "hung", "hear": "heard", "hold": "held",
    "housesit": "housesat", "interbreed": "interbred", "interlay": "interlaid",
    "keep": "kept", "lay": "laid", "lead": "led", "leave": "left",
    "lend": "lent", "lose": "lost", "make": "made", "mean": "meant",
    "meet": "met", "naysay": "naysaid", "onlay": "onlaid", "onlead": "onled",
    "pay": "paid", "rend": "rent", "say": "said", "seek": "sought",
    "sell": "sold", "send": "sent", "shrink": "shrunk", "shoot": "shot",
    "sink": "sunk", "sit": "sat", "sleep": "slept", "slide": "slid",
    "sling": "slung", "slit": "slit", "soothsay": "soothsaid", "spend": "spent",
    "spin": "spun", "sprenge": "sprent","spring": "sprung", "stand": "stood",
    "stick": "stuck", "sting": "stung", "stink": "stunk", "strike": "struck",
    "string": "strung", "sweep": "swept", "swing": "swung", "teach": "taught",
    "tell": "told", "think": "thought", "tread": "trod", "understand": "understood",
    "waylay": "waylaid", "win": "won", "wind": "wound", "wring": "wrung"
  },
  irregular4 = {
    "acknow":  ["acknew", "1n"], "ake":  ["oke", "1n"], "arise":  ["arose", "1n"],
    "awake":  ["awoke", "2n"], "bear":  ["bore", "born"], "beat":  ["1", "1en"],
    "bedo":  ["bedid", "1ne"], "begin":  ["began", "begun"], "bego":  ["bewent", "1ne"],
    "bite":  ["bit", "2ten"], "blow":  ["blew", "1n"], "break":  ["broke", "2n"],
    "browbeat":  ["1", "1en"], "choose":  ["chose", "2n"], "come":  ["came", "1"],
    "cowrite":  ["cowrote", "1-ten"], "do":  ["did", "1ne"], "downdraw":  ["downdrew", "1n"],
    "draw":  ["drew", "1n"], "drink":  ["drank", "drunk"], "drive":  ["drove", "1n"],
    "eat":  ["ate", "1en"], "fall":  ["fell", "1en"], "fly":  ["flew", "flown"],
    "forbid":  ["1", "1den"], "forego":  ["forewent", "1ne"], "forgo":  ["forwent", "1ne"],
    "forlend":  ["forlent", "forlen"], "freeze":  ["froze", "2n"],
    "frostbite":  ["frostbit", "2ten"], "ghostwrite":  ["ghostwrote", "1-ten"],
    "give":  ["gave", "1n"], "go":  ["went", "gone"], "grow":  ["grew", "1n"],
    "handwrite":  ["handwrote", "1-ten"], "hide":  ["hid", "2den"],
    "interweave":  ["interwove", "2n"], "know":  ["knew", "1n"],
    "lie":  ["lay", "lain"], "misdo":  ["misdid", "1ne"], "outdo":  ["outdid", "1ne"],
    "overdo":  ["overdid", "1ne"], "partake":  ["partook", "1n"],
    "redo":  ["redid", "1ne"], "ride":  ["rode", "ridden"], "ring":  ["rang", "rung"],
    "rise":  ["rose", "1n"], "run":  ["ran", "run"], "see":  ["saw", "1n"],
    "shake":  ["shook", "1n"], "sightsee":  ["sightsaw", "1n"],
    "sing":  ["sang", "sung"], "smite":  ["smote", "1-ten"],
    "speak":  ["spoke", "2n"], "steal":  ["stole", "2n"],
    "stride":  ["strode", "1-den"], "swear":  ["swore", "2-n"],
    "swim":  ["swam", "swum"], "swink":  ["swonk", "2en"],
    "take":  ["took", "1n"], "tear":  ["tore", "torn"], "throw":  ["threw", "1-n"],
    "toswink":  ["toswank", "toswunken"], "underdo":  ["underdid", "1ne"],
    "undergo":  ["underwent", "1ne"], "undo":  ["undid", "1ne"],
    "wake":  ["woke", "2n"], "wear":  ["wore", "worn"], "weave":  ["wove", "2n"],
    "withgo":  ["withwent", "1ne"], "write":  ["wrote", "1-ten"]
  };

  /*
  To validate this implementation,I rely largely on these resources:
  url1: http://snowballstem.org/algorithms/porter/stemmer.html
  url2: https://github.com/kristopolous/Porter-Stemmer/blob/master/PorterStemmer1980.js
  */
  const step2list = {
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

  // LANCASTER STEMMER
  const STOP = -1,
        INTACT = 0,
        CONTINUE = 1,
        PROTECT = 2,
        VOWELS = /[aeiouy]/;
  // rules
  const rules = {
    a: [
      {match: 'ia', replacement: '', type: INTACT},
      {match: 'a', replacement: '', type: INTACT}
    ],
    b: [{match: 'bb', replacement: 'b', type: STOP}],
    c: [
      {match: 'ytic', replacement: 'ys', type: STOP},
      {match: 'ic', replacement: '', type: CONTINUE},
      {match: 'nc', replacement: 'nt', type: CONTINUE}
    ],
    d: [
      {match: 'dd', replacement: 'd', type: STOP},
      {match: 'ied', replacement: 'y', type: CONTINUE},
      {match: 'ceed', replacement: 'cess', type: STOP},
      {match: 'eed', replacement: 'ee', type: STOP},
      {match: 'ed', replacement: '', type: CONTINUE},
      {match: 'hood', replacement: '', type: CONTINUE}
    ],
    e: [{match: 'e', replacement: '', type: CONTINUE}],
    f: [
      {match: 'lief', replacement: 'liev', type: STOP},
      {match: 'if', replacement: '', type: CONTINUE}
    ],
    g: [
      {match: 'ing', replacement: '', type: CONTINUE},
      {match: 'iag', replacement: 'y', type: STOP},
      {match: 'ag', replacement: '', type: CONTINUE},
      {match: 'gg', replacement: 'g', type: STOP}
    ],
    h: [
      {match: 'th', replacement: '', type: INTACT},
      {match: 'guish', replacement: 'ct', type: STOP},
      {match: 'ish', replacement: '', type: CONTINUE}
    ],
    i: [
      {match: 'i', replacement: '', type: INTACT},
      {match: 'i', replacement: 'y', type: CONTINUE}
    ],
    j: [
      {match: 'ij', replacement: 'id', type: STOP},
      {match: 'fuj', replacement: 'fus', type: STOP},
      {match: 'uj', replacement: 'ud', type: STOP},
      {match: 'oj', replacement: 'od', type: STOP},
      {match: 'hej', replacement: 'her', type: STOP},
      {match: 'verj', replacement: 'vert', type: STOP},
      {match: 'misj', replacement: 'mit', type: STOP},
      {match: 'nj', replacement: 'nd', type: STOP},
      {match: 'j', replacement: 's', type: STOP}
    ],
    l: [
      {match: 'ifiabl', replacement: '', type: STOP},
      {match: 'iabl', replacement: 'y', type: STOP},
      {match: 'abl', replacement: '', type: CONTINUE},
      {match: 'ibl', replacement: '', type: STOP},
      {match: 'bil', replacement: 'bl', type: CONTINUE},
      {match: 'cl', replacement: 'c', type: STOP},
      {match: 'iful', replacement: 'y', type: STOP},
      {match: 'ful', replacement: '', type: CONTINUE},
      {match: 'ul', replacement: '', type: STOP},
      {match: 'ial', replacement: '', type: CONTINUE},
      {match: 'ual', replacement: '', type: CONTINUE},
      {match: 'al', replacement: '', type: CONTINUE},
      {match: 'll', replacement: 'l', type: STOP}
    ],
    m: [
      {match: 'ium', replacement: '', type: STOP},
      {match: 'um', replacement: '', type: INTACT},
      {match: 'ism', replacement: '', type: CONTINUE},
      {match: 'mm', replacement: 'm', type: STOP}
    ],
    n: [
      {match: 'sion', replacement: 'j', type: CONTINUE},
      {match: 'xion', replacement: 'ct', type: STOP},
      {match: 'ion', replacement: '', type: CONTINUE},
      {match: 'ian', replacement: '', type: CONTINUE},
      {match: 'an', replacement: '', type: CONTINUE},
      {match: 'een', replacement: '', type: PROTECT},
      {match: 'en', replacement: '', type: CONTINUE},
      {match: 'nn', replacement: 'n', type: STOP}
    ],
    p: [
      {match: 'ship', replacement: '', type: CONTINUE},
      {match: 'pp', replacement: 'p', type: STOP}
    ],
    r: [
      {match: 'er', replacement: '', type: CONTINUE},
      {match: 'ear', replacement: '', type: PROTECT},
      {match: 'ar', replacement: '', type: STOP},
      {match: 'ior', replacement: '', type: CONTINUE},
      {match: 'or', replacement: '', type: CONTINUE},
      {match: 'ur', replacement: '', type: CONTINUE},
      {match: 'rr', replacement: 'r', type: STOP},
      {match: 'tr', replacement: 't', type: CONTINUE},
      {match: 'ier', replacement: 'y', type: CONTINUE}
    ],
    s: [
      {match: 'ies', replacement: 'y', type: CONTINUE},
      {match: 'sis', replacement: 's', type: STOP},
      {match: 'is', replacement: '', type: CONTINUE},
      {match: 'ness', replacement: '', type: CONTINUE},
      {match: 'ss', replacement: '', type: PROTECT},
      {match: 'ous', replacement: '', type: CONTINUE},
      {match: 'us', replacement: '', type: INTACT},
      {match: 's', replacement: '', type: CONTINUE},
      {match: 's', replacement: '', type: STOP}
    ],
    t: [
      {match: 'plicat', replacement: 'ply', type: STOP},
      {match: 'at', replacement: '', type: CONTINUE},
      {match: 'ment', replacement: '', type: CONTINUE},
      {match: 'ent', replacement: '', type: CONTINUE},
      {match: 'ant', replacement: '', type: CONTINUE},
      {match: 'ript', replacement: 'rib', type: STOP},
      {match: 'orpt', replacement: 'orb', type: STOP},
      {match: 'duct', replacement: 'duc', type: STOP},
      {match: 'sumpt', replacement: 'sum', type: STOP},
      {match: 'cept', replacement: 'ceiv', type: STOP},
      {match: 'olut', replacement: 'olv', type: STOP},
      {match: 'sist', replacement: '', type: PROTECT},
      {match: 'ist', replacement: '', type: CONTINUE},
      {match: 'tt', replacement: 't', type: STOP}
    ],
    u: [
      {match: 'iqu', replacement: '', type: STOP},
      {match: 'ogu', replacement: 'og', type: STOP}
    ],
    v: [
      {match: 'siv', replacement: 'j', type: CONTINUE},
      {match: 'eiv', replacement: '', type: PROTECT},
      {match: 'iv', replacement: '', type: CONTINUE}
    ],
    y: [
      {match: 'bly', replacement: 'bl', type: CONTINUE},
      {match: 'ily', replacement: 'y', type: CONTINUE},
      {match: 'ply', replacement: '', type: PROTECT},
      {match: 'ly', replacement: '', type: CONTINUE},
      {match: 'ogy', replacement: 'og', type: STOP},
      {match: 'phy', replacement: 'ph', type: STOP},
      {match: 'omy', replacement: 'om', type: STOP},
      {match: 'opy', replacement: 'op', type: STOP},
      {match: 'ity', replacement: '', type: CONTINUE},
      {match: 'ety', replacement: '', type: CONTINUE},
      {match: 'lty', replacement: 'l', type: STOP},
      {match: 'istry', replacement: '', type: STOP},
      {match: 'ary', replacement: '', type: CONTINUE},
      {match: 'ory', replacement: '', type: CONTINUE},
      {match: 'ify', replacement: '', type: STOP},
      {match: 'ncy', replacement: 'nt', type: CONTINUE},
      {match: 'acy', replacement: '', type: CONTINUE}
    ],
    z: [
      {match: 'iz', replacement: '', type: CONTINUE},
      {match: 'yz', replacement: 'ys', type: STOP}
    ]
  };

  //list of nouns that are plural and singular in the same time
  //https://www.vappingo.com/word-blog/101-words-that-are-both-plural-and-singular/
  const PL_SING = {
    "accommodation": 1, "advice": 1, "alms": 1, "aircraft": 1, "aluminum": 1,
    "barracks": 1, "bison": 1, "binoculars": 1, "bourgeois": 1, "breadfruit": 1,
    "cannon": 1, "caribou": 1, "cattle": 1, "chalk": 1, "chassis": 1, "chinos": 1, "clippers": 1,
    "clothing": 1, "cod": 1, "concrete": 1, "corps": 1, "correspondence": 1, "crossroads": 1,
    "deer": 1, "dice": 1, "doldrums": 1, "dungarees": 1,
    "education": 1, "eggfruit": 1, "elk": 1, "eyeglasses": 1,
    "fish": 1, "flares": 1, "flour": 1, "food": 1, "fruit": 1, "furniture": 1,
    "gallows": 1, "goldfish": 1, "grapefruit": 1, "greenfly": 1, "grouse": 1,
    "haddock": 1, "halibut": 1, "head": 1, "headquarters": 1, "help": 1, "homework": 1, "hovercraft": 1,
    "ides": 1, "insignia": 1, "jackfruit": 1, "jeans": 1,
    "knickers": 1, "knowledge": 1, "kudos": 1,
    "leggings": 1, "lego": 1, "luggage": 1,
    "moose": 1, "monkfish": 1, "mullet": 1,
    "nailclippers": 1, "news": 1,
    "offspring": 1, "oxygen": 1,
    "pants": 1, "pyjamas": 1, "passionfruit": 1, "pike": 1, "pliers": 1, "police": 1, "premises": 1,
    "reindeer": 1, "rendezvous": 1,
    "salmon": 1, "scissors": 1, "series": 1, "shambles": 1, "sheep": 1, "shellfish": 1, "shorts": 1,
    "shrimp": 1, "smithereens": 1, "spacecraft": 1, "species": 1, "squid": 1, "starfruit": 1,
    "stone": 1, "sugar": 1, "swine": 1,
    "tongs": 1, "trousers": 1, "trout": 1, "tuna": 1, "tweezers": 1,
    "you": 1, "wheat": 1, "whitebait": 1, "wood": 1
  };

  //http://teflpedia.com/Non-standard_English
  const NORM = {
    "ain't": "is not",
    "innit": "is not it",
    "gonna": "going to",
    "gotta": "have to",
    "outta": "out of",
    "sorta": "sort of",
    "wanna": "want to",
    "y'all": "you all",
    "C'mon": "come on",
    "cop": "policeman",
    "'cos'": "because",
    "don't": "do not",
    "doesn't": "does not",
    "won't": "will not",
    "lil'": "little",
    "dunno": "do not know",
    "gimme": "give me",
    "kinda": "kind of",
    "lemme": "let me",
    "lotta": "lot of",
    "ma": "mother",
    "luv": "love",
    "yeah": "yes",
    "wot": "what"
  };

  //==========================================
  // INNER VARIABLES
  //==========================================

  let g;

  /**
   * An object to be a medium between different functions,
   * Its function is to optimize conjugation when the same verb is used
   * @type {Object}
   */
  let verbInfo = {
    /**
     * The verb
     * @type {String}
     */
    verb: "",
    /**
     * Is it irregular, values are: null (no value yet), 0 (regular) or 1 (irregular)
     * @type {Number}
     */
    irregular: null,
    prefix: "",
    rverb: ""
  };

  //==========================================
  // CLASS CONSTRUCTOR
  //==========================================

  /**
   * English language morphology
   *
   * @class EngMorpho
   * @extends Morpho
   */
  function EngMorpho() {
    Morpho.call(this, "eng");
    Morpho._nStem.call(this, "porter", "English Porter stemmer", __porterStemmer);
    Morpho._nStem.call(this, "lancaster", "English Lnacaster stemmer", __lancasterStemmer);

    Morpho._nConv.call(this, "sing2pl", "Singular noun to Plural", __singular2plural);
    g = this.g;
  }

  EngMorpho.prototype = Object.create(Morpho.prototype);
  let Me = EngMorpho.prototype;

  Me.constructor = EngMorpho;

  //==========================================
  // STEMMING FUNCTIONS
  //==========================================

  //==========================================
  // PORTER STEMMER FUNCTIONS
  //==========================================

  function __porterStemmer(word) {
    let stemmed,
    suffix,
    firstch,
    re,
    re2,
    re3,
    re4;
    //origword = word;

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
      g.debugFunction("1a",re, word);

    }
    else if (re2.test(word)) {
      word = word.replace(re2,"$1$2");
      g.debugFunction("1a",re2, word);
    }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    if (re.test(word)) {
      let fp = re.exec(word);
      re = new RegExp(mgr0);
      if (re.test(fp[1])) {
        re = /.$/;
        word = word.replace(re,"");
        g.debugFunction("1b",re, word);
      }
    }
    else if (re2.test(word)) {
      let fp = re2.exec(word);
      stemmed = fp[1];
      re2 = new RegExp(s_v);
      if (re2.test(stemmed)) {
        word = stemmed;
        g.debugFunction("1b", re2, word);

        re2 = /(at|bl|iz)$/;
        re3 = new RegExp("([^aeiouylsz])\\1$");
        re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");

        if (re2.test(word)) {
          word = word + "e";
          g.debugFunction("1b", re2, word);

        }
        else if (re3.test(word)) {
          re = /.$/;
          word = word.replace(re,"");
          g.debugFunction("1b", re3, word);

        }
        else if (re4.test(word)) {
          word = word + "e";
          g.debugFunction("1b", re4, word);
        }
      }
    }

    // Step 1c
    re = new RegExp("^(.*" + v + ".*)y$");
    if (re.test(word)) {
      let fp = re.exec(word);
      stemmed = fp[1];
      word = stemmed + "i";
      g.debugFunction("1c", re, word);
    }

    // Step 2
    re = new RegExp("^(.+?)(" + Object.keys(step2list).join("|") + ")$");
    //re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(word)) {
      let fp = re.exec(word);
      stemmed = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stemmed)) {
        word = stemmed + step2list[suffix];
        g.debugFunction("2", re, word);
      }
    }

    // Step 3
    re = new RegExp("^(.+?)(" + Object.keys(step3list).join("|") + ")$");
    //re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(word)) {
      let fp = re.exec(word);
      stemmed = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stemmed)) {
        word = stemmed + step3list[suffix];
        g.debugFunction("3", re, word);
      }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(word)) {
      let fp = re.exec(word);
      stemmed = fp[1];
      re = new RegExp(mgr1);
      if (re.test(stemmed)) {
        word = stemmed;
        g.debugFunction("4", re, word);
      }
    }
    else if (re2.test(word)) {
      let fp = re2.exec(word);
      stemmed = fp[1] + fp[2];
      re2 = new RegExp(mgr1);
      if (re2.test(stemmed)) {
        word = stemmed;
        g.debugFunction("4", re2, word);
      }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(word)) {
      let fp = re.exec(word);
      stemmed = fp[1];
      re = new RegExp(mgr1);
      re2 = new RegExp(meq1);
      re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re.test(stemmed) || (re2.test(stemmed) && !(re3.test(stemmed)))) {
        word = stemmed;
        g.debugFunction("5", re, re2, re3, word);
      }
    }

    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(word) && re2.test(word)) {
      re = /.$/;
      word = word.replace(re,"");
      g.debugFunction("5", re, re2, word);
    }

    // and turn initial Y back to y
    if (firstch == "y") {
      word = firstch.toLowerCase() + word.substr(1);
    }

    return word;
  }

  //==========================================
  // LANCASTER STEMMER FUNCTIONS
  //==========================================

  /* Lancaster Stemmer

  (The MIT License)

  Copyright (c) 2014 Titus Wormer <tituswormer@gmail.com>

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  'Software'), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

  function __lancasterStemmer(word){
    return applyRules(String(word).toLowerCase(), true);
  }

  function applyRules(value, isIntact) {
    let ruleset = rules[value.charAt(value.length - 1)];
    let breakpoint;
    let index;
    let length;
    let rule;
    let next;

    if (!ruleset) {
      return value;
    }

    index = -1;
    length = ruleset.length;

    while (++index < length) {
      rule = ruleset[index];

      if (!isIntact && rule.type === INTACT) {
        continue;
      }

      breakpoint = value.length - rule.match.length;

      if (breakpoint < 0 || value.substr(breakpoint) !== rule.match) {
        continue;
      }

      if (rule.type === PROTECT) {
        return value;
      }

      next = value.substr(0, breakpoint) + rule.replacement;

      if (!acceptable(next)) {
        continue;
      }

      if (rule.type === CONTINUE) {
        return applyRules(next, false);
      }

      return next;
    }

    return value;
  }
  /* Detect if a value is acceptable to return, or should
   * be stemmed further. */
  function acceptable(value) {
    return VOWELS.test(value.charAt(0)) ?
      value.length > 1 : value.length > 2 && VOWELS.test(value);
  }

  //==========================================
  // CONVERTION FUNCTIONS
  //==========================================

  /**
   * Transforms a singular noun to plural
   *
   * @method __singular2plural
   * @private
   * @static
   * @memberof EngMorpho
   * @param  {String}        noun The noun to be transformed to plural
   * @return {String}             Plural form of the given noun
   */
  function __singular2plural(noun){
    if (PL_SING[noun]) return noun;
    //http://www.enchantedlearning.com/grammar/partsofspeech/nouns/plurals/
    //TODO treat exceptions
    if (noun.endsWith("z")) noun += "z";
    if (/^.*(s|sh|ch|x|z)$/.test(noun)) {
      if (noun === "axis") return "axes";
      if (noun === "ox") return "oxen";
      return noun + "es";
    }

    if (noun.endsWith("y")) {
      if (/[^aeuio]y$/.test(noun)) return noun.slice(0, -1) + "ies";
      return noun + "s";
    }

    let m;
    if (( m = /^(.*[^f])fe?$/.exec(noun))) return m[1] + "ves";


    return noun + "s";
  }

  //==========================================
  // CONJUGATION FUNCTIONS
  //==========================================

  //Override conjugate function
  Me._conj = function(verb, opts) {

    if((opts.mood) && (opts.mood === Mood.Imp)) {
      if(opts.person === Person.S) return verb;
      return "";
    }

    let begin = "", end = "";

    __verbTypes(verb);

    //the case of be and have
    let conjVerb = {
      v: verbInfo.rverb, //verb
      p: verbInfo.prefix,
      i: verbInfo.irregular, //irregular
      c: verbInfo.conj //conjugation table
    };

    if ((opts.voice) && (opts.voice === Voice.P)) {
        switch (conjVerb.i) {
            case 1:
                end = " " + __beHaveConj(conjVerb, "Pp", opts);
                break;
            case 2:
            case 3:
            case 4:
                end = " " + __irregularConj(conjVerb, 1);
                break;
            default:
                end = " " + this.conj(verb, {tense:Tense.Pa});
        }
        conjVerb = {
            v: "be",
            p: "",
            i: 1,
            c: beHave["be"]
        };
    }

    if (opts.aspect) {
      if ([Aspect.C, Aspect.PC].includes(opts.aspect)) {
        // http://www.eclecticenglish.com/grammar/PresentContinuous1G.html
        let base = conjVerb.v;
        if(["lie", "die"].includes(verb)) base = verb.slice(0,-2) + "y";
        else if (/^[^aeuio]*[aeuio][^aeuioy]$/g.test(verb)) base = verb + verb.slice(-1);
        else if (/^.{2,}e$/g.test(verb)) base = verb.slice(0,-1);

        end = " " + base + "ing" + end;
        conjVerb = {
            v: "be",
            p: "",
            i: 1,
            c: beHave["be"]
        };
      }

      if ([Aspect.P, Aspect.PC].includes(opts.aspect)) {
          switch (conjVerb.i) {
              case 1:
                  end = " " + __beHaveConj(conjVerb, "Pp", opts) + end;
                  break;
              case 2:
              case 3:
              case 4:
                  end = " " + __irregularConj(conjVerb, 1) + end;
                  break;
              default:
                  end = " " + this.conj(verb, {tense:Tense.Pa}) + end;
          }
          conjVerb = {
              v: "have",
              p: "",
              i: 1,
              c: beHave["have"]
          };
       }
    }

    if ((opts.negated) && (opts.tense !== Tense.Fu)) {
      end = " not" + end;
      if ((!opts.aspect) || opts.aspect === Aspect.S) {
        if ((!opts.voice) || opts.voice === Voice.A) {
          end += " " + verb;
          conjVerb = {
              v: "do",
              p: "",
              i: 4,
              c: irregular4["do"]
          };
          //console.log("negation active aspect");
        }
      }
    }

    let cverb = conjVerb.v;

    switch (opts.tense) {

      case Tense.Pr:
      if (conjVerb.i == 1) return begin + __beHaveConj(conjVerb, "Pr", opts) + end;
      cverb = conjVerb.p + cverb;
      if (opts.person == Person.T && opts.number === GNumber.S) {
        //hurry, clarify
        cverb = cverb.replace(/([^aeuio])y$/, "$1ie");
        //go, veto, do, wash, mix, fizz (add e )
        cverb = cverb.replace(/(s|z|sh|ch|[^aeui]o)$/, "$1e");
        end = "s" + end;
      }
      break;

      case Tense.Pa:
      //To be, To have
      if (conjVerb.i == 1) return begin + __beHaveConj(conjVerb, "Pa", opts) + end;
      //Irregular (the block is just for variables)

      if (conjVerb.i > 1) return begin + __irregularConj(conjVerb, 0) + end;

      cverb = cverb.replace(/([^aeuio])y$/, "$1i");
      cverb = cverb.replace(/c$/, "ck");
      cverb = cverb.replace(/^([^aeuio]*[aeuio])([^aeuiohwxy])$/, "$1$2$2");
      if (cverb.endsWith("e")) end = "d" + end;
      else end = "ed" + end;
      break;

      case Tense.Fu:
      begin = "will ";
      if (opts.negated) begin += "not ";
      break;

    }//swich(tense)

    return begin + cverb + end;

  };

  function __beHaveConj(conjVerb, idx, opts) {
    if (conjVerb.i != 1) return conjVerb.v;
    if (! "Pr|Pa|Pp".includes(idx)) return conjVerb.v;
    if (idx === "Pp") return conjVerb.c[idx];

    if (opts.number === GNumber.S) {
      if (opts.person == Person.F) return conjVerb.c[idx][0];
      else if (opts.person == Person.T) return conjVerb.c[idx][1];
      return conjVerb.c[idx][2];
    }

    return conjVerb.c[idx][2];
  }

  /**
   * A method to conjugate irregular verbs.
   * Before using it, the verb must be verified if irregular
   *
   * @method __irregularConj
   * @private
   * @memberof EngMorpho
   * @param  {Object}      verb the irregular verb
   * @param  {Number}      idx  0 for past, 1 for past participle
   * @return {String}           the conjugation
   */
  function __irregularConj(conjVerb, idx) {
      switch (conjVerb.i) {
          case 3: return conjVerb.p + conjVerb.c;
          case 4:
            let res = conjVerb.c[idx];
            res = res.replace("1", conjVerb.v);
            if(idx === 1) {
                res = res.replace("2", conjVerb.c[0]);
                res = res.replace(/.-/,"");
            }
            return conjVerb.p + res;
          default: return conjVerb.p + conjVerb.v;
      }
  }

  //==========================================
  // CONJUGATION PREPROCESSOR FUNCTIONS
  //==========================================

  function __verbTypes(verb) {
    //delete spaces
    verb = verb.trim();
    if (verb === verbInfo.verb) return;

    verbInfo.rverb = verb;
    verbInfo.prefix = "";

    // conjugation table for the verb "be" or "have"
    let conjInfo = beHave[verb];

    if (conjInfo) {
        verbInfo.irregular = 1;
        verbInfo.conj = conjInfo;
        return;
    }

    {
      const pref = /(back|be|down|fore|for|in|mis|off|out|over|pre|re|sub|under|un|up|with)(.{3,})/gi;
      let match = pref.exec(verb);
      if (match) {
          verbInfo.prefix = match[1];
          verbInfo.rverb = match[2];
      }
    }

    //These verbs do not need conjugation table
    // Past = past participle = verb
    if (irregular2[verbInfo.rverb]) {
        verbInfo.irregular = 2;
        verbInfo.conj = null;
        return;
    }

    //These verbs have irregularities in past participle and past
    // past = past participle
    conjInfo = irregular3[verbInfo.rverb];
    if (conjInfo) {
        verbInfo.irregular = 3;
        verbInfo.conj = conjInfo;
        return;
    }

    // These verbs have irregularities in te past: a table of conjugation
    conjInfo = irregular4[verbInfo.rverb];
    if (conjInfo) {
        verbInfo.irregular = 4;
        verbInfo.conj = conjInfo;
        return;
    }

    verbInfo.irregular = 0;
    verbInfo.conj = null;

  }

  //==========================================
  // CONJUGATION OPTIONS PUBLIC FUNCTIONS
  //==========================================

  Me.lform = function() {
    //super doesn't work here
    let superFrm = Morpho.prototype.lform.call(this);
    const engForms =  {
      "pres_perf": {
        desc: "Indicative present perfect",
        mood: Mood.Ind,
        tense: Tense.Pr,
        aspect: Aspect.P
      },
      "past_perf": {
        desc: "Indicative past perfect",
        mood: Mood.Ind,
        tense: Tense.Pa,
        aspect: Aspect.P
      },
      "fut_perf": {
        desc: "Indicative future perfect",
        mood: Mood.Ind,
        tense: Tense.Fu,
        aspect: Aspect.P
      },
      "pres_cont": {
        desc: "Indicative present continuous",
        mood: Mood.Ind,
        tense: Tense.Pr,
        aspect: Aspect.C
      },
      "past_cont": {
        desc: "Indicative past continuous",
        mood: Mood.Ind,
        tense: Tense.Pa,
        aspect: Aspect.C
      },
      "fut_cont": {
        desc: "Indicative future continuous",
        mood: Mood.Ind,
        tense: Tense.Fu,
        aspect: Aspect.C
      },
      "pres_perf_cont": {
        desc: "Indicative present perfect continuous",
        mood: Mood.Ind,
        tense: Tense.Pr,
        aspect: Aspect.PC
      },
      "past_perf_cont": {
        desc: "Indicative past perfect continuous",
        mood: Mood.Ind,
        tense: Tense.Pa,
        aspect: Aspect.PC
      },
      "fut_perf_cont": {
        desc: "Indicative future perfect continuous",
        mood: Mood.Ind,
        tense: Tense.Fu,
        aspect: Aspect.PC
      }
    };

    return Object.assign({}, superFrm, engForms);
  };

  //==========================================
  // CONJUGATION OPTIONS PROTECTED FUNCTIONS
  //==========================================

  Me._gPpOpts = function() {
    return [
        {person:Person.F, number: GNumber.S}, //I
        {person:Person.S},//You
        {person:Person.T, number: GNumber.S, gender: Gender.M},//He
        {person:Person.T, number: GNumber.S, gender: Gender.F},//She
        {person:Person.T, number: GNumber.S, gender: Gender.N},//It
        {person:Person.F, number: GNumber.P}, //We
        {person:Person.T, number: GNumber.P}//They
    ];
  };

  Me._gPpName = function(opts) {
    switch (opts.person) {
      case Person.F:
      if (opts.number === GNumber.S) return "I";
      else return "We";

      case Person.S:
      return "You";

      case Person.T:
      if (opts.number == GNumber.S) {
        switch (opts.gender) {
          case Gender.M: return "He";
          case Gender.F: return "She";
          default: return "It";
        }
      }
      else return "They";

    }
    return "";
  };

  //==========================================
  // NORMALIZATION FUNCTIONS
  //==========================================

  Me.norm = function(word, _opts){
    let result = NORM[word];
    if(result) return result;
    return word;
  };

  //==========================================
  // SEGMENTATION FUNCTIONS
  //==========================================

  //==========================================
  // HELPER FUNCTIONS
  //==========================================


}());
