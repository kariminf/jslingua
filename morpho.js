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
    //Contains name of service and the function

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


  /**
   * This method is used to get personal pronouns characteristics
   * @method getPronounOpts
   * @return {array}  Array of different objects; each object contains the properties
   * of pronouns. For example: {person: Morpho.Feature.Person.First, number: Morpho.Feature.Number.Singular}
   * which refers to the personal pronoun "I"
   */
  Morpho.prototype.getPronounOpts = function(){
    return [];
  }

  /**
   * This function returns an array of available tenses
   * @method getTenses
   * @return {array}  Array of tenses available for the language
   */
  Morpho.prototype.getTenses = function(){
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
  Morpho.prototype.conjugate = function(verb, opts){
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
   * @method getPronoun
   * @param  {object} opts An object containing parameters: person, gender, number.
   * @return {string}      the pronoun
   */
  Morpho.prototype.getPronoun = function(opts){
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
  Morpho.prototype.declenseNoun = function(noun, opts){
    return noun;
  }

  /**
   * Stem a word: delete prefixes, suffixes and infixes
   * @method stem
   * @param  {string} word the word to be stemmed
   * @return {string}      stemmed word
   */
  Morpho.prototype.stem = function(word){
    return word;
  }

  /**
   * lemmatize a word: return it to its origin
   * @method lemmatize
   * @param  {string} word the word to be lemmatized
   * @return {string}      lemmatized word
   */
  Morpho.prototype.lemmatize = function(word){
    return word;
  }

}());
