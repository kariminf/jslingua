/**
 * Syntax module
 * @module syntax
 */

 import JslNode from "_jslgraph.mjs"; 

/**
 * Syntactic functions such as PoS tagging, etc.
 * @hideconstructor
 */
class Syntax {

  //==========================================
  // CONSTANTS
  //==========================================

  /**
  * Part of speech: adjective,noun, etc.
  * <br>access: Syntax.PoS
  * @see https://universaldependencies.org/u/pos/index.html
  *
  * @attribute PoS
  * @readOnly
  * @public
  * @static
  * @enum {String}
  */
  static PoS = {
    ADJ: "adjective",
    ADP: "adposition",
    ADV: "adverb",
    AUX: "auxiliary",
    CCONJ: "coordinating conjunction",
    DET: "determiner",
    INTJ: "interjection",
    NOUN: "noun",
    NUM: "numeral",
    PART: "particle",
    PRON: "pronoun",
    PROPN: "proper noun",
    PUNCT: "punctuation",
    SCONJ: "subordinating conjunction",
    SYM: "symbol",
    VERB: "verb",
    X: "other"
  };

  static DepRel = {
    //Core arguments: Nominals
    nsubj: "nominal subject",
    obj: "object",
    iobj: "indirect object",
    //Core arguments: Clauses
    csubj: "clausal subject",
    ccomp: "clausal complement",
    xcomp: "open clausal complement",
    //Non-core dependents: Nominals
    obl: "oblique nominal",
    vocative: "vocative",
    expl: "expletive",
    dislocated: "dislocated elements",
    //Non-core dependents: Clauses
    advcl: "adverbial clause modifier",
    //Non-core dependents: Modifier words
    advmod: "adverbial modifier",
    discourse: "discourse element",
    //Non-core dependents: Function Words
    aux: "auxiliary",
    cop: "copula",
    mark: "marker",
    //Nominal dependents: Nominals
    nmod: "nominal modifier",
    appos: "appositional modifier",
    nummod: "numeric modifier",
    //Nominal dependents: Clauses
    acl: "adnominal clause",
    //Nominal dependents: Modifier words
    amod: "adjectival modifier",
    //Nominal dependents: Function Words
    det: "determiner",
    clf: "classifier",
    case: "case marking",
    //Coordination
    conj: "conjunct",
    cc: "coordinating conjunction",
    //MWE
    fixed: "fixed multiword expression",
    flat: "flat multiword expression",
    compound: "compound",
    //Loose
    list: "list",
    parataxis: "parataxis",
    //Special
    orphan: "orphan",
    goeswith: "goes with",
    reparandum: "overridden disfluency",
    //Other
    punct: "punctuation",
    root: "root",
    dep: "unspecified dependency"
  };

  //==========================================
  // VARIABLES
  //==========================================

  //These static members must be overriden in extended classes;
  //otherwise, the class won't function properly
  static memm = null;


  //==========================================
  // PROTECTED FUNCTIONS
  //==========================================

  /**
  * Encoding a word
  *
  * @protected
  * @final
  * @static
  * @param  {int} i current position
  * @param  {String[]} sentence list of words in sentence
  * @return {float[]}  encoding of the current word
  */
  static _word_encode(i, sentence){
    return [];
  }

  /**
   * Constituency parsing
   * @protected
   * @final
   * @static
   * @param {String[]} sentence list of words in sentence
   * @param {String[]} pos list of tags of these words
   * @returns {JslNode} the parse tree's root
   */
   static _const_parse(sentence, pos){
    return null;
  }

  /**
   * Dependency parsing
   * @protected
   * @final
   * @static
   * @param {String[]} sentence list of words in sentence
   * @param {String[]} pos list of tags of these words
   * @returns {JslNode} the parse tree's root
   */
   static _dep_parse(sentence, pos){
    return null;
  }



  //==========================================
  // Tagging FUNCTIONS
  //==========================================

  /**
  * Tagging a list of words
  *
  * @public
  * @final
  * @static
  * @param  {String[]} sentence list of words in sentence
  * @return {String[]}  list of tags of these words
  */
  static pos_tag(sentence){
    this.memm.init(this._word_encode(0, sentence));
    for(let i = 1; i < sentence.length; i++){
      this.memm.step(this._word_encode(i, sentence));
    }
    return this.memm.final();
  }

  /**
   * Constituency parsing
   * @public
   * @final
   * @static
   * @param {String[]} sentence list of words in sentence
   * @param {String[]} pos list of tags of these words
   * @returns {JslNode} the parse tree's root
   */
  static const_parse(sentence, pos){
    return this._const_parse(sentence, pos);
  }

  /**
   * Dependency parsing
   * @public
   * @final
   * @static
   * @param {String[]} sentence list of words in sentence
   * @param {String[]} pos list of tags of these words
   * @returns {JslNode} the parse tree's root
   */
  static dep_parse(sentence, pos){
    return this._dep_parse(sentence, pos);
  }

  //==========================================
  // HELPER FUNCTIONS
  //==========================================


} //End of class




export default Syntax;
