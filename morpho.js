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
    Noun: 0,
    Verb: 1,
    Adjective: 2,
    Adverb: 3,
    Preposition: 4,
    Pronoun: 5
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
    Past: 0,
    Present: 1,
    Future: 2
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
    Simple: 0,
    Continuous: 1,
    Perfect: 2,
    PerfectContinuous: 3
  });

  /**
   * The mood: Indicative, Subjunctive, Conditional,
   * Optative, Imperative, Jussive, Potential,
   * Hypothetical, Inferential
   * @access Morpho.Feature.Mood
   * @attribute Mood
   * @readOnly
   * @static
   * @type {object}
   */
  var Mood = C({
    Indicative: 0,
    Subjunctive: 1,
    Conditional: 2,
    Optative: 3,
    Imperative: 4,
    Jussive: 5,
    Potential: 6,
    Hypothetical: 7,
    Inferential: 8
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
    Active: 0,
    Passive: 1,
    Middle: 2
  });

  /**
   * The number: Singular, Dual, Plural
   * @access Morpho.Feature.Number
   * @attribute Num
   * @readOnly
   * @static
   * @type {object}
   */
  var Num = C({
    Singular: 0,
    Dual: 1,
    Plural: 2
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
    Nominative: 0,
    Accusative: 1,
    Genitive: 2,
    Dative: 3,
    Prepositional: 4,
    Ablative: 5,
    Instrumental: 6,
    Vocative: 7
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
    First: 0,
    Second: 1,
    Third: 2
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
    Masculine: 0,
    Feminine: 1,
    Neuter: 2
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
    "POS": PoS,
    "Tense": Tense,
    "Aspect": Aspect,
    "Mood": Mood,
    "Voice": Voice,
    "Number": Num,
    "Case": Case,
    "Person": Person,
    "Gender": Gender
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
    var T = Tense;
    switch (tense) {
      case T.Past:
        return "past";
      case T.Present:
        return "present";
      case T.Future:
        return "future";
    }

    return "";
  }

  /**
   * This method is used to get personal pronouns characteristics
   * @public
   * @method getPronounOpts
   * @return {array}  Array of different objects; each object contains the properties
   * of pronouns. For example: {person: Morpho.Feature.Person.First, number: Morpho.Feature.Number.Singular}
   * which refers to the personal pronoun "I"
   */
  Me.getPronounOpts = function(){
    return [];
  }

  /**
   * This function returns an array of available tenses
   * @public
   * @method getTenses
   * @return {array}  Array of tenses available for the language
   */
  Me.getTenses = function(){
    //Past and Present are defaults
    return [
      Tense.Past,
      Tense.Present
    ];
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

}());
