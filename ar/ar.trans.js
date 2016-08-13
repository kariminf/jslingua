(function(window){
  var Trans = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Trans = require("../trans.js");
    module.exports = ArTrans;
  } else {
    Trans = window.Trans;
    window.ArTrans = ArTrans;
  }

  var arabic = [
    "ا", // alif
    "ب", // ba
    "ت", // ta
    "ث", // tha
    "ج", // jim
    "ح", // Ḥa
    "خ", // kha
    "د", // dal
    "ذ", // dhal
    "ر", // ra
    "ز", // zin
    "س", // sin
    "ش", // shin
    "ص", // ṣad
    "ض", // Ḍad
    "ط", // Ṭa
    "ظ", // Ẓa
    "ع", // 'Ayn
    "غ", // ghayn
    "ف", // fa
    "ق", // qaf
    "ك", // kaf
    "ل", // lam
    "م", // mim
    "ن", // nun
    "ه", // ha
    "و", // waw
    "ي", // ya
    //hamza
    "ء", // lone hamza
    "أ", // hamza on alif
    "إ", // hamza below alif
    "ؤ", // hamza on waw
    "ئ", // hamza on ya
    //alif
    "آ", // madda on alif
    "\u0671", // alif alwasla
    "\u0670", // dagger alif
    "ى", // alif maqsura
    //harakat
    "\u064E", // fatha
    "\u064F", // Damma
    "\u0650", // kasra
    "\u064B", // fathatayn
    "\u064C", // dammatayn
    "\u064D", // kasratayn
    "\u0651", // shadda
    "\u0640", // tatwil
    //others
    "ة", // ta marbuta
    "\u0652"// sukun
  ];

  var buckwalter = [
    "A", // alif
    "b", // ba
    "t", // ta
    "v", // tha
    "j", // jim
    "H", // Ḥa
    "x", // kha
    "d", // dal
    "*", // dhal
    "r", // ra
    "z", // zin
    "s", // sin
    "$", // shin
    "S", // ṣad
    "D", // Ḍad
    "T", // Ṭa
    "Z", // Ẓa
    "E", // 'Ayn
    "g", // ghayn
    "f", // fa
    "q", // qaf
    "k", // kaf
    "l", // lam
    "m", // mim
    "n", // nun
    "h", // ha
    "w", // waw
    "y", // ya
    //hamza
    "'", // lone hamza
    ">", // hamza on alif
    "<", // hamza below alif
    "&", // hamza on waw
    "}", // hamza on ya
    //alif
    "|", // madda on alif
    "{", // alif alwasla
    "`", // dagger alif
    "Y", // alif maqsura
    //harakat
    "a", // fatha
    "u", // Damma
    "i", // kasra
    "F", // fathatayn
    "N", // dammatayn
    "K", // kasratayn
    "~", // shadda
    "_", // tatwil
    //others
    "p", // ta marbuta
    "o" // sukun
  ];

  function ArTrans() {
    Trans.call(this, "Arabic");
    this.newMethod("Buckwalter", arabic, buckwalter);
  }

  ArTrans.prototype = new Trans("Arabic");
  ArTrans.prototype.constructor = ArTrans;

  return ArTrans;

}(this));
