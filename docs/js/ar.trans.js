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

  //https://en.wikipedia.org/wiki/Morse_code_for_non-Latin_alphabets
  var armorse = [
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

  var otherMourseBef = [
    //numbers,
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    //punctuation,
    "#", //actually it is a dot, this is to prevent conflect
    "،",
    "؟",
    "'",
    "!",
    "/",
    "(",
    ")",
    "&",
    ":",
    "؛",
    "=",
    "+",
    "^", //actually it is a hyphen, this is to prevent conflect
    "_",
    "\"",
    "$",
    "@"
  ];

  var otherMourseAft = [
    //numbers
    " ----- ",
    " .---- ",
    " ..--- ",
    " ...-- ",
    " ....- ",
    " ..... ",
    " -.... ",
    " --... ",
    " ---.. ",
    " ----. ",
    //punctuation
    " .-.-.- ",
    " --..-- ",
    " ..--.. ",
    " .----. ",
    " -.-.-- ",
    " -..-. ",
    " -.--. ",
    " -.--.- ",
    " .-... ",
    " ---... ",
    " -.-.-. ",
    " -...- ",
    " .-.-. ",
    " -....- ",
    " ..--.- ",
    " .-..-. ",
    " ...-..- ",
    " .--.-. "
  ];

  var otherMourseTrans = new Trans("otherMourse");
  otherMourseTrans.newMethod("def", otherMourseBef, otherMourseAft);

  function ArTrans() {
    Trans.call(this, "Arabic");
    this.newMethod("Buckwalter", arabic, buckwalter);
    this.newMethod("ArabTeX", arabic, arabtex);
    this.newMethod("Morse", arabic, armorse);
    this.addTransPrePostMethods("Morse", morsePreTrans, morsePostTrans);
    this.addUntransPrePostMethods("Morse", morsePreUntrans, morsePostUntrans);
  }

  function ArTrans() {
    Trans.call(this, "Arabic");
    this.newMethod("Buckwalter", arabic, buckwalter);
    this.newMethod("ArabTeX", arabic, arabtex);
    this.newMethod("Morse", arabic, armorse);
    this.addTransPrePostMethods("Morse", morsePreTrans, morsePostTrans);
    this.addUntransPrePostMethods("Morse", morsePreUntrans, morsePostUntrans);
  }

  ArTrans.prototype = new Trans("Arabic");
  ArTrans.prototype.constructor = ArTrans;

  function ar2morseNormalize(text){
    var result = text;
    result = result.replace(/[أإئؤ]/gi, "ء");
    result = result.replace(/[ىآ]/gi, "ا");
    result = result.replace(/[ة]/gi, "ه");
    return result;
  }

  function morsePreTrans(text){
    var result = text;
    //cleaning non supported codes
    result = result.replace(/[\^\#]/gi, "");
    result = result.replace(/\./gi, "#").replace(/\-/gi, "^");
    result = result.replace(/[ ]+/gi, "\t");
    //result = result.replace(/([^\t])([^\t])/gi, "$1 $2");
    result = ar2morseNormalize(result);
    return result;
  }

  function morsePostTrans(text){
    var result = text;
    result = otherMourseTrans.transliterate(result);
    result = result.replace(/ +/gi, " ");
    result = result.replace(/^ /gi, "");
    result = result.replace(/ $/gi, "");
    result = result.replace(/\t/gi, "   ");
    //clean non morse characters
    result = result.replace(/[^ \.\-]/gi, "");
    return result;
  }

  function morsePreUntrans(text){
    var result = text;
    //clean non morse characters
    result = result.replace(/[^ \.\-]/gi, "");
    result = result.replace(/[ ]{3,}/gi, " \t ");
    result = result.replace(/ +/gi, "  ");
    result = result.replace(/^/gi, " ");
    result = result.replace(/$/gi, " ");
    return result;
  }

  function morsePostUntrans(text){
    var result = text;
    result = otherMourseTrans.untransliterate(result);
    result = result.replace(/\#/gi, ".").replace(/\^/gi, "-");
    result = result.replace(/ +/gi, "");
    result = result.replace(/\t/gi, " ");
    return result;
  }

  return ArTrans;

}(this));
