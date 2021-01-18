class Lang {
  //These static members must be overriden in extended classes;
  //otherwise, the class won't function properly
  static CS = {};
  static TR = {};
  static langCode = "";

  constructor(){
    //current transformation function
    this.transFct = function(text) {return text;};
    //current charset functions
    this.charFcts = charFctsDef;

    let transList = [];
    let pronList = [];

    this.s = {
      clear: () => {
        transList = [];
        pronList = [];
        return this.s;
      },

      strans: transName => {
        this.strans(transName);
        return this.s;
      },

      trans: text => {
        transList.push(this.trans(text));
        return this.s;
      },

      ltrans: () => {
        return transList;
      },

      nbr2str: num => {
        pronList.push(this.nbr2str(num));
        return this.s;
      },

      lnbr2str: () => {
        return pronList;
      },

    };
  }

  //==========================================
  // STATIC FUNCTIONS (protected)
  //==========================================

  /**
  * Add char sets of a language
  *
  * @method _nChs
  * @protected
  * @static
  * @memberof Lang
  * @param  {String} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
  * @param  {Number} begin   integer value: begining of the charSet
  * @param  {Number} end     integer value: end of the charSet
  */
  static _nChs(setName, begin, end) {
    this.CS[setName] = __isBetween(begin, end);
  }

  /**
   * Creates a new transformation method
   *
   * @method _nTrans
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
  static _nTrans(transName, transDesc, opts) {

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
        charSetFunc = __isBetween(begin, end);
      }

      transOpts.push({
        offset: opt.offset,
        found: charSetFunc
      });
    }

    let trans = this.TR[transName] = {};
    trans.fct =  __createTransform(transOpts);
    trans.desc = transDesc;

  }

  //==========================================
  // CHARSETS FUNCTIONS (public)
  //==========================================

  /**
   * Returns the available charsets for the current language
   *
   * @method lchars
   * @public
   * @static
   * @final
   * @memberof Lang
   * @return {String[]} a set of strings containing the names of charsets
   */
  static lchars() {
    return Object.keys(this.CS);
  }

  /**
   * Get an object with verification functions
   * contains: returns a function which verifies if the text contains
   *           at least one of the charsets
   * all : returns a function which verifies if all the chacaters of the text
   *           are in this charset
   *
   * @method gcharverify
   * @public
   * @static
   * @final
   * @memberof Lang
   * @param  {String} charSet the name of the charset
   * @return {object} object with verifying functions
   */
  static gcharverify(charSet) {
    let chVerif = this.CS[charSet];
    if (chVerif) {
      return {
        contains: __createContains(chVerif),
        all: __createAll(chVerif)
      };
    }
    return charFctsDef;
  }

  /**
   * Sets the current charset we are using for functions
   *
   * @method lchars
   * @public
   * @final
   * @memberof Lang
   * @param  {String} charSet the name of the charset
   */
  schars(charSet) {
    this.charFcts = this.constructor.gcharverify(charSet);
  }

  //==========================================
  // TRANSFORMATION FUNCTIONS (public)
  //==========================================

  /**
   * Returns the available transformations for the current language
   * (Static version)
   * @method ltrans
   * @public
   * @static
   * @final
   * @memberof Lang
   * @return {String[]} a set of strings containing the names of transformation functions
   */
  static ltrans() {
    return Object.keys(this.TR);
  }

  /**
   * Get the the transformation function
   *
   * @method gtrans
   * @public
   * @static
   * @final
   * @memberof Lang
   * @param  {String} transName name of the transformation function
   * @return {function}  a function which transforms a given text
   */
  static gtrans(transName) {
    return (transName in this.TR)? this.TR[transName].fct: function(text){return text};
  }

  /**
   * Get the description of the transformation function
   *
   * @method gtransdesc
   * @public
   * @static
   * @final
   * @memberof Lang
   * @param  {String} transName name of the transformation function
   * @return {Text}  description
   */
  static gtransdesc(transName) {
    if (transName in this.TR){
      return this.TR[transName].desc;
    }
    return "";
  }

  /**
   * Returns the available transformations for the current language
   * (Dynamic version)
   * @method ltrans
   * @public
   * @final
   * @memberof Lang
   * @return {String[]} a set of strings containing the names of transformation functions
   */
  ltrans() {
    return this.constructor.ltrans();
  }

  /**
   * Sets the current transformations for the current object
   *
   * @method strans
   * @public
   * @final
   * @memberof Lang
   * @param  {String} transName the name of transformation method
   */
  strans(transName) {
    this.transFct = this.constructor.gtrans(transName);
  }

  /**
   * Transforms a text from a charset to another
   *
   * @method trans
   * @public
   * @final
   * @memberof Lang
   * @param  {String} text text to be transformed
   * @return {Text}  transformed text
   */
  trans(text) {
    return this.transFct(text);
  }

  /**
   * Transforms a text from a charset to another
   * (Static version)
   * @method trans
   * @public
   * @static
   * @final
   * @memberof Lang
   * @param  {String} transName the name of transformation method
   * @param  {String} text text to be transformed
   * @return {Text}  transformed text
   */
  static trans(transName, text) {
    return gtrans(transName)(text);
  }


  //==========================================
  // PRONOUNCE FUNCTIONS
  //==========================================

  /**
  * A function which returns the pronounciation of a number in the destination
  * language (this must be overriden)
  *
  * @method nbr2str
  * @public
  * @static
  * @abstract
  * @memberof Lang
  * @param  {Number} num A number to be transformed into letters
  * @return {String}  the pronounciation
  */
  static nbr2str(num) {
    return num;
  }

  static pronounceNumber(num) {
    return this.nbr2str(num);
  }

  //==========================================
  // LONG FUNCTIONS
  //==========================================


  /**
   * Returns a function which verifies if a char belongs to a charset or not
   *
   * @method verifyCharSetFunction
   * @public
   * @static
   * @memberof Lang
   * @param  {String} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
   * @return {Function}  A function which takes a char and returns true if it belongs to the charset
   */
  static verifyCharSetFunction(setName) {
    if (typeof setName !== "string") {
      return function() { return false; };
    }

    return this.CS[setName];
  }

  /**
   * Returns the transformation function
   *
   * @method transformationFunction
   * @public
   * @static
   * @memberof Lang
   * @param  {String} transName transformation name (function name), for example: hiragana2Katakana
   * @return {Function}  a function which takes a string and transforme it to another string with different charset
   */
  static transformationFunction(transName) {
    if (typeof transName !== "string") {
      return function(text) { return text; };
    }

    return this.TR[transName].fct;
  }

  static containsCharSetFunction(charSet){
    let chVerif = this.CS[charSet];
    return (chVerif)? __createContains(chVerif): charFctsDef.contains;
  }

  static allCharSetFunction(charSet){
    let chVerif = this.CS[charSet];
    return (chVerif)? __createAll(chVerif): charFctsDef.all;
  }



} //End of class Lang

