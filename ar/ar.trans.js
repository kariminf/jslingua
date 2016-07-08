var ArTrans = (function(){
  var buckwalter = {
    "ا": "A", // alif
    "ب": "b", // ba
    "ت": "t", // ta
    "ث": "v", // tha
    "ج": "j", // jim
    "ح": "H", // Ḥa
    "خ": "x", // kha
    "د": "d", // dal
    "ذ": "*", // dhal
    "ر": "r", // ra
    "ز": "z", // zin
    "س": "s", // sin
    "ش": "$", // shin
    "ص": "S", // ṣad
    "ض": "D", // Ḍad
    "ط": "T", // Ṭa
    "ظ": "Z", // Ẓa
    "ع": "E", // 'Ayn
    "غ": "g", // ghayn
    "ف": "f", // fa
    "ق": "q", // qaf
    "ك": "k", // kaf
    "ل": "l", // lam
    "م": "m", // mim
    "ن": "n", // nun
    "ه": "h", // ha
    "و": "w", // waw
    "ي": "y", // ya
    //hamza
    "\u0621": "'", // lone hamza
    "أ": ">", // hamza on alif
    "إ": "<", // hamza below alif
    "ؤ": "&", // hamza on waw
    "ئ": "}", // hamza on ya
    //alif
    "آ": "|", // madda on alif
    "\u0671": "{", // alif alwasla
    "\u0670": "`", // dagger alif
    "ى": "Y", // alif maqsura
    //harakat
    "\u064E": "a", // fatha
    "\u064F": "", // Damma
    "\u0650": "i", // kasra
    "\u064B": "F", // fathatayn
    "\u064C": "N", // dammatayn
    "\u064D": "K", // kasratayn
    "\u0651": "~", // shadda
    "\u0640": "_", // tatwil
    //others
    "ة": "p", // ta marbuta
    "\u0652": "o" // sukun

  };

  function ArTrans() {
    Trans.call(this, buckwalter);
  }

  ArTrans.prototype = new Trans(buckwalter);

  return ArTrans;

}());
