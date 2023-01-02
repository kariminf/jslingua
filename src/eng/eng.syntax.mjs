import Syntax from "../syntax.mjs";
import {Activation, Perceptron, BeamMEMM} from "../_jslml.mjs";

class EngSyntax extends Syntax {
  static list_tags = [];
  static w_memm = [];
  static b_memm = [];
  static maxent = new Perceptron(w_memm, b_memm, Activation.softmax, this.list_tags);
  static memm = new BeamMEMM(5, this.maxent);

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
    return [[]];
  }

}

export default EngSyntax;