import Morpho from "../morpho.mjs";

class JpnMorpho extends Morpho {
  //These static members must be overriden in extended classes;
  //otherwise, the class won't function properly
  //Contains stemmers
  static stemmers = {};
  //Contains PoS conversions
  static converters = {};
  static cstemmer = "";//current stemmer
  static cconverter = "";//current converter
  static langCode = "jpn";
  static ssplitter = /([?!。])(?:\s+|$)/;

  //==========================================
  // CONJUGATION PROTECTED FUNCTIONS
  //==========================================
  static _conj(verb, _opts){
    return __conj(verb, _opts);
  }

  //==========================================
  // CONJUGATION OPTIONS PUBLIC FUNCTIONS
  //==========================================
  static lform() {
    //Indicative is the default mood
    return {
      "pres": { // go
        desc: "Present",
        tense: Morpho.Tense.Pr
      },
      "past": { //went
        desc: "Past",
        tense: Morpho.Tense.Pa
      },
      "pres_cont": { //is going
        desc: "Present continuous",
        tense: Morpho.Tense.Pr,
        aspect: Morpho.Aspect.C
      },
      "past_cont": {//was going
        desc: "Past continuous",
        tense: Morpho.Tense.Pa,
        aspect: Morpho.Aspect.C
      },
      "prov": {//First type of condition
        desc: "Provision",
        mood: Morpho.Mood.Cnd,
        cond: "ba"
      },
      "cond": { //Second type of condition
        desc: "Condition",
        mood: Morpho.Mood.Cnd,
        cond: "tara"
      },
      "imp": {// go
        desc: "Imperative",
        mood: Morpho.Mood.Imp
      },
      "vol": {//let's go //Optative mood
        desc: "Volitional",
        mood: Morpho.Mood.Opt
      },
      "caus": {// make go
        desc: "Causative",
        cause: 1
      },
      "pot": {// I can go
        desc: "Potential",
        mood: Morpho.Mood.Pot
      },
      "pass": {// I can go
        desc: "Passive",
        voice: Morpho.Voice.P,
        tense: Morpho.Tense.Pr
      },
      "caus_pass": {// I can go
        desc: "Causative Passive",
        voice: Morpho.Voice.P,
        tense: Morpho.Tense.Pr,
        cause: 1
      }
    };
  };

  static lvtype() {
    return Object.values(VType);
  }

  static gconjmod() {
    //Past and Present are defaults
    return {
      rows: ["Formality"],
      cols: ["Negation"]
    };
  }

  static gvtype(verb){
    return __getVerbType(verb);
  }

  static lconjopt(optLabel) {
    if (optLabel === "Formality") return __getFormalityOpts();
    return Morpho.lconjopt(optLabel);
  }

  //==========================================
  // CONJUGATION OPTIONS PROTECTED FUNCTIONS
  //==========================================


  static goptname(optLabel, opts) {
    if (optLabel === "Formality"){
      if(opts.formality) return opts.formality;
      return "";
    }
    return Morpho.goptname(optLabel, opts);
  }

  //https://en.wikipedia.org/wiki/Japanese_pronouns
  //TODO pronouns problem in Japanese
  static _gPpOpts() {
    return [
      {person:Morpho.Person.F, number: Morpho.GNumber.S}, // watashi
      {person:Morpho.Person.F, number: Morpho.GNumber.P}, //watashi-tachi
      {person:Morpho.Person.S, number: Morpho.GNumber.S}, //anata
      {person:Morpho.Person.S, number: Morpho.GNumber.P}, //anata-tachi
      {person:Morpho.Person.T, number: Morpho.GNumber.S, gender:Morpho.Gender.M}, //kare
      {person:Morpho.Person.T, number: Morpho.GNumber.S, gender:Morpho.Gender.F}, //kanojo
      {person:Morpho.Person.T, number: Morpho.GNumber.P} //karera
    ];
  };


  static _gPpName(opts) {
    switch (opts.person) {
      case Morpho.Person.F:
      if (opts.number === Morpho.GNumber.S) return "私";
      else return "私たち";

      case Morpho.Person.S:
      if (opts.number === Morpho.GNumber.S) return "あなた";
      else return "あなたたち";

      case Morpho.Person.T:
      if (opts.number == Morpho.GNumber.S) {
        switch (opts.gender) {
          case Morpho.Gender.M: return "彼";
          case Morpho.Gender.F: return "彼女";
          default: return "彼";
        }
      } else return "彼ら";

    }
    return "";
  };

  //==========================================
  // NORMALIZATION FUNCTIONS
  //==========================================

  /**
   * Normalizes Japanese words
   *
   * @method norm
   * @override
   * @memberof JpnMorpho
   * @param  {String}  word a word to be normalized
   * @param  {Object}  opts For the time being, no options for Japanese
   * @return {String}       normalized ord
   */
  static norm(word, _opts) {
    let m;
    if (notNull(m = /^(.*ね)[えぇ]+$/.exec(word))) return m[1];
    if (notNull(m = /^(.*な)[あぁ]+$/.exec(word))) return m[1];
    if (notNull(m = /^(.*す)げ[えぇ]+$/.exec(word))) return m[1] + "ごい";

    //http://www.fluentu.com/blog/japanese/different-japanese-dialects/
    //Hakata Ben
    if (notNull(m = /^(.*)やない$/.exec(word))) return m[1] + "じゃない";
    if (notNull(m = /^(.*)ばい$/.exec(word))) return m[1] + "よ";

    //Osaka Ben
    if (notNull(m = /^(.*)へん$/.exec(word))) return m[1] + "ない";
    if (notNull(m = /^(.*)さかい$/.exec(word))) return m[1] + "から";

    //Hiroshima Ben
    if (notNull(m = (new RegExp("^(.+)([" + iSound + "])んさんな")).exec(word))){
      return m[1] + aSound[iSound.indexOf(m[2])] + "ないでください";
    }

    if (notNull(m = /^(.*)んさんな$/.exec(word))) return m[1] + "ないでください";

    //Kyoto Ben
    if (notNull(m = /^(.*)[え]+$/.exec(word))) return m[1] + "よ";

    //Nagoya Ben
    if (notNull(m = /^(.*て)ちょう$/.exec(word))) return m[1] + "ください";

    //Sendai Ben
    if (notNull(m = /^(.*[^だ])だ?べ$/.exec(word))) return m[1] + "でしょう";

    //Hokkaido Ben
    if (notNull(m = /^(.*)っしょ$/.exec(word))) return m[1] + "でしょう";
    if (notNull(m = /^(.*)しょや$/.exec(word))) return m[1] + "でしょう";

    return word;
  }

  /**
   * Segment a given text
   */

  /**
   * Tokenize a given text (mostly, a sentence)
   * @param  {String} text the sentence to be tokenized
   * @return {String[]}      a list of words
   */
  static gwords(text) {
    return segmenter.segment(text);
  }

}

//==========================================
// CONSTANTS
//==========================================
/**
 * Type of the Japanese verb
 *
 * @attribute VType
 * @readOnly
 * @private
 * @static
 * @memberof JpnMorpho
 * @enum {String}
 */
const VType = {
  /** ichidan */
  V1: "ichidan",
  /** godan */
  V5: "godan",
  /** suru-kuru */
  SK: "suru-kuru"
};

