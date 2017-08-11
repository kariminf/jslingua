(function () {

  var Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Morpho = require("../morpho.js");
    module.exports = JpnMorpho;
  } else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.addService("Morpho", "jpn", JpnMorpho);
  }

  //Different global features
  var F = Morpho.Feature;
  var Tense = F.Tense;
  var Mood = F.Mood;
  var Voice = F.Voice;
  var GNumber = F.Number;
  var Aspect = F.Aspect;
  var Gender = F.Gender;
  var Person = F.Person;

  var C = Object.freeze;
  var Formality = C({
    Pl: "plain",
    Po: "polite",
    Fo: "formal"
  });

  var VType = C({
    V1: "ichidan",
    V5: "godan",
    SK: "suru-kuru"
  });


  function JpnMorpho() {
    Morpho.call(this, "jpn");
    Morpho.newStemmer.call(this, "jslinguaJpnStemmer", "JsLingua Japanese stemmer", jslinguaJpnStemmer);
  }

  JpnMorpho.prototype = Object.create(Morpho.prototype);
  var Me = JpnMorpho.prototype;

  Me.constructor = JpnMorpho;

  //

  //=================
  //Conjugation zone
  //=================


  Me.getForms = function(){
    return {
      "Present": { // go
        mood: Mood.Indi,
        tense: Tense.Pr,
        aspect: Aspect.P
      },
      "Past": { //went
        mood: Mood.Indi,
        tense: Tense.Pa,
        aspect: Aspect.P
      },
      "Present continuous": { //is going
        mood: Mood.Indi,
        tense: Tense.Pr,
        aspect: Aspect.C
      },
      "Past continuous": {//was going
        mood: Mood.Indi,
        tense: Tense.Pa,
        aspect: Aspect.C
      },
      "Provision": {// Condition //TODO Provision
        mood: Mood.Indi
      },
      "Condition": { //Second type of condition
        mood: Mood.Cond
      },
      "Imperative": {// go
        mood: Mood.Impe
      },
      "Volitional": {//let's go //TODO volutional
        mood: Mood.Indi
      },
      "Causative": {// make go //TODO causative
        mood: Mood.Indi
      },
      "Potential": {// I can go
        mood: Mood.Pote
      }
    };
  }

  Me.getConjugModel = function(){
    //Past and Present are defaults
    return {
      rows: ["Voice", "Formality"],
      cols: ["Negation"]
    };
  }

  function getFormalityOpts(){
    return [
      {formality: Formality.Pl},
      {formality: Formality.Po},
      {formality: Formality.Fo}
    ];
  }

  Me.getOptLists = function(optLabel){
    if (optLabel === "Formality") return getFormalityOpts();
    return Morpho.prototype.getOptLists.call(this, optLabel);
  }

  Me.getOptName = function(optLabel, opts){
    if (optLabel === "Formality"){
      if(opts.formality) return opts.formality;
      return "";
    }
    return Morpho.prototype.getOptName.call(this, optLabel, opts);
  }

  //https://en.wikipedia.org/wiki/Japanese_pronouns
  //TODO pronouns problem in Japanese
  Me.getPronounOpts = function(){
    return [
      {person:Person.F, number: GNumber.S}, // watashi
      {person:Person.F, number: GNumber.P}, //watashi-tachi
      {person:Person.S, number: GNumber.S}, //anata
      {person:Person.S, number: GNumber.P}, //anata-tachi
      {person:Person.T, number: GNumber.S, gender:Gender.M}, //kare
      {person:Person.T, number: GNumber.S, gender:Gender.F}, //kanojo
      {person:Person.T, number: GNumber.P} //karera
    ];
  }


  Me.getPronounName = function(opts){
    switch (opts.person) {
      case Person.F:
      if (opts.number === GNumber.S) return "私";
      else return "私たち";

      case Person.S:
      if (opts.number === GNumber.S) return "あなた";
      else return "あなたたち";

      case Person.T:
      if (opts.number == GNumber.S) {
        switch (opts.gender) {
          case Gender.M: return "彼";
          case Gender.F: return "彼女";
          default: return "彼";
        }
      } else return "彼ら";

    }
    return "";
  }


  var
  uSound = "うるくむぬすつぶぐず",
  iSound = "いりきみにしちびぎじ",
  eSound = "えれけめねせてべげず",//verify the last + れ
  tSound = "っっいんんしっんいじ",//verify ず
  aSound = "わらかまなさたばがじ";//verify ず

  function basicForm(verb, sound, vtype){

    var end = verb.slice(-1);

    if(uSound.indexOf(end) < 0) return "";

    if(sound === uSound) return verb;

    if(vtype === VType.V1){
      if(sound === eSound) return verb.slice(0, -1) + "れ";
      return verb.slice(0, -1);
    }

    return verb.slice(0, -1) + sound.charAt(uSound.indexOf(end));

  }

  function tForm(verb, teta, vtype){

    var end = verb.slice(-1);

    if(uSound.indexOf(end) < 0) return "";

    var res = "て";
    if(uSound.indexOf(end) > 6 ){
      res = "で";
      if(teta) res = "だ";
    }
    else if(teta) res = "た";

    if(vtype === VType.V1) return verb.slice(0, -1) + res;

    res = tSound.charAt(uSound.indexOf(end)) + res;

    return verb.slice(0, -1) + res;

  }

  var ruV5List = {
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

  function verifyType(verb, opts){
    if(opts.vtype) return;//&& (opts.vtype in VType)

    if(/(す|く|来)る$/g.test(verb)){
      opts.vtype = VType.SK;
      return;
    }

    var end = verb.slice(-1);
    var bend = verb.slice(-2,-1);
    if(end === "る"){
      //If not these before-endings, and hiragana, then it is Godan
      if(! "いえしせちてにねびべみめりれ".includes(bend)){
        var utf8 = bend.charCodeAt(0);
        if(0x3040 <= utf8 && utf8 <= 0x309F){//if it is Hiragana
          opts.vtype = VType.V5;
          //console.log(bend);
          return;
        }
      }

      {//If it ends with these; it is Godan
        var v5r = /(甦え|蘇え|嘲け|ちぎ|かえ|横ぎ|阿ね|きい|かぎ|はい|はし|しゃべ|たべ|まえ)る$/g;
        if(v5r.test(verb) || ruV5List[bend]){
          opts.vtype = VType.V5;
          return;
        }
      }

      //Otherwise, it is Ichidan
      opts.vtype = VType.V1;
      return;
    }

    //TODO detect the type
    opts.vtype = VType.V5;

  }

  //https://en.wikipedia.org/wiki/Japanese_verb_conjugation
  //Override conjugate function
  Me.conjugate = function(verb, opts){

    var begin = "";
    var end = "";

    verifyType(verb, opts);

    var vtype =  opts.vtype;

    //console.log(vtype);


    /*if(causative){
      end = "せる";
      if(vtype === VType.V1) end = "さ" + end;
      verb = basicForm(verb, aSound, vtype) + end;
      end = "";
      vtype = VType.V1;
    }*/

    if(opts.voice === Voice.P){
      if(opts.mood !== Mood.Pote){
        end = "れる";
        if(vtype === VType.V1) end = "ら" + end;
        verb = basicForm(verb, aSound, vtype) + end;
        end = "";
        vtype = VType.V1;
      }
    }

    switch (opts.mood) {

      case Mood.Indi:

      if(opts.aspect === Aspect.C){
        begin = tForm(verb, 0, vtype);
        vtype = VType.V1;
        verb = "いる";
      }

      switch (opts.formality) {
        case Formality.Po:
        verb = basicForm(verb, iSound, vtype);
        end = "ます";
        if(opts.tense === Tense.Pa) end = "ました";
        if(opts.negated){
          end = "ません";
          if(opts.tense === Tense.Pa) end += "でした";
        }
        break;

        case Formality.Pl:
        if(opts.tense === Tense.Pa) end = "ました";
        if(opts.negated){
          verb = basicForm(verb, aSound, vtype);
          if(opts.tense === Tense.Pa) end = "なかった";
          else end = "ない";
        } else {
          if(opts.tense === Tense.Pa){
            verb = tForm(verb, 1, vtype);//TA
            end = "";
          }
        }
        break;

        default:
        verb = "";
        begin = "";
        end = "";

      }
      break;//End Indiative Mood

      case Mood.Impe: //Begin Imperative Mood

      switch (opts.formality) {
        case Formality.Po:
        verb = tForm(verb, 0, vtype);
        if(opts.negated) end = "ないで";
        end += "下さい";
        break;

        case Formality.Pl:
        if(opts.negated) end = "な";
        //TODO suru, zuru, ichidan and kuru have different imperative
        else {
          if(vtype === VType.V1) verb = verb.slice(0,-1) + "ろ/よ";
          else verb = basicForm(verb, eSound, vtype);
        }
        break;

        default:
        verb = "";
        begin = "";
        end = "";
      }
      break;//End Imperative Mood

      case Mood.Pote: //Begin Potential Mood
      if(opts.voice === Voice.P) return "";
      verb = basicForm(verb, eSound, vtype) + "る";
      var newOpts = Object.assign({}, opts);
      newOpts.mood = Mood.Indi;
      newOpts.vtype = VType.V1;
      newOpts.voice = Voice.A; //Affirmative because already applicated
      return this.conjugate(verb + end, newOpts);
      break; //End Potential Mood

      default:
      verb = "";
      begin = "";
      end = "";

    }

    var result = begin + verb + end;

    return result;

  }


  function jslinguaJpnStemmer(word){
    var stem = word;
    return stem;
  }



}());
