(function(){

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Morpho;
  } else {
    window.JsLingua.Cls.Morpho = Morpho;
  }

  /**
  * Morphology of a specific language
  *
  * @class Morpho
  * @constructor
  * @param {string} langCode Language ISO693-2 code: ara, jpn, eng, etc.
  */
  function Morpho(langCode) {

    this.code = langCode;
    //Contains stemmers
    this.stemmers = {};
    this.currentStemmer = "";
    this.g = {
      debugFunction: dummyDebug
    };
  }

  /**
  * A debugging function which do nothing
  * @method dummyDebug
  * @private
  */
  function dummyDebug() {}

  /**
  * A debugging function which pushes the arguments to the cosoles log
  * @method realDebug
  * @private
  */
  function realDebug(){
    console.log(Array.prototype.slice.call(arguments).join(' '));
  }

  var C = Object.freeze;

  /**
  * The part of speech: Noun, Verb, Adjective,
  * Adverb, Preposition, Pronoun
  * @access Morpho.Feature.POS
  * @attribute PoS
  * @readOnly
  * @static
  * @type {object}
  */
  var PoS = C({
    N: "noun",
    V: "verb",
    Adj: "adjective",
    Adv: "adverb",
    Prep: "preposition",
    Pron: "pronoun"
  });

  /**
  * The tense: Past, Present, Future
  * @access Morpho.Feature.Tense
  * @attribute Tense
  * @readOnly
  * @static
  * @type {object}
  */
  var Tense = C({
    Pa: "past",
    Pr: "present",
    Fu: "future"
  });

  /**
  * The aspect: Simple, Continuous, Perfect, PerfectContinuous
  * @access Morpho.Feature.Aspect
  * @attribute Aspect
  * @readOnly
  * @static
  * @type {object}
  */
  var Aspect = C({
    S: "simple",
    C: "continuous",
    P: "perfect",
    PC: "perfect-continuous"
  });

  /**
  * The mood: indicative, subjunctive, conditional,
  * optative, imperative, jussive, potential,
  * hypothetical, inferential
  *
  * @see http://universaldependencies.org/u/feat/Mood.html
  * @access Morpho.Feature.Mood
  * @attribute Mood
  * @readOnly
  * @static
  * @type {object}
  */
  var Mood = C({
    /**
     * The indicative can be considered the default mood.
     * A verb in indicative merely states that something happens,
     * has happened or will happen, without adding any attitude of the speaker.
     * @example You study at the university
     * @type {String}
     */
    Ind: "indicative",

    /**
     * The speaker uses imperative to order or ask the addressee to do the action of the verb.
     * @example Study at the university
     * @type {String}
     */
    Imp: "imperative",

    /**
     * The conditional mood is used to express actions that would have taken
     * place under some circumstances but they actually did not / do not happen.
     * Grammars of some languages may classify conditional as tense (rather than mood)
     * but e.g. in Czech it combines with two different tenses (past and present).
     * @example if she went home
     * @type {String}
     */
    Cnd: "conditional",

    /**
     * The action of the verb is possible but not certain.
     * This mood corresponds to the modal verbs can, might, be able to. Used e.g. in Finnish.
     * @example she can go home
     * @type {String}
     */
    Pot: "potential",

    /**
     * The subjunctive mood is used under certain circumstances in subordinate clauses,
     * typically for actions that are subjective or otherwise uncertain.
     * In German, it may be also used to convey the conditional meaning.
     * @example "Je veux que tu le fasses": I want that you to do it
     * @type {String}
     */
    Sub: "subjunctive",

    /**
     * The jussive mood expresses the desire that the action happens;
     * it is thus close to both imperative and optative.
     * Unlike in desiderative, it is the speaker, not the subject who wishes that it happens.
     * Used e.g. in Arabic.
     * @example فليكن let it be
     * @type {String}
     */
    Jus: "jussive",

    /**
     * Means “in order to”, occurs in Amazonian languages.
     * @type {String}
     */
    Prp: "purposive",

    /**
     * The quotative mood is used e.g. in Estonian to denote direct speech.
     * @type {String}
     */
    Qot: "quotative",

    /**
     * Expresses exclamations like “May you have a long life!” or
     * “If only I were rich!” In Turkish it also expresses suggestions.
     * @example let’s go home
     * @type {String}
     */
    Opt: "optative",

    /**
     * The desiderative mood corresponds to the modal verb “want to”:
     * “He wants to come.” Used e.g. in Turkish.
     * @type {String}
     */
    Des: "desiderative",

    /**
     * The necessitative mood expresses necessity and corresponds to the modal
     * verbs “must, should, have to”: “He must come.”
     * @type {String}
     */
    Nec: "necessitative",

    /**
     * Expresses surprise, irony or doubt. Occurs in Albanian,
     * other Balkan languages, and in Caddo (Native American from Oklahoma).
     * @type {String}
     */
    Adm: "admirative"

  });

  /**
  * The voice: Active,Passive, Middle
  * @access Morpho.Feature.Voice
  * @attribute Voice
  * @readOnly
  * @static
  * @type {object}
  */
  var Voice = C({
    A: "active",
    P: "passive",
    M: "middle"
  });

  /**
  * The grammatical number: Singular, Dual, Plural
  * @access Morpho.Feature.Number
  * @attribute GNumber
  * @readOnly
  * @static
  * @type {object}
  */
  var GNumber = C({
    S: "singular",
    D: "dual",
    P: "plural"
  });

  /**
  * The case: Nominative, Accusative, Genitive, Dative,
  * Prepositional, Ablative, Instrumental, Vocative
  * @access Morpho.Feature.Case
  * @attribute Case
  * @readOnly
  * @static
  * @type {object}
  */
  var Case = C({
    Nom: "nominative",
    Acc: "accusative",
    Gen: "genitive",
    Dat: "dative",
    Pre: "prepositional",
    Abl: "ablative",
    Ins: "instrumental",
    Voc: "vocative"
  });

  /**
  * The person: First, Second, Third.
  * @access Morpho.Feature.Person
  * @attribute Person
  * @readOnly
  * @static
  * @type {object}
  */
  var Person = C({
    F: "first",
    S: "second",
    T: "third"
  });

  /**
  * The gender: Masculine, Feminine, Neuter.
  * @access Morpho.Feature.Gender
  * @attribute Gender
  * @readOnly
  * @static
  * @type {object}
  */
  var Gender = C({
    M: "masculine",
    F: "feminine",
    N: "neuter"
  });

  /**
  * This is a map to different morphology features:
  * <ul>
  * <li>POS</li>
  * <li>Tense</li>
  * <li>Aspect</li>
  * <li>Mood</li>
  * <li>Voice</li>
  * <li>Number: It returns <a href="#attr_Num">Num</a></li>
  * <li>Case: It returns <a href="#attr_Case">Case</a></li>
  * <li>Person: It returns <a href="#attr_Person">Person</a></li>
  * <li>Gender: It returns <a href="#attr_Gender">Gender</a></li>
  * </ul>
  * We can access these features either by:<br>
  * Morpho.Feature.feature_name <br>
  * Or: <br>
  * Morpho.Feature["feature_name"]
  *
  * @attribute Feature
  * @access Morpho.Feature
  * @readOnly
  * @static
  * @type {object}
  */
  Morpho.Feature = C({
    POS: PoS,
    Tense: Tense,
    Aspect: Aspect,
    Mood: Mood,
    Voice: Voice,
    Number: GNumber,
    Case: Case,
    Person: Person,
    Gender: Gender
  });


  //=========================================
  // Protected Static methods
  // ========================================

  /**
  * Add new stemmer method
  * @method newStemmer
  * @protected
  * @static
  * @param  {string} stemmerName the name of the stemmer
  * @param  {string} stemmerDesc   the description of the stemmer
  * @param  {function} stemmerFct   the function stem(word)
  */
  Morpho.newStemmer = function (stemmerName, stemmerDesc, stemmerFct) {
    if (typeof stemmerName === "string" && stemmerName.length > 0){
      this.stemmers[stemmerName] = {};
      this.stemmers[stemmerName].desc = stemmerDesc;
      this.stemmers[stemmerName].fct = stemmerFct;
    }
  }

  //===================================================
  // Prototypes
  //===================================================
  var Me = Morpho.prototype;

  /**
  * Enables the debugging messages
  * @method enableDebug
  */
  Me.enableDebug = function(){
    this.g.debugFunction = realDebug;
  }

  /**
  * disables the debugging messages
  * @method disableDebug
  */
  Me.disableDebug = function(){
    this.g.debugFunction = dummyDebug;
  }

  /**
  * Sets the current stemmer
  *
  * @final
  * @method setCurrentStemmer
  * @param {string} StemmerName stemmer method's name
  */
  Me.setCurrentStemmer = function (StemmerName) {
    if (StemmerName in this.stemmers){
      this.currentStemmer = StemmerName;
    }
  }

  /**
  * Returns the list of available stemming methods
  * @final
  * @method availableStemmers
  * @return {array}  Array of Strings containing stemmers names
  */
  Me.availableStemmers = function(){
    return Object.keys(this.stemmers);
  }

  /**
  * This method is used to recover the name of the tense
  * @param  {Tense} tense the tense which we want to get the name
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
  }

  /**
  * This function returns an object of available conjugation forms
  * ```
  * {
  *  "form_name": {opts}
  * }
  * ```
  * @public
  * @method getForms
  * @return {array}  Array of tenses available for the language
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
  }


  /**
  * Each language has a conjugation table model.
  * For example, in English, Arabic and French, we put pronouns in rows.
  * As for Japanese, the conjugation doesn't follow that pattern.
  * @method getConjugModel
  * @return {[type]}   [description]
  */
  Me.getConjugModel = function(){
    //Past and Present are defaults
    return {
      rows: ["Pronoun"],
      cols: ["Voice", "Negation"]
    };
  }


  /**
   * [getOptLists description]
   * @method getOptLists
   * @param  {[type]}    optLabel [description]
   * @return {[type]}             [description]
   */
  Me.getOptLists = function(optLabel){
    switch (optLabel) {
      case "Pronoun": return this.getPronounOpts();
      case "Negation": return this.getNegationOpts();
      case "Voice": return this.getVoiceOpts();
      default:

    }
    return [];
  }

  Me.getOptName = function(optLabel, opts){
    switch (optLabel) {
      case "Pronoun": return this.getPronounName(opts);
      case "Negation": return this.getNegationName(opts);
      case "Voice": return this.getVoiceName(opts);
      default:

    }
    return "";
  }

  /**
   * [getNegationOpts description]
   * @protected
   * @method getNegationOpts
   * @return {[type]}        [description]
   */
  Me.getNegationOpts = function(){
    return [
        {negated:0}, //Positive
        {negated:1}//negative
    ];
  }

  /**
   * [getNegationName description]
   * @protected
   * @method getNegationName
   * @param  {[type]}        opts [description]
   * @return {[type]}             [description]
   */
  Me.getNegationName = function(opts){
    if (! opts) return "";
    if (opts.negated) return "negative";
    return "affirmative";
  }

  /**
   * [getVoiceOpts description]
   * @protected
   * @method getVoiceOpts
   * @return {[type]}     [description]
   */
  Me.getVoiceOpts = function(){
    return [
        {voice: Voice.A}, //Active voice
        {voice: Voice.P} //Passive voice
    ];
  }

  /**
   * [getVoiceName description]
   * @protected
   * @method getVoiceName
   * @param  {[type]}     opts [description]
   * @return {[type]}          [description]
   */
  Me.getVoiceName = function(opts){
    if (! opts) return "";
    if (! opts.voice) return "";
    switch (opts.voice) {
      case Voice.A: return "active";
      case Voice.P: return "passive";
    }
    return "";
  }

  /**
   * [getPronounOpts description]
   * @protected
   * @method getPronounOpts
   * @return {[type]}       [description]
   */
  Me.getPronounOpts = function(){
    return [{}];
  }

  /**
   * [getPronounName description]
   * @protected
   * @method getPronounName
   * @param  {[type]}       opts [description]
   * @return {[type]}            [description]
   */
  Me.getPronounName = function(opts){
    return "";
  }


  /**
  * This function is used for verb conjugation
  * @method conjugate
  * @param  {string} verb the word to be conjugated
  * @param  {object} opts  options for tense, case, voice, aspect, person, number, gender, mood, and other
  * @return {string}      inflected word
  */
  Me.conjugate = function(verb, opts){
    return verb;
  }



  /**
  * Get the personal pronoun using options like: person, gender, etc.<br>
  * for example, the parameters for the personal pronoun "I": <br>
  * ```
  *    {
  *      person: Morpho.Feature.Person.First,
  *      number: Morpho.Feature.Number.Singular
  *    }
  * ```
  * @method getPronounName
  * @param  {object} opts An object containing parameters: person, gender, number.
  * @return {string}      the pronoun
  */
  Me.getPronounName = function(opts){
    return "";
  }

  /**
  * This function is used for noun inflexion<br>
  * For example: noun to plural nouns
  * @method declenseNoun
  * @param  {string} noun the noun to be inflected
  * @param  {object} opts  the options: number for example
  * @return {string}      the inflected noun
  */
  Me.declenseNoun = function(noun, opts){
    return noun;
  }

  /**
  * Stem a word: delete prefixes, suffixes and infixes
  * @method stem
  * @param  {string} word the word to be stemmed
  * @return {string}      stemmed word
  */
  Me.stem = function(word){
    var stemmer = this.stemmers[this.currentStemmer];
    if (typeof stemmer !== "object") return word;
    if (typeof stemmer.fct !== "function") return word;
    return stemmer.fct(word);
  }

  /**
  * lemmatize a word: return it to its origin
  * @method lemmatize
  * @param  {string} word the word to be lemmatized
  * @return {string}      lemmatized word
  */
  Me.lemmatize = function(word){
    return word;
  }

  /**
  * Normalization method, used to delete non used chars or to replace some with others, etc.
  * @method normalize
  * @param  {string} word the word to be normalized
  * @param  {string} opts some options (optional) where each language defines its own
  * normalization options
  * @return {string}      normalized word
  */
  Me.normalize = function(word, opts){
    return word;
  }

  //========================================================================
  // HELPERS
  // =======================================================================

  /**
   * [parseConjModelBranch description]
   * @private
   * @static
   * @method parseConjModelBranch
   * @param  {[type]}             morpho [description]
   * @param  {[type]}             branch [description]
   * @return {[type]}                    [description]
   */
  function parseConjModelBranch(morpho, branch){
    var result = {
      labels: [], // Array[Array[string]]: each level have many labels
      spans: [1], // spans of each level
      opts: [{}]
    };

    for (var bi = 0; bi < branch.length; bi++){
      var tmpOpts = [];
      var opts = morpho.getOptLists(branch[bi]);
      for(var si = 0; si < result.spans.length; si++){
        result.spans[si] *= opts.length;
      }
      var labels = [];
      result.opts.forEach(function(val, idx, a){
        opts.forEach(function(val2, idx2, a2){
          var fuseOpts = Object.assign({}, val, val2);
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
   * [parseConjModel description]
   * @static
   * @public
   * @method parseConjModel
   * @param  {[type]}       morpho [description]
   * @return {[type]}              [description]
   */
  Morpho.parseConjModel = function(morpho) {

    var result = {
      rows: {},
      cols: {}
    }

    if (! (morpho instanceof Morpho)) return result;

    var model = morpho.getConjugModel();

    result.rows = parseConjModelBranch(morpho, model.rows);
    result.cols = parseConjModelBranch(morpho, model.cols);

    return result;

  }

}());