const
uSound = "うるくすつむぬぶぐず",
iSound = "いりきしちみにびぎじ",
oSound = "おろこそとものぼごじ",
eSound = "えれけせてめねべげず",//verify the last + れ
tSound = "っっいしっんんんいじ",//verify ず
aSound = "わらかさたまなばがじ";//verify ず

const ruV5List = {
  "い": 1, "き": 1, "け": 1, "し": 1, "じ": 1, "ね": 1, "び": 1, "上": 1, "下": 1, "与": 1, "中": 1,
  "乗": 1, "乘": 1, "亘": 1, "亙": 1, "交": 1, "代": 1, "伐": 1, "余": 1, "作": 1, "侍": 1, "依": 1,
  "侮": 1, "便": 1, "係": 1, "倚": 1, "借": 1, "偏": 1, "偽": 1, "傲": 1, "優": 1, "光": 1, "入": 1,
  "写": 1, "冠": 1, "凍": 1, "凝": 1, "凭": 1, "分": 1, "切": 1, "刈": 1, "判": 1, "到": 1, "刳": 1,
  "刷": 1, "剃": 1, "則": 1, "削": 1, "剔": 1, "剥": 1, "剪": 1, "割": 1, "創": 1, "劣": 1, "労": 1,
  "勝": 1, "募": 1, "去": 1, "参": 1, "反": 1, "取": 1, "叱": 1, "司": 1, "吃": 1, "吊": 1, "告": 1,
  "呵": 1, "呷": 1, "呻": 1, "哮": 1, "唆": 1, "唸": 1, "啜": 1, "喋": 1, "嘲": 1, "噛": 1, "囀": 1,
  "囓": 1, "回": 1, "因": 1, "困": 1, "図": 1, "在": 1, "坐": 1, "執": 1, "堪": 1, "塗": 1, "填": 1,
  "売": 1, "変": 1, "太": 1, "奉": 1, "契": 1, "奔": 1, "奢": 1, "妊": 1, "娶": 1, "嬲": 1, "孕": 1,
  "孵": 1, "守": 1, "実": 1, "宿": 1, "寄": 1, "尖": 1, "屠": 1, "嵌": 1, "巡": 1, "帰": 1, "座": 1,
  "廃": 1, "廻": 1, "弄": 1, "弱": 1, "張": 1, "当": 1, "彩": 1, "彫": 1, "徹": 1, "忘": 1, "怒": 1,
  "怖": 1, "怠": 1, "悖": 1, "悟": 1, "慊": 1, "慮": 1, "憚": 1, "憤": 1, "懸": 1, "戍": 1, "成": 1,
  "截": 1, "戯": 1, "戻": 1, "承": 1, "抉": 1, "抓": 1, "折": 1, "抛": 1, "択": 1, "拈": 1, "拗": 1,
  "拘": 1, "拠": 1, "括": 1, "挙": 1, "振": 1, "挵": 1, "捕": 1, "捗": 1, "捥": 1, "捩": 1, "据": 1,
  "捻": 1, "掌": 1, "掏": 1, "掘": 1, "掛": 1, "掠": 1, "採": 1, "探": 1, "換": 1, "握": 1, "揺": 1,
  "搾": 1, "摂": 1, "摩": 1, "摺": 1, "撓": 1, "撚": 1, "撮": 1, "撲": 1, "擂": 1, "操": 1, "擦": 1,
  "擲": 1, "擽": 1, "攣": 1, "放": 1, "敗": 1, "散": 1, "斬": 1, "断": 1, "昂": 1, "昇": 1, "明": 1,
  "映": 1, "曇": 1, "曲": 1, "替": 1, "有": 1, "杓": 1, "来": 1, "染": 1, "梱": 1, "梳": 1, "極": 1,
  "模": 1, "止": 1, "歸": 1, "残": 1, "殴": 1, "殺": 1, "毟": 1, "氷": 1, "決": 1, "沒": 1, "没": 1,
  "治": 1, "泊": 1, "泝": 1, "浸": 1, "渉": 1, "渋": 1, "減": 1, "渡": 1, "測": 1, "湿": 1, "溜": 1,
  "溯": 1, "滑": 1, "滞": 1, "滴": 1, "滾": 1, "漁": 1, "漏": 1, "演": 1, "漬": 1, "漲": 1, "潜": 1,
  "濁": 1, "灯": 1, "炒": 1, "炙": 1, "点": 1, "烟": 1, "焙": 1, "焦": 1, "煉": 1, "煎": 1, "煙": 1,
  "照": 1, "煽": 1, "熬": 1, "燻": 1, "犯": 1, "狩": 1, "猛": 1, "猟": 1, "生": 1, "甦": 1, "由": 1,
  "留": 1, "畝": 1, "異": 1, "疑": 1, "痙": 1, "痼": 1, "登": 1, "盗": 1, "盛": 1, "直": 1, "眠": 1,
  "睡": 1, "瞋": 1, "瞑": 1, "瞠": 1, "瞻": 1, "知": 1, "破": 1, "磨": 1, "祀": 1, "祈": 1, "祟": 1,
  "祭": 1, "祷": 1, "移": 1, "稔": 1, "積": 1, "穫": 1, "穿": 1, "競": 1, "篭": 1, "籠": 1, "粘": 1,
  "糶": 1, "細": 1, "終": 1, "絞": 1, "綴": 1, "練": 1, "縁": 1, "縊": 1, "縋": 1, "縒": 1, "縛": 1,
  "縢": 1, "繁": 1, "織": 1, "繰": 1, "纏": 1, "罵": 1, "罹": 1, "翳": 1, "翻": 1, "耽": 1, "肖": 1,
  "肥": 1, "腐": 1, "至": 1, "興": 1, "舐": 1, "苅": 1, "苦": 1, "茂": 1, "茹": 1, "葬": 1, "蒙": 1,
  "薫": 1, "蘇": 1, "蟠": 1, "蠱": 1, "行": 1, "被": 1, "要": 1, "覆": 1, "覚": 1, "解": 1, "触": 1,
  "計": 1, "訛": 1, "訝": 1, "詐": 1, "詣": 1, "詰": 1, "誇": 1, "語": 1, "誤": 1, "誹": 1, "諮": 1,
  "謀": 1, "謗": 1, "謙": 1, "謝": 1, "謬": 1, "譏": 1, "識": 1, "譲": 1, "護": 1, "象": 1, "貪": 1,
  "貼": 1, "賜": 1, "贈": 1, "走": 1, "起": 1, "趨": 1, "足": 1, "跨": 1, "跳": 1, "踊": 1, "踞": 1,
  "蹲": 1, "蹴": 1, "躄": 1, "躍": 1, "躙": 1, "軋": 1, "載": 1, "辷": 1, "辿": 1, "返": 1, "迫": 1,
  "迸": 1, "送": 1, "透": 1, "通": 1, "造": 1, "逸": 1, "逼": 1, "過": 1, "遜": 1, "遡": 1, "遣": 1,
  "遮": 1, "遷": 1, "選": 1, "遺": 1, "避": 1, "還": 1, "配": 1, "釁": 1, "重": 1, "量": 1, "釣": 1,
  "鈍": 1, "錯": 1, "録": 1, "鐫": 1, "鑽": 1, "関": 1, "阿": 1, "限": 1, "陞": 1, "陥": 1, "陰": 1,
  "障": 1, "隠": 1, "隣": 1, "雕": 1, "霾": 1, "頻": 1, "頼": 1, "飜": 1, "飾": 1, "馘": 1, "香": 1,
  "駆": 1, "騙": 1, "驕": 1, "鳴": 1, "鴨": 1, "黙": 1, "齧": 1
};

