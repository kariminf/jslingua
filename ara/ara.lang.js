import Lang from "../lang.js"

class AraLang extends Lang {
  static CS = {};
  static TR = {};
  static langCode = "ara";

  /*
  * Write the Arabic number into Arabic letters
  * @override
  */
  static nbr2str(num){
    if (isNaN(num))
    return "";

    if(num < 0)
    return "ناقص " + this.nbr2str(-num);

    if (num == 0)
    return lookup[num];

    if (num == 8)
    return lookup[num] + "ية";

    if (num < 3)
    return lookup[num];

    if (num < 10)
    return lookup[num] + "ة";

    if (num < 100 ){
      let div = ~~(num/10);
      let rem = ~~(num % 10);

      if (div == 1){
        if (rem == 0)
        return lookup[10] + "ة";
        if (rem == 1)
        return "أحد " + lookup[10];
        if (rem == 2)
        return "إثنا " + lookup[10];
        return this.nbr2str(rem) + " " + lookup[10];
      }

      let tenth = lookup[div] + "ون";
      if (div == 2)
      tenth = lookup[10] + "ون";

      if (rem == 0)
      return tenth;

      let suff = " و";

      return this.nbr2str(rem) + suff + tenth;

    }

    for (let i = 1; i < bigNbr.length; i++) {
      let big = bigNbr[i],
      lessBig = bigNbr[i-1];
      if (num < big ){
        let div = ~~(num/lessBig),
        rem = ~~(num % lessBig),
        pron = lookup[lessBig],
        pref = "",
        suff = "";

        if (div < 3){
          if (div == 2)
          pron = lookup2[lessBig];
        } else if (div < 10 ){
          pref = lookup[div];
          if (lessBig != 100)
          pref += "ة ";
          pron = lookupPl[lessBig];
        } else {
          pref = this.nbr2str(div) + " ";
          var rem100 = ~~(div % 100);
          if (rem100 < 11){ // for example 103000
            pron = lookupPl[lessBig];
          }

        }

        if (div == 2){
          pron = lookup2[lessBig];
          pref = "";
        }


        if (rem > 0)
        suff = " و" + this.nbr2str(rem);

        return pref + pron + suff;

      }
    }

    let lessBig = bigNbr[bigNbr.length-1],
    div = ~~(num/lessBig),
    rem = ~~(num % lessBig),
    pron = lookup[lessBig],
    pref = "",
    suff = "";

    if (div < 3){
      if (div == 2)
      pron = lookup2[lessBig];
    } else if (div < 10 ){
      pref = lookup[div];
      if (lessBig != 100)
      pref += "ة ";
      pron = lookupPl[lessBig];
    } else {
      pref = this.nbr2str(div) + " ";
    }

    if (rem > 0)
    suff = " و" + this.nbr2str(rem);

    return pref + pron + suff;
  }
}

//https://en.wikipedia.org/wiki/Arabic_script_in_Unicode
AraLang._nChs("MainArabic", 0x0600, 0x06FF);
AraLang._nChs("ArabicSupplement", 0x0750, 0x077F);
AraLang._nChs("ArabicExtendedA", 0x08A0, 0x08FF);
AraLang._nChs("ArabicPresentationA", 0xFB50, 0xFDFF);
AraLang._nChs("ArabicPresentationB", 0xFE70, 0xFEFF);
AraLang._nChs("IndicNumeral", 0x0660, 0x0669);
AraLang._nChs("ArabicNumeral", 0x0030, 0x0039);

AraLang._nTrans("ind2ara", "Indic to Arabic Numerals", [{offset: -0x0630, setName:"IndicNumeral"}]);
AraLang._nTrans("ara2ind", "Arabic to Indic Numerals", [{offset: 0x0630, setName:"ArabicNumeral"}]);


//==========================================
// CONSTANTS
//==========================================

//https://ar.wikipedia.org/wiki/قائمة_الأعداد
const lookup = {
  0: "صفر", 1:"واحد", 2:"اثنان", 3:"ثلاث", 4:"أربع", 5:"خمس",
  6:"ست", 7:"سبع", 8:"ثمان", 9:"تسع", 10:"عشر",
  100:"مائة", 1000:"ألف", 1000000:"مليون", 1000000000:"مليار"
},
bigNbr = [
  100, 1000, 1000000, 1000000000
  //1000000000, 1000000, 1000, 100, 10
],
lookup2 = {
  100: "مائتان",
  1000: "ألفان",
  1000000: "مليونان",
  1000000000: "ملياران"
  //1000000000, 1000000, 1000, 100, 10
},
lookupPl = {
  100: "مائة",
  1000: "آلاف",
  1000000: "ملايين",
  1000000000: "ملايير"
  //1000000000, 1000000, 1000, 100, 10
};


export default AraLang;
