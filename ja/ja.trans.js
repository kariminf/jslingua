(function(){
  var Trans = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Trans = require("../trans.js");
    module.exports = JaTrans;
  } else {
    Trans = window.Trans;
    window.JaTrans = JaTrans;
  }

  var hiragana = [
    "ふぁ",
    "ふぉ",
    "ふぃ",
    "か",
    "き",
    "く",
    "け",
    "こ",
    "た",
    "ち",
    "ちゃ",
    "ちぇ",
    "ちゅ",
    "ちょ",
    "つ",
    "て",
    "と",
    "さ",
    "し",
    "しゃ",
    "しぇ",
    "しゅ",
    "しょ",
    "し",
    "す",
    "せ",
    "そ",
    "な",
    "に",
    "ぬ",
    "ね",
    "の",
    "は",
    "ひ",
    "ふ",
    "へ",
    "ほ",
    "ま",
    "み",
    "む",
    "め",
    "も",
    "や",
    "ゆ",
    "よ",
    "ら",
    "り",
    "る",
    "れ",
    "ろ",
    "わ",
    "を",
    "が",
    "ぎ",
    "ぐ",
    "げ",
    "ご",
    "ざ",
    "じ",
    "ず",
    "ぜ",
    "ぞ",
    "だ",
    "ぢ",
    "づ",
    "で",
    "ど",
    "ば",
    "び",
    "ぶ",
    "べ",
    "ぼ",
    "ぱ",
    "ぴ",
    "ぷ",
    "ぺ",
    "ぽ",
    "あ",
    "い",
    "う",
    "え",
    "お",
    "ん",
    "ゃ",
    "ぇ",
    "ゅ",
    "ぃ",
    "ょ"
  ];

  //https://en.wikipedia.org/wiki/Hepburn_romanization
  var hepburn = [
    "fa",
    "fo",
    "fi",
    "ka",
    "ki",
    "ku",
    "ke",
    "ko",
    "ta",
    "chi",
    "cha",
    "che",
    "chu",
    "cho",
    "tsu",
    "te",
    "to",
    "sa",
    "shi",
    "sha",
    "she",
    "shu",
    "sho",
    "shi",
    "su",
    "se",
    "so",
    "na",
    "ni",
    "nu",
    "ne",
    "no",
    "ha",
    "hi",
    "fu",
    "he",
    "ho",
    "ma",
    "mi",
    "mu",
    "me",
    "mo",
    "ya",
    "yu",
    "yo",
    "ra",
    "ri",
    "ru",
    "re",
    "ro",
    "wa",
    "wo",
    "ga",
    "gi",
    "gu",
    "ge",
    "go",
    "za",
    "ji",
    "zu",
    "ze",
    "zo",
    "da",
    "di",
    "du",
    "de",
    "do",
    "ba",
    "bi",
    "bu",
    "be",
    "bo",
    "pa",
    "pi",
    "pu",
    "pe",
    "po",
    "a",
    "i",
    "u",
    "e",
    "o",
    "n",
    "xya",
    "xye",
    "xyu",
    "xyi",
    "xyo"
  ];

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
    Trans.call(this, "Japanese");

    this.newMethod("Hepburn", hiragana, hepburn);
    this.addUntransPrePostMethods("Hepburn", unTransPreFunction, loneCharReplace);
    /*
    this.addUnTransPreFunction(unTransPreFunction);
    this.addUnTransPostFunction(loneCharReplace);
    */
  }

  JaTrans.prototype = new Trans("Japanese");

  /**
  * Replace the doubled characters with a little "tsu" if different from "n"
  * @param  {String} text The text to be replaced
  * @return {String} The same string but the repeated characters are replaced
  */
  var doubleReplace = function(text){
    return text.replace(/(sh|ch|.)\1+/gi, function(match, p1){
      //vowels are ignored
      if ("aeuio".indexOf(p1)>-1)
        return match;

      var repChar = "っ";

      if (p1 === "n")
        repChar = "ん";
      var repNbr = match.length/p1.length; //Math.floor() match is always a multiple of p1
      var rep = new Array(repNbr).join(repChar);

      return rep + p1;
    });
  }

  var xya2Jap = function (text){
    //var result = text.replace("sh", "し").replace("ch", "ち");
    return text.replace(/(sh|ch|.)y([aeuio])/gi, function(match, p1, p2){
      var key = p1 + "i";
      if (hepburn.indexOf(key) > -1){
        var result =  hiragana[hepburn.indexOf(key)];
        key = "xy" + p2;
        if (hepburn.indexOf(key) > -1){
          result += hiragana[hepburn.indexOf(key)];
        }
        return result;
      }

      return match;

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

  return JaTrans;

}());
