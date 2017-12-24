(function() {

  "use strict";

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Lang;
  }
  else {
    window.JsLingua.Cls.Lang = Lang;
  }

  /**
  * Returns unicode
  * @method getUnicode
  * @private
  * @param {String, Number} char a character or a unicode int
  * @return {Number} returns the same number or the unicode of the first character
  */
  function getUnicode(char) {
    let type = typeof char;
    if (type === "number")
    return char;

    if (type === "string" && char != "")
    return char.charCodeAt(0);

    return -1;
  }

 /**
  * Returns another method to verify if a character's unicode is between
  * two unicode numbers min and max
  * @method isBetween
  * @private
  * @param  {number}  min minimum unicode (included)
  * @param  {number}  max maximum unicode (included)
  * @return {function}     function with char as parameter and returns a boolean
  */
  function isBetween(min,  max) {
    return function (char) {
      let u = getUnicode(char);
      if(min <= u && u <= max) return true;
      return false;
    };
  }

  function contains(charTestFunc) {
    return function(text) {
      for (let i = 0; i < text.length; i++) {
        let u = text.charCodeAt(i);
        if (charTestFunc(u)) return true;
      }
      return false;
    };
  }


  function all(charTestFunc) {
    return function(text) {
      for (let i = 0; i < text.length; i++) {
        let u = text.charCodeAt(i);
        if (! charTestFunc(u)) return false;
      }
      return true;
    };
  }

  /**
   * transformation Function, returns another function that transforms a text
   * @private
   * @method transform
   * @param  {Array[object]}  opts a list of objects, where each object is:
   *     {
   *        offset: the offset of transformation
   *        found: the function that verifies if the char can be transformed
   *     }
   * @return {function}     function witch transforms a text using the afforded offsets
   */
  function transform (opts) {
    return function(text) {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        let u = text.charCodeAt(i);
        for (let j=0;j<opts.length; j++) {
          let opt = opts[j];
          //console.log(opt);
          if (opt.found(u)) {
            u += opt.offset;
            break;
          }
        }
        result += String.fromCharCode(u);
      }
      return result;
    };
  }

  /**
   * Language class
   * @class Lang
   * @constructor
   * @param {string} langCode The language ISO639-2 code: "ara", "jpn", "eng", etc.
   */
  function Lang(langCode) {

    this.code = langCode;
    //Contains name of service and the function
    this.CS = {};
    this.TR = {};

  }

  //=========================================
  // Prottected Static methods
  // ========================================

  /**
  * Add char sets of a language
  * @method addCharSet
  * @static
  * @protected
  * @param  {string} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
  * @param  {number} begin   integer value: begining of the charSet
  * @param  {number} end     integer value: end of the charSet
  */
  Lang.addCharSet = function(setName, begin, end) {
    this.CS[setName] = isBetween(begin, end);
  };

  /**
   * Creates a new transformation method
   * @method addTransform
   * @static
   * @protected
   * @param {string} transName   transformation name (function name), for example: hiragana2Katakana
   * @param {array[object]} opts   Array of options such as
   *    {//If the charset exists and we use all of it
   *       setName: "<name of the charset",
   *       offset: <number>
   *    },
   *    {//otherwise
   *       begin: <number>,
   *       end: <number>,
   *       offset: <number>
   *    }
   */
  Lang.addTransform = function(transName, opts) {

    let transOpts = [];

    for(let i=0; i<opts.length; i++) {
      let charSetFunc = function() { return false; };
      let opt = opts[i];
      //helpfull for code minification
      let setName = opt.setName,
      begin = opt.begin,
      end = opt.end;
      if (setName && setName in this.CS) {
        charSetFunc = this.CS[setName];
      }
      else if (typeof begin === "number" && typeof end === "number") {
        charSetFunc = isBetween(begin, end);
      }

      transOpts.push({
        offset: opt.offset,
        found: charSetFunc
      });
    }

    this.TR[transName] = transform(transOpts);
  };

  //=========================================
  // Prototypes
  // ========================================
  let Me = Lang.prototype;

  /**
   * Returns the available charsets for the current language
   * @method availableCharSets
   * @return {array} a set of strings containing the names of charsets
   */
  Me.availableCharSets = function() {
    return Object.keys(this.CS);
  };

  /**
   * Returns the available transformations for the current language
   * @method availableTransformations
   * @return {array} a set of strings containing the names of transformation functions
   */
  Me.availableTransformations = function() {
    return Object.keys(this.TR);
  };

  /**
   * Returns the transformation function
   * @method transformationFunction
   * @param  {string} transName transformation name (function name), for example: hiragana2Katakana
   * @return {function}  a function which takes a string and transforme it to another string with different charset
   */
  Me.transformationFunction = function(transName) {
    if (typeof transName !== "string") {
      return function(text) { return text; };
    }

    return this.TR[transName];
  };

  /**
   * Returns a function which verifies if a char belongs to a charset or not
   * @method verifyCharSetFunction
   * @param  {string} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
   * @return {function}  A function which takes a char and returns true if it belongs to the charset
   */
  Me.verifyCharSetFunction = function(setName) {
    if (typeof setName !== "string") {
      return function() { return false; };
    }

    return this.CS[setName];
  };

  /**
   * Returns a function which verifies if a string contains at least one character which belongs to a charset
   * @method containsCharSetFunction
   * @param  {string} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
   * @return {function}  A function which takes a string and returns true if one of its characters belongs to the charset
   */
  Me.containsCharSetFunction = function(setName) {
    return contains(this.CS[setName]);
  };

  /**
   * Returns a function which verifies if all string's characters belong to a charset
   * @method allCharSetFunction
   * @param  {string} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
   * @return {function}  A function which takes a string and returns true if all of its characters belong to the charset
   */
  Me.allCharSetFunction = function(setName) {
    return all(this.CS[setName]);
  };

  /**
   * Returns the code of the language
   * @method getCode
   * @return {string}  The language ISO639-2 code: "ara", "jpn", "eng", etc.
   */
  Me.getCode = function() {
    return this.code;
  };

  /**
  * A function which returns the pronounciation of a number in the destination
  * language (this must be overriden)
  * @method pronounceNumber
  * @param  {number} num A number to be transformed into letters
  * @return {string}  the pronounciation
  */
  Me.pronounceNumber = function(num) {
    return num;
  };

}());
