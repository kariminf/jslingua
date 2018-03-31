(function () {

  "use strict";

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
  //Voice = F.Voice,
  GNumber = F.Number,
  Aspect = F.Aspect,
  Gender = F.Gender,
  Person = F.Person;

  //let g;

  /**
   * French language morphology
   *
   * @class FraMorpho
   * @extends Morpho
   */
  function FraMorpho() {
    Morpho.call(this, "fra");
    Morpho.newStemmer.call(this, "snowballFrStemmer", "French Snowball stemmr", snowballStemmer);

    Morpho.newPosConverter.call(this, "singularToPlural", "Singular noun to Plural", singular2plural);
    //g = this.g;
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

  //https://en.wikipedia.org/wiki/French_conjugation
  Me.getForms = function() {
    return  {
      //Indicative
      "Indicative Present (présent)": {
        mood: Mood.Ind,
        tense: Tense.Pr,
        aspect: Aspect.S
      },
      "Indicative Present perfect (passé composé)": {
        mood: Mood.Ind,
        tense: Tense.Pr,
        aspect: Aspect.P
      },
      "Indicative Imperfect (imparfait)": {
        mood: Mood.Ind,
        tense: Tense.Pr,
        aspect: Aspect.I
      },
      //Exprime une action passée, achevée, d'une durée plutôt longue et antérieure à une autre action passée:
      //https://www.francaisfacile.com/exercices/exercice-francais-2/exercice-francais-8681.php
      "Indicative Pluperfect (plus-que-parfait)": {
        mood: Mood.Ind,
        tense: Tense.Pa,
        aspect: Aspect.P,
        period: "long"
      },
      "Indicative Simple past (passé simple)": {
        mood: Mood.Ind,
        tense: Tense.Pa,
        aspect: Aspect.S
      },
      //Exprime une action passée, achevée, d'une durée assez brève et antérieure à une autre action passée:
      //https://www.francaisfacile.com/exercices/exercice-francais-2/exercice-francais-8681.php
      "Indicative Past perfect (passé antérieur)": {
        mood: Mood.Ind,
        tense: Tense.Pa,
        aspect: Aspect.P,
        period: "short"
      },
      "Indicative Simple future (futur simple)": {
        mood: Mood.Ind,
        tense: Tense.Fu,
        aspect: Aspect.S
      },
      "Indicative Future perfect (futur antérieur)": {
        mood: Mood.Ind,
        tense: Tense.Fu,
        aspect: Aspect.P
      },

      //Subjunctive
      "Subjunctive Present": {
        mood: Mood.Sub,
        tense: Tense.Pr,
        aspect: Aspect.S
      },
      "Subjunctive Past (passé)": {
        mood: Mood.Sub,
        tense: Tense.Pa,
        aspect: Aspect.S
      },
      "Subjunctive Imperfect": {
        mood: Mood.Sub,
        tense: Tense.Pr,
        aspect: Aspect.I
      },
      "Subjunctive Pluperfect": {
        mood: Mood.Sub,
        tense: Tense.Pa,
        aspect: Aspect.P
      },

      //Imperative
      "Imperative Present": {
        mood: Mood.Imp,
        tense: Tense.Pr
      },
      "Imperative Past": {
        mood: Mood.Imp,
        tense: Tense.Pa
      },

      //Conditional
      "Conditional Present": {
        mood: Mood.Cnd,
        tense: Tense.Pr
      },
      "Conditional Past (form 1)": {
        mood: Mood.Cnd,
        tense: Tense.Pa,
        form: 1
      },
      "Conditional Past (form 2)": {
        mood: Mood.Cnd,
        tense: Tense.Pa,
        form: 2
      }
    };
  };


  /**
  * Each language has a conjugation table model.
  * For example, in English, Arabic and French, we put pronouns in rows.
  * As for Japanese, the conjugation doesn't follow that pattern.
  *
  * @method getConjugModel
  * @override
  * @memberof FraMorpho
  * @return {Object}   Conjugation model
  */
  Me.getConjugModel = function(){
    //Past and Present are defaults
    return {
      rows: ["Pronoun"],
      cols: ["Negation"] //Conj
    };
  };

  /*
  Me.getOptName = function(optLabel, opts){
    switch (optLabel) {
      case "Pronoun": return this.getPronounName(opts);
      case "Conj": return "Conjugation";
      default:
    }
    return "";
  };
  */

  //let C = Object.freeze;

  //=================
  //Conjugation zone
  //=================

  //Second group verbs
  //https://en.wiktionary.org/w/index.php?title=Category:French_second_group_verbs&pageuntil=MURIR%0Amurir#mw-pages
  const verbs2g = {
    //     A
    // ==========
    "ab": {
      "asourd": 1, "âtard": 1, "êt": 1, "ol": 1, "onn": 1,
      "out": 1, "réag": 1, "rout": 1, "rut": 1
    },
    "ac": {
      "calm": 1, "compl": 1, "courc": 1, "croup": 1
    },
    "ad": {
      "ouc": 1, "vert": 1
    },
    "af": {
      "fad": 1, "faibl": 1, "ferm": 1, "franch": 1
    },
    "ag": {
      "": 1, "on": 1, "rand": 1, "uerr": 1
    },
    "ah": {
      "ur": 1
    },
    "ai": {
      "gr": 1
    },
    "al": {
      "angu": 1, "ent": 1, "lot": 1, "ourd": 1, "un": 1
    },
    "am": {
      "aigr": 1, "ars": 1, "at": 1, "enu": 1, "err": 1, "eubl": 1,
      "inc": 1, "oindr": 1, "oll": 1, "ort": 1, "ui": 1
    },
    "an": {
      "éant": 1, "obl": 1, "ord": 1
    },
    "ap": {
      "lan": 1, "lat": 1, "pauvr": 1, "pesant": 1, "plaud": 1, "profond": 1
    },
    "ar": {
      "rond": 1
    },
    "as": {
      "sag": 1, "sain": 1, "serv": 1, "s": 1, "sombr": 1, "sort": 1,
      "soup": 1, "soupl": 1, "sourd": 1, "souv": 1, "sujett": 1
    },
    "at": {
      "tendr": 1, "tér": 1, "terr": 1, "tiéd": 1
    },
    "av": {
      "ach": 1, "ert": 1, "eul": 1, "il": 1
    },

    //      B
    // ============
    "ba": {
      "nn": 1, "rr": 1, "ud": 1
    },
    "bâ": {
      "t": 1
    },
    "bé": {
      "n": 1
    },
    "bl": {
      "anch": 1, "êm": 1, "ett": 1, "eu": 1, "ond": 1, "ott": 1
    },
    "bo": {
      "nd": 1, "uff": 1
    },
    "br": {
      "and": 1, "un": 1
      //"uire": 1,

    },

    //    C
    // ========
    "ca": {
      "nd": 1
    },
    "ch": {
      "auv": 1, "ér": 1, "ois": 1
    },
    "co": {
      "mpat": 1, "nvert": 1, "sais": 1, "t": 1
    },
    "cr": {
      "ép": 1, "oup": 1
    },

    //     D
    // ==========
    "dé": {
      "crép": 1, "fin": 1, "fléch": 1, "fraîch": 1, "garn": 1, "gauch": 1,
      "glut": 1, "gourd": 1, "gross": 1, "guerp": 1, "mol": 1, "mun": 1,
      "pér": 1, "roug": 1, "sempl": 1, "sinvest": 1, "sobé": 1,
      "sun": 1
    },
    "de": {
      "ssais": 1, "ssert": 1
    },
    "di": {
      "vert": 1
    },
    "du": {
      "rc": 1
    },

    //     E
    // ==========
    "éb": {
      "ah": 1, "aub": 1, "aud": 1, "lou": 1
    },
    "éc": {
      "lairc": 1, "rapout": 1
    },
    "ef": {
      "fleur": 1
    },
    "él": {
      "arg": 1
    },
    "em": {
      "bell": 1, "bout": 1, "pl": 1, "puant": 1
    },
    "en": {
      "chér": 1, "durc": 1, "fou": 1, "glout": 1, "gourd": 1, "hard": 1,
      "laid": 1, "nobl": 1, "orgueill": 1, "rich": 1, "sevel": 1, "vah": 1
    },
    "ép": {
      "aiss": 1, "anou": 1
    },
    "éq": {
      "uarr": 1
    },
    "es": {
      "tourb": 1
    },
    "ét": {
      "abl": 1, "ourd": 1, "réc": 1
    },
    "év": {
      "anou": 1
    },

    //      F
    // ===========
    "fa": {
      "ibl": 1, "ill": 1, "rc": 1
    },
    "fi": {
      "n": 1
    },
    "fl": {
      "éch": 1, "étr": 1, "eur": 1, "or": 1
    },
    "fo": {
      "rc": 1, "u": 1, "urb": 1, "urn": 1
    },
    "fr": {
      "aîch": 1, "anch": 1, "ém": 1, "oid": 1
    },

    //      G
    // ============
    "ga": {
      "rant": 1, "rn": 1, "uch": 1, "ud": 1
    },
    "gé": {
      "m": 1
    },
    "gl": {
      "ap": 1
    },
    "gr": {
      "and": 1, "av": 1, "oss": 1
    },
    "gu": {
      "ér": 1
    },

    //     H
    // ==========
    "ha": {
      "v": 1
    },
    "he": {
      "nn": 1
    },
    "ho": {
      "nn": 1
    },

    //    I
    // =========
    "im": {
      "part": 1
    },
    "in": {
      "fléch": 1, "terag": 1, "terconvert": 1, "tervert": 1, "vert": 1, "vest": 1
    },

    //     J
    // =========
    "ja": {
      "ill": 1, "un": 1
    },
    "jo": {
      "u": 1
    },

    //    L
    // =========
    "la": {
      "id": 1, "ngu": 1
    },
    "lo": {
      "t": 1
    },

    //   M
    // ========
    "ma": {
      "igr": 1
    },
    "me": {
      "urtr": 1
    },
    "mi": {
      "nc": 1
    },
    "mo": {
      "is": 1, "ll": 1
    },
    "mu": {
      "g": 1, "n": 1, "r": 1
    },
    "mû": {
      "r": 1
    },
    "na": {
      "nt": 1
    },
    "no": {
      "irc": 1, "urr": 1
    },
    "ob": {
      "é": 1, "scurc": 1
    },
    "ou": {
      "rd": 1
    },

    //    P
    // =========
    "pâ": {
      "l": 1,
      "t": 1
    },
    "pé": {
      "r": 1,
      "tr": 1
    },
    "pe": {
      "rvert": 1
    },
    "po": {
      "l": 1, "urr": 1
    },
    "pr": {
      "æmun": 1, "édéfin": 1, "émun": 1
    },
    "pu": {
      "n": 1
    },

    //     R
    // =========
    "ra": {
      "ccourc": 1, "corn": 1, "douc": 1, "fferm": 1, "fraich": 1, "fraîch": 1,
      "gaillard": 1, "id": 1, "jeun": 1, "lent": 1, "moll": 1, "nc": 1,
      "ss": 1, "ssort": 1, "v": 1
    },
    "ré": {
      "ag": 1, "assort": 1, "enchér": 1, "fléch": 1, "g": 1, "invest": 1,
      "jou": 1, "part": 1, "tabl": 1, "tréc": 1, "un": 1, "uss": 1
    },
    "re": {
      "bât": 1, "bond": 1, "ço": 1, "convert": 1, "crép": 1, "défin": 1,
      "fleur": 1, "froid": 1, "garn": 1, "mbrun": 1, "mpl": 1, "nchér": 1,
      "nforc": 1, "pétr": 1, "pun": 1, "splend": 1, "ssais": 1, "ssort": 1,
      "ssurg": 1, "surg": 1, "tent": 1, "verd": 1, "vern": 1
    },
    "ro": {
      "id": 1, "s": 1, "ug": 1, "uss": 1
    },
    "rô": {
      "t": 1
    },
    "ru": {
      "g": 1
    },


    //     S
    // ===========
    "sa": {
      "is": 1, "l": 1, "ur": 1
    },
    "se": {
      "rt": 1
    },
    "sé": {
      "v": 1
    },
    "su": {
      "b": 1, "bvert": 1, "renchér": 1, "rg": 1, "rinvest": 1
    },

    //    T
    // =========
    "ta": {
      "p": 1, "r": 1
    },
    "te": {
      "rn": 1
    },
    "ti": {
      "éd": 1
    },
    "tr": {
      "ah": 1, "ans": 1, "avest": 1
    },

    //  U
    // =========
    "un": {
      "": 1
    },

    //    V
    // =========
    "va": {
      "g": 1
    },
    "ve": {
      "rd": 1, "rn": 1
    },
    "vi": {
      "eill": 1
    },
    "vo": {
      "m": 1
    },
    "vr": {
      "omb": 1
    }

  };

  //Verbs which are conjugated with auxilary verb: être
  //https://en.wiktionary.org/wiki/Category:French_verbs_taking_être_as_auxiliary
  const etreVerbs = {
    "advenir": 1, "aller": 1, "apparaitre": 1, "apparaître": 1, "arriver": 1,
    "bienvenir": 1,
    "débrayer": 1, "décéder": 1, "descendre": 1, "devenir": 1, "disparaître": 1,
    "entrer": 1,
    "impartir": 1, "intervenir": 1,
    "marrer": 1, "monter": 1, "mourir": 1,
    "naitre": 1, "naître": 1,
    "obvenir": 1,
    "paraître": 1, "paralyser": 1, "partir": 1, "parvenir": 1, "passer": 1, "provenir": 1,
    "réapparaître": 1, "redescendre": 1, "redevenir": 1, "remonter": 1, "renaitre": 1, "renaître": 1,
    "rentrer": 1, "repartir": 1, "repasser": 1, "ressortir": 1, "ressusciter": 1, "rester": 1, "retomber": 1, "retourner": 1, "revenir": 1,
    "sortir": 1, "surmener": 1, "survenir": 1,
    "tomber": 1,
    "vader": 1, "venir": 1
  };

  /**
   * Verbs of goup 1 which ends with either eler or eter; and don't
   * double the t or l when meeting a silent e in conjugation \\
   * Source: http://www.ortholud.com/code/les-verbes.php?terminaison=eler,%20eter
   * @type {Object}
   */
  const notDoubleLT = {
    "cel": 1, "décel": 1, "recel": 1, "cisel": 1, "démantel": 1, "écartel": 1,
    "encastel": 1, "gel": 1, "dégel": 1, "congel": 1, "surgel": 1, "martel": 1,
    "model": 1, "pel": 1, "achet": 1, "rachet": 1, "béguet": 1, "corset": 1,
    "crochet": 1, "filet": 1, "furet": 1, "halet": 1
  };

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
     * The group of the verb
     * @type {Number}
     */
    group: 0,

    inf: "",

    irr: {}
  };

  /**
   * Get the verbs group: 1, 2 or 3.
   *
   * @method preProcessVerb
   * @private
   * @memberof FraMorpho
   * @param  {String}    verb the verb
   */
  function preProcessVerb(verb) {

    if (verbInfo.verb === verb) return;

    verbInfo.verb = verb;
    verbInfo.irr = {};
    verbInfo.pp = null;
    //auxilary
    verbInfo.aux = (etreVerbs[verb])? "être": "avoir";

    if (irregular[verb]) {
      verbInfo.irr = irregular[verb];
      verbInfo.pp = verbInfo.irr.pp;
      verbInfo.group = 4;//irregular
      return;
    }

    if (verb.endsWith("er")) {
      verbInfo.group = 1;
      extractG1Irr();
      return;
    }

    if (verb.endsWith("ir") && verb.length > 3) {
      let idx = verbs2g[verb.slice(0, 2)];
      let ref = verb.slice(2, -2);
      if (idx && idx[ref]) {
        verbInfo.group = 2;
        verbInfo.inf = verb.slice(0, -2);
        verbInfo.pp = verb.slice(0, -1);
        return;
      }
    }

    if (verb === "haïr") {
      verbInfo.group = 2;
      verbInfo.inf = verb.slice(0, -1);
      verbInfo.pp = verb.slice(0, -1);
      return;
    }

    verbInfo.group = 3;
    extractG3Irr();

  }

  function extractG1Irr() {

    //infinitive
    let inf = verbInfo.verb.slice(0, -2);

    //infinitive replacement
    let rep = inf;
    //suffix test
    let reg = /^$/;

    if(/[cg]$/.test(inf)) {
      if (inf.endsWith("c")) rep = inf.slice(0, -1) +  "ç";
      else rep = inf + "e";
      reg = /^[aoâ]/;
    }
    else {
      // not ending with -cer|-ger OR suffix not starting with a|o
      //Here we work just with silent endings (those suffixes starting with e)
      reg = /^e[^z]*$/;

      if (/[ou]y$/.test(inf)) rep = inf.slice(0, -1) + "i";
      else {

        let m;
        if ((m = /([eé])(.)$/.exec(inf))) { // e or é followed by a char then er
          rep = inf.slice(0, -2);
          if (m[1] === "é" || ! "lt".includes(m[2]) || notDoubleLT[rep + "e" + m[2]]) rep += "è";
          //verb ends with "eter"|"eler" and double lt
          //It can be ignored according to http://www.ortholud.com/code/les-verbes.php?terminaison=eler,%20eter
          else rep += "e" + m[2];//double the l or t

          rep += m[2];
        }
      }
    }

    verbInfo.inf = inf;
    verbInfo.pp = inf + "é";

    verbInfo.irr = {};
    verbInfo.irr.reg = reg;
    verbInfo.irr.rep = rep;
    //past participle

  }

  function extractG3IrrS1 (irr, ending) {

    //=================================
    //First singular present indicative
    //=================================

    let inf = verbInfo.inf;

    if (ending === "re") { // ======== -re irregularities

      if (/[aeo]ind$/.test(inf)) {//----- indre (craindre, etc.) ------
        verbInfo.pp = irr.s1 = inf.slice(0, -1);
        verbInfo.pp += "t";
        irr.p1 = irr.p3 = irr.p = inf.slice(0, -2) + "gn";
        irr.p += "i";
      }
      else if (/^(?:n|conn|reconn|par|appar|repar|dispar)aît$/.test(inf)) {
        let inf2 = inf.slice(0, -2);
        irr.s1 = inf2 + "[<s1>s:is,<s1>t:ît]";
        irr.p1 = inf2 + "iss";
        if (inf2 !== "na") verbInfo.pp = inf2.slice(0, -1) + "u";
        else {
          verbInfo.pp = "né";
          irr.p = "naqui";
        }
      }
      else if (/^(viv|poursuiv|suiv|batt|(pro|per|compro|sou|trans)?mett|(ré|ab)soud)$/.test(inf)) {
        irr.s1 = inf.slice(0, -1);
        //mettre, permettre, etc.
        if (inf.endsWith("mett")) verbInfo.pp = inf.slice(0, -3) + "is";
        else if (inf.endsWith("d")) { //résoudre, absoudre
          irr.p1 = inf.slice(0, -2) + "lv";
          if (inf.startsWith("r")) {//résoudre
            irr.p = verbInfo.pp = "résolu";
          }
          else {
            verbInfo.pp = "absous";
            irr.p = "absolu";
          }
        }
        else if ( inf === "viv") verbInfo.pp = "vécu";//vivre
        else {//suivre, battre
          irr.p = inf + "i";
          if (inf.endsWith("v")) verbInfo.pp = irr.p;
        }
      }
      else if (/^(plai|clo)$/.test(inf)) {//plaire, clore
        irr.p1 = inf + "s";
        if (inf === "clo") {
          irr.s1 = "cl[<s1>s:os,<s1>t:ôt]";
          verbInfo.pp = "clos";
          irr.p = "$";//clos doesn't have past
        }
        else {
          irr.s1 = "pla[<s1>s:is,<s1>t:ît]";
          verbInfo.pp = "plu";
        }
      }
      else if (/^(con)?vainc$/.test(inf)) {//vaincre, convaincre
        irr.s1 = inf + "[<s1>s:s,<s1>t:]";
        irr.p1 = inf.slice(0, -1) + "qu";
        irr.p = irr.p1 + "i";
      }
    }

    else if (ending === "oir") { // ======== -oir irregularities

      if (/^(dev|.*cev)$/.test(inf)) {//devoir, -cevoir
        let inf2 = inf.slice(0, -2);
        if (inf2.endsWith("c")) inf2 = inf2.slice(0, -1) + "ç";
        irr.s1 = inf2 + "oi";
        irr.p3 = inf2 + "oiv";
        irr.p = inf2 + "u";
        verbInfo.pp = inf2 + (inf2.endsWith("c")? "u": "û");
        //TODO devoir pp = dû (sing. masculine), others u
      }
      else if (/^(v|rev|ch|éch)$/.test(inf)) {//voir, revoir, choir, échoir
        irr.p3 = irr.s1 = inf + "oi";
        irr.p1 = inf + "oy";
        verbInfo.pp = inf + "u";
        if (inf.endsWith("v")) irr.p = inf + "i";
      }
      else if (/^(é|pro)?mouv$/.test(inf)) {//mouvoir, émouvoir, promouvoir
        let inf2 = inf.slice(0, -3);
        irr.s1 = inf2 + "eu";
        irr.p3 = irr.s1 + "v";
        verbInfo.pp = inf2 + "û";
        //TODO mevoir pp = mû (sing. masculine) others u
      }
      else if (inf === "asse") { //aseoir
        irr.p3 = irr.s1 = "assoi";
        irr.p1 = "assoy";
        verbInfo.pp = "assis";
      }
      else if (inf === "pleuv") {
        irr.s1 = "[<s1>s:$,<s1>t:pleut]";
        irr.p3 = irr.p1 = "$";
        verbInfo.pp = "plu";
        //TODO fix pleuvoir
      }
      /* Will be treated as irregular
      let m;
      if ((m = /^(.*)(val|pouv|voul)$/.exec(inf)) != null) {
        irr.s1 = m[1] + m[2].charAt(0) + ((m[2].charAt(1) === "o")? "e": "a") + "u[x|t]";
      }
      */

    }
    else { // ======== -ir irregularities
      if (/^.*[tv]en$/.test(inf)){// -venir, -tenir
        let inf2 = inf.slice(0, -2);
        irr.s1 = inf2 + "ien";
        irr.p3 = irr.s1 + "n";
        verbInfo.pp = inf + "u";
        irr.p = inf2 + "in";
      }
      else if (/^((dé|re)?part|(en|ren)?dorm|ment|dément|(con|pres|res)?sent|(des|res)?serv|(res)?sort|(dé|re)?vêt)$/.test(inf)) {
        irr.s1 = inf.slice(0, -1);
        if (inf.endsWith("êt")) verbInfo.pp = irr.s1 + "u";
      }
      else if (/^(cueill|(c|déc)?ouvr|offr|souffr)$/.test(inf)) {
        irr.s1 = inf + "[<s1>.*:G1]";
        if (inf !== "cueill") {
          irr.p1 = inf;
          verbInfo.pp = inf.slice(0, -1) + "ert";
        }
      }
      else if (inf === "requér") {
        irr.s1 = "requier";
        irr.p3 = "requièr";
        verbInfo.pp = "requis";
      }
      else if (inf === "mour") {
        irr.p3 = irr.s1 = "meur";
        verbInfo.pp = "mort";
        irr.p = "mouru";
      }

    }

    if ( ! irr.s1 ) { //regular s1
      irr.s1 = inf;
      let m;
      if ((m = /^(.*)(s|e)$/.exec(inf)) != null) irr.s1 = m[1];
    }

  }


  function extractG3IrrP1 (irr, ending) {

    //=================================
    //First plural present indicative
    //=================================

    //It has been set in S1
    if ( irr.p1 ) return;

    let inf = verbInfo.inf;

    if (ending === "re") { // ======== -re irregularities

      if (inf.endsWith("ui")) {
        irr.p1 = inf + "s";
        irr.p = inf + "si";
        verbInfo.pp = inf + "t";
      }
      else if (/^((?:contre|inter)?di|(?:dé|é|ins)cri|li|suffi|confi|circonci|fri|boi|[cm]oud|.*prend)$/.test(inf)) {

        if (inf === "boi") { //boire
          irr.p1 = "buv";
          irr.p3 = "boiv";
          verbInfo.pp = irr.p = "bu";
        }
        else if (inf.endsWith("cri")) { //écrire, décrire, inscrire
          irr.p3 = irr.p1 = inf + "v";
          verbInfo.pp = inf + "t";
          irr.p = inf + "vi";
        }
        else if (inf.endsWith("d")) {
          irr.p1 = inf.slice(0, -1);
          if (inf.endsWith("ud")) {// coudre, moudre
            irr.p3 = (irr.p1 += ((inf === "coud")? "s": "l"));
            verbInfo.pp = irr.p1 + "u";
            irr.p = irr.p1 +  (irr.p1.endsWith("l")? "u": "i");
          }
          else { // -prendre
            irr.p3 = irr.p1 + "n";
            verbInfo.pp = (irr.p = irr.p1.slice(0, -2) + "i") + "s";
          }
        }
        else { //dire contredire interdire; lire; suffire, confire, circoncire, frire
          irr.p3 = irr.p1 = inf + "s";
          if (inf === "di") irr.p1 = inf + "[<p1>ons:sons,<p1>ez:tes]";
          switch (inf) {
            case "li":
              verbInfo.pp = "lu";
              break;
            case "circonci":
              verbInfo.pp = "circoncis";
              break;
            case "suffi":
              verbInfo.pp = "suffi";
              break;
            default:
              verbInfo.pp = inf + "t";
          }
          //verbInfo.pp = ((inf === "li")? "lu": inf + (inf.endsWith("di")? "t": ""));
        }
      }

    }
    //-oir -ir irregularities must've been treated in the previous step

    if ( ! irr.p1 ) { //regular p1
      irr.p1 = inf;
      //let m;
      //if ((m = /^(.*)ons$/.exec(inf)) != null) irr.p1 = m[1];
    }

  }

  function extractG3IrrP3 (irr, ending) {

    //================================
    //Third plural present indicative
    //================================

    //all irregularities must've been treated earlier

    if ( !irr.p3 ) {
      irr.p3 = irr.p1;
      //let m;
      //if ((m = /^(.*)ent$/.exec(p1)) != null) p3 = m[1];
    }

  }

  function extractG3IrrPP (irr, ending) {

    //======================================
    // (Masculine singular) past participle
    //======================================

    if (verbInfo.pp) return;

    let inf = verbInfo.inf;

    if (ending === "re") {
      if (/^((?:sou)?ri|.*clu)$/.test(inf)) {
        irr.p = verbInfo.pp = inf;
      }
      if (inf === "croi") irr.p = verbInfo.pp = (inf.slice(0, -2) + "u");
      else if (/^(?:con|ex|sub)?trai/.test(inf)) {
        verbInfo.pp = inf + "t";
        irr.p = inf.slice(0, -1) + "y[<p>.*:G1]";
      }
    }
    else if (ending === "ir") {
      if (inf === "cour") irr.p = verbInfo.pp = (inf + "u");
    }

    if ( ! verbInfo.pp ) {
      let pp = inf + ((ending === "re")? "u": "i");
      if (pp.endsWith("uu")) pp = pp.slice(0, -1);
      verbInfo.pp = pp;
    }

  }

  function extractG3IrrPast (irr, ending) {

    //================================
    // (First singular) simple past
    //================================

    if (irr.p) return;

    let inf = verbInfo.inf;

    if (ending === "re") {
      //indre has been treated earlier
      //vendre, -ndre may be, perdre
      if (inf.endsWith("d")) irr.p = inf + "i";
    }

    //all irregularities must've been treated earlier

    if ( ! irr.p ) {
      let past = verbInfo.pp;
      if (/[ts]$/.test(past)) past = past.slice(0, -1);
      let m;
      if ((m = /^(.*)(ai|s)$/.exec(past)) != null) past = m[1];
      irr.p = past;
    }

  }

  function extractG3IrrFut (irr, ending) {

    //================================
    // (First singular) simple past
    //================================

    if (irr.f) return;

    let inf = verbInfo.inf;

    if (ending === "oir") {

      if (inf.endsWith("cev")) irr.f = inf + "r";
      else if (/^(re)?v$/.test(inf)) irr.f = inf + "err";
      else if (/^(dev|mouv|émouv|promouv|pleuv)$/.test(inf)) irr.f = inf + "r";
      else if (/^asse$/.test(inf)) irr.f = inf.slice(0, -1) + "oir";
    }
    else if (ending === "ir") {//ir
      if (inf === "requér") irr.f = "requerr";
      else if (inf === "cueill") irr.f = "cueiller";
      else if (/^.*[tv]en$/.test(inf)) irr.f = inf.slice(0, -2) + "iendr";
      else if (/^[mc]our$/.test(inf)) irr.f = inf + "r";

    }

    if ( ! irr.f ) {
      //(First singular) future
      let fut = inf + ending;

      if (fut.endsWith("e")) fut = fut.slice(0, -1);
      //let m;
      //if ((m = /^(.*)ai$/.exec(fut)) != null) fut = m[1];

      irr.f = fut;
    }

  }



  function extractG3Irr() {

    let verb = verbInfo.verb;
    let inf = verb, ending = "ir";
    let m;
    if ((m = /^(.*)(oir|re)$/.exec(inf)) != null) {
      inf = m[1];
      ending = m[2];
    }
    else if (inf.endsWith("ir")) inf = inf.slice(0, -2);

    verbInfo.inf = inf;

    let irr = {};
    verbInfo.irr = irr;

    extractG3IrrS1(irr, ending);

    extractG3IrrP1(irr, ending);

    extractG3IrrP3(irr, ending);

    extractG3IrrPP(irr, ending);

    extractG3IrrPast(irr, ending);

    extractG3IrrFut(irr, ending);


  }


  const g1Suffix = {
    [Mood.Ind]: {
      present: ["e", "es", "e", "ons", "ez", "ent"],
      past: ["ai", "as", "a", "âmes", "âtes", "èrent"],
      imperfect: ["ais", "ais", "ait", "ions", "iez", "aient"],
      future: ["erai", "eras", "era", "erons", "erez", "eront"]
    },
    [Mood.Sub]: {
      present: ["e", "es", "e", "ions", "iez", "ent"],
      imperfect: ["asse", "asses", "ât", "assions", "assiez", "assent"]
    },
    [Mood.Cnd]: {
      present: ["erais", "erais", "erait", "erions", "eriez", "eraient"]
    },
    [Mood.Imp]: {
      present: ["$", "e", "", "ons", "ez", "$"]
    }
  },
  g2Suffix = {
    [Mood.Ind]: {
      [Tense.Pr]: ["is", "is", "it", "issons", "issez", "issent"],
      [Tense.Pa]: ["is", "is", "it", "îmes", "îtes", "irent"],
      [Aspect.I]: ["issais", "issais", "issait", "issions", "issiez", "issaient"],
      [Tense.Fu]: ["irai", "iras", "ira", "irons", "irez", "iront"]
    },
    [Mood.Sub]: {
      [Tense.Pr]: ["isse", "isses", "isse", "issions", "issiez", "issent"],
      [Aspect.I]: ["isse", "isses", "ît", "issions", "issiez", "issent"]
    },
    [Mood.Cnd]: {
      [Tense.Pr]: ["irais", "irais", "irait", "irions", "iriez", "iraient"]
    },
    [Mood.Imp]: {
      [Tense.Pr]: ["$", "is", "", "issons", "issez", "$"]
    }
  },
  g3Suffix = {
    [Mood.Ind]: {
      [Tense.Pr]: ["<s1>s", "<s1>s", "<s1>t", "<p1>ons", "<p1>ez", "<p3>ent"],
      [Tense.Pa]: ["<p>s", "<p>s", "<p>t", "<p>^mes", "<p>^tes", "<p>rent"],
      [Aspect.I]: ["<p1>ais", "<p1>ais", "<p1>ait", "<p1>ions", "<p1>iez", "<p1>aient"],
      [Tense.Fu]: ["<f>ai", "<f>as", "<f>a", "<f>ons", "<f>ez", "<f>ont"]
    },
    [Mood.Sub]: {
      [Tense.Pr]: ["<p3>e", "<p3>es", "<p3>e", "<p1>ions", "<p1>iez", "<p3>ent"],
      [Aspect.I]: ["<p>sse", "<p>sses", "<p>^t", "<p>ssions", "<p>ssiez", "<p>ssent"]
    },
    [Mood.Cnd]: {
      [Tense.Pr]: ["<f>ais", "<f>ais", "<f>ait", "<f>ions", "<f>iez", "<f>aient"]
    },
    [Mood.Imp]: {
      [Tense.Pr]: ["$", "<s1>s", "", "<p1>ons", "<p1>ez", "$"]
      //TODO Imperative: <s1>t if ends with vowel, else <s1>s
    }
  },
  irregular = {
    "être": {
      pp: "été",
      [Mood.Ind]: {
        [Tense.Pr]: ["suis", "es", "est", "sommes", "êtes", "sont"],
        [Tense.Pa]: ["fus", "fus", "fut", "fûmes", "fûtes", "furent"],
        [Aspect.I]: ["étais", "étais", "était", "étions", "étiez", "étaient"],
        [Tense.Fu]: ["serai", "seras", "sera", "serons", "serez", "seront"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["sois", "sois", "soit", "soyons", "soyez", "soient"],
        [Aspect.I]: ["fusse", "fusses", "fût", "fussions", "fussiez", "fussent"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["serais", "serais", "serait", "serions", "seriez", "seraient"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "sois", "", "soyons", "soyez", "$"]
      }
    },
    "avoir": {
      pp: "eu",
      [Mood.Ind]: {
        [Tense.Pr]: ["ai", "as", "a", "avons", "avez", "ont"],
        [Tense.Pa]: ["eus", "eus", "eut", "eûmes", "eûtes", "eurent"],
        [Aspect.I]: ["avais", "avais", "avait", "avions", "aviez", "avaient"],
        [Tense.Fu]: ["aurai", "auras", "aura", "aurons", "aurez", "auront"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["aie", "aies", "ait", "ayons", "ayez", "aient"],
        [Aspect.I]: ["eusse", "eusses", "eût", "eussions", "eussiez", "eussent"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["aurais", "aurais", "aurait", "aurions", "auriez", "auraient"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "aie", "", "ayons", "ayez", "$"]
      }
    },
    "aller": {
      pp: "allé",
      [Mood.Ind]: {
        [Tense.Pr]: ["vais", "vas", "va", "allons", "allez", "vont"],
        [Tense.Pa]: ["allai", "allas", "alla", "allâmes", "allâtes", "allèrent"],
        [Aspect.I]: ["allais", "allais", "allait", "allions", "alliez", "allaient"],
        [Tense.Fu]: ["irai", "iras", "ira", "irons", "irez", "iront"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["aille", "ailles", "aille", "allions", "alliez", "aillent"],
        [Aspect.I]: ["allasse", "allasses", "allât", "allassions", "allassiez", "allassent"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["irais", "irais", "irait", "irions", "iriez", "iraient"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "va", "", "allons", "allez", "$"]
      }
    },
    "pouvoir": {
      pp: "pu",
      [Mood.Ind]: {
        [Tense.Pr]: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
        [Tense.Pa]: ["pus", "pus", "put", "pûmes", "pûtes", "purent"],
        [Aspect.I]: ["pouvais", "pouvais", "pouvait", "pouvions", "pouviez", "pouvaient"],
        [Tense.Fu]: ["pourrai", "pourras", "pourra", "pourrons", "pourrez", "pourront"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["puisse", "puisses", "puisse", "puissions", "puissiez", "puissent"],
        [Aspect.I]: ["pusse", "pusses", "pût", "pussions", "pussiez", "pussent"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["pourrais", "pourrais", "pourrait", "pourrions", "pourriez", "pourraient"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "$", "$", "$", "$", "$"]
      }
    },
    "savoir": {
      pp: "su",
      [Mood.Ind]: {
        [Tense.Pr]: ["sais", "sais", "sait", "savons", "savez", "savent"],
        [Tense.Pa]: ["sus", "sus", "sut", "sûmes", "sûtes", "surent"],
        [Aspect.I]: ["savais", "savais", "savait", "savions", "saviez", "savaient"],
        [Tense.Fu]: ["saurai", "sauras", "saura", "saurons", "saurez", "sauront"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["sache", "saches", "sache", "sachions", "sachiez", "sachent"],
        [Aspect.I]: ["susse", "susses", "sût", "sussions", "sussiez", "sussent"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["saurais", "saurais", "saurait", "saurions", "sauriez", "sauraient"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "sache", "$", "sachons", "sachez", "$"]
      }
    },
    "vouloir": {
      pp: "voulu",
      [Mood.Ind]: {
        [Tense.Pr]: ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
        [Tense.Pa]: ["voulus", "voulus", "voulut", "voulûmes", "voulûtes", "voulurent"],
        [Aspect.I]: ["voulais", "voulais", "voulait", "voulions", "vouliez", "voulaient"],
        [Tense.Fu]: ["voudrai", "voudras", "voudra", "voudrons", "voudrez", "voudront"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["veuille", "veuilles", "veuille", "veulions", "veuliez", "veuillent"],
        [Aspect.I]: ["voulusse", "voulusses", "voulût", "voulussions", "voulussiez", "voulussent"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["voudrais", "voudrais", "voudrait", "voudrions", "voudriez", "voudraient"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "veuille", "$", "voulons", "veuillez", "$"]
      }
    },
    "valoir": {
      pp: "valu",
      [Mood.Ind]: {
        [Tense.Pr]: ["vaux", "vaux", "vaut", "valons", "valez", "valent"],
        [Tense.Pa]: ["valus", "valus", "valut", "valûmes", "valûtes", "valurent"],
        [Aspect.I]: ["valais", "valais", "valait", "valions", "valiez", "valaient"],
        [Tense.Fu]: ["vaudrai", "vaudras", "vaudra", "vaudrons", "vaudrez", "vaudront"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["vaille", "vailles", "vaille", "valions", "valiez", "vaillent"],
        [Aspect.I]: ["valusse", "valusses", "valût", "valussions", "valussiez", "valussent"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["vaudrais", "vaudrais", "vaudrait", "vaudrions", "vaudriez", "vaudraient"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "vaux", "$", "valons", "valez", "$"]
      }
    },
    "falloir": {
      pp: "fallu",
      [Mood.Ind]: {
        [Tense.Pr]: ["$", "$", "faut", "$", "$", "$"],
        [Tense.Pa]: ["$", "$", "falut", "$", "$", "$"],
        [Aspect.I]: ["$", "$", "falait", "$", "$", "$"],
        [Tense.Fu]: ["$", "$", "faudra", "$", "$", "$"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["$", "$", "faille", "$", "$", "$"],
        [Aspect.I]: ["$", "$", "falût", "$", "$", "$"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["$", "$", "faudrait", "$", "$", "$"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "$", "$", "$", "$", "$"]
      }
    },
    "faire": {
      pp: "fait",
      [Mood.Ind]: {
        [Tense.Pr]: ["fais", "fais", "fait", "faisons", "faites", "font"],
        [Tense.Pa]: ["fis", "fis", "fit", "fîmes", "fîtes", "firent"],
        [Aspect.I]: ["faisais", "faisais", "faisait", "faisions", "faisiez", "faisaient"],
        [Tense.Fu]: ["ferai", "feras", "fera", "ferons", "ferez", "feront"]
      },
      [Mood.Sub]: {
        [Tense.Pr]: ["fasse", "fasses", "fasse", "fassions", "fassiez", "fassent"],
        [Aspect.I]: ["fisse", "fisses", "fît", "fissions", "fissiez", "fissent"]
      },
      [Mood.Cnd]: {
        [Tense.Pr]: ["ferais", "ferais", "ferait", "ferions", "feriez", "feraient"]
      },
      [Mood.Imp]: {
        [Tense.Pr]: ["$", "fais", "$", "faisons", "faites", "$"]
      }
    }

  };

  /**
   * A function that gives the pronoun index in conjugation table
   *
   * @method getPronounIndex
   * @private
   * @memberof FraMorpho
   * @param  {Object}        opts contains person and number
   * @return {Number}             a number from 0 to 5
   */
  function getPronounIndex(opts) {

    let numberIdx = (opts.number === GNumber.S)? 0: 3;

    let personIdx = Object.values(Person).indexOf(opts.person);


    return personIdx + numberIdx;
  }

  function getSuffix(opts, irrTab) {
    let groupTab;

    if (irrTab) groupTab = irrTab;
    else
    switch (verbInfo.group) {
      case 1:
      groupTab = g1Suffix;
      break;

      case 2:
      groupTab = g2Suffix;
      break;

      case 3:
      groupTab = g3Suffix;
      break;

      default:
      return "$";
    }


    let moodTab = groupTab[opts.mood];

    if (! moodTab) return "$";

    if (opts.aspect === Aspect.P) return "$";

    let key = (opts.aspect === Aspect.I)? Aspect.I: opts.tense;

    let pronounTab = moodTab[key];

    if (! pronounTab) return "$";

    return pronounTab[getPronounIndex(opts)];

  }

  const CHAPEAU = {
    "a": "â",
    "e": "ê",
    "i": "î",
    "o": "ô",
    "u": "û"
  };


  function getG3IrregularInfSuff(inf, suff, opts) {

    let res = {};

    let p = suff;

    let m = /^<([^>]+)>(.*)$/.exec(suff);
    if (m != null && verbInfo.irr[m[1]]) {
      inf = verbInfo.irr[m[1]];
      suff = m[2];
    }

    m = /^(.*)\[(.*)\]$/.exec(inf);
    if (m != null) {
      inf = m[1];
      //console.log(inf);
      let rep = m[2].split(",");
      let i = 0;
      for (; i < rep.length; i++) {
        let rep2 = rep[i].split(":");
        let r = new RegExp(rep2[0]);
        if (r.test(p)) {
          if (rep2[1] === "G1") suff = getSuffix(opts, g1Suffix);
          else suff = rep2[1];
          break;
        }
      }
    }

    res.inf = inf;
    res.suff = suff;

    return res;
  }

  //Override conjugate function
  Me.conjugate = function(verb, opts) {

    //will be used for dé-faire, re-faire, satis-faire
    //to carry the first part before the hyphen
    //-----------------------------------------
    //Also, will be used for negation
    let begin = "";

    if (verb === "falloir") {
      if (opts.person != Person.T || opts.number != GNumber.S) return "";
    }
    else if (/^(dé|re|satis)faire/.test(verb)) {
      begin = verb.slice(0, -5);
      verb = "faire";
    }

    preProcessVerb(verb);

    //past Participal
    //also, will be used for negation; to carry the word "pas"
    let pp = "",
    //conjugation table, in case of irrugular verbs
    conjTab;

    if (opts.negated) pp = " pas";

    if (opts.aspect === Aspect.P ||
      (opts.mood != Mood.Ind && opts.tense === Tense.Pa)) {
        pp += " " + begin + verbInfo.pp;
        begin = "";
        verb = verbInfo.aux;
        conjTab = irregular[verb];
        if (verb === "être") {
          pp += (opts.gender === Gender.F)? "e": "";
          pp += (opts.number === GNumber.S)? "": "s";
        }

        if (opts.aspect === Aspect.P) {
          if (opts.period === "long" || opts.mood === Mood.Sub) opts.aspect = Aspect.I;
          else opts.aspect = Aspect.S;
        }
        else {
          opts.tense = Tense.Pr;

          if (opts.mood === Mood.Cnd && opts.form === 2){
            opts.aspect = Aspect.I;
            opts.mood = Mood.Sub;
          }
        }
    }

    if (opts.negated) begin = "ne " + begin;

    if (!conjTab && verbInfo.group === 4) conjTab = verbInfo.irr;

    //Irregular verbs and composed conjugations
    if (conjTab) {
      let conj = getSuffix(opts, conjTab);
      if (!conj || conj === "$") return "";
      if (begin === "ne " && /[haeuio]/.test(conj.charAt(0))) begin = "n'";
      return begin + conj + pp;
    }

    let suffix = getSuffix(opts);
    if (!suffix || suffix === "$") return "";

    let inf = verbInfo.inf;

    //verbs 1 irregularities
    if (verbInfo.group === 1) {
      if (inf === "envoy" && opts.mood === Mood.Ind && opts.tense === Tense.Fu) {
        inf = "enverr";
        suffix = suffix.slice(2, );
      }
      else if (verbInfo.irr.reg.test(suffix)) inf = verbInfo.irr.rep;
    }
    else if (verbInfo.group === 3) {

      { //irregularities
        let irr = getG3IrregularInfSuff(inf, suffix, opts);
        suffix = irr.suff;
        inf = irr.inf;
      }

      if (suffix === "t" && /[dt]$/.test(inf)) suffix = "";
      else if (suffix.startsWith("^")) {
        suffix = suffix.slice(1);
        let end = inf.slice(-1);
        if (CHAPEAU[end]) inf = inf.slice(0, -1) + CHAPEAU[end];
        else {//venir //vînmes
          for (let i = inf.length - 1; i > 0; i--) {
            let idx = "aiuo".indexOf(inf.charAt(i));
            if ( idx > -1 ) {
              inf = inf.slice(0, idx) + CHAPEAU[inf.charAt(i)] + inf.slice(idx+1);
              break;
            }
          }
        }
      }
      else if (/^(ons|ez)$/.test(suffix) && /[ao]i$/.test(inf)) {
        inf = inf.slice(0, -1) + "y";
      }
    }
    else {//group 2
      if (inf === "haï") {
        suffix = suffix.slice(1,);
        if ( opts.mood === Mood.Ind
          && opts.aspect === Aspect.S
          && opts.tense === Tense.Pr
          && opts.number === GNumber.S) {
            inf = inf.slice(0, -1) + "i";
        }
        else if (opts.mood === Mood.Imp && opts.number === GNumber.S) {
          if (inf.length > 0) inf = inf.slice(0, -1) + "i";
        }
      }
    }

    if (begin === "ne " && /[haeuio]/.test(inf.charAt(0))) begin = "n'";

    return begin + inf + suffix + pp;

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
    //TODO these are in conflict; fix may be using a loop rather than regexp
    word = word.replace("qu", "qU");
    word = word.replace(new RegExp("([" + vowels + "])([ui])([" + vowels + "])", "g"),
    function(match, p1, p2, p3) {
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

    //console.log("rv= " + rv + ", r1= " + r1 + ", r2= " + r2);


    let pastWord = word;
    //Step 1
    let  processed = step1(word, rv, r1, r2);
    //console.log(processed);
    word = processed.stem;

    //console.log("step1 word= " + word);

    if (processed.next) {
      word = step2(word, rv, r2);
    }

    //console.log("step2 word= " + word);

    if (word != pastWord) {
      //step3
      word = step3(word);
    }

    //console.log("step3 word= " + word);

    //The word hasn't been altered in any step
    if (word === pastWord) {
      //step4
      word = step4(word, rv, r2);
    }

    //console.log("step4 word= " + word);

    //Step 5: Undouble
    //If the word ends enn, onn, ett, ell or eill, delete the last letter
    if (/(?:enn|onn|ett|ei?ll)$/.test(word)) word = word.slice(0, -1);

    //Step 6: Un-accent
    //If the words ends é or è followed by at least one non-vowel, remove the accent from the e.
    word = word.replace(new RegExp("[éè]([^" + vowels + "]+)$"), "e$1");

    return word.toLowerCase();
  }

  function step4(word, rv, r2) {
    //If the word ends s, not preceded by a, i, o, u, è or s, delete it.
    if(/[^aiouès]s$/.test(word)) word = word.slice(0, -1);

    //ion
    if (r2.endsWith("ion") && /ion[st]$/.test(rv)) return word.slice(0, -3);
    //ier   ière   Ier   Ière
    {
      let m, reg = new RegExp("^.*([iI](?:er|ère))$");
      if ((m = reg.exec(word)) != null && rv.endsWith(m[1])) return word.slice(0, -m[1].length) + "i";
    }

    //e in rv too
    if (word.endsWith("e")) return word.slice(0, -1);

    //&& rv.endsWith("e")
    if (word.endsWith("gue")) return word.slice(0, -1);


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
    reg = new RegExp("(îmes|ît|it|îtes|ie?s?|i[rst]|ir(?:as?|ai|ont)|iss(?:ante?s?|es?)|(ir|iss)(?:ai[st]|aIent|i?ons|i?ez|ent))$");
    if ((m = reg.exec(word)) != null) {
      if ((new RegExp("[^" + vowels + "]" + m[1])).test(rv)) return word.slice(0, -m[1].length);
    }

    //Step 2b: Other verb suffixes
    //ions: delete if in R2
    if (word.endsWith("ions") && r2.endsWith("ions")) return word.slice(0, -4);
    //é   ée   ées   és   èrent   er   era   erai   eraIent   erais   erait
    //eras   erez   eriez   erions   erons   eront   ez   iez
    reg = new RegExp("^.*(er|i?ez|èrent|ée?s?|er(?:as?|ai[st]?|i?ez|i?ons|ont|aIent))$");
    if ((m = reg.exec(word)) != null) {
      if (rv.indexOf(m[1]) > -1) return word.slice(0, -m[1].length);
    }
    //âmes   ât   âtes   a   ai   aIent   ais   ait   ant   ante   antes   ants
    //as   asse   assent   asses   assiez   assions
    reg = new RegExp("^.*(ât|â[tm]es|as?|ai[st]?|ante?s?|aIent|ass(?:es?|ent|iez|ions))$");
    if ((m = reg.exec(word)) != null && rv.indexOf(m[1]) > -1) {
      word = word.slice(0, -m[1].length);
      //if preceded by e, delete
      if (word.endsWith("e") && rv.indexOf("e" + m[1]) > -1) return word.slice(0, -1);
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

  /**
   * Transforms a singular noun to plural
   *
   * @method singular2plural
   * @private
   * @static
   * @memberof FraMorpho
   * @param  {String}        noun The noun to be transformed to plural
   * @return {String}             Plural form of the given noun
   */
  function singular2plural(noun){
    //http://www.dummies.com/languages/french/how-to-make-french-nouns-plural/
    if (noun.endsWith("au")
        || /^(bij|caill|ch|gen|hib|jouj|p)ou^/.test(noun)) return noun + "x";
        //https://fr.wikipedia.org/wiki/Pluriel_des_noms_communs_français_en_«_ou_»

    if (noun.endsWith("al")) return noun.slice(0, -1) + "ux";

    if (/[sxz]$/.test(noun)) return noun;

    return noun + "s";
  }


}());
