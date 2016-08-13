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
    "ث", // tha
    "ح", // Ḥa
    "خ", // kha
    "ذ", // dhal
    "ش", // shin
    "ص", // ṣad
    "ض", // Ḍad
    "ط", // Ṭa
    "ظ", // Ẓa
    "غ", // ghayn

    "ب", // ba
    "ت", // ta
    "ج", // jim
    "د", // dal
    "ر", // ra
    "ز", // zin
    "س", // sin
    "ع", // 'Ayn
    "ف", // fa
    "ق", // qaf
    "ك", // kaf
    "ل", // lam
    "م", // mim
    "ن", // nun
    "ه", // ha
    "و", // waw
    "ي", // ya

    "أ", // hamza on alif
    "إ", // hamza below alif
    "ؤ", // hamza on waw
    "ئ", // hamza on ya

    "آ", // madda on alif
    "\u0671", // alif alwasla
    "\u0670", // dagger alif
    "ى", // alif maqsura

    "\u064B", // fathatayn
    "\u064C", // dammatayn
    "\u064D", // kasratayn
    "\u064E", // fatha
    "\u064F", // Damma
    "\u0650", // kasra
    "\u0651", // shadda
    "\u0640", // tatwil

    "ة", // ta marbuta
    "\u0652", // sukun

    "ء", // lone hamza
    "ا" // alif
  ];

  var buckwalter = [
    "v", // tha
    "H", // Ḥa
    "x", // kha
    "*", // dhal
    "$", // shin
    "S", // ṣad
    "D", // Ḍad
    "T", // Ṭa
    "Z", // Ẓa
    "g", // ghayn

    "b", // ba
    "t", // ta
    "j", // jim
    "d", // dal
    "r", // ra
    "z", // zin
    "s", // sin
    "E", // 'Ayn
    "f", // fa
    "q", // qaf
    "k", // kaf
    "l", // lam
    "m", // mim
    "n", // nun
    "h", // ha
    "w", // waw
    "y", // ya

    ">", // hamza on alif
    "<", // hamza below alif
    "&", // hamza on waw
    "}", // hamza on ya

    "|", // madda on alif
    "{", // alif alwasla
    "`", // dagger alif
    "Y", // alif maqsura

    "F", // fathatayn
    "N", // dammatayn
    "K", // kasratayn
    "a", // fatha
    "u", // Damma
    "i", // kasra
    "~", // shadda
    "_", // tatwil

    "p", // ta marbuta
    "o", // sukun

    "'", // lone hamza
    "A" // alif
  ];

  var arabtex = [
    "_t", // tha
    ".h", // Ḥa
    "_h", // kha
    "_d", // dhal
    "^s", // shin
    ".s", // ṣad
    ".d", // Ḍad
    ".t", // Ṭa
    ".z", // Ẓa
    ".g", // ghayn

    "b", // ba
    "t", // ta
    "j", // jim
    "d", // dal
    "r", // ra
    "z", // zin
    "s", // sin
    "`", // 'Ayn
    "f", // fa
    "q", // qaf
    "k", // kaf
    "l", // lam
    "m", // mim
    "n", // nun
    "h", // ha
    "w", // waw or "U"
    "y", // ya or "I"

    "a'", // hamza on alif
    "i'", // hamza below alif
    "U'", // hamza on waw
    "'y", // hamza on ya

    "'A", // madda on alif
    "|", // alif alwasla <<<<<<
    "_a", // dagger alif <<<<<<
    "_A", // alif maqsura

    "aN", // fathatayn
    "uN", // dammatayn
    "iN", // kasratayn
    "a", // fatha
    "u", // Damma
    "i", // kasra
    "xx", // shadda
    "--", // tatwil

    "T", // ta marbuta
    "\"", // sukun

    "'", // lone hamza
    "A" // alif
  ];

  function ArTrans() {
    Trans.call(this, "Arabic");
    this.newMethod("Buckwalter", arabic, buckwalter);
    this.newMethod("ArabTeX", arabic, arabtex);
  }

  ArTrans.prototype = new Trans("Arabic");
  ArTrans.prototype.constructor = ArTrans;

  return ArTrans;

}(this));
