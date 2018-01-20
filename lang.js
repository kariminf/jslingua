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
  *
  * @method getUnicode
  * @private
  * @static
  * @memberof Lang
  * @param {(Char|Number)} c - a character or a unicode int
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
   * A function which verifies if a character belongs to a charset
   * @callback isInCharset
   * @param {(Char|Number)} c the character to be verified (a character or its unicode)
   * @return {Boolean} belongs true if it belongs, false otherwise
   */

 /**
  * Returns another method to verify if a character's unicode is between
  * two unicode numbers min and max
  * @method isBetween
  * @private
  * @static
  * @memberof Lang
  * @param  {Number}  min minimum unicode (included)
  * @param  {Number}  max maximum unicode (included)
  * @return {isInCharset}     function with char as parameter and returns a boolean
  */
  function isBetween(min,  max) {
    return function (char) {
      let u = getUnicode(char);
      if(min <= u && u <= max) return true;
      return false;
    };
  }

  /**
   * Returns a function testing if a text contains at least one character of a given charset
   * @method contains
   * @private
   * @static
   * @memberof Lang
   * @param  {isInCharset} charTestFunc A function which tests if a character belongs to a charset
   * @return {Function}      function which tests if a text contains any charcater of the charset verified by charTestFunc
   */
  function contains(charTestFunc) {
    return function(text) {
      for (let i = 0; i < text.length; i++) {
        let u = text.charCodeAt(i);
        if (charTestFunc(u)) return true;
      }
      return false;
    };
  }

  /**
   * Returns a function testing if a text's characters are all of a given charset
   * @method all
   * @private
   * @static
   * @memberof Lang
   * @param  {isInCharset} charTestFunc A function which tests if a character belongs to a charset
   * @return {Function}      function which tests if a text is formed completly by charcaters of the charset verified by charTestFunc
   */
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
   *
   * @method transform
   * @private
   * @static
   * @memberof Lang
   * @param  {Object[]}  opts a list of objects, where each object is:
   *     {
   *        offset: the offset of transformation
   *        found: the function that verifies if the char can be transformed
   *     }
   * @return {Function}     function witch transforms a text using the afforded offsets
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
   *
   * @class Lang
   * @param {String} langCode The language ISO639-2 code: "ara", "jpn", "eng", etc.
   */
  function Lang(langCode) {

    this.code = langCode;
    //Contains name of service and the function
    this.CS = {};
    this.TR = {};

  }

  //=========================================
  // Protected Static methods
  // ========================================

  /**
  * Add char sets of a language
  *
  * @method addCharSet
  * @protected
  * @static
  * @memberof Lang
  * @param  {String} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
  * @param  {Number} begin   integer value: begining of the charSet
  * @param  {Number} end     integer value: end of the charSet
  */
  Lang.addCharSet = function(setName, begin, end) {
    this.CS[setName] = isBetween(begin, end);
  };

  /**
   * Creates a new transformation method
   *
   * @method addTransform
   * @protected
   * @static
   * @memberof Lang
   * @param {String} transName   transformation name (function name), for example: hiragana2Katakana
   * @param {Object[]} opts   Array of options
   * @example
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
   *
   * @method availableCharSets
   * @public
   * @memberof Lang
   * @return {String[]} a set of strings containing the names of charsets
   */
  Me.availableCharSets = function() {
    return Object.keys(this.CS);
  };

  /**
   * Returns the available transformations for the current language
   *
   * @method availableTransformations
   * @public
   * @memberof Lang
   * @return {String[]} a set of strings containing the names of transformation functions
   */
  Me.availableTransformations = function() {
    return Object.keys(this.TR);
  };

  /**
   * Returns the transformation function
   *
   * @method transformationFunction
   * @public
   * @memberof Lang
   * @param  {String} transName transformation name (function name), for example: hiragana2Katakana
   * @return {Function}  a function which takes a string and transforme it to another string with different charset
   */
  Me.transformationFunction = function(transName) {
    if (typeof transName !== "string") {
      return function(text) { return text; };
    }

    return this.TR[transName];
  };

  /**
   * Returns a function which verifies if a char belongs to a charset or not
   *
   * @method verifyCharSetFunction
   * @public
   * @memberof Lang
   * @param  {String} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
   * @return {Function}  A function which takes a char and returns true if it belongs to the charset
   */
  Me.verifyCharSetFunction = function(setName) {
    if (typeof setName !== "string") {
      return function() { return false; };
    }

    return this.CS[setName];
  };

  /**
   * Returns a function which verifies if a string contains at least one character which belongs to a charset
   *
   * @method containsCharSetFunction
   * @public
   * @memberof Lang
   * @param  {String} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
   * @return {Function}  A function which takes a string and returns true if one of its characters belongs to the charset
   */
  Me.containsCharSetFunction = function(setName) {
    return contains(this.CS[setName]);
  };

  /**
   * Returns a function which verifies if all string's characters belong to a charset
   *
   * @method allCharSetFunction
   * @public
   * @memberof Lang
   * @param  {String} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
   * @return {Function}  A function which takes a string and returns true if all of its characters belong to the charset
   */
  Me.allCharSetFunction = function(setName) {
    return all(this.CS[setName]);
  };

  /**
   * Returns the code of the language
   *
   * @method getCode
   * @public
   * @memberof Lang
   * @return {String}  The language ISO639-2 code: "ara", "jpn", "eng", etc.
   */
  Me.getCode = function() {
    return this.code;
  };

  /**
  * A function which returns the pronounciation of a number in the destination
  * language (this must be overriden)
  *
  * @method pronounceNumber
  * @public
  * @memberof Lang
  * @param  {Number} num A number to be transformed into letters
  * @return {String}  the pronounciation
  */
  Me.pronounceNumber = function(num) {
    return num;
  };

}());
