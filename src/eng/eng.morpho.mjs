import Morpho from "../morpho.mjs";

class EngMorpho extends Morpho {
  //These static members must be overriden in extended classes;
  //otherwise, the class won't function properly
  //Contains stemmers
  static stemmers = {};
  //Contains PoS conversions
  static converters = {};
  static cstemmer = "";//current stemmer
  static cconverter = "";//current converter
  static langCode = "eng";

  //==========================================
  // CONJUGATION PROTECTED FUNCTIONS
  //==========================================
  static _conj(verb, _opts){
    return __conj(verb, _opts);
  }

  //==========================================
  // CONJUGATION OPTIONS PUBLIC FUNCTIONS
  //==========================================

  static lform = function() {
    //super doesn't work here
    let superFrm = Morpho.lform();
    const engForms =  {
      "pres_perf": {
        desc: "Indicative present perfect",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Pr,
        aspect: Morpho.Aspect.P
      },
      "past_perf": {
        desc: "Indicative past perfect",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Pa,
        aspect: Morpho.Aspect.P
      },
      "fut_perf": {
        desc: "Indicative future perfect",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Fu,
        aspect: Morpho.Aspect.P
      },
      "pres_cont": {
        desc: "Indicative present continuous",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Pr,
        aspect: Morpho.Aspect.C
      },
      "past_cont": {
        desc: "Indicative past continuous",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Pa,
        aspect: Morpho.Aspect.C
      },
      "fut_cont": {
        desc: "Indicative future continuous",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Fu,
        aspect: Morpho.Aspect.C
      },
      "pres_perf_cont": {
        desc: "Indicative present perfect continuous",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Pr,
        aspect: Morpho.Aspect.PC
      },
      "past_perf_cont": {
        desc: "Indicative past perfect continuous",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Pa,
        aspect: Morpho.Aspect.PC
      },
      "fut_perf_cont": {
        desc: "Indicative future perfect continuous",
        mood: Morpho.Mood.Ind,
        tense: Morpho.Tense.Fu,
        aspect: Morpho.Aspect.PC
      }
    };

    return Object.assign({}, superFrm, engForms);
  }

  //==========================================
  // CONJUGATION OPTIONS PROTECTED FUNCTIONS
  //==========================================

  static _gPpOpts() {
    return [
        {person:Morpho.Person.F, number: Morpho.GNumber.S}, //I
        {person:Morpho.Person.S},//You
        {person:Morpho.Person.T, number: Morpho.GNumber.S, gender: Morpho.Gender.M},//He
        {person:Morpho.Person.T, number: Morpho.GNumber.S, gender: Morpho.Gender.F},//She
        {person:Morpho.Person.T, number: Morpho.GNumber.S, gender: Morpho.Gender.N},//It
        {person:Morpho.Person.F, number: Morpho.GNumber.P}, //We
        {person:Morpho.Person.T, number: Morpho.GNumber.P}//They
    ];
  };

  static _gPpName(opts) {
    switch (opts.person) {
      case Morpho.Person.F:
      if (opts.number === Morpho.GNumber.S) return "I";
      else return "We";

      case Morpho.Person.S:
      return "You";

      case Morpho.Person.T:
      if (opts.number == Morpho.GNumber.S) {
        switch (opts.gender) {
          case Morpho.Gender.M: return "He";
          case Morpho.Gender.F: return "She";
          default: return "It";
        }
      }
      else return "They";

    }
    return "";
  }

  //==========================================
  // NORMALIZATION FUNCTIONS
  //==========================================

  static norm(word, _opts){
    let result = NORM[word];
    if(result) return result;
    return word;
  }

  //==========================================
  // SEGMENTATION FUNCTIONS
  //==========================================

  /**
   * Segment a given text
   */

  //==========================================
  // HELPER FUNCTIONS
  //==========================================

} //End Class

//==========================================
// CONSTANTS
//==========================================

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