const jpnSuff = [
  { //desu must be deleted
    e: /^(.*)で(?:した|す)$/,
    r: "$1"
  },
  { //negation polite
    e: /^(.*)(?:じゃ|では)(?:ない|ありません)$/,
    r: "$1"
  },
  { //continuous
    e: /^(.+[てで])(?:いる?|う)$/, //u came from imasu --> u
    r: "$1"
  },
  { //isound
    e: /^(.*)(.+)(?:ま(?:した|す|せん|しょう)|たい)$/,
    r: function (match, p1, p2){
      let iidx = iSound.indexOf(p2);
      if( iidx > -1) return p1 + uSound[iidx];
      return p1 + p2 ;
    }
  },
  {//asound (verbs), ka (adjectives)
    e: /^(.*)(.+)な(?:い|かった|ければ(?:なる)?)$/,
    r: function (match, p1, p2){
      if(p2 === "く") return p1 + "い";
      let aidx = aSound.indexOf(p2);
      if( aidx > -1) return p1  + uSound[aidx];
      return p1 + p2;
    }
  },
  {
    e: /^(.+)(?:させ|られ)る?$/,
    r: "$1"
  },
  {// t sound, iku
    e: /^(.*[い行])っ[てた]$/,
    r: "$1く"
  },
  {// t sound
    e: /^(.*)([^っいん])([っいん]?[てでただ])$/,
    r: function (match, p1, p2, p3){
      if (/^い[てた]$/.test(p2 + p3)) return p1 + "く";
      if (/^い[でだ]$/.test(p2 + p3)) return p1 + "ぐ";
      if (/^し[てた]$/.test(p2 + p3)) return p1 + "す";

      // problem:
      // う,つ,る ==> って
      // む,ぬ,ぶ ==> んで
      return p1 + p2;
    }
  }
];

const STOP_WORDS = {
  "あそこ": 1, "あっ": 1, "あの": 1, "あのかた": 1, "あの人": 1, "あり": 1,
  "あります": 1, "ある": 1, "あれ": 1, "い": 1, "いう": 1, "います": 1,
  "いる": 1, "う": 1, "うち": 1, "え": 1, "お": 1, "および": 1,
  "おり": 1, "おります": 1, "か": 1, "かつて": 1, "から": 1, "が": 1,
  "き": 1, "ここ": 1, "こちら": 1, "こと": 1, "この": 1, "これ": 1,
  "これら": 1, "さ": 1, "さらに": 1, "し": 1, "しかし": 1, "する": 1,
  "ず": 1, "せ": 1, "せる": 1, "そこ": 1, "そして": 1, "その": 1,
  "その他": 1, "その後": 1, "それ": 1, "それぞれ": 1, "それで": 1, "た": 1,
  "ただし": 1, "たち": 1, "ため": 1, "たり": 1, "だ": 1, "だっ": 1,
  "だれ": 1, "つ": 1, "て": 1, "で": 1, "でき": 1, "できる": 1,
  "です": 1, "では": 1, "でも": 1, "と": 1, "という": 1, "といった": 1,
  "とき": 1, "ところ": 1, "として": 1, "とともに": 1, "とも": 1, "と共に": 1,
  "どこ": 1, "どの": 1, "な": 1, "ない": 1, "なお": 1, "なかっ": 1,
  "ながら": 1, "なく": 1, "なっ": 1, "など": 1, "なに": 1, "なら": 1,
  "なり": 1, "なる": 1, "なん": 1, "に": 1, "において": 1, "における": 1,
  "について": 1, "にて": 1, "によって": 1, "により": 1, "による": 1, "に対して": 1,
  "に対する": 1, "に関する": 1, "の": 1, "ので": 1, "のみ": 1, "は": 1,
  "ば": 1, "へ": 1, "ほか": 1, "ほとんど": 1, "ほど": 1, "ます": 1,
  "また": 1, "または": 1, "まで": 1, "も": 1, "もの": 1, "ものの": 1,
  "や": 1, "よう": 1, "より": 1, "ら": 1, "られ": 1, "られる": 1,
  "れ": 1, "れる": 1, "を": 1, "ん": 1, "何": 1, "及び": 1,
  "彼": 1, "彼女": 1, "我々": 1, "特に": 1, "私": 1, "私達": 1,
  "貴方": 1, "貴方方": 1
};
//==========================================
// STEMMING FUNCTIONS
//==========================================

function __jslinguaJpnStemmer(word) {
  let stem = word,
  stillModif = 1;
  while (stillModif) {
    stillModif = 0;
    for (let i =0; i< jpnSuff.length; i++) {
      let rule = jpnSuff[i];
      if (rule.e.test(stem)) {
        stem = stem.replace(rule.e, rule.r);
        //console.log(rule.e);
        stillModif = 1;
      }
    }
  }

  return stem;
}

//==========================================
// CONJUGATION FUNCTIONS
//==========================================

