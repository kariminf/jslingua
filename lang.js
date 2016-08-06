var Lang = (function(){

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

  function Lang(langName) {
    var name = langName;
    //Contains name of service and the function
    var charCheck = {};


    /**
     * Add char sets of a language
     * @param  {string} setName CharSet name, for example: hiragana, kanji, Arabic suppliment
     * @param  {number} begin   integer value: begining of the charSet
     * @param  {number} end     integer value: end of the charSet
     * @return {null}         [description]
     */
    Lang.prototype.addCharCheckFunction = function(setName, begin, end){
      charCheck[setName] = isBetween(begin, end);
    }

    Lang.prototype.getCharCheckSetNames = function(){
      return charCheck.keys();
    }

    /**
     * Get a function which decides if a character is in a charSet
     * @param  {string} setName charSet's name
     * @return {function}         function which return true or false
     */
    Lang.prototype.getCharCheckFunction = function(setName){
      var fallDownFunc = function(char){
        return false;
      }

      if (! setName typeof "String"){ return fallDownFunc}
      if (! setName in charCheck){ return fallDownFunc}
      return charCheck[setName];
    }

    /**
     * A function which returns the pronounciation of a number in the destination
     * language (this must be overriden)
     * @return {string} the pronounciation
     */
    Lang.prototype.pronounceNumber = function(nbr){
      return nbr;
    }



  }


  return Lang;

}());
