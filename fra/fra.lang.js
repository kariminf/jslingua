(function() {

  "use strict";

  let Lang = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Lang = require("../lang.js");
    module.exports = FraLang;
  }
  else {
    Lang = window.JsLingua.Cls.Lang;
    window.JsLingua.addService("Lang", "fra", FraLang);
  }

  /**
  * Contains French charsets and transformations
  *
  * @class FraLang
  * @extends Lang
  */
  function FraLang() {
    Lang.call(this, "fra");

    //
    Lang.addCharSet.call(this, "BasicLatin", 0x0000, 0x007F);
    Lang.addCharSet.call(this, "Latin-1Supplement", 0x00A0, 0x00FF);

    Lang.addTransform.call(this, "minusculeToMajuscule", [
      {offset:-0x0020, begin:0x0061, end:0x007A},
      {offset:-0x0020, begin:0x00E0, end:0x00FF}
    ]);
    Lang.addTransform.call(this, "majusculeToMinuscule", [
      {offset:0x0020, begin:0x0041, end:0x005A},
      {offset:0x0020, begin:0x00C0, end:0x00DF}
    ]);
  }

  FraLang.prototype = Object.create(Lang.prototype);
  let Me = FraLang.prototype;
  Me.constructor = FraLang;

  //https://fr.wikipedia.org/wiki/Liste_de_nombres
  //https://openclassrooms.com/courses/nombres-et-operations-1/prononcer-et-ecrire-les-nombres-en-francais
  const lookup = {
    0: "zéro", 1: "un", 2: "deux", 3:"trois", 4: "quatre",
    5: "cinq", 6: "six", 7: "sept", 8: "huit", 9: "neuf",

    10: "dix", 11: "onze", 12: "douze", 13: "treize",
    14: "quatorze", 15: "quinze", 16: "seize",
    17: "dix-sept", 18: "dix-huit", 19: "dix-neuf",

    20: "vingt", 30: "trente", 40: "quarante", 50: "cinquante",
    60: "soixante", 80: "quatre-vingt", //70 and 90 can be deduced from 60 and 80

    100: "cent",
    1000: "mille",
    1000000: "million",
    1000000000: "billion"
  },
  bigNbr = [
    100, 1000, 1000000, 1000000000
    //1000000000, 1000000, 1000, 100, 10
  ];

  /*
  * Write the Arabic number into French letters
  * @override
  */
  Me.pronounceNumber = toFrenchLetters;


  /**
  * Transform from Arabic numbers to English letters
  *
  * @method toFrenchLetters
  * @private
  * @memberof FraLang
  * @param {Number} nbr the integer number
  * @return {String} French writing of numbers
  */
  function toFrenchLetters(num) {

    if (isNaN(num)) return "";

    if(num < 0) return "moins " + toFrenchLetters(-num);

    if (num === 81) return "quatre-vingt-un";
    if (num === 80) return "quatre-vingts";

    if (num <= 20) return lookup[num];

    if (num < 100 ){

      let div = ~~(num/10) * 10,
      rem = ~~(num % 10);

      let pronounce = "";
      if (div === 70 || div === 90) {
        pronounce = lookup[div - 10];
        rem += 10;
      }
      else pronounce = lookup[div];

      if (rem > 0) {
        if (rem === 1 || rem === 11) res += " et ";
        else pronounce += "-";
        pronounce += lookup[rem];
      }

      return pronounce;

    }


    let bigIdx = bigNbr.length -1;
    while (bigIdx >= 0 && num < bigNbr[bigIdx]) bigIdx--;

    let div = ~~(num/bigNbr[bigIdx]),
    rem = ~~(num % bigNbr[bigIdx]);

    let pronounce = (div === 1)? "": toFrenchLetters(div) + " ";
    pronounce += lookup[bigNbr[bigIdx]];

    //if (div > 1) pronounce += "s"; //plural

    if (rem > 0){
      pronounce += " " + toFrenchLetters(rem);
    }

    return pronounce;

  }

}());