function __getVerbType(verb){
  if (/(.)(け)る$/g.test(verb)) return VType.V1;
  if (/(出来)る$/g.test(verb)) return VType.V1;
  if (/(す|く|来)る$/g.test(verb)) return VType.SK;
  let end = verb.slice(-1);
  let bend = verb.slice(-2,-1);
  if (end === "る") {
    //If not these before-endings, and hiragana, then it is Godan
    if (! "いえしせちてにねびべみめりれ".includes(bend)) {
      let utf8 = bend.charCodeAt(0);
      if (0x3040 <= utf8 && utf8 <= 0x309F) return VType.V5;
    }

    {//If it ends with these; it is Godan
      let v5r = /(甦え|蘇え|嘲け|ちぎ|かえ|横ぎ|阿ね|きい|かぎ|はい|はし|しゃべ|まえ)る$/g;
      if (v5r.test(verb) || ruV5List[bend]) return VType.V5;
    }

    //Otherwise, it is Ichidan
    return VType.V1;
  }

  return VType.V5;
}
//https://en.wikipedia.org/wiki/Japanese_verb_conjugation
//Override conjugate function
function __conj(verb, opts) {

  if (!opts.mood) opts.mood = Morpho.Mood.Ind;
  let vtype = (opts.vtype)? opts.vtype: __getVerbType(verb);

  //console.log(vtype);
  let end ="";

  if (opts.cause) {
    end = "せる";
    if(vtype === VType.V1 || vtype === VType.SK) end = "さ" + end;
    if(verb.endsWith("する")) verb = verb.slice(0,-2) + end;
    else verb = __basicForm(verb, aSound, vtype) + end;

    vtype = VType.V1;
  }

  if (opts.voice === Morpho.Voice.P) {
    if (opts.mood !== Morpho.Mood.Pot) {
      end = "れる";

      if (vtype === VType.V1 || vtype === VType.SK) end = "ら" + end;

      if (verb.endsWith("する")) verb = verb.slice(0,-2) + "される";
      else verb = __basicForm(verb, aSound, vtype) + end;

      vtype = VType.V1;
    }
  }

  switch (opts.mood) {

    case Morpho.Mood.Ind:
    end = "";
    if (opts.aspect === Morpho.Aspect.C) {
      verb = __tForm(verb, 0, vtype);
      vtype = VType.V1;
      verb += "いる";
    }

    switch (opts.formality) {
      case Morpho.Formality.Po:
      verb = __basicForm(verb, iSound, vtype);
      end = "ます";
      if (opts.tense === Morpho.Tense.Pa) end = "ました";
      if (opts.negated) {
        end = "ません";
        if(opts.tense === Morpho.Tense.Pa) end += "でした";
      }
      return verb + end;
      //break;

      case Morpho.Formality.Pl:
      if (opts.tense === Morpho.Tense.Pa) end = "ました";
      if (opts.negated) {
        verb = __basicForm(verb, aSound, vtype);
        if (opts.tense === Morpho.Tense.Pa) end = "なかった";
        else end = "ない";
      } else {
        if (opts.tense === Morpho.Tense.Pa) {
          verb = __tForm(verb, 1, vtype);//TA
          end = "";
        }
      }
      return verb + end;
      //break;

      default:
      return "";

    }
    //break;//End Indiative Mood

    case Morpho.Mood.Imp: //Begin Imperative Mood
    end = "";
    switch (opts.formality) {
      case Morpho.Formality.Po:
      if (opts.negated) {
        verb = __basicForm(verb, aSound, vtype);
        end = "ないで";
      }
      else {
        verb = __tForm(verb, 0, vtype);
      }
      return verb + end + "下さい";
      //break;

      case Morpho.Formality.Pl:
      if (opts.negated) return verb + "な";
      if (vtype === VType.V1) return verb.slice(0,-1) + "(ろ/よ)";
      if (vtype === VType.SK) {
        if (verb.endsWith("くる")) return verb.slice(0,-2) + "こい";
        if (verb.endsWith("来る")) return verb.slice(0,-1) + "い";
        //suru
        return verb.slice(0,-2) + "(しろ/せよ)";
      }
      return __basicForm(verb, eSound, vtype);
      //break;

      default:
      return "";
    }
    //break;//End Imperative Mood

    case Morpho.Mood.Pot: //Begin Potential Mood
    if (opts.voice === Morpho.Voice.P) return "";
    if (verb.endsWith("する")) verb = verb.slice(0,-2) + "出来る";
    else if (vtype === VType.V1) verb = verb.slice(0, -1) + "られる";
    else verb = __basicForm(verb, eSound, vtype) + "る";
    {//This block is to contain newOpts
      let newOpts = Object.assign({}, opts);
      newOpts.mood = Morpho.Mood.Ind;
      newOpts.vtype = VType.V1;
      return __conj(verb + end, newOpts);
    }
    //break; //End Potential Mood

    case Morpho.Mood.Cnd: //Begin Conditional Mood
    if (opts.voice === Morpho.Voice.P) return "";

    if (opts.cond === "ba") {
      if (opts.formality === Morpho.Formality.Po) return "";
      if (opts.negated) return __basicForm(verb, aSound, vtype) + "なければ";
      return __basicForm(verb, eSound, vtype) + "ば";
    }

    {//This block is to contain newOpts
      let newOpts = Object.assign({}, opts);
      newOpts.mood = Morpho.Mood.Ind;
      newOpts.tense = Morpho.Tense.Pa;
      return  __conj(verb , newOpts) + "ら";
    }
    //break; //End Conditional Mood


    case Morpho.Mood.Opt: //Begin Optative Mood
    if (opts.voice === Morpho.Voice.P) return "";

    if (opts.negated) {
      verb += "のは止め";
      if (opts.formality === Morpho.Formality.Pl) return verb + "よう";
      else return verb + "ましょう";
    }

    if (opts.formality !== Morpho.Formality.Pl) return __basicForm(verb, iSound, vtype) + "ましょう";

    verb = __basicForm(verb, oSound, vtype);
    if (vtype === VType.V1 || vtype === VType.SK) verb += "よ";
    return  verb + "う";

    //break; //End Optative Mood

    default:
    return "";

  }

};

/**
 * Gives the basic form of a verb
 *
 * @method __basicForm
 * @private
 * @static
 * @memberof JpnMorpho
 * @param  {String}  verb  [description]
 * @param  {String}  sound containing the different endings of verbs with a sound.
 * For example; uSound is "うるくすつむぬぶぐず"
 * @param  {String}  vtype The type of the verb
 * @return {String}        the basic form using the ending sound
 */
function __basicForm(verb, sound, vtype) {

  let end = verb.slice(-1);

  if (uSound.indexOf(end) < 0) return "";

  if (sound === uSound) return verb;

  if (vtype === VType.V1) {
    if (sound === eSound) return verb.slice(0, -1) + "れ";
    return verb.slice(0, -1);
  }

  if (vtype === VType.SK) {
    //すれ 来れ くれ
    if (sound === eSound) return verb.slice(0, -1) + "れ";

    if (verb.endsWith("くる")) {
      verb = verb.slice(0,-2);
      if (sound === iSound) return verb + "き";
      return verb + "こ";
    }

    if (verb.endsWith("来る")) return verb.slice(0,-1);

    return verb.slice(0,-2) + "し";
  }

  return verb.slice(0, -1) + sound.charAt(uSound.indexOf(end));

}

function __tForm(verb, teta, vtype) {

  let end = verb.slice(-1);

  if (uSound.indexOf(end) < 0) return "";

  let res = "て";
  if (uSound.indexOf(end) > 4 ) {
    res = "で";
    if (teta) res = "だ";
  }
  else if (teta) res = "た";

  if (vtype === VType.V1) return verb.slice(0, -1) + res;

  if (vtype === VType.SK) {
    if (verb.endsWith("くる")) return verb.slice(0,-2) + "き" + res;
    if (verb.endsWith("する")) return verb.slice(0, -2) + "し" + res;
    return verb.slice(0, -1) + res;
  }

  if (/[行いゆ]く$/g.test(verb)) return verb.slice(0, -1) + "っ" + res;

  res = tSound.charAt(uSound.indexOf(end)) + res;

  return verb.slice(0, -1) + res;

}

function __getFormalityOpts() {
  return [
    {formality: Morpho.Formality.Pl},
    {formality: Morpho.Formality.Po}
  ];
}

//==========================================
// SEGMENTATION FUNCTIONS
//==========================================

// TinySegmenter 0.1 -- Super compact Japanese tokenizer in Javascript
// (c) 2008 Taku Kudo <taku@chasen.org>
// TinySegmenter is freely distributable under the terms of a new BSD licence.
// For details, see http://chasen.org/~taku/software/TinySegmenter/LICENCE.txt

