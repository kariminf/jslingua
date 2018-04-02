(function() {

  "use strict";

  //==========================================
  // EXPORTING MODULE
  //==========================================

  let Trans = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Trans = require("../trans.js");
    module.exports = EngTrans;
  }
  else {
    Trans = window.JsLingua.Cls.Trans;
    window.JsLingua.addService("Trans", "eng", EngTrans);
  }

  //==========================================
  // CONSTANTS
  //==========================================

  const english = [
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
  ],
  enmorse = [//https://en.wikipedia.org/wiki/Morse_code_for_non-Latin_alphabets
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

  //==========================================
  // CLASS CONSTRUCTOR
  //==========================================

  /**
   * English transliteration
   *
   * @class EngTrans
   * @extends Trans
   */
  function EngTrans() {
    Trans.call(this, "eng");
    Trans._nTrans.call(this,"morse", english, enmorse);
    Trans._sTransCnd.call(this, "morse", __morsePreTrans, __morsePostTrans);
    Trans._sUntransCnd.call(this, "morse", __morsePreUntrans, __morsePostUntrans);
  }

  EngTrans.prototype = Object.create(Trans.prototype);
  EngTrans.prototype.constructor = EngTrans;

  //==========================================
  // MORSE FUNCTIONS
  //==========================================

  /**
   * pre-transliteration for morse: cleaning non supported codes
   *
   * @method __morsePreTrans
   * @private
   * @memberof EngTrans
   * @param  {String} text Arabic text
   * @return {String}      processed text for morse transliteration
   */
  function __morsePreTrans(text) {
    let result = text;
    //cleaning non supported codes
    result = result.replace(/[\^#]/gi, "");
    result = result.replace(/\./gi, "#").replace(/-/gi, "^");
    result = result.replace(/[ ]+/gi, "\t");
    return result.toUpperCase();
  }

  /**
   * post-transliteration for morse: clean non morse characters
   *
   * @method __morsePostTrans
   * @private
   * @memberof EngTrans
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
    return result;
  }

  /**
   * pre-untransliteration for morse: clean non morse characters
   *
   * @method __morsePreUntrans
   * @private
   * @memberof EngTrans
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
   * @memberof EngTrans
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
