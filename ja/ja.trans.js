var JaTrans = (function(){
  var hiraganaTrans = {
    "か": "ka",
    "き": "ki",
    "く": "ku",
    "け": "ke",
    "こ": "ko",
    "さ": "sa",
    "し": "shi",
    "す": "su",
    "せ": "se",
    "そ": "so",
    "た": "ta",
    "ち": "chi",
    "つ": "tsu",
    "て": "te",
    "と": "to",
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
    "ん": "n"
  };

  var firstUnTrans = {
    "a": "あ",
    "i": "い",
    "u": "う",
    "e": "え",
    "o": "お",
    "n": "ん"
  };

  var secondUnTrans = {
    "kあ": "か",
    "kい": "き",
    "kう": "く"
    //TODO complete
  };

  function JaTrans() {
    Trans.call(this, hiraganaTrans, firstUnTrans);
  }

  JaTrans.prototype = new Trans(hiraganaTrans, firstUnTrans);

  JaTrans.prototype.untranslaterate = function(text){
    var result = Trans.prototype.untranslaterate(text);
    var secTrans = new Trans(firstUnTrans, secondUnTrans);
    return secTrans.untranslaterate(result);
  }

  return JaTrans;

}());
