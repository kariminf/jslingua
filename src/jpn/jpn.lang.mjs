import Lang from "../lang.mjs";

class JpnLang extends Lang {
  static CS = {};
  static TR = {};
  static langCode = "jpn";

  /*
  * Write the Arabic number into Japanese letters
  * @override
  */
  static nbr2str(num){
    if (isNaN(num)) return "";

    let neg = false;
    if (num < 0) {
      neg = true;
      num = - num;
    }

    if (num < 10) return lookup[num];

    //search for the max index
    let i = 0,
    max = 1,
    div;
    for (i = 0; i < bigNbr.length; i++) {
      max = bigNbr[i];
      div = ~~(num/max);
      if (div > 0)
      break;
    }
    let rem = ~~(num % max),
    result = "";
    if (div > 0)
    if (div > 1 || max > 1000)  result += this.nbr2str(div);
    result += lookup[max];
    if (rem > 0) result += this.nbr2str(rem);

    if (neg) result = "マイナス" + result;

    return result;
  }
}

JpnLang._nChs("Hiragana", 0x3040, 0x309F);
JpnLang._nChs("Katakana", 0x30A0, 0x30FF);
JpnLang._nChs("Kanji", 0x4E00, 0x9FBF);
JpnLang._nChs("Punctuation", 0x3000, 0x303F);

JpnLang._nTrans("hira2kata", "Hiragana to Katakana", [{offset:0x0060, setName:"Hiragana"}]);
JpnLang._nTrans("kata2hira", "Katakana to Hiragana", [{offset:-0x0060, setName:"Katakana"}]);


//==========================================
// CONSTANTS
//==========================================

const lookup = {
  0: "零", 1:"一", 2:"二", 3:"三", 4:"四", 5:"五",
  6:"六", 7:"七", 8:"八", 9:"九", 10:"十",
  100:"百", 1000:"千", 10000:"万",
  100000000:"億", 1000000000000:"兆"
},
bigNbr = [
  1000000000000, 100000000,
  10000, 1000, 100, 10
];

export default JpnLang;
