/**
 * Semantics module
 * @module sem
 */

/**
 * Syntactic functions such as PoS tagging, etc.
 * @hideconstructor
 */
class Sem {
  //==========================================
  // CONSTANTS
  //==========================================

  //==========================================
  // VARIABLES
  //==========================================

  //==========================================
  // PROTECTED FUNCTIONS
  //==========================================

  /**
   * Word embedding character-based
   * @protected
   * @abstract
   * @static
   * @param {string} word 
   * @return {float[]}  embedding of the word
   */
  static _word_emb_char(word){
    return [];
  }


  //==========================================
  // Vector reprepresentation FUNCTIONS
  //==========================================

  /**
   * Get word embedding
   * @public
   * @final
   * @static
   * @param {string} word a word
   * @param {object} _opts a map of options
   * @return {float[]}  embedding of the word
   */
  static word_embedding(word, _opts){
    return this._word_emb_char(word);
  }

  static oneHot(i, N){
    const res = new Array(N).fill(0);
    res[i] = 1;
    return res;
  }

}

export default Sem;

