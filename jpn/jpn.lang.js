(function(){
  var Lang = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Lang = require("../lang.js");
    module.exports = JpnLang;
  } else {
    Lang = window.JsLingua.Cls.Lang;
    window.JsLingua.addService("Lang", "jpn", JpnLang);
  }

  function JpnLang() {
    Lang.call(this, "jpn");

    Lang.addCharSet.call(this, "Hiragana", 0x3040, 0x309F);
    Lang.addCharSet.call(this, "Katakana", 0x30A0, 0x30FF);
    Lang.addCharSet.call(this, "Kanji", 0x4E00, 0x9FBF);
    Lang.addCharSet.call(this, "Punctuation", 0x3000, 0x303F);

    Lang.addTransform.call(this, "hiraganaToKatakana", 0x0060, "Hiragana");
    Lang.addTransform.call(this, "katakanaToHiragana", -0x0060, "Katakana");
  }

  JpnLang.prototype = Object.create(Lang.prototype);
  JpnLang.prototype.constructor = JpnLang;


  var lookup = {
      0: "零", 1:"一", 2:"二", 3:"三", 4:"四", 5:"五",
      6:"六", 7:"七", 8:"八", 9:"九", 10:"十",
      100:"百", 1000:"千", 10000:"万",
      100000000:"億", 1000000000000:"兆"
  }

  var bigNbr = [
      1000000000000, 100000000,
      10000, 1000, 100, 10
  ]

JpnLang.prototype.pronounceNumber = toJapaneseLetters;
  /**
  * Transform from Arabic numbers to Japanese letters
  * @method toJapaneseLetters
  * @param {Number} num the integer number
  * @return {String} Japanese writing of numbers
  */
  function toJapaneseLetters (num) {

      if (isNaN(num))
          return "";

      var neg = false;
      if(num < 0){
          neg = true;
          num = - num;
      }

      if (num < 10)
          return lookup[num];

      //search for the max index
      var i = 0;
      var max = 1;
      var div;
      for (i = 0; i < bigNbr.length; i++){
          max = bigNbr[i]
          div = ~~(num/max);
          if (div > 0)
              break;
      }
      var rem = ~~(num % max);
      var result = "";
      if (div > 0)
          if (div > 1 || max > 1000)
              result += toJapaneseLetters(div);
      result += lookup[max];
      if(rem > 0)
          result += toJapaneseLetters(rem);

      if(neg)
          result = "マイナス" + result;

      return result;

  }

}());