function TinySegmenter() {
  var patterns = {
    "[一二三四五六七八九十百千万億兆]":"M",
    "[一-龠々〆ヵヶ]":"H",
    "[ぁ-ん]":"I",
    "[ァ-ヴーｱ-ﾝﾞｰ]":"K",
    "[a-zA-Zａ-ｚＡ-Ｚ]":"A",
    "[0-9０-９]":"N"
  };
  this.chartype_ = [];
  for (var i in patterns) {
    var regexp = new RegExp;
    regexp.compile(i);
    this.chartype_.push([regexp, patterns[i]]);
  }

  this.BIAS__ = -332;
  this.BC1__ = {"HH":6,"II":2461,"KH":406,"OH":-1378};
  this.BC2__ = {"AA":-3267,"AI":2744,"AN":-878,"HH":-4070,"HM":-1711,"HN":4012,"HO":3761,"IA":1327,"IH":-1184,"II":-1332,"IK":1721,"IO":5492,"KI":3831,"KK":-8741,"MH":-3132,"MK":3334,"OO":-2920};
  this.BC3__ = {"HH":996,"HI":626,"HK":-721,"HN":-1307,"HO":-836,"IH":-301,"KK":2762,"MK":1079,"MM":4034,"OA":-1652,"OH":266};
  this.BP1__ = {"BB":295,"OB":304,"OO":-125,"UB":352};
  this.BP2__ = {"BO":60,"OO":-1762};
  this.BQ1__ = {"BHH":1150,"BHM":1521,"BII":-1158,"BIM":886,"BMH":1208,"BNH":449,"BOH":-91,"BOO":-2597,"OHI":451,"OIH":-296,"OKA":1851,"OKH":-1020,"OKK":904,"OOO":2965};
  this.BQ2__ = {"BHH":118,"BHI":-1159,"BHM":466,"BIH":-919,"BKK":-1720,"BKO":864,"OHH":-1139,"OHM":-181,"OIH":153,"UHI":-1146};
  this.BQ3__ = {"BHH":-792,"BHI":2664,"BII":-299,"BKI":419,"BMH":937,"BMM":8335,"BNN":998,"BOH":775,"OHH":2174,"OHM":439,"OII":280,"OKH":1798,"OKI":-793,"OKO":-2242,"OMH":-2402,"OOO":11699};
  this.BQ4__ = {"BHH":-3895,"BIH":3761,"BII":-4654,"BIK":1348,"BKK":-1806,"BMI":-3385,"BOO":-12396,"OAH":926,"OHH":266,"OHK":-2036,"ONN":-973};
  this.BW1__ = {",と":660,",同":727,"B1あ":1404,"B1同":542,"、と":660,"、同":727,"」と":1682,"あっ":1505,"いう":1743,"いっ":-2055,"いる":672,"うし":-4817,"うん":665,"から":3472,"がら":600,"こう":-790,"こと":2083,"こん":-1262,"さら":-4143,"さん":4573,"した":2641,"して":1104,"すで":-3399,"そこ":1977,"それ":-871,"たち":1122,"ため":601,"った":3463,"つい":-802,"てい":805,"てき":1249,"でき":1127,"です":3445,"では":844,"とい":-4915,"とみ":1922,"どこ":3887,"ない":5713,"なっ":3015,"など":7379,"なん":-1113,"にし":2468,"には":1498,"にも":1671,"に対":-912,"の一":-501,"の中":741,"ませ":2448,"まで":1711,"まま":2600,"まる":-2155,"やむ":-1947,"よっ":-2565,"れた":2369,"れで":-913,"をし":1860,"を見":731,"亡く":-1886,"京都":2558,"取り":-2784,"大き":-2604,"大阪":1497,"平方":-2314,"引き":-1336,"日本":-195,"本当":-2423,"毎日":-2113,"目指":-724,"Ｂ１あ":1404,"Ｂ１同":542,"｣と":1682};
  this.BW2__ = {"..":-11822,"11":-669,"――":-5730,"−−":-13175,"いう":-1609,"うか":2490,"かし":-1350,"かも":-602,"から":-7194,"かれ":4612,"がい":853,"がら":-3198,"きた":1941,"くな":-1597,"こと":-8392,"この":-4193,"させ":4533,"され":13168,"さん":-3977,"しい":-1819,"しか":-545,"した":5078,"して":972,"しな":939,"その":-3744,"たい":-1253,"たた":-662,"ただ":-3857,"たち":-786,"たと":1224,"たは":-939,"った":4589,"って":1647,"っと":-2094,"てい":6144,"てき":3640,"てく":2551,"ては":-3110,"ても":-3065,"でい":2666,"でき":-1528,"でし":-3828,"です":-4761,"でも":-4203,"とい":1890,"とこ":-1746,"とと":-2279,"との":720,"とみ":5168,"とも":-3941,"ない":-2488,"なが":-1313,"など":-6509,"なの":2614,"なん":3099,"にお":-1615,"にし":2748,"にな":2454,"によ":-7236,"に対":-14943,"に従":-4688,"に関":-11388,"のか":2093,"ので":-7059,"のに":-6041,"のの":-6125,"はい":1073,"はが":-1033,"はず":-2532,"ばれ":1813,"まし":-1316,"まで":-6621,"まれ":5409,"めて":-3153,"もい":2230,"もの":-10713,"らか":-944,"らし":-1611,"らに":-1897,"りし":651,"りま":1620,"れた":4270,"れて":849,"れば":4114,"ろう":6067,"われ":7901,"を通":-11877,"んだ":728,"んな":-4115,"一人":602,"一方":-1375,"一日":970,"一部":-1051,"上が":-4479,"会社":-1116,"出て":2163,"分の":-7758,"同党":970,"同日":-913,"大阪":-2471,"委員":-1250,"少な":-1050,"年度":-8669,"年間":-1626,"府県":-2363,"手権":-1982,"新聞":-4066,"日新":-722,"日本":-7068,"日米":3372,"曜日":-601,"朝鮮":-2355,"本人":-2697,"東京":-1543,"然と":-1384,"社会":-1276,"立て":-990,"第に":-1612,"米国":-4268,"１１":-669};
  this.BW3__ = {"あた":-2194,"あり":719,"ある":3846,"い.":-1185,"い。":-1185,"いい":5308,"いえ":2079,"いく":3029,"いた":2056,"いっ":1883,"いる":5600,"いわ":1527,"うち":1117,"うと":4798,"えと":1454,"か.":2857,"か。":2857,"かけ":-743,"かっ":-4098,"かに":-669,"から":6520,"かり":-2670,"が,":1816,"が、":1816,"がき":-4855,"がけ":-1127,"がっ":-913,"がら":-4977,"がり":-2064,"きた":1645,"けど":1374,"こと":7397,"この":1542,"ころ":-2757,"さい":-714,"さを":976,"し,":1557,"し、":1557,"しい":-3714,"した":3562,"して":1449,"しな":2608,"しま":1200,"す.":-1310,"す。":-1310,"する":6521,"ず,":3426,"ず、":3426,"ずに":841,"そう":428,"た.":8875,"た。":8875,"たい":-594,"たの":812,"たり":-1183,"たる":-853,"だ.":4098,"だ。":4098,"だっ":1004,"った":-4748,"って":300,"てい":6240,"てお":855,"ても":302,"です":1437,"でに":-1482,"では":2295,"とう":-1387,"とし":2266,"との":541,"とも":-3543,"どう":4664,"ない":1796,"なく":-903,"など":2135,"に,":-1021,"に、":-1021,"にし":1771,"にな":1906,"には":2644,"の,":-724,"の、":-724,"の子":-1000,"は,":1337,"は、":1337,"べき":2181,"まし":1113,"ます":6943,"まっ":-1549,"まで":6154,"まれ":-793,"らし":1479,"られ":6820,"るる":3818,"れ,":854,"れ、":854,"れた":1850,"れて":1375,"れば":-3246,"れる":1091,"われ":-605,"んだ":606,"んで":798,"カ月":990,"会議":860,"入り":1232,"大会":2217,"始め":1681,"市":965,"新聞":-5055,"日,":974,"日、":974,"社会":2024,"ｶ月":990};
  this.TC1__ = {"AAA":1093,"HHH":1029,"HHM":580,"HII":998,"HOH":-390,"HOM":-331,"IHI":1169,"IOH":-142,"IOI":-1015,"IOM":467,"MMH":187,"OOI":-1832};
  this.TC2__ = {"HHO":2088,"HII":-1023,"HMM":-1154,"IHI":-1965,"KKH":703,"OII":-2649};
  this.TC3__ = {"AAA":-294,"HHH":346,"HHI":-341,"HII":-1088,"HIK":731,"HOH":-1486,"IHH":128,"IHI":-3041,"IHO":-1935,"IIH":-825,"IIM":-1035,"IOI":-542,"KHH":-1216,"KKA":491,"KKH":-1217,"KOK":-1009,"MHH":-2694,"MHM":-457,"MHO":123,"MMH":-471,"NNH":-1689,"NNO":662,"OHO":-3393};
  this.TC4__ = {"HHH":-203,"HHI":1344,"HHK":365,"HHM":-122,"HHN":182,"HHO":669,"HIH":804,"HII":679,"HOH":446,"IHH":695,"IHO":-2324,"IIH":321,"III":1497,"IIO":656,"IOO":54,"KAK":4845,"KKA":3386,"KKK":3065,"MHH":-405,"MHI":201,"MMH":-241,"MMM":661,"MOM":841};
  this.TQ1__ = {"BHHH":-227,"BHHI":316,"BHIH":-132,"BIHH":60,"BIII":1595,"BNHH":-744,"BOHH":225,"BOOO":-908,"OAKK":482,"OHHH":281,"OHIH":249,"OIHI":200,"OIIH":-68};
  this.TQ2__ = {"BIHH":-1401,"BIII":-1033,"BKAK":-543,"BOOO":-5591};
  this.TQ3__ = {"BHHH":478,"BHHM":-1073,"BHIH":222,"BHII":-504,"BIIH":-116,"BIII":-105,"BMHI":-863,"BMHM":-464,"BOMH":620,"OHHH":346,"OHHI":1729,"OHII":997,"OHMH":481,"OIHH":623,"OIIH":1344,"OKAK":2792,"OKHH":587,"OKKA":679,"OOHH":110,"OOII":-685};
  this.TQ4__ = {"BHHH":-721,"BHHM":-3604,"BHII":-966,"BIIH":-607,"BIII":-2181,"OAAA":-2763,"OAKK":180,"OHHH":-294,"OHHI":2446,"OHHO":480,"OHIH":-1573,"OIHH":1935,"OIHI":-493,"OIIH":626,"OIII":-4007,"OKAK":-8156};
  this.TW1__ = {"につい":-4681,"東京都":2026};
  this.TW2__ = {"ある程":-2049,"いった":-1256,"ころが":-2434,"しょう":3873,"その後":-4430,"だって":-1049,"ていた":1833,"として":-4657,"ともに":-4517,"もので":1882,"一気に":-792,"初めて":-1512,"同時に":-8097,"大きな":-1255,"対して":-2721,"社会党":-3216};
  this.TW3__ = {"いただ":-1734,"してい":1314,"として":-4314,"につい":-5483,"にとっ":-5989,"に当た":-6247,"ので,":-727,"ので、":-727,"のもの":-600,"れから":-3752,"十二月":-2287};
  this.TW4__ = {"いう.":8576,"いう。":8576,"からな":-2348,"してい":2958,"たが,":1516,"たが、":1516,"ている":1538,"という":1349,"ました":5543,"ません":1097,"ようと":-4258,"よると":5865};
  this.UC1__ = {"A":484,"K":93,"M":645,"O":-505};
  this.UC2__ = {"A":819,"H":1059,"I":409,"M":3987,"N":5775,"O":646};
  this.UC3__ = {"A":-1370,"I":2311};
  this.UC4__ = {"A":-2643,"H":1809,"I":-1032,"K":-3450,"M":3565,"N":3876,"O":6646};
  this.UC5__ = {"H":313,"I":-1238,"K":-799,"M":539,"O":-831};
  this.UC6__ = {"H":-506,"I":-253,"K":87,"M":247,"O":-387};
  this.UP1__ = {"O":-214};
  this.UP2__ = {"B":69,"O":935};
  this.UP3__ = {"B":189};
  this.UQ1__ = {"BH":21,"BI":-12,"BK":-99,"BN":142,"BO":-56,"OH":-95,"OI":477,"OK":410,"OO":-2422};
  this.UQ2__ = {"BH":216,"BI":113,"OK":1759};
  this.UQ3__ = {"BA":-479,"BH":42,"BI":1913,"BK":-7198,"BM":3160,"BN":6427,"BO":14761,"OI":-827,"ON":-3212};
  this.UW1__ = {",":156,"、":156,"「":-463,"あ":-941,"う":-127,"が":-553,"き":121,"こ":505,"で":-201,"と":-547,"ど":-123,"に":-789,"の":-185,"は":-847,"も":-466,"や":-470,"よ":182,"ら":-292,"り":208,"れ":169,"を":-446,"ん":-137,"・":-135,"主":-402,"京":-268,"区":-912,"午":871,"国":-460,"大":561,"委":729,"市":-411,"日":-141,"理":361,"生":-408,"県":-386,"都":-718,"｢":-463,"･":-135};
  this.UW2__ = {",":-829,"、":-829,"〇":892,"「":-645,"」":3145,"あ":-538,"い":505,"う":134,"お":-502,"か":1454,"が":-856,"く":-412,"こ":1141,"さ":878,"ざ":540,"し":1529,"す":-675,"せ":300,"そ":-1011,"た":188,"だ":1837,"つ":-949,"て":-291,"で":-268,"と":-981,"ど":1273,"な":1063,"に":-1764,"の":130,"は":-409,"ひ":-1273,"べ":1261,"ま":600,"も":-1263,"や":-402,"よ":1639,"り":-579,"る":-694,"れ":571,"を":-2516,"ん":2095,"ア":-587,"カ":306,"キ":568,"ッ":831,"三":-758,"不":-2150,"世":-302,"中":-968,"主":-861,"事":492,"人":-123,"会":978,"保":362,"入":548,"初":-3025,"副":-1566,"北":-3414,"区":-422,"大":-1769,"天":-865,"太":-483,"子":-1519,"学":760,"実":1023,"小":-2009,"市":-813,"年":-1060,"強":1067,"手":-1519,"揺":-1033,"政":1522,"文":-1355,"新":-1682,"日":-1815,"明":-1462,"最":-630,"朝":-1843,"本":-1650,"東":-931,"果":-665,"次":-2378,"民":-180,"気":-1740,"理":752,"発":529,"目":-1584,"相":-242,"県":-1165,"立":-763,"第":810,"米":509,"自":-1353,"行":838,"西":-744,"見":-3874,"調":1010,"議":1198,"込":3041,"開":1758,"間":-1257,"｢":-645,"｣":3145,"ｯ":831,"ｱ":-587,"ｶ":306,"ｷ":568};
  this.UW3__ = {",":4889,"1":-800,"−":-1723,"、":4889,"々":-2311,"〇":5827,"」":2670,"〓":-3573,"あ":-2696,"い":1006,"う":2342,"え":1983,"お":-4864,"か":-1163,"が":3271,"く":1004,"け":388,"げ":401,"こ":-3552,"ご":-3116,"さ":-1058,"し":-395,"す":584,"せ":3685,"そ":-5228,"た":842,"ち":-521,"っ":-1444,"つ":-1081,"て":6167,"で":2318,"と":1691,"ど":-899,"な":-2788,"に":2745,"の":4056,"は":4555,"ひ":-2171,"ふ":-1798,"へ":1199,"ほ":-5516,"ま":-4384,"み":-120,"め":1205,"も":2323,"や":-788,"よ":-202,"ら":727,"り":649,"る":5905,"れ":2773,"わ":-1207,"を":6620,"ん":-518,"ア":551,"グ":1319,"ス":874,"ッ":-1350,"ト":521,"ム":1109,"ル":1591,"ロ":2201,"ン":278,"・":-3794,"一":-1619,"下":-1759,"世":-2087,"両":3815,"中":653,"主":-758,"予":-1193,"二":974,"人":2742,"今":792,"他":1889,"以":-1368,"低":811,"何":4265,"作":-361,"保":-2439,"元":4858,"党":3593,"全":1574,"公":-3030,"六":755,"共":-1880,"円":5807,"再":3095,"分":457,"初":2475,"別":1129,"前":2286,"副":4437,"力":365,"動":-949,"務":-1872,"化":1327,"北":-1038,"区":4646,"千":-2309,"午":-783,"協":-1006,"口":483,"右":1233,"各":3588,"合":-241,"同":3906,"和":-837,"員":4513,"国":642,"型":1389,"場":1219,"外":-241,"妻":2016,"学":-1356,"安":-423,"実":-1008,"家":1078,"小":-513,"少":-3102,"州":1155,"市":3197,"平":-1804,"年":2416,"広":-1030,"府":1605,"度":1452,"建":-2352,"当":-3885,"得":1905,"思":-1291,"性":1822,"戸":-488,"指":-3973,"政":-2013,"教":-1479,"数":3222,"文":-1489,"新":1764,"日":2099,"旧":5792,"昨":-661,"時":-1248,"曜":-951,"最":-937,"月":4125,"期":360,"李":3094,"村":364,"東":-805,"核":5156,"森":2438,"業":484,"氏":2613,"民":-1694,"決":-1073,"法":1868,"海":-495,"無":979,"物":461,"特":-3850,"生":-273,"用":914,"町":1215,"的":7313,"直":-1835,"省":792,"県":6293,"知":-1528,"私":4231,"税":401,"立":-960,"第":1201,"米":7767,"系":3066,"約":3663,"級":1384,"統":-4229,"総":1163,"線":1255,"者":6457,"能":725,"自":-2869,"英":785,"見":1044,"調":-562,"財":-733,"費":1777,"車":1835,"軍":1375,"込":-1504,"通":-1136,"選":-681,"郎":1026,"郡":4404,"部":1200,"金":2163,"長":421,"開":-1432,"間":1302,"関":-1282,"雨":2009,"電":-1045,"非":2066,"駅":1620,"１":-800,"｣":2670,"･":-3794,"ｯ":-1350,"ｱ":551,"ｸﾞ":1319,"ｽ":874,"ﾄ":521,"ﾑ":1109,"ﾙ":1591,"ﾛ":2201,"ﾝ":278};
  this.UW4__ = {",":3930,".":3508,"―":-4841,"、":3930,"。":3508,"〇":4999,"「":1895,"」":3798,"〓":-5156,"あ":4752,"い":-3435,"う":-640,"え":-2514,"お":2405,"か":530,"が":6006,"き":-4482,"ぎ":-3821,"く":-3788,"け":-4376,"げ":-4734,"こ":2255,"ご":1979,"さ":2864,"し":-843,"じ":-2506,"す":-731,"ず":1251,"せ":181,"そ":4091,"た":5034,"だ":5408,"ち":-3654,"っ":-5882,"つ":-1659,"て":3994,"で":7410,"と":4547,"な":5433,"に":6499,"ぬ":1853,"ね":1413,"の":7396,"は":8578,"ば":1940,"ひ":4249,"び":-4134,"ふ":1345,"へ":6665,"べ":-744,"ほ":1464,"ま":1051,"み":-2082,"む":-882,"め":-5046,"も":4169,"ゃ":-2666,"や":2795,"ょ":-1544,"よ":3351,"ら":-2922,"り":-9726,"る":-14896,"れ":-2613,"ろ":-4570,"わ":-1783,"を":13150,"ん":-2352,"カ":2145,"コ":1789,"セ":1287,"ッ":-724,"ト":-403,"メ":-1635,"ラ":-881,"リ":-541,"ル":-856,"ン":-3637,"・":-4371,"ー":-11870,"一":-2069,"中":2210,"予":782,"事":-190,"井":-1768,"人":1036,"以":544,"会":950,"体":-1286,"作":530,"側":4292,"先":601,"党":-2006,"共":-1212,"内":584,"円":788,"初":1347,"前":1623,"副":3879,"力":-302,"動":-740,"務":-2715,"化":776,"区":4517,"協":1013,"参":1555,"合":-1834,"和":-681,"員":-910,"器":-851,"回":1500,"国":-619,"園":-1200,"地":866,"場":-1410,"塁":-2094,"士":-1413,"多":1067,"大":571,"子":-4802,"学":-1397,"定":-1057,"寺":-809,"小":1910,"屋":-1328,"山":-1500,"島":-2056,"川":-2667,"市":2771,"年":374,"庁":-4556,"後":456,"性":553,"感":916,"所":-1566,"支":856,"改":787,"政":2182,"教":704,"文":522,"方":-856,"日":1798,"時":1829,"最":845,"月":-9066,"木":-485,"来":-442,"校":-360,"業":-1043,"氏":5388,"民":-2716,"気":-910,"沢":-939,"済":-543,"物":-735,"率":672,"球":-1267,"生":-1286,"産":-1101,"田":-2900,"町":1826,"的":2586,"目":922,"省":-3485,"県":2997,"空":-867,"立":-2112,"第":788,"米":2937,"系":786,"約":2171,"経":1146,"統":-1169,"総":940,"線":-994,"署":749,"者":2145,"能":-730,"般":-852,"行":-792,"規":792,"警":-1184,"議":-244,"谷":-1000,"賞":730,"車":-1481,"軍":1158,"輪":-1433,"込":-3370,"近":929,"道":-1291,"選":2596,"郎":-4866,"都":1192,"野":-1100,"銀":-2213,"長":357,"間":-2344,"院":-2297,"際":-2604,"電":-878,"領":-1659,"題":-792,"館":-1984,"首":1749,"高":2120,"｢":1895,"｣":3798,"･":-4371,"ｯ":-724,"ｰ":-11870,"ｶ":2145,"ｺ":1789,"ｾ":1287,"ﾄ":-403,"ﾒ":-1635,"ﾗ":-881,"ﾘ":-541,"ﾙ":-856,"ﾝ":-3637};
  this.UW5__ = {",":465,".":-299,"1":-514,"E2":-32768,"]":-2762,"、":465,"。":-299,"「":363,"あ":1655,"い":331,"う":-503,"え":1199,"お":527,"か":647,"が":-421,"き":1624,"ぎ":1971,"く":312,"げ":-983,"さ":-1537,"し":-1371,"す":-852,"だ":-1186,"ち":1093,"っ":52,"つ":921,"て":-18,"で":-850,"と":-127,"ど":1682,"な":-787,"に":-1224,"の":-635,"は":-578,"べ":1001,"み":502,"め":865,"ゃ":3350,"ょ":854,"り":-208,"る":429,"れ":504,"わ":419,"を":-1264,"ん":327,"イ":241,"ル":451,"ン":-343,"中":-871,"京":722,"会":-1153,"党":-654,"務":3519,"区":-901,"告":848,"員":2104,"大":-1296,"学":-548,"定":1785,"嵐":-1304,"市":-2991,"席":921,"年":1763,"思":872,"所":-814,"挙":1618,"新":-1682,"日":218,"月":-4353,"査":932,"格":1356,"機":-1508,"氏":-1347,"田":240,"町":-3912,"的":-3149,"相":1319,"省":-1052,"県":-4003,"研":-997,"社":-278,"空":-813,"統":1955,"者":-2233,"表":663,"語":-1073,"議":1219,"選":-1018,"郎":-368,"長":786,"間":1191,"題":2368,"館":-689,"１":-514,"Ｅ２":-32768,"｢":363,"ｲ":241,"ﾙ":451,"ﾝ":-343};
  this.UW6__ = {",":227,".":808,"1":-270,"E1":306,"、":227,"。":808,"あ":-307,"う":189,"か":241,"が":-73,"く":-121,"こ":-200,"じ":1782,"す":383,"た":-428,"っ":573,"て":-1014,"で":101,"と":-105,"な":-253,"に":-149,"の":-417,"は":-236,"も":-206,"り":187,"る":-135,"を":195,"ル":-673,"ン":-496,"一":-277,"中":201,"件":-800,"会":624,"前":302,"区":1792,"員":-1212,"委":798,"学":-960,"市":887,"広":-695,"後":535,"業":-697,"相":753,"社":-507,"福":974,"空":-822,"者":1811,"連":463,"郎":1082,"１":-270,"Ｅ１":306,"ﾙ":-673,"ﾝ":-496};

  return this;
}