//defining long methods
Lang.getTransDesc = Lang.gtransdesc;
Lang.availableTransformations = Lang.ltrans;
Lang.listTransformations = Lang.ltrans;
Lang.availableCharSets = Lang.lchars;
Lang.listCharSets = Lang.lchars;


let charFctsDef = {
  contains: (_text) => {return false},
  all: (_text) => {return false}
}

/**
* Returns unicode
*
* @method __getUnicode
* @private
* @static
* @memberof Lang
* @param {(Char|Number)} c - a character or a unicode int
* @return {Number} returns the same number or the unicode of the first character
*/
function __getUnicode(char) {
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
* @method __isBetween
* @private
* @static
* @memberof Lang
* @param  {Number}  min minimum unicode (included)
* @param  {Number}  max maximum unicode (included)
* @return {isInCharset}     function with char as parameter and returns a boolean
*/
function __isBetween(min,  max) {
  return function (char) {
    let u = __getUnicode(char);
    if(min <= u && u <= max) return true;
    return false;
  };
}

/**
 * Returns a function testing if a text contains at least one character of a given charset
 * @method __createContains
 * @private
 * @static
 * @memberof Lang
 * @param  {isInCharset} charTestFunc A function which tests if a character belongs to a charset
 * @return {Function}      function which tests if a text contains any charcater of the charset verified by charTestFunc
 */
function __createContains(charTestFunc) {
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
 * @method __createAll
 * @private
 * @static
 * @memberof Lang
 * @param  {isInCharset} charTestFunc A function which tests if a character belongs to a charset
 * @return {Function}      function which tests if a text is formed completly by charcaters of the charset verified by charTestFunc
 */
function __createAll(charTestFunc) {
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
 * @method __createTransform
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
function __createTransform (opts) {
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

export default Lang;
