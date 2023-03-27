let JpnMorpho;
let expect = require('expect.js');

let
$ = Object.assign,//shorten the function
//tenses
tpr = {tense:"present"},
tpa = {tense:"past"},
//aspects
c = {aspect: "continuous"},
//moods
cnd = {mood: "conditional"},
imp = {mood: "imperative"},
opt = {mood: "optative"},
pot = {mood: "potential"},
//formality
pl = {formality: "plain"},
po = {formality: "polite"},
//voice
pas = {voice: "passive"},
//negation
n = {negated: 1},
//verb type
v1 = "ichidan",
v5 = "godan",
sk = "suru-kuru";

describe("Japanese Morphology", function(){
  before(async () => {
    let module = await import("../../src/jpn/jpn.morpho.mjs");
    JpnMorpho = module.default;
  });

  describe("Japanese Verb conjugation", function(){

    it("Verb type detection", function() {
      //suru kuru
      expect(JpnMorpho.gvtype("勉強する")).to.eql(sk);
      expect(JpnMorpho.gvtype("する")).to.eql(sk);
      expect(JpnMorpho.gvtype("くる")).to.eql(sk);
      expect(JpnMorpho.gvtype("来る")).to.eql(sk);
      //ichidan
      expect(JpnMorpho.gvtype("出来る")).to.eql(v1);
      expect(JpnMorpho.gvtype("食べる")).to.eql(v1);
      expect(JpnMorpho.gvtype("寝る")).to.eql(v1);
      //godan //うくむぬすつぶぐ
      expect(JpnMorpho.gvtype("払う")).to.eql(v5);
      expect(JpnMorpho.gvtype("行く")).to.eql(v5);
      expect(JpnMorpho.gvtype("飲む")).to.eql(v5);
      expect(JpnMorpho.gvtype("死ぬ")).to.eql(v5);
      expect(JpnMorpho.gvtype("示す")).to.eql(v5);
      expect(JpnMorpho.gvtype("立つ")).to.eql(v5);
      expect(JpnMorpho.gvtype("遊ぶ")).to.eql(v5);
      expect(JpnMorpho.gvtype("泳ぐ")).to.eql(v5);

      //godan with ru ending
      expect(JpnMorpho.gvtype("お座なりになる")).to.eql(v5);
      expect(JpnMorpho.gvtype("くねる")).to.eql(v5);
      expect(JpnMorpho.gvtype("阿る")).to.eql(v5);


    });

    it("A-form: present plain negative", function() {
      expect(JpnMorpho.conj("勉強する",$({}, tpr, pl, n))).to.eql("勉強しない");
      expect(JpnMorpho.conj("する",$({}, tpr, pl, n))).to.eql("しない");
      expect(JpnMorpho.conj("くる",$({}, tpr, pl, n))).to.eql("こない");
      expect(JpnMorpho.conj("来る",$({}, tpr, pl, n))).to.eql("来ない");
      //ichidan
      expect(JpnMorpho.conj("出来る",$({}, tpr, pl, n))).to.eql("出来ない");
      expect(JpnMorpho.conj("食べる",$({}, tpr, pl, n))).to.eql("食べない");
      expect(JpnMorpho.conj("寝る",$({}, tpr, pl, n))).to.eql("寝ない");
      //godan //うくむぬすつぶぐ
      expect(JpnMorpho.conj("払う",$({}, tpr, pl, n))).to.eql("払わない");
      expect(JpnMorpho.conj("行く",$({}, tpr, pl, n))).to.eql("行かない");
      expect(JpnMorpho.conj("飲む",$({}, tpr, pl, n))).to.eql("飲まない");
      expect(JpnMorpho.conj("死ぬ",$({}, tpr, pl, n))).to.eql("死なない");
      expect(JpnMorpho.conj("示す",$({}, tpr, pl, n))).to.eql("示さない");
      expect(JpnMorpho.conj("立つ",$({}, tpr, pl, n))).to.eql("立たない");
      expect(JpnMorpho.conj("遊ぶ",$({}, tpr, pl, n))).to.eql("遊ばない");
      expect(JpnMorpho.conj("泳ぐ",$({}, tpr, pl, n))).to.eql("泳がない");
    });

    it("E-form: provisional condition", function() {
      expect(JpnMorpho.conj("勉強する",$({cond:"ba"}, tpr, cnd))).to.eql("勉強すれば");
      expect(JpnMorpho.conj("する",$({cond:"ba"}, cnd))).to.eql("すれば");
      expect(JpnMorpho.conj("くる",$({cond:"ba"}, cnd))).to.eql("くれば");
      expect(JpnMorpho.conj("来る",$({cond:"ba"}, cnd))).to.eql("来れば");
      //ichidan
      expect(JpnMorpho.conj("出来る",$({cond:"ba"}, cnd))).to.eql("出来れば");
      expect(JpnMorpho.conj("食べる",$({cond:"ba"}, cnd))).to.eql("食べれば");
      expect(JpnMorpho.conj("寝る",$({cond:"ba"}, cnd))).to.eql("寝れば");
      //godan //うくむぬすつぶぐ
      expect(JpnMorpho.conj("払う",$({cond:"ba"}, cnd))).to.eql("払えば");
      expect(JpnMorpho.conj("行く",$({cond:"ba"}, cnd))).to.eql("行けば");
      expect(JpnMorpho.conj("飲む",$({cond:"ba"}, cnd))).to.eql("飲めば");
      expect(JpnMorpho.conj("死ぬ",$({cond:"ba"}, cnd))).to.eql("死ねば");
      expect(JpnMorpho.conj("示す",$({cond:"ba"}, cnd))).to.eql("示せば");
      expect(JpnMorpho.conj("立つ",$({cond:"ba"}, cnd))).to.eql("立てば");
      expect(JpnMorpho.conj("遊ぶ",$({cond:"ba"}, cnd))).to.eql("遊べば");
      expect(JpnMorpho.conj("泳ぐ",$({cond:"ba"}, cnd))).to.eql("泳げば");
    });

    it("E-form: plain imperative", function() {
      expect(JpnMorpho.conj("勉強する",$({}, imp, pl))).to.eql("勉強(しろ/せよ)");
      expect(JpnMorpho.conj("する",$({}, imp, pl))).to.eql("(しろ/せよ)");
      expect(JpnMorpho.conj("くる",$({}, imp, pl))).to.eql("こい");
      expect(JpnMorpho.conj("来る",$({}, imp, pl))).to.eql("来い");
      //ichidan
      expect(JpnMorpho.conj("出来る",$({}, imp, pl))).to.eql("出来(ろ/よ)");
      expect(JpnMorpho.conj("食べる",$({}, imp, pl))).to.eql("食べ(ろ/よ)");
      expect(JpnMorpho.conj("寝る",$({}, imp, pl))).to.eql("寝(ろ/よ)");
      //godan //うくむぬすつぶぐ
      expect(JpnMorpho.conj("払う",$({}, imp, pl))).to.eql("払え");
      expect(JpnMorpho.conj("行く",$({}, imp, pl))).to.eql("行け");
      expect(JpnMorpho.conj("飲む",$({}, imp, pl))).to.eql("飲め");
      expect(JpnMorpho.conj("死ぬ",$({}, imp, pl))).to.eql("死ね");
      expect(JpnMorpho.conj("示す",$({}, imp, pl))).to.eql("示せ");
      expect(JpnMorpho.conj("立つ",$({}, imp, pl))).to.eql("立て");
      expect(JpnMorpho.conj("遊ぶ",$({}, imp, pl))).to.eql("遊べ");
      expect(JpnMorpho.conj("泳ぐ",$({}, imp, pl))).to.eql("泳げ");
    });

    it("I-form: present formal", function() {
      expect(JpnMorpho.conj("勉強する",$({}, tpr, po))).to.eql("勉強します");
      expect(JpnMorpho.conj("する",$({}, tpr, po))).to.eql("します");
      expect(JpnMorpho.conj("くる",$({}, tpr, po))).to.eql("きます");
      expect(JpnMorpho.conj("来る",$({}, tpr, po))).to.eql("来ます");
      //ichidan
      expect(JpnMorpho.conj("出来る",$({}, tpr, po))).to.eql("出来ます");
      expect(JpnMorpho.conj("食べる",$({}, tpr, po))).to.eql("食べます");
      expect(JpnMorpho.conj("寝る",$({}, tpr, po))).to.eql("寝ます");
      //godan //うくむぬすつぶぐ
      expect(JpnMorpho.conj("払う",$({}, tpr, po))).to.eql("払います");
      expect(JpnMorpho.conj("行く",$({}, tpr, po))).to.eql("行きます");
      expect(JpnMorpho.conj("飲む",$({}, tpr, po))).to.eql("飲みます");
      expect(JpnMorpho.conj("死ぬ",$({}, tpr, po))).to.eql("死にます");
      expect(JpnMorpho.conj("示す",$({}, tpr, po))).to.eql("示します");
      expect(JpnMorpho.conj("立つ",$({}, tpr, po))).to.eql("立ちます");
      expect(JpnMorpho.conj("遊ぶ",$({}, tpr, po))).to.eql("遊びます");
      expect(JpnMorpho.conj("泳ぐ",$({}, tpr, po))).to.eql("泳ぎます");
    });

    it("O-form: plain Volitional (optative)", function() {
      expect(JpnMorpho.conj("勉強する",$({}, opt, pl))).to.eql("勉強しよう");
      expect(JpnMorpho.conj("する",$({}, opt, pl))).to.eql("しよう");
      expect(JpnMorpho.conj("くる",$({}, opt, pl))).to.eql("こよう");
      expect(JpnMorpho.conj("来る",$({}, opt, pl))).to.eql("来よう");
      //ichidan
      expect(JpnMorpho.conj("出来る",$({}, opt, pl))).to.eql("出来よう");
      expect(JpnMorpho.conj("食べる",$({}, opt, pl))).to.eql("食べよう");
      expect(JpnMorpho.conj("寝る",$({}, opt, pl))).to.eql("寝よう");
      //godan //うくむぬすつぶぐ
      expect(JpnMorpho.conj("払う",$({}, opt, pl))).to.eql("払おう");
      expect(JpnMorpho.conj("行く",$({}, opt, pl))).to.eql("行こう");
      expect(JpnMorpho.conj("飲む",$({}, opt, pl))).to.eql("飲もう");
      expect(JpnMorpho.conj("死ぬ",$({}, opt, pl))).to.eql("死のう");
      expect(JpnMorpho.conj("示す",$({}, opt, pl))).to.eql("示そう");
      expect(JpnMorpho.conj("立つ",$({}, opt, pl))).to.eql("立とう");
      expect(JpnMorpho.conj("遊ぶ",$({}, opt, pl))).to.eql("遊ぼう");
      expect(JpnMorpho.conj("泳ぐ",$({}, opt, pl))).to.eql("泳ごう");
    });

    it("T-form: plain past", function() {
      expect(JpnMorpho.conj("勉強する",$({}, tpa, pl))).to.eql("勉強した");
      expect(JpnMorpho.conj("する",$({}, tpa, pl))).to.eql("した");
      expect(JpnMorpho.conj("くる",$({}, tpa, pl))).to.eql("きた");
      expect(JpnMorpho.conj("来る",$({}, tpa, pl))).to.eql("来た");
      //ichidan
      expect(JpnMorpho.conj("出来る",$({}, tpa, pl))).to.eql("出来た");
      expect(JpnMorpho.conj("食べる",$({}, tpa, pl))).to.eql("食べた");
      expect(JpnMorpho.conj("寝る",$({}, tpa, pl))).to.eql("寝た");
      //godan //うくむぬすつぶぐ
      expect(JpnMorpho.conj("払う",$({}, tpa, pl))).to.eql("払った");
      expect(JpnMorpho.conj("行く",$({}, tpa, pl))).to.eql("行った");//irregular
      expect(JpnMorpho.conj("叩く",$({}, tpa, pl))).to.eql("叩いた");
      expect(JpnMorpho.conj("飲む",$({}, tpa, pl))).to.eql("飲んだ");
      expect(JpnMorpho.conj("死ぬ",$({}, tpa, pl))).to.eql("死んだ");
      expect(JpnMorpho.conj("示す",$({}, tpa, pl))).to.eql("示した");
      expect(JpnMorpho.conj("立つ",$({}, tpa, pl))).to.eql("立った");
      expect(JpnMorpho.conj("遊ぶ",$({}, tpa, pl))).to.eql("遊んだ");
      expect(JpnMorpho.conj("泳ぐ",$({}, tpa, pl))).to.eql("泳いだ");
    });

    it("Other forms", function() {
      //past contnuous plain affirmative
      expect(JpnMorpho.conj("勉強する",$({}, tpa, c, pl))).to.eql("勉強していた");
      expect(JpnMorpho.conj("食べる",$({}, tpa, c, pl))).to.eql("食べていた");
      expect(JpnMorpho.conj("飲む",$({}, tpa, c, pl))).to.eql("飲んでいた");

      //condition "tara" plain affirmative
      expect(JpnMorpho.conj("勉強する",$({}, cnd, pl))).to.eql("勉強したら");
      expect(JpnMorpho.conj("食べる",$({}, cnd, pl))).to.eql("食べたら");
      expect(JpnMorpho.conj("飲む",$({}, cnd, pl))).to.eql("飲んだら");

      //causative polite negative
      expect(JpnMorpho.conj("勉強する",$({cause:1}, po, n))).to.eql("勉強させません");
      expect(JpnMorpho.conj("食べる",$({cause:1}, po, n))).to.eql("食べさせません");
      expect(JpnMorpho.conj("飲む",$({cause:1}, po, n))).to.eql("飲ませません");

      //potential plain negative
      expect(JpnMorpho.conj("勉強する",$({}, pot, pl, n))).to.eql("勉強出来ない");
      expect(JpnMorpho.conj("食べる",$({}, pot, pl, n))).to.eql("食べられない");
      expect(JpnMorpho.conj("飲む",$({}, pot, pl, n))).to.eql("飲めない");

      //present passive plain affirmative
      expect(JpnMorpho.conj("勉強する",$({}, tpr, pas, pl))).to.eql("勉強される");
      expect(JpnMorpho.conj("食べる",$({}, tpr, pas, pl))).to.eql("食べられる");
      expect(JpnMorpho.conj("飲む",$({}, tpr, pas, pl))).to.eql("飲まれる");

      //causative passive plain affirmative
      expect(JpnMorpho.conj("勉強する",$({cause:1}, pas, pl))).to.eql("勉強させられる");
      expect(JpnMorpho.conj("食べる",$({cause:1}, pas, pl))).to.eql("食べさせられる");
      expect(JpnMorpho.conj("飲む",$({cause:1}, pas, pl))).to.eql("飲ませられる");

    });

  });


  describe("Japanese JsLingua Stemmer", function(){

    before(function(){
      JpnMorpho.sstem("jslingua");
    });

    it("Verbs stemming", function() {
      expect(JpnMorpho.stem("用いられている")).to.eql("用い");
      expect(JpnMorpho.stem("用いられていませんでした")).to.eql("用い");
      expect(JpnMorpho.stem("始まった")).to.eql("始ま");
      expect(JpnMorpho.stem("読ませている")).to.eql("読ませ");
      expect(JpnMorpho.stem("強調したい")).to.eql("強調す");
      expect(JpnMorpho.stem("伝わっていない")).to.eql("伝わ");
      expect(JpnMorpho.stem("表記されている")).to.eql("表記され");
      expect(JpnMorpho.stem("行かなければならない")).to.eql("行く");
      expect(JpnMorpho.stem("いっていません")).to.eql("いく");
      expect(JpnMorpho.stem("いかなければならない")).to.eql("いく");
    });

    it("Adjectives stemming", function() {
      expect(JpnMorpho.stem("きれい")).to.eql("きれい");
      expect(JpnMorpho.stem("高くなかった")).to.eql("高い");
      expect(JpnMorpho.stem("たかくなかった")).to.eql("たかい");
    });

  });

  describe("Japanese Normalization", function(){

    it("Chat", function() {
      expect(JpnMorpho.norm("雨ねえええ")).to.eql("雨ね");
      expect(JpnMorpho.norm("雨ねぇぇぇ")).to.eql("雨ね");
      expect(JpnMorpho.norm("そうかなあああ")).to.eql("そうかな");
      expect(JpnMorpho.norm("そうかなぁぁぁぁ")).to.eql("そうかな");
      expect(JpnMorpho.norm("すげえええ")).to.eql("すごい");
    });

    it("Hakata Ben", function() {
      expect(JpnMorpho.norm("犬やない")).to.eql("犬じゃない");
      expect(JpnMorpho.norm("言ったばい")).to.eql("言ったよ");
    });

    it("Osaka Ben", function() {
      expect(JpnMorpho.norm("飲まへん")).to.eql("飲まない");
      expect(JpnMorpho.norm("帰るさかい")).to.eql("帰るから");
    });

    it("Hiroshima Ben", function() {
      expect(JpnMorpho.norm("飲みんさんな")).to.eql("飲まないでください");
      expect(JpnMorpho.norm("食べんさんな")).to.eql("食べないでください");
    });

    it("Kyoto Ben", function() {
      expect(JpnMorpho.norm("行きますえ")).to.eql("行きますよ");
    });

    it("Nagoya Ben", function() {
      expect(JpnMorpho.norm("書いてちょう")).to.eql("書いてください");
    });

    it("Sendai Ben", function() {
      expect(JpnMorpho.norm("寒いべ")).to.eql("寒いでしょう");
      expect(JpnMorpho.norm("日本人だべ")).to.eql("日本人でしょう");
    });

    it("Hokkaido Ben", function() {
      expect(JpnMorpho.norm("寒いべ")).to.eql("寒いでしょう");
      expect(JpnMorpho.norm("寒いっしょ")).to.eql("寒いでしょう");
      expect(JpnMorpho.norm("明日しょや")).to.eql("明日でしょう");
    });

  });

});
