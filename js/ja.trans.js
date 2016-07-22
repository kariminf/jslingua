var JaTrans = (function(){
  var hiraganaTrans = {
    "ふぁ": "fa",
    "ふぉ": "fo",
    "ふぃ": "fi",
    "か": "ka",
    "き": "ki",
    "く": "ku",
    "け": "ke",
    "こ": "ko",
    "た": "ta",
    "ち": "chi",
    "ちゃ": "cha",
    "ちぇ": "che",
    "ちゅ": "chu",
    "ちょ": "cho",
    "つ": "tsu",
    "て": "te",
    "と": "to",
    "さ": "sa",
    "し": "shi",
    "しゃ": "sha",
    "しぇ": "she",
    "しゅ": "shu",
    "しょ": "sho",
    "し": "shi",
    "す": "su",
    "せ": "se",
    "そ": "so",
    "な": "na",
    "に": "ni",
    "ぬ": "nu",
    "ね": "ne",
    "の": "no",
    "は": "ha",
    "ひ": "hi",
    "ふ": "fu",
    "へ": "he",
    "ほ": "ho",
    "ま": "ma",
    "み": "mi",
    "む": "mu",
    "め": "me",
    "も": "mo",
    "や": "ya",
    "ゆ": "yu",
    "よ": "yo",
    "ら": "ra",
    "り": "ri",
    "る": "ru",
    "れ": "re",
    "ろ": "ro",
    "わ": "wa",
    "を": "wo",
    "が": "ga",
    "ぎ": "gi",
    "ぐ": "gu",
    "げ": "ge",
    "ご": "go",
    "ざ": "za",
    "じ": "ji",
    "ず": "zu",
    "ぜ": "ze",
    "ぞ": "zo",
    "だ": "da",
    "ぢ": "di",
    "づ": "du",
    "で": "de",
    "ど": "do",
    "ば": "ba",
    "び": "bi",
    "ぶ": "bu",
    "べ": "be",
    "ぼ": "bo",
    "ぱ": "pa",
    "ぴ": "pi",
    "ぷ": "pu",
    "ぺ": "pe",
    "ぽ": "po",
    "あ": "a",
    "い": "i",
    "う": "u",
    "え": "e",
    "お": "o",
    "ん": "n",
    "ゃ": "ya",
    "ぇ": "ye",
    "ゅ": "yu",
    "ぃ": "yi",
    "ょ": "yo"
  };

  var loneUnTrans = {
    "ku": "く",
    "su": "す",
    "nu": "ぬ",
    "fu": "ふ",
    "hu": "ふ",
    "mu": "む",
    "yu": "ゆ",
    "ru": "る",
    "gu": "ぐ",
    "zu": "ず",
    "du": "づ",
    "bu": "ぶ",
    "pu": "ぷ"
  };

  /**
  * Constructor to create a Japanese translaterator
  */
  function JaTrans() {
    Trans.call(this, hiraganaTrans);
    Trans.prototype.addUnTransPreFunction(unTransPreFunction);
    Trans.prototype.addUnTransPostFunction(loneCharReplace);
  }


  /**
  * Replace the doubled characters with a little "tsu" if different from "n"
  * @param  {String} text The text to be replaced
  * @return {String} The same string but the repeated characters are replaced
  */
  var doubleReplace = function(text){
    return text.replace(/(.)\1+/gi, function(x){
      var repChar = "っ";
      if (x[0] === "n"){
        repChar = "ん";
      }
      var p = new Array(x.length).join(repChar);
      return p + x[0];
    });
  }

  var xya2Jap = function (text){
    return text.replace(/(.)y[aeuio]/gi, function(x){
      var key = x[0] + "i";
      if (key in Trans.prototype.inverseLookup){
        var result =  Trans.prototype.inverseLookup[key];
        key = "y" + x[2];
        if (key in Trans.prototype.inverseLookup){
          result += Trans.prototype.inverseLookup[key];
        }
        return result;
      } else {
        return x;
      }

    });
  }

  var unTransPreFunction = function(text){
    return xya2Jap(doubleReplace(text));
  }



  /**
  * Replace the lone characters with their equivalent + "u"
  * @param  {[String]} text the text to be replaced
  * @return {[String]}      The resulted text
  */
  var loneCharReplace = function(text){
    return text.replace(/[a-z][う]?/gi, function(x){
      var key = x;
      if (x.length > 1){
        if (x === "tう"){
          return "つ";
        }
        key = x[0];
      }

      key += "u";
      var result = "";
      if (key in loneUnTrans){
        result = loneUnTrans[key];
      }

      if (x.length > 1){
        result += "う";
      }

      return result;
    });
  }

  JaTrans.prototype = new Trans(hiraganaTrans);

  return JaTrans;

}());
