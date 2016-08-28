(function(window){

  /**
  * Returns unicode
  * @method getUnicode
  * @param {String, Number} char a character or a unicode int
  * @return {Number} returns the same number or the unicode of the first character
  */
  function getUnicode(char) {
    var type = typeof char;
    if (type === "number")
    return char;

    if (type === "string" && char != "")
    return char.charCodeAt(0);

    return -1;
  }

  function isBetween(min,  max){
    return function (char){
      var u = getUnicode(char);
      if(min <= u && u <= max)
      return true;
      return false;
    }
  }

  function contains(charTestFunc) {
    return function(text) {
      for (var i = 0; i < text.length; i++) {
        var u = text.charCodeAt(i);
        if (charTestFunc(u))
        return true;
      }
      return false;
    }
  }


  function all(charTestFunc) {
    return function(text) {
      for (var i = 0; i < text.length; i++) {
        var u = text.charCodeAt(i);
        if (! charTestFunc(u))
        return false;
      }
      return true;
    }
  }

  function transform (diff, charTestFunc) {
    return function(text) {
      var result = "";
      for (var i = 0; i < text.length; i++){
        var u = text.charCodeAt(i);
        if (charTestFunc(u))
        u += diff;
        result += String.fromCharCode(u);
      }
      return result;
    }
  }

  function Lang(langCode) {

    this.code = langCode;
    //Contains name of service and the function
    this.CS = {};
    this.TR = {};

  }

  /**
  * Add char sets of a language
  * @param  {string} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
  * @param  {number} begin   integer value: begining of the charSet
  * @param  {number} end     integer value: end of the charSet
  * @return {null}         [description]
  */
  Lang.prototype.addCharSet = function(setName, begin, end){
    this.CS[setName] = isBetween(begin, end);
  }

  Lang.prototype.addTransform = function(transName, offset, origCharSet){
    var charSetFunc = function(char){return false};
    if (origCharSet in this.CS) charSetFunc = this.CS[origCharSet];
    this.TR[transName] = transform(offset, charSetFunc);
  }

  Lang.prototype.availableCharSets = function(){
    return Object.keys(this.CS);
  }

  Lang.prototype.availableTransformations = function(){
    return Object.keys(this.TR);
  }

  Lang.prototype.transformationFunction = function(transName){
    if (typeof transName !== "string"){
      return function(text){return text}
    }

    return this.TR[transName];
  }

  Lang.prototype.verifyCharSetFunction = function(setName){
    if (typeof setName !== "string"){
      return function(char){return false}
    }

    return this.CS[setName];
  }

  Lang.prototype.containsCharSetFunction = function(setName){
    return contains(this.CS[setName]);
  }

  Lang.prototype.allCharSetFunction = function(setName){
    return all(this.CS[setName]);
  }

  Lang.prototype.getCode = function(){
    return this.code;
  }

  /**
  * A function which returns the pronounciation of a number in the destination
  * language (this must be overriden)
  * @return {string} the pronounciation
  */
  Lang.prototype.pronounceNumber = function(num){
    return num;
  }

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Lang;
  } else {
    window.Lang = Lang;
  }

}(this));
