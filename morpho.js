(function () {

  "use strict";

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Morpho;
  }
  else {
    window.JsLingua.Cls.Morpho = Morpho;
  }

  /**
  * Morphology of a specified language
  *
  * @class Morpho
  * @param {String} langCode Language ISO693-2 code: ara, jpn, eng, etc.
  */
  function Morpho(langCode) {

    this.code = langCode;
    //Contains stemmers
    this.stemmers = {};
    this.currentStemmer = "";
    //noun declension
    this.ndeclense = {};
    this.g = {
      debugFunction: dummyDebug
    };
  }

  /*
  * A debugging function which do nothing
  * @method dummyDebug
  * @private
  */
  function dummyDebug() {}

  /*
  * A debugging function which pushes the arguments to the consoles log
  * @method realDebug
  * @private
  */
  function realDebug() {
    console.log(Array.prototype.slice.call(arguments).join(" "));
  }

  /**
  * The part of speech: Noun, Verb, Adjective,
  * Adverb, Preposition, Pronoun
  * <br>access: Morpho.Feature.POS
  * @attribute PoS
  * @readOnly
  * @private
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  const PoS = {
    /** noun */
    N: "noun",
    /** verb */
    V: "verb",
    /** adjective */
    Adj: "adjective",
    /** adverb */
    Adv: "adverb",
    /** preposition */
    Prep: "preposition",
    /** pronoun */
    Pron: "pronoun"
  },

  /**
  * The tense: Past, Present, Future
  * <br>access: Morpho.Feature.Tense
  * @attribute Tense
  * @readOnly
  * @private
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  Tense = {
    /** past */
    Pa: "past",
    /** present */
    Pr: "present",
    /** future */
    Fu: "future"
  },

  /**
  * The aspect: Simple, Continuous, Perfect, PerfectContinuous
  * <br>access: Morpho.Feature.Aspect
  * @attribute Aspect
  * @readOnly
  * @private
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  Aspect = {
    /** simple */
    S: "simple",
    /** continuous */
    C: "continuous",
    /** perfect */
    P: "perfect",
    /** perfect-continuous */
    PC: "perfect-continuous",
    /** imperfect */
    I: "imperfect"
  },

  /**
  * The mood: indicative, subjunctive, conditional,
  * optative, imperative, jussive, potential,
  * hypothetical, inferential
  * <br>access: Morpho.Feature.Mood
  * @see http://universaldependencies.org/u/feat/Mood.html
  *
  * @attribute Mood
  * @readOnly
  * @private
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  Mood = {
    /**
     * indicative: The indicative can be considered the default mood.
     * A verb in indicative merely states that something happens,
     * has happened or will happen, without adding any attitude of the speaker.
     * @example You study at the university
     */
    Ind: "indicative",

    /**
     * imperative: The speaker uses imperative to order or ask the addressee to do the action of the verb.
     * @example Study at the university
     */
    Imp: "imperative",

    /**
     * conditional: The conditional mood is used to express actions that would have taken
     * place under some circumstances but they actually did not / do not happen.
     * Grammars of some languages may classify conditional as tense (rather than mood)
     * but e.g. in Czech it combines with two different tenses (past and present).
     * @example if she went home
     */
    Cnd: "conditional",

    /**
     * potential: The action of the verb is possible but not certain.
     * This mood corresponds to the modal verbs can, might, be able to. Used e.g. in Finnish.
     * @example she can go home
     */
    Pot: "potential",

    /**
     * subjunctive: The subjunctive mood is used under certain circumstances in subordinate clauses,
     * typically for actions that are subjective or otherwise uncertain.
     * In German, it may be also used to convey the conditional meaning.
     * @example "Je veux que tu le fasses": I want that you to do it
     */
    Sub: "subjunctive",

    /**
     * jussive: The jussive mood expresses the desire that the action happens;
     * it is thus close to both imperative and optative.
     * Unlike in desiderative, it is the speaker, not the subject who wishes that it happens.
     * Used e.g. in Arabic.
     * @example فليكن let it be
     */
    Jus: "jussive",

    /**
     * purposive: Means “in order to”, occurs in Amazonian languages.
     */
    Prp: "purposive",

    /**
     * quotative: The quotative mood is used e.g. in Estonian to denote direct speech.
     */
    Qot: "quotative",

    /**
     * optative: Expresses exclamations like “May you have a long life!” or
     * “If only I were rich!” In Turkish it also expresses suggestions.
     * @example let’s go home
     */
    Opt: "optative",

    /**
     * desiderative: The desiderative mood corresponds to the modal verb “want to”:
     * “He wants to come.” Used e.g. in Turkish.
     */
    Des: "desiderative",

    /**
     * necessitative: The necessitative mood expresses necessity and corresponds to the modal
     * verbs “must, should, have to”: “He must come.”
     */
    Nec: "necessitative",

    /**
     * admirative: Expresses surprise, irony or doubt. Occurs in Albanian,
     * other Balkan languages, and in Caddo (Native American from Oklahoma).
     */
    Adm: "admirative"

  },

  /**
  * The voice: Active,Passive, Middle
  * <br>access: Morpho.Feature.Voice
  * @attribute Voice
  * @readOnly
  * @private
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  Voice = {
    /** active */
    A: "active",
    /** passive */
    P: "passive",
    /** middle */
    M: "middle"
  },

  /**
  * The grammatical number: Singular, Dual, Plural
  * <br>access: Morpho.Feature.Number
  * @attribute GNumber
  * @readOnly
  * @private
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  GNumber = {
    /** singular */
    S: "singular",
    /** dual */
    D: "dual",
    /** plural */
    P: "plural"
  },

  /**
  * The person: First, Second, Third.
  * <br>access: Morpho.Feature.Person
  * @attribute Person
  * @readOnly
  * @private
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  Person = {
    /** first */
    F: "first",
    /** second */
    S: "second",
    /** third */
    T: "third"
  },

  /**
  * The gender: Masculine, Feminine, Neuter.
  * <br>access: Morpho.Feature.Gender
  * @attribute Gender
  * @readOnly
  * @private
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  Gender = {
    /** masculine */
    M: "masculine",
    /** feminine */
    F: "feminine",
    /** neuter */
    N: "neuter"
  };

  /**
  * This is a map to different morphology features:
  * <ul>
  * <li>POS: It returns {@link Morpho.PoS}</li>
  * <li>Tense: It returns {@link Morpho.Tense}</li>
  * <li>Aspect: It returns {@link Morpho.Aspect}</li>
  * <li>Mood: It returns {@link Morpho.Mood}</li>
  * <li>Voice: It returns {@link Morpho.Voice}</li>
  * <li>Number: It returns {@link Morpho.GNumber}</li>
  * <li>Person: It returns {@link Morpho.Person}</li>
  * <li>Gender: It returns {@link Morpho.Gender}</li>
  * </ul>
  * We can access these features either by:<br>
  * Morpho.Feature.feature_name <br>
  * Or: <br>
  * Morpho.Feature["feature_name"]
  *
  * @attribute Feature
  * @readOnly
  * @public
  * @static
  * @memberof Morpho
  * @type {Object}
  */
  Morpho.Feature = {
    POS: PoS,
    Tense: Tense,
    Aspect: Aspect,
    Mood: Mood,
    Voice: Voice,
    Number: GNumber,
    Person: Person,
    Gender: Gender
  };

  {//Freezing all constants so their values won't be modified
    let C = Object.freeze;
    C(PoS);
    C(Tense);
    C(Aspect);
    C(Mood);
    C(Voice);
    C(GNumber);
    C(Person);
    C(Gender);
    C(Morpho.Feature);
  }

  //=========================================
  // Protected methods
  // ========================================



  /**
  * Add new stemmer method
  * @method newStemmer
  * @protected
  * @memberof Morpho
  * @param  {String} stemmerName the name of the stemmer
  * @param  {String} stemmerDesc   the description of the stemmer
  * @param  {Function} stemmerFct   the function stem(word)
  */
  Morpho.newStemmer = function (stemmerName, stemmerDesc, stemmerFct) {
    if (typeof stemmerName === "string" && stemmerName.length > 0){
      this.stemmers[stemmerName] = {};
      this.stemmers[stemmerName].desc = stemmerDesc;
      this.stemmers[stemmerName].fct = stemmerFct;
    }
  };

  //===================================================
  // Prototypes
  //===================================================
  let Me = Morpho.prototype;

  /**
  * Enables the debugging messages
  *
  * @method enableDebug
  * @public
  * @memberof Morpho
  */
  Me.enableDebug = function(){
    this.g.debugFunction = realDebug;
  };

  /**
  * disables the debugging messages
  * @method disableDebug
  * @public
  * @memberof Morpho
  */
  Me.disableDebug = function(){
    this.g.debugFunction = dummyDebug;
  };

  /**
  * Sets the current stemmer
  *
  * @method setCurrentStemmer
  * @public
  * @final
  * @memberof Morpho
  * @param {String} StemmerName stemmer method's name
  */
  Me.setCurrentStemmer = function (StemmerName) {
    if (StemmerName in this.stemmers){
      this.currentStemmer = StemmerName;
    }
  };

  /**
  * Returns the list of available stemming methods
  * @method availableStemmers
  * @public
  * @final
  * @memberof Morpho
  * @return {String[]}  Array of Strings containing stemmers names
  */
  Me.availableStemmers = function(){
    return Object.keys(this.stemmers);
  };

  /**
  * This method is used to recover the name of the tense
  * @method getTenseName
  * @public
  * @memberof Morpho
  * @param  {String} tense the tense which we want to get the name (See {@link Morpho.Tense})
  * @return {String}       the name of the tense in the selected language
  */
  Me.getTenseName = function(tense){
    switch (tense) {
      case Tense.Pa:
      return "past";
      case Tense.Pr:
      return "present";
      case Tense.Fu:
      return "future";
    }

    return "";
  };

  /**
   * Returns a list of verb types
   *
   * @method getVerbTypes
   * @public
   * @abstract
   * @memberof Morpho
   * @return {String[]}     list of verb types
   */
  Me.getVerbTypes = function(){
    return [];
  };

  /**
   * Given a verb, it detects its type
   *
   * @method getVerbType
   * @public
   * @abstract
   * @memberof Morpho
   * @return {String}    verb's type
   */
  Me.getVerbType = function(){
    return "";
  };

  /**
  * This function returns an object of available conjugation forms for the current language
  * @example
  * {
  *  "form_name": {opts}
  * }
  *
  * @method getForms
  * @public
  * @memberof Morpho
  * @return {Object[]}  Array of conjugation forms available for the language
  */
  Me.getForms = function(){
    //Past and Present are defaults
    return {
      "Indicative present": {
        mood: Mood.Indi,
        tense: Tense.Pr,
        aspect: Aspect.S
      },
      "Indicative past": {
        mood: Mood.Indi,
        tense: Tense.Pa,
        aspect: Aspect.S
      },
      "Indicative future": {
        mood: Mood.Indi,
        tense: Tense.Fu,
        aspect: Aspect.S
      }
    };
  };


  /**
  * Each language has a conjugation table model.
  * For example, in English, Arabic and French, we put pronouns in rows.
  * As for Japanese, the conjugation doesn't follow that pattern.
  * @method getConjugModel
  * @public
  * @memberof Morpho
  * @return {Object}   conjugation model with rows and cols
  */
  Me.getConjugModel = function(){
    //Past and Present are defaults
    return {
      rows: ["Pronoun"],
      cols: ["Voice", "Negation"]
    };
  };


  /**
   * Returns the available options for conjugation such as pronouns, negation, voice, etc.
   * @method getOptLists
   * @public
   * @memberof Morpho
   * @param  {String}    optLabel Can be: "Pronoun", "Negation", "Voice"
   * @return {Object[]}             A list of parameters related to optLabel and the processed language
   */
  Me.getOptLists = function(optLabel){
    switch (optLabel) {
      case "Pronoun": return this.getPronounOpts();
      case "Negation": return this.getNegationOpts();
      case "Voice": return this.getVoiceOpts();
      default: return [{}];
    }
  };

  /**
   * Returns the name of a conjugation parameter (Pronoun, Negation, Voice) given some options
   * @example
   *    var opts = {
   *      person: "first", // Morpho.Feature.Person.F
   *      number: "singular" // Morpho.Feature.Number.S
   *    };
   *    var I = getOptName("Pronoun", opts);
   * // In English, it will give: "I"
   * // In Arabic, it will give: "أنا"
   *
   * @method getOptName
   * @public
   * @memberof Morpho
   * @param  {String}   optLabel can be: Pronoun, Negation, Voice
   * @param  {Object}   opts     The parameters
   * @return {String}            The label of this parameter in the current language
   */
  Me.getOptName = function(optLabel, opts){
    switch (optLabel) {
      case "Pronoun": return this.getPronounName(opts);
      case "Negation": return this.getNegationName(opts);
      case "Voice": return this.getVoiceName(opts);
      default:

    }
    return "";
  };

  /**
   * Returns the list of negation options for verb conjugation
   *
   * @method getNegationOpts
   * @protected
   * @memberof Morpho
   * @return {Object[]}        The list of available negation options
   */
  Me.getNegationOpts = function(){
    return [
        {negated:0}, //Positive
        {negated:1}//negative
    ];
  };

  /**
   * Returns the label of the negation in the current language
   *
   * @method getNegationName
   * @protected
   * @memberof Morpho
   * @param  {Object}        opts An object containing the attribute: negated: (0|1)
   * @return {String}             the label of the negation in the current language
   */
  Me.getNegationName = function(opts){
    if (! opts) return "";
    if (opts.negated) return "negative";
    return "affirmative";
  };

  /**
   * Returns the list of conjugation voice for the current language
   *
   * @method getVoiceOpts
   * @protected
   * @memberof Morpho
   * @return {Object[]}     A list of conjugation voice parameters for the current language
   */
  Me.getVoiceOpts = function(){
    return [
        {voice: Voice.A}, //Active voice
        {voice: Voice.P} //Passive voice
    ];
  };

  /**
   * Returns the conjugation voice's name in the current language
   *
   * @method getVoiceName
   * @protected
   * @memberof Morpho
   * @param  {Object}     opts An object with one attribute: voice
   * @return {String}          the label of the voice in the current language
   */
  Me.getVoiceName = function(opts){
    if (! opts) return "";
    if (! opts.voice) return "";
    switch (opts.voice) {
      case Voice.A: return "active";
      case Voice.P: return "passive";
    }
    return "";
  };

  /**
   * Returns a list of options for pronouns in the current language
   *
   * @method getPronounOpts
   * @protected
   * @memberof Morpho
   * @return {Object[]}       List of pronouns options
   */
  Me.getPronounOpts = function(){
    return [{}];
  };

  /**
  * Get the personal pronoun using options like: person, gender, etc.<br>
  * for example, the parameters for the personal pronoun "I": <br>
  * @example
  *    {
  *      person: Morpho.Feature.Person.F, // "first"
  *      number: Morpho.Feature.Number.S // "singular"
  *    }
  *
  * @method getPronounName
  * @protected
  * @memberof Morpho
  * @param  {Object} opts An object containing parameters: person, gender, number.
  * @return {String}      the pronoun
  */
  Me.getPronounName = function(_opts){
    return "";
  };


  /**
  * This function is used for verb conjugation
  *
  * @method conjugate
  * @public
  * @memberof Morpho
  * @param  {String} verb the word to be conjugated
  * @param  {Object} opts  options for tense, case, voice, aspect, person, number, gender, mood, and other
  * @return {String}      Conjugated verb
  */
  Me.conjugate = function(verb, _opts){
    return verb;
  };

  /**
   * Returns a function for noun declension
   *
   * @method nounDeclensionFunction
   * @public
   * @final
   * @memberof Morpho
   * @param  {String}               declenseName the name of the function
   * @return {Function}  a function which takes a noun as a parameter
   */
  Me.nounDeclensionFunction = function(declenseName) {
    if (typeof declenseName !== "string") {
      return function(text) { return text; };
    }

    return this.ndeclense[declenseName];
  };

  /**
   * Add a noun declension function
   *
   * @method addNounDeclension
   * @protected
   * @memberof Morpho
   * @param  {String}  name the name of the function
   * @param  {Function} func a function which takes a noun as parameter and returns a declensed one
   */
  Morpho.addNounDeclension = function(name, func) {
    //TODO not secure
    this.ndeclense[name] = func;
  }

  /**
   * Returns a list of noun declension functions
   *
   * @method availableNounDeclensions
   * @public
   * @final
   * @memberof Morpho
   * @return {String}    A list of declense functions names
   */
  Me.availableNounDeclensions = function(){
    return Object.keys(this.ndeclense);
  };

  /**
  * Stem a word: delete prefixes, suffixes and infixes
  *
  * @method stem
  * @public
  * @final
  * @memberof Morpho
  * @param  {String} word the word to be stemmed
  * @return {String}      stemmed word
  */
  Me.stem = function(word){
    var stemmer = this.stemmers[this.currentStemmer];
    if (typeof stemmer !== "object") return word;
    if (typeof stemmer.fct !== "function") return word;
    return stemmer.fct(word);
  };

  /**
  * Normalization method, used to delete non used chars or to replace some with others, etc.
  *
  * @method normalize
  * @public
  * @memberof Morpho
  * @param  {String} word the word to be normalized
  * @param  {String} opts some options (optional) where each language defines its own
  * normalization options
  * @return {String}      normalized word
  */
  Me.normalize = function(word, _opts){
    return word;
  };

  //========================================================================
  // HELPERS
  // =======================================================================

  /**
   * Given a morpho object for a certain language, and a branch (row or col);
   * This function returns an object containing its lables, spans and opts
   *
   * @method parseConjModelBranch
   * @private
   * @static
   * @memberof Morpho
   * @param  {Morpho}             morpho A Morpho object
   * @param  {Object}             branch Can be a row or a
   * @return {{labels: String[][], spans: Number[], opts: Object[]}} Presentation information about the branch
   */
  function parseConjModelBranch(morpho, branch){
    let result = {
      labels: [], // Array[Array[string]]: each level have many labels
      spans: [1], // spans of each level
      opts: [{}]
    };

    for (let bi = 0; bi < branch.length; bi++){
      let tmpOpts = [];
      let opts = morpho.getOptLists(branch[bi]);
      for(let si = 0; si < result.spans.length; si++){
        result.spans[si] *= opts.length;
      }
      let labels = [];
      result.opts.forEach(function(val, idx){
        opts.forEach(function(val2){
          let fuseOpts = Object.assign({}, val, val2);
          tmpOpts.push(fuseOpts);
          if(!idx){//we process labels just once
            labels.push(morpho.getOptName(branch[bi], val2));
          }
        });
      });

      result.opts = tmpOpts;
      result.spans.push(1);
      result.labels.push(labels);

    }
    result.spans.shift();

    return result;
  }

  /**
   * This method is a helper for presenting conjugation tables.
   * It takes a Morpho object of a certain language, then creates
   * rows labels and columns labels for this language
   *
   * @method parseConjModel
   * @public
   * @static
   * @memberof Morpho
   * @param  {Morpho}       morpho A Morpho object specified for a given language
   * @return {{rows: {labels: String[][], spans: Number[], opts: Object[]} ,
   * cols: {labels: String[][], spans: Number[], opts: Object[]} }}  - Information about columns and rows in conjugation
   */
  Morpho.parseConjModel = function(morpho) {

    let result = {
      rows: {},
      cols: {}
    };

    if (! (morpho instanceof Morpho)) return result;

    let model = morpho.getConjugModel();

    result.rows = parseConjModelBranch(morpho, model.rows);
    result.cols = parseConjModelBranch(morpho, model.cols);

    return result;

  };

}());
