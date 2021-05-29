import Trans from "../trans.js";

class EngTrans extends Trans {
  static code = "eng";
  static methods = {};
  static defMethod = "";
  static currentMethod = "";
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

EngTrans._nTrans("morse", english, enmorse);
EngTrans._sTransCnd("morse", __morsePreTrans, __morsePostTrans);
EngTrans._sUntransCnd("morse", __morsePreUntrans, __morsePostUntrans);

export default EngTrans;