const abbreviation = {
  "jan": 1, "feb": 1, "mar": 1, "apr": 1, "may": 1, "jun": 1,
  "jul": 1, "aug": 1, "sep": 1, "oct": 1, "nov": 1, "dec": 1,

  "sat": 1, "sun": 1, "mon": 1, "tue": 1, "wed": 1, "thu": 1, "fri": 1,

  //http://plato.algonquincollege.com/applications/guideToGrammarUS/?page_id=146
  //Titles before names
  "mr": 1, "mrs": 1, "ms": 1, "dr": 1, "prof": 1, "gen": 1, "rep": 1,
  "sen": 1, "st": 1,
  //Titles after names
  "jr": 1, "sr": 1,
  "etc": 1,
  "in": 1,
  //TODO: https://public.oed.com/how-to-use-the-oed/abbreviations/

};

const STOP_WORDS = {

  "a": 1, "a's": 1, "able": 1, "about": 1, "above": 1, "according": 1, "accordingly": 1, "across": 1,
  "actually": 1, "after": 1, "afterwards": 1, "again": 1, "against": 1, "ain't": 1, "all": 1,
  "allow": 1, "allows": 1, "almost": 1, "alone": 1, "along": 1, "already": 1, "also": 1, "although": 1,
  "always": 1, "am": 1, "among": 1, "amongst": 1, "an": 1, "and": 1, "another": 1, "any": 1, "anybody": 1,
  "anyhow": 1, "anyone": 1, "anything": 1, "anyway": 1, "anyways": 1, "anywhere": 1, "apart": 1,
  "appear": 1, "appreciate": 1, "appropriate": 1, "are": 1, "aren't": 1, "around": 1, "as": 1,
  "aside": 1, "ask": 1, "asking": 1, "associated": 1, "at": 1, "available": 1, "away": 1, "awfully": 1,
  "b": 1, "be": 1, "became": 1, "because": 1, "become": 1, "becomes": 1, "becoming": 1, "been": 1,
  "before": 1, "beforehand": 1, "behind": 1, "being": 1, "believe": 1, "below": 1, "beside": 1,
  "besides": 1, "best": 1, "better": 1, "between": 1, "beyond": 1, "both": 1, "brief": 1, "but": 1,
  "by": 1, "c": 1, "c'mon": 1, "c's": 1, "came": 1, "can": 1, "can't": 1, "cannot": 1, "cant": 1,
  "cause": 1, "causes": 1, "certain": 1, "certainly": 1, "changes": 1, "clearly": 1, "co": 1, "com": 1,
  "come": 1, "comes": 1, "concerning": 1, "consequently": 1, "consider": 1, "considering": 1,
  "contain": 1, "containing": 1, "contains": 1, "corresponding": 1, "could": 1, "couldn't": 1,
  "course": 1, "currently": 1, "d": 1, "definitely": 1, "described": 1, "despite": 1, "did": 1,
  "didn't": 1, "different": 1, "do": 1, "does": 1, "doesn't": 1, "doing": 1, "don't": 1, "done": 1,
  "down": 1, "downwards": 1, "during": 1, "e": 1, "each": 1, "edu": 1, "eg": 1, "eight": 1, "either": 1,
  "else": 1, "elsewhere": 1, "enough": 1, "entirely": 1, "especially": 1, "et": 1, "etc": 1, "even": 1,
  "ever": 1, "every": 1, "everybody": 1, "everyone": 1, "everything": 1, "everywhere": 1, "ex": 1,
  "exactly": 1, "example": 1, "except": 1, "f": 1, "far": 1, "few": 1, "fifth": 1, "first": 1, "five": 1,
  "followed": 1, "following": 1, "follows": 1, "for": 1, "former": 1, "formerly": 1, "forth": 1,
  "four": 1, "from": 1, "further": 1, "furthermore": 1, "g": 1, "get": 1, "gets": 1, "getting": 1,
  "given": 1, "gives": 1, "go": 1, "goes": 1, "going": 1, "gone": 1, "got": 1, "gotten": 1,
  "greetings": 1, "h": 1, "had": 1, "hadn't": 1, "happens": 1, "hardly": 1, "has": 1, "hasn't": 1,
  "have": 1, "haven't": 1, "having": 1, "he": 1, "he's": 1, "hello": 1, "help": 1, "hence": 1, "her": 1,
  "here": 1, "here's": 1, "hereafter": 1, "hereby": 1, "herein": 1, "hereupon": 1, "hers": 1,
  "herself": 1, "hi": 1, "him": 1, "himself": 1, "his": 1, "hither": 1, "hopefully": 1, "how": 1,
  "howbeit": 1, "however": 1, "i": 1, "i'd": 1, "i'll": 1, "i'm": 1, "i've": 1, "ie": 1, "if": 1,
  "ignored": 1, "immediate": 1, "in": 1, "inasmuch": 1, "inc": 1, "indeed": 1, "indicate": 1,
  "indicated": 1, "indicates": 1, "inner": 1, "insofar": 1, "instead": 1, "into": 1, "inward": 1,
  "is": 1, "isn't": 1, "it": 1, "it'd": 1, "it'll": 1, "it's": 1, "its": 1, "itself": 1, "j": 1, "just": 1,
  "k": 1, "keep": 1, "keeps": 1, "kept": 1, "know": 1, "knows": 1, "known": 1, "l": 1, "last": 1,
  "lately": 1, "later": 1, "latter": 1, "latterly": 1, "least": 1, "less": 1, "lest": 1, "let": 1,
  "let's": 1, "like": 1, "liked": 1, "likely": 1, "little": 1, "look": 1, "looking": 1, "looks": 1,
  "ltd": 1, "m": 1, "mainly": 1, "many": 1, "may": 1, "maybe": 1, "me": 1, "mean": 1, "meanwhile": 1,
  "merely": 1, "might": 1, "more": 1, "moreover": 1, "most": 1, "mostly": 1, "much": 1, "must": 1,
  "my": 1, "myself": 1, "n": 1, "name": 1, "namely": 1, "nd": 1, "near": 1, "nearly": 1, "necessary": 1,
  "need": 1, "needs": 1, "neither": 1, "never": 1, "nevertheless": 1, "new": 1, "next": 1, "nine": 1,
  "no": 1, "nobody": 1, "non": 1, "none": 1, "noone": 1, "nor": 1, "normally": 1, "not": 1, "nothing": 1,
  "novel": 1, "now": 1, "nowhere": 1, "o": 1, "obviously": 1, "of": 1, "off": 1, "often": 1, "oh": 1,
  "ok": 1, "okay": 1, "old": 1, "on": 1, "once": 1, "one": 1, "ones": 1, "only": 1, "onto": 1, "or": 1,
  "other": 1, "others": 1, "otherwise": 1, "ought": 1, "our": 1, "ours": 1, "ourselves": 1,
  "out": 1, "outside": 1, "over": 1, "overall": 1, "own": 1, "p": 1, "particular": 1, "particularly": 1,
  "per": 1, "perhaps": 1, "placed": 1, "please": 1, "plus": 1, "possible": 1, "presumably": 1,
  "probably": 1, "provides": 1, "q": 1, "que": 1, "quite": 1, "qv": 1, "r": 1, "rather": 1, "rd": 1, "re": 1,
  "really": 1, "reasonably": 1, "regarding": 1, "regardless": 1, "regards": 1, "relatively": 1,
  "respectively": 1, "right": 1, "s": 1, "said": 1, "same": 1, "saw": 1, "say": 1, "saying": 1, "says": 1,
  "second": 1, "secondly": 1, "see": 1, "seeing": 1, "seem": 1, "seemed": 1, "seeming": 1, "seems": 1,
  "seen": 1, "self": 1, "selves": 1, "sensible": 1, "sent": 1, "serious": 1, "seriously": 1, "seven": 1,
  "several": 1, "shall": 1, "she": 1, "should": 1, "shouldn't": 1, "since": 1, "six": 1, "so": 1,
  "some": 1, "somebody": 1, "somehow": 1, "someone": 1, "something": 1, "sometime": 1, "sometimes": 1,
  "somewhat": 1, "somewhere": 1, "soon": 1, "sorry": 1, "specified": 1, "specify": 1, "specifying": 1,
  "still": 1, "sub": 1, "such": 1, "sup": 1, "sure": 1, "t": 1, "t's": 1, "take": 1, "taken": 1, "tell": 1,
  "tends": 1, "th": 1, "than": 1, "thank": 1, "thanks": 1, "thanx": 1, "that": 1, "that's": 1, "thats": 1,
  "the": 1, "their": 1, "theirs": 1, "them": 1, "themselves": 1, "then": 1, "thence": 1, "there": 1,
  "there's": 1, "thereafter": 1, "thereby": 1, "therefore": 1, "therein": 1, "theres": 1,
  "thereupon": 1, "these": 1, "they": 1, "they'd": 1, "they'll": 1, "they're": 1, "they've": 1,
  "think": 1, "third": 1, "this": 1, "thorough": 1, "thoroughly": 1, "those": 1, "though": 1,
  "three": 1, "through": 1, "throughout": 1, "thru": 1, "thus": 1, "to": 1, "together": 1, "too": 1,
  "took": 1, "toward": 1, "towards": 1, "tried": 1, "tries": 1, "truly": 1, "try": 1, "trying": 1,
  "twice": 1, "two": 1, "u": 1, "un": 1, "under": 1, "unfortunately": 1, "unless": 1, "unlikely": 1,
  "until": 1, "unto": 1, "up": 1, "upon": 1, "us": 1, "use": 1, "used": 1, "useful": 1, "uses": 1, "using": 1,
  "usually": 1, "uucp": 1, "v": 1, "value": 1, "various": 1, "very": 1, "via": 1, "viz": 1, "vs": 1, "w": 1,
  "want": 1, "wants": 1, "was": 1, "wasn't": 1, "way": 1, "we": 1, "we'd": 1, "we'll": 1, "we're": 1,
  "we've": 1, "welcome": 1, "well": 1, "went": 1, "were": 1, "weren't": 1, "what": 1, "what's": 1,
  "whatever": 1, "when": 1, "whence": 1, "whenever": 1, "where": 1, "where's": 1, "whereafter": 1,
  "whereas": 1, "whereby": 1, "wherein": 1, "whereupon": 1, "wherever": 1, "whether": 1, "which": 1,
  "while": 1, "whither": 1, "who": 1, "who's": 1, "whoever": 1, "whole": 1, "whom": 1, "whose": 1,
  "why": 1, "will": 1, "willing": 1, "wish": 1, "with": 1, "within": 1, "without": 1, "won't": 1,
  "wonder": 1, "would": 1, "would": 1, "wouldn't": 1, "x": 1, "y": 1, "yes": 1, "yet": 1, "you": 1,
  "you'd": 1, "you'll": 1, "you're": 1, "you've": 1, "your": 1, "yours": 1, "yourself": 1,
  "yourselves": 1, "z": 1, "zero": 1
};
//==========================================
// INNER VARIABLES
//==========================================

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

  }
  else if (re2.test(word)) {
    word = word.replace(re2,"$1$2");
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
    }
  }
  else if (re2.test(word)) {
    let fp = re2.exec(word);
    stemmed = fp[1];
    re2 = new RegExp(s_v);
    if (re2.test(stemmed)) {
      word = stemmed;

      re2 = /(at|bl|iz)$/;
      re3 = new RegExp("([^aeiouylsz])\\1$");
      re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");

      if (re2.test(word)) {
        word = word + "e";
      }
      else if (re3.test(word)) {
        re = /.$/;
        word = word.replace(re,"");
      }
      else if (re4.test(word)) {
        word = word + "e";
      }
    }
  }

  // Step 1c
  re = new RegExp("^(.*" + v + ".*)y$");
  if (re.test(word)) {
    let fp = re.exec(word);
    stemmed = fp[1];
    word = stemmed + "i";
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
    }
  }
  else if (re2.test(word)) {
    let fp = re2.exec(word);
    stemmed = fp[1] + fp[2];
    re2 = new RegExp(mgr1);
    if (re2.test(stemmed)) {
      word = stemmed;
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
    }
  }

  re = /ll$/;
  re2 = new RegExp(mgr1);
  if (re.test(word) && re2.test(word)) {
    re = /.$/;
    word = word.replace(re,"");
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
function __conj(verb, opts) {

  if (verb == "can"){
    if (opts.voice === Morpho.Voice.P) return ""
    if ([Morpho.Aspect.P, Morpho.Aspect.PC, Morpho.Aspect.C].includes(opts.aspect)) return ""
    let end = ""
    if (opts.negated) end = " not"
    if (opts.tense === Morpho.Tense.Pr) return "can" + end
    else if (opts.tense === Morpho.Tense.Pa) return "could" + end
    return ""
  }

  if((opts.mood) && (opts.mood === Morpho.Mood.Imp)) {
    if(opts.person === Morpho.Person.S) return verb;
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

  if ((opts.voice) && (opts.voice === Morpho.Voice.P)) {
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
              end = " " + __conj(verb, {tense:Morpho.Tense.Pa});
      }
      conjVerb = {
          v: "be",
          p: "",
          i: 1,
          c: beHave["be"]
      };
  }

  if (opts.aspect) {
    if ([Morpho.Aspect.C, Morpho.Aspect.PC].includes(opts.aspect)) {
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

    if ([Morpho.Aspect.P, Morpho.Aspect.PC].includes(opts.aspect)) {
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
                end = " " + __conj(verb, {tense:Morpho.Tense.Pa}) + end;
        }
        conjVerb = {
            v: "have",
            p: "",
            i: 1,
            c: beHave["have"]
        };
     }
  }

  if ((opts.negated) && (opts.tense !== Morpho.Tense.Fu)) {
    end = " not" + end;
    if ((!opts.aspect) || opts.aspect === Morpho.Aspect.S) {
      if ((!opts.voice) || opts.voice === Morpho.Voice.A) {
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

  let cverb = conjVerb.p + conjVerb.v;

  switch (opts.tense) {

    case Morpho.Tense.Pr:
    if (conjVerb.i == 1) return begin + __beHaveConj(conjVerb, "Pr", opts) + end;
    //cverb = conjVerb.p + cverb;
    if (opts.person == Morpho.Person.T && opts.number === Morpho.GNumber.S) {
      //hurry, clarify
      cverb = cverb.replace(/([^aeuio])y$/, "$1ie");
      //go, veto, do, wash, mix, fizz (add e )
      cverb = cverb.replace(/(s|z|sh|ch|[^aeui]o)$/, "$1e");
      end = "s" + end;
    }
    break;

    case Morpho.Tense.Pa:
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

    case Morpho.Tense.Fu:
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

  if (opts.number === Morpho.GNumber.S) {
    if (opts.person == Morpho.Person.F) return conjVerb.c[idx][0];
    else if (opts.person == Morpho.Person.T) return conjVerb.c[idx][1];
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
        {
          let res = conjVerb.c[idx];
          res = res.replace("1", conjVerb.v);
          if(idx === 1) {
              res = res.replace("2", conjVerb.c[0]);
              res = res.replace(/.-/,"");
          }
          return conjVerb.p + res;
        }
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
    const pref = /^(back|be|down|fore|for|in|mis|off|out|over|pre|re|sub|under|un|up|with)(.{3,})/gi;
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


EngMorpho._nStem("porter", "English Porter stemmer", __porterStemmer);
EngMorpho._nStem("lancaster", "English Lancaster stemmer", __lancasterStemmer);

EngMorpho._nConv("sing2pl", "Singular noun to Plural", __singular2plural);

EngMorpho.abbr = abbreviation;
EngMorpho.stop_words = STOP_WORDS;

export default EngMorpho;
