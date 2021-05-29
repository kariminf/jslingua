import Trans from "../trans.js";
import EngTrans from "../eng/eng.trans.js";

class FraTrans extends Trans {
  static code = "fra";
  static defMethod = "";
  static currentMethod = "";
  static methods ={};
}

//==========================================
// CONSTANTS
//==========================================

const latinRep = {
  "ç": "c",
  "à": "a",
  "è": "e",
  "é": "e",
  "ù": "u"
},
latinChars = "[" + Object.keys(latinRep).toString().replace(/,/g, "") + "]";

FraTrans.methods["morse"] = Object.assign({}, EngTrans.methods["morse"]);

FraTrans.methods["morse"].preTrans = function(text) {
  //let result = text.toLowerCase();
  text = text.replace(new RegExp(latinChars, "g"), c => latinRep[c]);
  return EngTrans.methods["morse"].preTrans(text);
}

export default FraTrans;
