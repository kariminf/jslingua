import Syntax from "../syntax.mjs";
import {Activation, Perceptron, TagEncoder, BeamMEMM, JslBERTBlock, JslBERT} from "../_jslml.mjs";
import EngSem from "./eng.sem.mjs";

function prepare_pos_tagger(list_tags){
  const w_memm = [];
  const b_memm = [];
  const maxent = new Perceptron(w_memm, b_memm, Activation.softmax, list_tags);
  return new BeamMEMM(5, maxent); 
}

class EngSyntax extends Syntax {
  static list_tags = [];
  static memm = prepare_pos_tagger(this.list_tags);

  /**
  * Encoding all sentence words
  *
  * @protected
  * @final
  * @static
  * @param  {String[]} sentence list of words in sentence
  * @return {float[[]]}  encoding of each word
  */
  static _words_encode(sentence){
    const codes = [];
    sentence.forEach((word, i)=>{
      const code = EngSem.word_embedding(word);
      //TODO: check suffixes and add their encoding to word embedding
      codes.push(code);
    }, this);
    
    return codes;
  }

}

export default EngSyntax;