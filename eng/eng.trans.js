(function(){
  var Trans = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Trans = require("../trans.js");
    module.exports = EngTrans;
  } else {
    Trans = window.JsLingua.Cls.Trans;
    window.JsLingua.addService("Trans", "eng", EngTrans);
  }

  var english = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ]

  //https://en.wikipedia.org/wiki/Morse_code_for_non-Latin_alphabets
  var enmorse = [
    " .- ", // A
    " -... ", // B
    " -.-. ", // C
    " -.. ", // D
    " . ", // E
    " ..-. ", // F
    " --. ", // G
    " .... ", // H
    " .. ", // I
    " .--- ", // J
    " -.- ", // K
    " .-.. ", // L
    " -- ", // M
    " -. ", // N
    " --- ", // O
    " .--. ", // P
    " --.- ", // Q
    " .-. ", // R
    " ... ", // S
    " - ", // T
    " ..- ", // U
    " ...- ", // V
    " .-- ", // W
    " -..- ", // X
    " -.-- ", // Y
    " --.. " // Z
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
  Trans.newMethod.call(otherMourseTrans, "def", otherMourseBef, otherMourseAft);

  /**
   * English transliteration
   * @class EngTrans
   * @extends Trans
   * @constructor
   */
  function EngTrans() {
    Trans.call(this, "eng");
    Trans.newMethod.call(this,"Morse", english, enmorse);
    Trans.addTransPrePostMethods.call(this, "Morse", morsePreTrans, morsePostTrans);
    Trans.addUntransPrePostMethods.call(this, "Morse", morsePreUntrans, morsePostUntrans);
  }

  EngTrans.prototype = Object.create(Trans.prototype);
  EngTrans.prototype.constructor = EngTrans;

  /**
   * pre-transliteration for morse: cleaning non supported codes
   * @method morsePreTrans
   * @private
   * @param  {string} text Arabic text
   * @return {string}      processed text for morse transliteration
   */
  function morsePreTrans(text){
    var result = text;
    //cleaning non supported codes
    result = result.replace(/[\^\#]/gi, "");
    result = result.replace(/\./gi, "#").replace(/\-/gi, "^");
    result = result.replace(/[ ]+/gi, "\t");
    return result.toUpperCase();
  }

  /**
   * post-transliteration for morse: clean non morse characters
   * @method morsePostTrans
   * @private
   * @param  {string} text morse code
   * @return {string}      filtered morse code
   */
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

  /**
   * pre-untransliteration for morse: clean non morse characters
   * @method morsePreUntrans
   * @private
   * @param  {string} text morse code
   * @return {string}      processed morse code for untransliteration
   */
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

  /**
   * post-untransliteration for morse
   * @method morsePostUntrans
   * @private
   * @param  {string} text Arabic text
   * @return {string}      filtered Arabic text
   */
  function morsePostUntrans(text){
    var result = text;
    result = otherMourseTrans.untransliterate(result);
    result = result.replace(/\#/gi, ".").replace(/\^/gi, "-");
    result = result.replace(/ +/gi, "");
    result = result.replace(/\t/gi, " ");
    return result;
  }

}());
