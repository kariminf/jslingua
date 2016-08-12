(function(window){

  var Lang = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Lang = require("../lang.js");
    module.exports = ArLang;
  } else {
    Lang = window.Lang;
    window.ArLang = ArLang;
  }

  function ArLang() {
    Lang.call(this, "Arabic");

    this.dir = "rtl";

    //https://en.wikipedia.org/wiki/Arabic_script_in_Unicode
    this.addCharSet("MainArabic", 0x0600, 0x06FF);
    this.addCharSet("ArabicSupplement", 0x0750, 0x077F);
    this.addCharSet("ArabicExtendedA", 0x08A0, 0x08FF);
    this.addCharSet("ArabicPresentationA", 0xFB50, 0xFDFF);
    this.addCharSet("ArabicPresentationB", 0xFE70, 0xFEFF);
    this.addCharSet("IndicNumeral", 0x0660, 0x0669);
    this.addCharSet("ArabicNumeral", 0x0030, 0x0039);

    this.addTransform("indicToArabicNumeral", -0x0630, "IndicNumeral");
    this.addTransform("arabicToIndicNumeral", 0x0630, "ArabicNumeral");
  }

  ArLang.prototype = new Lang("Arabic");
  ArLang.prototype.constructor = ArLang;

  //https://ar.wikipedia.org/wiki/قائمة_الأعداد
  var lookup = {
      0: "صفر", 1:"واحد", 2:"اثنان", 3:"ثلاث", 4:"أربع", 5:"خمس",
      6:"ست", 7:"سبع", 8:"ثمان", 9:"تسع", 10:"عشر",
      100:"مائة", 1000:"ألف", 1000000:"مليون", 1000000000:"مليار"
  }

  var bigNbr = [
      100, 1000, 1000000, 1000000000
      //1000000000, 1000000, 1000, 100, 10
  ]

  var lookup2 = {
     100: "مائتان",
     1000: "ألفان",
     1000000: "مليونان",
     1000000000: "ملياران"
      //1000000000, 1000000, 1000, 100, 10
  }

  var lookupPl = {
     100: "مائة",
     1000: "آلاف",
     1000000: "ملايين",
     1000000000: "ملايير"
      //1000000000, 1000000, 1000, 100, 10
  }

 ArLang.prototype.pronounceNumber = toArabicLetters;
  /**
  * Transform from Arabic numbers to Arabic letters
  * @method toArabicLetters
  * @param {Number} nbr the integer number
  * @return {String} Arabic writing of numbers
  */
  function toArabicLetters (num) {

      if (isNaN(num))
          return "";

      if(num < 0)
          return "ناقص " + toArabicLetters(-num);

      if (num == 0)
          return lookup[num];

      if (num == 8)
          return lookup[num] + "ية";

      if (num < 3)
          return lookup[num];

      if (num < 10)
          return lookup[num] + "ة";

      if (num < 100 ){
          var div = ~~(num/10);
          var rem = ~~(num % 10);

          if (div == 1){
              if (rem == 0)
                  return lookup[10] + "ة";
              if (rem == 1)
                  return "أحد " + lookup[10];
              if (rem == 2)
                  return "إثنا " + lookup[10];
              return toArabicLetters(rem) + " " + lookup[10];
          }

          var tenth = lookup[div] + "ون";
          if (div == 2)
              tenth = lookup[10] + "ون";

          if (rem == 0)
                  return tenth;

          var suff = " و";

          return toArabicLetters(rem) + suff + tenth;

      }

      for (var i = 1; i < bigNbr.length; i++) {
          var big = bigNbr[i];
          var lessBig = bigNbr[i-1];
          if (num < big ){
              var div = ~~(num/lessBig);
              var rem = ~~(num % lessBig);

              var pron = lookup[lessBig];
              var pref = "";
              var suff = "";

              if (div < 3){
                  if (div == 2)
                  pron = lookup2[lessBig];
              } else if (div < 10 ){
                  pref = lookup[div];
                  if (lessBig != 100)
                      pref += "ة ";
                  pron = lookupPl[lessBig];
              } else {
                  pref = toArabicLetters(div) + " ";
              }

              if (div == 2){
                  pron = lookup2[lessBig];
                  pref = "";
              }


              if (rem > 0)
                  suff = " و" + toArabicLetters(rem);

          return pref + pron + suff;

          }
      }

      var lessBig = bigNbr[bigNbr.length-1];

      var div = ~~(num/lessBig);
      var rem = ~~(num % lessBig);

      var pron = lookup[lessBig];
      var pref = "";
      var suff = "";

      if (div < 3){
          if (div == 2)
          pron = lookup2[lessBig];
      } else if (div < 10 ){
          pref = lookup[div];
          if (lessBig != 100)
              pref += "ة ";
          pron = lookupPl[lessBig];
      } else {
          pref = toArabicLetters(div) + " ";
      }

      if (rem > 0)
          suff = " و" + toArabicLetters(rem);

      return pref + pron + suff;

  }

}(this));