TinySegmenter.prototype.ctype_ = function(str) {
  for (var i in this.chartype_) {
    if (str.match(this.chartype_[i][0])) {
      return this.chartype_[i][1];
    }
  }
  return "O";
};

TinySegmenter.prototype.ts_ = function(v) {
  if (v) { return v; }
  return 0;
};

TinySegmenter.prototype.segment = function(input) {
  if (input == null || input == undefined || input == "") {
    return [];
  }
  var result = [];
  var seg = ["B3","B2","B1"];
  var ctype = ["O","O","O"];
  var o = input.split("");
  for (i = 0; i < o.length; ++i) {
    seg.push(o[i]);
    ctype.push(this.ctype_(o[i]));
  }
  seg.push("E1");
  seg.push("E2");
  seg.push("E3");
  ctype.push("O");
  ctype.push("O");
  ctype.push("O");
  var word = seg[3];
  var p1 = "U";
  var p2 = "U";
  var p3 = "U";
  for (var i = 4; i < seg.length - 3; ++i) {
    var score = this.BIAS__;
    var w1 = seg[i-3];
    var w2 = seg[i-2];
    var w3 = seg[i-1];
    var w4 = seg[i];
    var w5 = seg[i+1];
    var w6 = seg[i+2];
    var c1 = ctype[i-3];
    var c2 = ctype[i-2];
    var c3 = ctype[i-1];
    var c4 = ctype[i];
    var c5 = ctype[i+1];
    var c6 = ctype[i+2];
    score += this.ts_(this.UP1__[p1]);
    score += this.ts_(this.UP2__[p2]);
    score += this.ts_(this.UP3__[p3]);
    score += this.ts_(this.BP1__[p1 + p2]);
    score += this.ts_(this.BP2__[p2 + p3]);
    score += this.ts_(this.UW1__[w1]);
    score += this.ts_(this.UW2__[w2]);
    score += this.ts_(this.UW3__[w3]);
    score += this.ts_(this.UW4__[w4]);
    score += this.ts_(this.UW5__[w5]);
    score += this.ts_(this.UW6__[w6]);
    score += this.ts_(this.BW1__[w2 + w3]);
    score += this.ts_(this.BW2__[w3 + w4]);
    score += this.ts_(this.BW3__[w4 + w5]);
    score += this.ts_(this.TW1__[w1 + w2 + w3]);
    score += this.ts_(this.TW2__[w2 + w3 + w4]);
    score += this.ts_(this.TW3__[w3 + w4 + w5]);
    score += this.ts_(this.TW4__[w4 + w5 + w6]);
    score += this.ts_(this.UC1__[c1]);
    score += this.ts_(this.UC2__[c2]);
    score += this.ts_(this.UC3__[c3]);
    score += this.ts_(this.UC4__[c4]);
    score += this.ts_(this.UC5__[c5]);
    score += this.ts_(this.UC6__[c6]);
    score += this.ts_(this.BC1__[c2 + c3]);
    score += this.ts_(this.BC2__[c3 + c4]);
    score += this.ts_(this.BC3__[c4 + c5]);
    score += this.ts_(this.TC1__[c1 + c2 + c3]);
    score += this.ts_(this.TC2__[c2 + c3 + c4]);
    score += this.ts_(this.TC3__[c3 + c4 + c5]);
    score += this.ts_(this.TC4__[c4 + c5 + c6]);
//  score += this.ts_(this.TC5__[c4 + c5 + c6]);
    score += this.ts_(this.UQ1__[p1 + c1]);
    score += this.ts_(this.UQ2__[p2 + c2]);
    score += this.ts_(this.UQ3__[p3 + c3]);
    score += this.ts_(this.BQ1__[p2 + c2 + c3]);
    score += this.ts_(this.BQ2__[p2 + c3 + c4]);
    score += this.ts_(this.BQ3__[p3 + c2 + c3]);
    score += this.ts_(this.BQ4__[p3 + c3 + c4]);
    score += this.ts_(this.TQ1__[p2 + c1 + c2 + c3]);
    score += this.ts_(this.TQ2__[p2 + c2 + c3 + c4]);
    score += this.ts_(this.TQ3__[p3 + c1 + c2 + c3]);
    score += this.ts_(this.TQ4__[p3 + c2 + c3 + c4]);
    var p = "O";
    if (score > 0) {
      result.push(word);
      word = "";
      p = "B";
    }
    p1 = p2;
    p2 = p3;
    p3 = p;
    word += seg[i];
  }
  result.push(word);

  return result;
};

let segmenter = new TinySegmenter();



//==========================================
// HELPER FUNCTIONS
//==========================================

function notNull(obj) {
  return (obj != null);
}



JpnMorpho._nStem("jslingua", "JsLingua Japanese stemmer", __jslinguaJpnStemmer);

JpnMorpho.stop_words = STOP_WORDS;

export default JpnMorpho;
