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
    "つ",
    "て",
    "と",
    "さ",
    "し",
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
    "じ",
    "ず",
    "ぜ",
    "ぞ",
    "だ",
    "ぢ",
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
    "tsu",
    "te",
    "to",
    "sa",
    "shi",
    "si",
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
    "zi",
    "zu",
    "ze",
    "zo",
    "da",
    "ji",
    "di",
    "zu",
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
    this.addTransPrePostMethods("Hepburn", hepburnPreTrans, shikiPostTrans);
    this.addUntransPrePostMethods("Hepburn", hepburnPreUntrans, loneCharReplace);

    this.newMethod("NihonShiki", hiragana, hepburn);
    this.addTransPrePostMethods("NihonShiki", nihonShikiPreTrans, shikiPostTrans);
    this.addUntransPrePostMethods("NihonShiki", nihonShikiPreUntrans, loneCharReplace);

    this.newMethod("KunreiShiki", hiragana, hepburn);
    this.addTransPrePostMethods("KunreiShiki", kunreiShikiPreTrans, shikiPostTrans);
    this.addUntransPrePostMethods("KunreiShiki", kunreiShikiPreUntrans, loneCharReplace);
    /*
    this.addUnTransPreFunction(unTransPreFunction);
    this.addUnTransPostFunction(loneCharReplace);
    */
  }

  JaTrans.prototype = new Trans("Japanese");

  function shikiPreTrans(text){
    var result = text.replace(/し/gi, "si");
    result = result.replace(/ち/gi, "ti");
    result = result.replace(/つ/gi, "tu");
    result = result.replace(/ふ/gi, "hu");
    result = result.replace(/じ/gi, "zi");
    result = result.replace(/uぉ/gi, "o");
    result = result.replace(/uぁ/gi, "a");
    result = result.replace(/uぃ/gi, "i");
    result = result.replace(/uぇ/gi, "e");
    return result;
  }

  function shikiPreUntrans(text){
    var result = text;
    //result = result.replace(/([tzs])y/gi, "$1iy");
    result = result.replace(/si/gi, "し");
    result = result.replace(/ti/gi, "ち");
    result = result.replace(/tu/gi, "つ");
    result = result.replace(/hu/gi, "ふ");
    result = result.replace(/zi/gi, "じ");

    /*result = result.replace(/uぉ/gi, "o");
    result = result.replace(/uぁ/gi, "a");
    result = result.replace(/uぃ/gi, "i");
    result = result.replace(/uぇ/gi, "e");*/
    return result;
  }


  function hepburnPreTrans(text){
    return text.replace(/([しちじぢ])([ゃぇゅょ])/gi, function(match, p1, p2){
      var result = hepburn[hiragana.indexOf(p1)];
      result = result + hepburn[hiragana.indexOf(p2)];
      return result.replace("ixy", "");
    });
  }

  function hepburnPreUntrans(text){
    var result = doubleReplace(text);
    result = result.replace(/(sh|ch|j)([aeuo])/gi, function(match, p1, p2){
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

    return xya2Jap(result);
  }

  function shikiPostTrans(text){
    var result = text.replace(/ix/gi, "");
    return result;
  }

  /*function hepburnPostTrans(text){
    var result = text.replace(/ixy/gi, "");
    return result;
  }*/

  function nihonShikiPreUntrans(text){
    var result = doubleReplace(text);
    result = shikiPreUntrans(result);
    result = result.replace(/di/gi, "ぢ");
    result = result.replace(/du/gi, "づ");
    return xya2Jap(result);
  }

  function nihonShikiPreTrans(text){
    var result = shikiPreTrans(text);
    result = result.replace(/ぢ/gi, "di");
    result = result.replace(/づ/gi, "du");
    return result;
  }

  function kunreiShikiPreTrans(text){
    var result = shikiPreTrans(text);
    result = result.replace(/ぢ/gi, "zi");
    //result = result.replace(/づ/gi, "zu"); //already on hepburn
    return result;
  }

  function kunreiShikiPreUntrans(text){
    var result = doubleReplace(text);
    result = shikiPreUntrans(result);
    result = result.replace(/zi/gi, "ぢ");
    return xya2Jap(result);
  }


  /**
  * Replace the doubled characters with a little "tsu" if different from "n"
  * @param  {String} text The text to be replaced
  * @return {String} The same string but the repeated characters are replaced
  */
  function doubleReplace(text){
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

  function xya2Jap(text){
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


  /**
  * Replace the lone characters with their equivalent + "u"
  * @param  {[String]} text the text to be replaced
  * @return {[String]}      The resulted text
  */
  function loneCharReplace(text){
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
