(function() {

  "use strict";

	//==========================================
  // EXPORTING MODULE
  //==========================================

  let Trans = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Trans = require("../trans.js");
    module.exports = AraTrans;
  }
  else {
    Trans = window.JsLingua.Cls.Trans;
    window.JsLingua.aserv("trans", "ara", AraTrans);
  }

  //==========================================
  // CONSTANTS
  //==========================================

  const arabic = [
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
  ],
  buckwalter = [
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
  ],
  arabtex = [
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

    "'", // hamza on alif
    "'i", // hamza below alif
    "'", // hamza on waw
    "'", // hamza on ya

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
  ],
  armorse = [//https://en.wikipedia.org/wiki/Morse_code_for_non-Latin_alphabets
    " -.-. ", // tha
    " .... ", // Ḥa
    " --- ", // kha
    " --.. ", // dhal
    " ---- ", // shin
    " -..- ", // ṣad
    " ...- ", // Ḍad
    " ..- ", // Ṭa
    " -.-- ", // Ẓa
    " --. ", // ghayn

    " -... ", // ba
    " - ", // ta
    " .--- ", // jim
    " -.. ", // dal
    " .-. ", // ra
    " ---. ", // zin
    " ... ", // sin
    " .-.- ", // 'Ayn
    " ..-. ", // fa
    " --.- ", // qaf
    " -.- ", // kaf
    " .-.. ", // lam
    " -- ", // mim
    " -. ", // nun
    " ..-.. ", // ha
    " .-- ", // waw
    " .. ", // ya

    "*", // hamza on alif
    "*", // hamza below alif
    "*", // hamza on waw
    "*", // hamza on ya

    "*", // madda on alif
    "*", // alif alwasla
    "*", // dagger alif
    "*", // alif maqsura

    "*", // fathatayn
    "*", // dammatayn
    "*", // kasratayn
    "*", // fatha
    "*", // Damma
    "*", // kasra
    "*", // shadda
    "*", // tatwil

    "*", // ta marbuta
    "*", // sukun

    " . ", // lone hamza
    " .- " // alif
  ];

  //==========================================
  // CLASS CONSTRUCTOR
  //==========================================

  /**
   * Arabic transliteration class
   *
   * @class AraTrans
   * @extends Trans
   */
  function AraTrans() {
    Trans.call(this, "ara");
    Trans._nTrans.call(this, "buckwalter", arabic, buckwalter);
    Trans._nTrans.call(this,"arabtex", arabic, arabtex);
    Trans._nTrans.call(this,"morse", arabic, armorse);
    Trans._sTransCnd.call(this, "morse", __morsePreTrans, __morsePostTrans);
    Trans._sUntransCnd.call(this, "morse", __morsePreUntrans, __morsePostUntrans);
  }

  AraTrans.prototype = Object.create(Trans.prototype);
  AraTrans.prototype.constructor = AraTrans;


  //==========================================
  // MORSE FUNCTIONS
  //==========================================

  /**
   * Arabic to morse normalization
   *
   * @method __morseNorm
   * @private
   * @memberof AraTrans
   * @param  {String} text Arabic text
   * @return {String}      normalized text
   */
  function __ar2morseNorm(text) {
    let result = text;
    result = result.replace(/[أإئؤ]/gi, "ء");
    result = result.replace(/[ىآ]/gi, "ا");
    result = result.replace(/[ة]/gi, "ه");
    return result;
  }

  /**
   * pre-transliteration for morse: cleaning non supported codes
   *
   * @method __morsePreTrans
   * @private
   * @memberof AraTrans
   * @param  {String} text Arabic text
   * @return {String}      processed text for morse transliteration
   */
  function __morsePreTrans(text) {
    let result = text;
    //cleaning non supported codes
    result = result.replace(/[\^#]/gi, "");
    result = result.replace(/\./gi, "#").replace(/-/gi, "^");
    result = result.replace(/[ ]+/gi, "\t");
    //result = result.replace(/([^\t])([^\t])/gi, "$1 $2");
    result = __ar2morseNorm(result);
    return result;
  }

  /**
   * post-transliteration for morse: clean non morse characters
   *
   * @method __morsePostTrans
   * @private
   * @memberof AraTrans
   * @param  {String} text morse code
   * @return {String}      filtered morse code
   */
  function __morsePostTrans(text) {
    let result = text;
    result = Trans.specialCharTrans(result);
    result = result.replace(/ +/gi, " ");
    result = result.replace(/^ /gi, "");
    result = result.replace(/ $/gi, "");
    result = result.replace(/\t/gi, "   ");
    //clean non morse characters
    result = result.replace(/[^ .-]/gi, "");
    return result.trim();
  }

  /**
   * pre-untransliteration for morse: clean non morse characters
   *
   * @method __morsePreUntrans
   * @private
   * @memberof AraTrans
   * @param  {String} text morse code
   * @return {String}      processed morse code for untransliteration
   */
  function __morsePreUntrans(text) {
    let result = text;
    //clean non morse characters
    result = result.replace(/[^ .-]/gi, "");
    result = result.replace(/[ ]{3,}/gi, " \t ");
    result = result.replace(/ +/gi, "  ");
    result = result.replace(/^/gi, " ");
    result = result.replace(/$/gi, " ");
    return result;
  }

  /**
   * post-untransliteration for morse
   *
   * @method __morsePostUntrans
   * @private
   * @memberof AraTrans
   * @param  {String} text Arabic text
   * @return {String}      filtered Arabic text
   */
  function __morsePostUntrans(text) {
    let result = text;
    result = Trans.specialCharUntrans(result);
    result = result.replace(/#/gi, ".").replace(/\^/gi, "-");
    result = result.replace(/ +/gi, "");
    result = result.replace(/\t/gi, " ");
    return result;
  }

}());
