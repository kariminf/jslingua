class Morpho {

  //These static members must be overriden in extended classes;
  //otherwise, the class won't function properly
  //Contains stemmers
  static stemmers = {};
  //Contains PoS conversions
  static converters = {};
  static cstemmer = "";//current stemmer
  static cconverter = "";//current converter
  static langCode = "";

  static ssplitter = /([.?!])(?:\s+|$)/;
  static tsplitter = /([,;])?\s+/;

  //==========================================
  // CONSTANTS
  //==========================================

  /**
  * Constant for tenses
  * <br>access: Morpho.Tense
  * @attribute Tense
  * @readOnly
  * @public
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  static Tense = {
    /** past */
    Pa: "past",
    /** present */
    Pr: "present",
    /** future */
    Fu: "future"
  };

  /**
  * The aspect: Simple, Continuous, Perfect, PerfectContinuous
  * <br>access: Morpho.Feature.Aspect
  * @attribute Aspect
  * @readOnly
  * @public
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  static Aspect = {
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
  };

  /**
  * The mood: indicative, subjunctive, conditional,
  * optative, imperative, jussive, potential,
  * hypothetical, inferential
  * <br>access: Morpho.Feature.Mood
  * @see http://universaldependencies.org/u/feat/Mood.html
  *
  * @attribute Mood
  * @readOnly
  * @public
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  static Mood = {
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

  };

  /**
  * The voice: Active,Passive, Middle
  * <br>access: Morpho.Feature.Voice
  * @attribute Voice
  * @readOnly
  * @public
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  static Voice = {
    /** active */
    A: "active",
    /** passive */
    P: "passive",
    /** middle */
    M: "middle"
  };

  /**
  * The grammatical number: Singular, Dual, Plural
  * <br>access: Morpho.Feature.Number
  * @attribute GNumber
  * @readOnly
  * @public
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  static GNumber = {
    /** singular */
    S: "singular",
    /** dual */
    D: "dual",
    /** plural */
    P: "plural"
  };

  /**
  * The person: First, Second, Third.
  * <br>access: Morpho.Feature.Person
  * @attribute Person
  * @readOnly
  * @public
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  static Person = {
    /** first */
    F: "first",
    /** second */
    S: "second",
    /** third */
    T: "third"
  };

  /**
  * The gender: Masculine, Feminine, Neuter.
  * <br>access: Morpho.Feature.Gender
  * @attribute Gender
  * @readOnly
  * @public
  * @static
  * @memberof Morpho
  * @enum {String}
  */
  static Gender = {
    /** masculine */
    M: "masculine",
    /** feminine */
    F: "feminine",
    /** neuter */
    N: "neuter"
  };

  /**
   * Formality in Japanese conjugation
   *
   * @attribute Formality
   * @readOnly
   * @static
   * @memberof JpnMorpho
   * @enum {String}
   */
  static Formality = {
    /** plain */
    Pl: "plain",
    /** polite */
    Po: "polite"
  };

  //==========================================
  // PROTECTED FUNCTIONS
  //==========================================

  /**
  * Add new stemmer method
  * @method _nStem
  * @protected
  * @static
  * @memberof Morpho
  * @param  {String} stemmerName the name of the stemmer
  * @param  {String} stemmerDesc   the description of the stemmer
  * @param  {Function} stemmerFct   the function stem(word)
  */
  static _nStem(stemmerName, stemmerDesc, stemmerFct) {
    if (typeof stemmerName === "string" && stemmerName.length > 0){
      let stem = this.stemmers[stemmerName] = {};
      stem.desc = stemmerDesc;
      stem.fct = stemmerFct;
    }
  }

  /**
  * Add new part of speach converter method
  * @method _nConv
  * @protected
  * @static
  * @memberof Morpho
  * @param  {String} converterName the name of the converter
  * @param  {String} converterDesc   the description of the converter
  * @param  {Function} converterFct   the function convert(word)
  */
  static _nConv(converterName, converterDesc, converterFct) {
    if (typeof converterName === "string" && converterName.length > 0){
      let conv = this.converters[converterName] = {};
      conv.desc = converterDesc;
      conv.fct = converterFct;
    }
  }

  /**
   *
   * @method _conj
   * @protected
   * @static
   * @memberof Morpho
   * @param  {[type]} verb  [description]
   * @param  {[type]} _opts [description]
   * @return {[type]}       [description]
   */
  static _conj(verb, _opts){
    return verb;
  }

  //==========================================
  // STEMMING FUNCTIONS
  //==========================================

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
  static stem(word){
    var stemmer = this.stemmers[this.cstemmer];
    if (typeof stemmer !== "object") return word;
    if (typeof stemmer.fct !== "function") return word;
    return stemmer.fct(word);
  }

  /**
  * Returns the list of available stemming methods
  * @method lstem
  * @public
  * @final
  * @memberof Morpho
  * @return {String[]}  Array of Strings containing stemmers names
  */
  static lstem(){
    return Object.keys(this.stemmers);
  }

  /**
  * Returns the list of available stemming methods
  * @method listStemmers
  * @public
  * @final
  * @memberof Morpho
  * @return {String[]}  Array of Strings containing stemmers names
  */
  static listStemmers(){
    return this.lstem();
  }

  /**
  * Sets the current stemmer
  *
  * @method sstem
  * @public
  * @final
  * @memberof Morpho
  * @param {String} StemmerName stemmer method's name
  */
  static sstem = function (StemmerName) {
    if (StemmerName in this.stemmers){
      this.cstemmer = StemmerName;
    }
  }

  /**
    * Sets the current stemmer
    *
    * @method setCurrentStemmer
    * @public
    * @final
    * @memberof Morpho
    * @param {String} StemmerName stemmer method's name
    */
    static setCurrentStemmer(StemmerName) {
      this.sstem(StemmerName);
    }

  /**
   * Get the description of a stemmer
   * @method gstemdesc
   * @public
   * @final
   * @see getStemmerDescription
   * @memberof Morpho
   * @param  {string} stemmerName stemmer's name
   * @return {string}             stemmer's description
   */
  static gstemdesc(stemmerName) {
    if (stemmerName in this.stemmers){
      return this.stemmers[stemmerName].desc;
    }
    return "";
  }

  /**
   * Get the description of a stemmer
   * @method getStemmerDescription
   * @public
   * @final
   * @see gstemdesc
   * @memberof Morpho
   * @param  {string} stemmerName stemmer's name
   * @return {string}             stemmer's description
   */
  static getStemmerDescription(stemmerName) {
    return this.gstemdesc(stemmerName);
  }

  //==========================================
  // CONVERTION FUNCTIONS
  //==========================================

  /**
  * Convert a word: singular to plural; verb to noun; etc
  *
  * @method conv
  * @public
  * @final
  * @static
  * @see convertPoS
  * @memberof Morpho
  * @param  {String} word the word to be converted
  * @return {String}      converted word
  */
  static conv(word){
    var converter = this.converters[this.cconverter];
    if (typeof converter !== "object") return word;
    if (typeof converter.fct !== "function") return word;
    return converter.fct(word);
  }

  /**
  * Convert a word: singular to plural; verb to noun; etc
  *
  * @method convertPoS
  * @public
  * @final
  * @static
  * @see conv
  * @memberof Morpho
  * @param  {String} word the word to be converted
  * @return {String}      converted word
  */
  static convertPoS(word){
    return this.conv(word);
  };

  /**
  * Returns the list of available converting methods
  * @method lconv
  * @public
  * @final
  * @static
  * @see listPosConverters
  * @memberof Morpho
  * @return {String[]}  Array of Strings containing converters names
  */
  static lconv = function(){
    return Object.keys(this.converters);
  }

  /**
  * Returns the list of available converting methods
  * @method listPosConverters
  * @public
  * @final
  * @see lconv
  * @memberof Morpho
  * @return {String[]}  Array of Strings containing converters names
  */
  static listPosConverters(){
    return this.lconv();
  }

  /**
  * Sets the current PoS converter
  *
  * @method sconv
  * @public
  * @static
  * @final
  * @see setCurrentPosConverter
  * @memberof Morpho
  * @param {String} converterName converter method's name
  */
  static sconv(converterName) {
    if (converterName in this.converters){
      this.cconverter = converterName;
    }
  }

  /**
  * Sets the current PoS converter
  *
  * @method setCurrentPosConverter
  * @public
  * @static
  * @final
  * @see sconv
  * @memberof Morpho
  * @param {String} converterName converter method's name
  */
  static setCurrentPosConverter(converterName) {
    this.sconv(converterName);
  }

  /**
   * Get the description of a PoS converter by its name
   * @method gconvdesc
   * @public
   * @static
   * @see getPosConverterDesc
   * @param  {string} converterName the name of the converter
   * @return {string}               the description of the converter
   */
  static gconvdesc(converterName) {
    if (converterName in this.converters){
      return this.converters[converterName].desc;
    }
    return "";
  }

  /**
   * Get the description of a PoS converter by its name
   * @method getPosConverterDesc
   * @public
   * @static
   * @see gconvdesc
   * @param  {string} converterName the name of the converter
   * @return {string}               the description of the converter
   */
  static getPosConverterDesc = function (converterName) {
    return this.gconvdesc(converterName);
  }

  //==========================================
  // CONJUGATION FUNCTIONS
  //==========================================

  /**
  * This function is used for verb conjugation
  *
  * @method conj
  * @public
  * @final
  * @memberof Morpho
  * @param  {String} verb the word to be conjugated
  * @param  {Object} _opts  options for tense, case, voice, aspect, person, number, gender, mood, and other
  * @param  {Sring} _form
  * @return {String}      Conjugated verb
  */
  static conj(verb, _opts, _form){
    let opts = _opts || {};
    if (typeof _form === "string") {
      let form = this.gform(_form);
      if (typeof form === "object") opts = Object.assign({}, opts, form);
    }
    return this._conj(verb, opts);
  }

  /**
  * This function is used for verb conjugation
  *
  * @method conjugate
  * @public
  * @memberof Morpho
  * @param  {String} verb the word to be conjugated
  * @param  {Object} _opts  options for tense, case, voice, aspect, person, number, gender, mood, and other
  * @param  {String} _form  the form's ID
  * @return {String}      Conjugated verb
  */
  static conjugate(verb, _opts, _form){
    return this.conj(verb, _opts, _form);
  }

  /**
  * This method is used to recover the name of the tense
  * @method gtensename
  * @public
  * @memberof Morpho
  * @param  {String} tense the tense which we want to get the name (See {@link Morpho.Tense})
  * @return {String}       the name of the tense in the selected language
  */
  static gtensename(tense){
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
  * This method is used to recover the name of the tense
  * @method getTenseName
  * @public
  * @memberof Morpho
  * @param  {String} tense the tense which we want to get the name (See {@link Morpho.Tense})
  * @return {String}       the name of the tense in the selected language
  */
  static getTenseName(tense){
    return this.gtensename(tense);
  }

  /**
   * Returns a list of verb types
   *
   * @method gverbtype
   * @public
   * @abstract
   * @memberof Morpho
   * @return {String[]}     list of verb types
   */
  static lvtype(){
    return [];
  }

  /**
  * Returns a list of verb types
  *
  * @method listVerbTypes
  * @public
  * @abstract
  * @memberof Morpho
  * @return {String[]}     list of verb types
  */
  static listVerbTypes(){
    return this.lvtype();
  }

  /**
   * Given a verb, it detects its type
   *
   * @method getVerbType
   * @public
   * @abstract
   * @memberof Morpho
   * @param  {String} verb the verbe
   * @return {String}    verb's type
   */
  static gvtype(verb){
    return "";
  }

  /**
  * Given a verb, it detects its type
  *
  * @method getVerbType
  * @public
  * @final
  * @param  {String} verb the verbe
  * @memberof Morpho
  * @return {String}    verb's type
  */
  static getVerbType(verb){
    return this.gvtype(verb);
  }



  /**
  * This function returns an object of available conjugation forms for the current language
  * @example
  * {
  *  "form_name": {opts}
  * }
  *
  * @method lform
  * @public
  * @memberof Morpho
  * @return {Object[]}  Array of conjugation forms available for the language
  */
  static lform(){
    //Past and Present are defaults
    return {
      "pres": {
        desc: "Indicative present",
        mood: this.Mood.Ind,
        tense: this.Tense.Pr,
        aspect: this.Aspect.S
      },
      "past": {
        desc: "Indicative past",
        mood: this.Mood.Ind,
        tense: this.Tense.Pa,
        aspect: this.Aspect.S
      },
      "fut": {
        desc: "Indicative future",
        mood: this.Mood.Ind,
        tense: this.Tense.Fu,
        aspect: this.Aspect.S
      }
    };
  }

  /**
  * This function returns an object of available conjugation forms for the current language
  * @example
  * {
  *  "form_name": {opts}
  * }
  *
  * @method listForms
  * @public
  * @static
  * @see lform
  * @memberof Morpho
  * @return {Object[]}  Array of conjugation forms available for the language
  */
  static listForms(){
    return this.lform();
  }

  /**
   * Get the form  by name
   * @method gform
   * @public
   * @static
   * @memberof Morpho
   * @param  {string} formName form's name
   * @return {object}          form composition
   */
  static gform(formName){
    return this.lform()[formName];
  }

  /**
   * Get the description of a conjugation form
   * @method gform
   * @public
   * @static
   * @memberof Morpho
   * @see getFormDescription
   * @param  {string} formName form's name
   * @return {string}          form's description
   */
  static gformdesc(formName) {
    let forms = this.lform();
    if (formName in forms){
      return forms[formName].desc;
    }
    return "";
  }

  /**
   * Get the description of a conjugation form
   * @method getFormDescription
   * @public
   * @static
   * @memberof Morpho
   * @see gform
   * @param  {string} formName form's name
   * @return {string}          form's description
   */
  static getFormDescription(formName) {
    return this.gformdesc(formName);
  }


  /**
  * Each language has a conjugation table model.
  * For example, in English, Arabic and French, we put pronouns in rows.
  * As for Japanese, the conjugation doesn't follow that pattern.
  * @method gconjmod
  * @public
  * @memberof Morpho
  * @return {Object}   conjugation model with rows and cols
  */
  static gconjmod(){
    //Past and Present are defaults
    return {
      rows: ["Pronoun"],
      cols: ["Voice", "Negation"]
    };
  }

  /**
  * Each language has a conjugation table model.
  * For example, in English, Arabic and French, we put pronouns in rows.
  * As for Japanese, the conjugation doesn't follow that pattern.
  * @method getConjugationModel
  * @public
  * @memberof Morpho
  * @return {Object}   conjugation model with rows and cols
  */
  static getConjugationModel(){
    return this.gconjmod();
  }


  /**
   * Returns the available options for conjugation such as pronouns, negation, voice, etc.
   * @method lconjopt
   * @public
   * @memberof Morpho
   * @param  {String}    optLabel Can be: "Pronoun", "Negation", "Voice"
   * @return {Object[]}             A list of parameters related to optLabel and the processed language
   */
  static lconjopt(optLabel){
    switch (optLabel) {
      case "Pronoun": return this._gPpOpts();
      case "Negation": return this._gNegOpts();
      case "Voice": return this._gVoiceOpts();
      default: return [{}];
    }
  }

  /**
  * Returns the available options for conjugation such as pronouns, negation, voice, etc.
  * @method listConjugationOptions
  * @public
  * @memberof Morpho
  * @param  {String}    optLabel Can be: "Pronoun", "Negation", "Voice"
  * @return {Object[]}             A list of parameters related to optLabel and the processed language
  */
  static listConjugationOptions(optLabel){
    return this.lconjopt(optLabel);
  }

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
   * @method goptname
   * @public
   * @memberof Morpho
   * @param  {String}   optLabel can be: Pronoun, Negation, Voice
   * @param  {Object}   opts     The parameters
   * @return {String}            The label of this parameter in the current language
   */
  static goptname(optLabel, opts){
    switch (optLabel) {
      case "Pronoun": return this._gPpName(opts);
      case "Negation": return this._gNegName(opts);
      case "Voice": return this._gVoiceName(opts);
      default:

    }
    return "";
  }

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
  static getOptName(optLabel, opts){
    return this.goptname(optLabel, opts);
  }


  //==========================================
  // CONJUGATION OPTIONS PROTECTED FUNCTIONS
  //==========================================

  /**
   * Returns the list of negation options for verb conjugation
   *
   * @method _gNegOpts
   * @protected
   * @memberof Morpho
   * @return {Object[]}        The list of available negation options
   */
  static _gNegOpts(){
    return [
        {negated:0}, //Positive
        {negated:1}//negative
    ];
  }

  /**
   * Returns the label of the negation in the current language
   *
   * @method _gNegName
   * @protected
   * @memberof Morpho
   * @param  {Object}        opts An object containing the attribute: negated: (0|1)
   * @return {String}             the label of the negation in the current language
   */
  static _gNegName(opts){
    if (! opts) return "";
    if (opts.negated) return "negative";
    return "affirmative";
  }

  /**
   * Returns the list of conjugation voice for the current language
   *
   * @method _gVoiceOpts
   * @protected
   * @memberof Morpho
   * @return {Object[]}     A list of conjugation voice parameters for the current language
   */
  static _gVoiceOpts(){
    return [
        {voice: Morpho.Voice.A}, //Active voice
        {voice: Morpho.Voice.P} //Passive voice
    ];
  }

  /**
   * Returns the conjugation voice's name in the current language
   *
   * @method _gVoiceName
   * @protected
   * @memberof Morpho
   * @param  {Object}     opts An object with one attribute: voice
   * @return {String}          the label of the voice in the current language
   */
  static _gVoiceName(opts){
    if (! opts) return "";
    if (! opts.voice) return "";
    switch (opts.voice) {
      case Morpho.Voice.A: return "active";
      case Morpho.Voice.P: return "passive";
    }
    return "";
  }

  /**
   * Returns a list of options for pronouns in the current language
   *
   * @method _gPpOpts
   * @protected
   * @memberof Morpho
   * @return {Object[]}       List of pronouns options
   */
  static _gPpOpts = function(){
    return [{}];
  }



  /**
  * Get the personal pronoun using options like: person, gender, etc.<br>
  * for example, the parameters for the personal pronoun "I": <br>
  * @example
  *    {
  *      person: Morpho.Feature.Person.F, // "first"
  *      number: Morpho.Feature.Number.S // "singular"
  *    }
  *
  * @method _gPpName
  * @protected
  * @memberof Morpho
  * @param  {Object} opts An object containing parameters: person, gender, number.
  * @return {String}      the pronoun
  */
  static _gPpName(_opts){
    return "";
  }

  //==========================================
  // NORMALIZATION FUNCTIONS
  //==========================================

  /**
  * Normalization method, used to delete non used chars or to replace some with others, etc.
  *
  * @method norm
  * @public
  * @memberof Morpho
  * @param  {String} word the word to be normalized
  * @param  {String} opts some options (optional) where each language defines its own
  * normalization options
  * @return {String}      normalized word
  */
  static norm(word, _opts){
    return word;
  }

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
  static normalize(word, _opts){
    return this.norm(word, _opts);
  }


  //==========================================
  // SEGMENTATION FUNCTIONS
  //==========================================

  /**
   * Segment a given text
   * @param  {String} text the text to be segmennted into sentences
   * @return {String[]}      a list of sentences
   */
  static gsents(text) {
    let sents =  text.split(this.ssplitter).filter(Boolean);
    if (this.abbr) return joinAbbrev(sents, this.abbr);
    return sents;
  }

  /**
   * Segment a given text
   * @param  {String} text the text to be segmennted into sentences
   * @final
   * @return {String[]}      a list of sentences
   */
  static splitToSentences(text) {
    return this.gsents(text);
  }



  /**
   * Tokenize a given text (mostly, a sentence)
   * @param  {String} text the sentence to be tokenized
   * @return {String[]}      a list of words
   */
  static tokenize(text) {
    return text.split(this.tsplitter).filter(Boolean);
  }

  /**
   * Delete stop words from a list of words
   * @param  {String[]} words list of words
   * @return {String[]}       filtered list of words
   */
  static filter(words) {
    return words;
  }

  /**
   * Delete stop words from a list of words
   * @param  {String[]} words list of words
   * @return {String[]}       filtered list of words
   */
  static filterStopWords(words) {
    return this.filter(words);
  }



  //==========================================
  // HELPER FUNCTIONS
  //==========================================

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
  static parseConjModel() {

    let result = {
      rows: {},
      cols: {}
    };

    let model = this.getConjugationModel();

    result.rows = parseConjModelBranch(this, model.rows);
    result.cols = parseConjModelBranch(this, model.cols);

    return result;

  }

} //End of class

function joinAbbrev(sents, abbr) {
  let i;
  for (i = sents.length - 1; i >= 0; i--) {
    if (sents[i] === "." && i > 0) {
      let lastword = sents[i-1].split(" ").pop();
      if (/(?:[^.\d]\.[^.\d])+/.test(lastword) || abbr[lastword.toLowerCase()]) {
        sents[i-1] += ".";
        if (i+1 < sents.length) {
          let firstChar = sents[i+1].charAt(0);
          //abbreviations does not always start with an uppercase, so delete the
          //if (firstChar !== firstChar.toLowerCase()) {
          sents[i-1] += " " + sents[i+1];
          sents.splice(i, 2);//delete i-th element and its successor
          //}
          //else { sents.splice(i, 2); }//delete i-th element
        }
        else { sents.splice(i, 2); }//delete i-th element
      }
    }
  }
  return sents;
}




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
    let opts = morpho.lconjopt(branch[bi]);
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

export default Morpho;
