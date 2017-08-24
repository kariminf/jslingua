var JpnMorpho = require('../../jpn/jpn.morpho');
var expect = require('expect.js');

var morpho = new JpnMorpho();

morpho.setCurrentStemmer("porterStemmer");
morpho.enableDebug();


var
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


describe("Japanese Verb conjugation", function(){

  it("Verb type detection", function() {
    //suru kuru
    expect(morpho.getVerbType("勉強する")).to.eql(sk);
    expect(morpho.getVerbType("する")).to.eql(sk);
    expect(morpho.getVerbType("くる")).to.eql(sk);
    expect(morpho.getVerbType("来る")).to.eql(sk);
    //ichidan
    expect(morpho.getVerbType("出来る")).to.eql(v1);
    expect(morpho.getVerbType("食べる")).to.eql(v1);
    expect(morpho.getVerbType("寝る")).to.eql(v1);
    //godan //うくむぬすつぶぐ
    expect(morpho.getVerbType("払う")).to.eql(v5);
    expect(morpho.getVerbType("行く")).to.eql(v5);
    expect(morpho.getVerbType("飲む")).to.eql(v5);
    expect(morpho.getVerbType("死ぬ")).to.eql(v5);
    expect(morpho.getVerbType("示す")).to.eql(v5);
    expect(morpho.getVerbType("立つ")).to.eql(v5);
    expect(morpho.getVerbType("遊ぶ")).to.eql(v5);
    expect(morpho.getVerbType("泳ぐ")).to.eql(v5);

    //godan with ru ending
    expect(morpho.getVerbType("お座なりになる")).to.eql(v5);
    expect(morpho.getVerbType("くねる")).to.eql(v5);
    expect(morpho.getVerbType("阿る")).to.eql(v5);


  });

  it("A-form: present plain negative", function() {
    expect(morpho.conjugate("勉強する",$({}, tpr, pl, n))).to.eql("勉強しない");
    expect(morpho.conjugate("する",$({}, tpr, pl, n))).to.eql("しない");
    expect(morpho.conjugate("くる",$({}, tpr, pl, n))).to.eql("こない");
    expect(morpho.conjugate("来る",$({}, tpr, pl, n))).to.eql("来ない");
    //ichidan
    expect(morpho.conjugate("出来る",$({}, tpr, pl, n))).to.eql("出来ない");
    expect(morpho.conjugate("食べる",$({}, tpr, pl, n))).to.eql("食べない");
    expect(morpho.conjugate("寝る",$({}, tpr, pl, n))).to.eql("寝ない");
    //godan //うくむぬすつぶぐ
    expect(morpho.conjugate("払う",$({}, tpr, pl, n))).to.eql("払わない");
    expect(morpho.conjugate("行く",$({}, tpr, pl, n))).to.eql("行かない");
    expect(morpho.conjugate("飲む",$({}, tpr, pl, n))).to.eql("飲まない");
    expect(morpho.conjugate("死ぬ",$({}, tpr, pl, n))).to.eql("死なない");
    expect(morpho.conjugate("示す",$({}, tpr, pl, n))).to.eql("示さない");
    expect(morpho.conjugate("立つ",$({}, tpr, pl, n))).to.eql("立たない");
    expect(morpho.conjugate("遊ぶ",$({}, tpr, pl, n))).to.eql("遊ばない");
    expect(morpho.conjugate("泳ぐ",$({}, tpr, pl, n))).to.eql("泳がない");
  });

  it("E-form: provisional condition", function() {
    expect(morpho.conjugate("勉強する",$({cond:"ba"}, tpr, cnd))).to.eql("勉強すれば");
    expect(morpho.conjugate("する",$({cond:"ba"}, cnd))).to.eql("すれば");
    expect(morpho.conjugate("くる",$({cond:"ba"}, cnd))).to.eql("くれば");
    expect(morpho.conjugate("来る",$({cond:"ba"}, cnd))).to.eql("来れば");
    //ichidan
    expect(morpho.conjugate("出来る",$({cond:"ba"}, cnd))).to.eql("出来れば");
    expect(morpho.conjugate("食べる",$({cond:"ba"}, cnd))).to.eql("食べれば");
    expect(morpho.conjugate("寝る",$({cond:"ba"}, cnd))).to.eql("寝れば");
    //godan //うくむぬすつぶぐ
    expect(morpho.conjugate("払う",$({cond:"ba"}, cnd))).to.eql("払えば");
    expect(morpho.conjugate("行く",$({cond:"ba"}, cnd))).to.eql("行けば");
    expect(morpho.conjugate("飲む",$({cond:"ba"}, cnd))).to.eql("飲めば");
    expect(morpho.conjugate("死ぬ",$({cond:"ba"}, cnd))).to.eql("死ねば");
    expect(morpho.conjugate("示す",$({cond:"ba"}, cnd))).to.eql("示せば");
    expect(morpho.conjugate("立つ",$({cond:"ba"}, cnd))).to.eql("立てば");
    expect(morpho.conjugate("遊ぶ",$({cond:"ba"}, cnd))).to.eql("遊べば");
    expect(morpho.conjugate("泳ぐ",$({cond:"ba"}, cnd))).to.eql("泳げば");
  });

  it("E-form: plain imperative", function() {
    expect(morpho.conjugate("勉強する",$({}, imp, pl))).to.eql("勉強(しろ/せよ)");
    expect(morpho.conjugate("する",$({}, imp, pl))).to.eql("(しろ/せよ)");
    expect(morpho.conjugate("くる",$({}, imp, pl))).to.eql("こい");
    expect(morpho.conjugate("来る",$({}, imp, pl))).to.eql("来い");
    //ichidan
    expect(morpho.conjugate("出来る",$({}, imp, pl))).to.eql("出来(ろ/よ)");
    expect(morpho.conjugate("食べる",$({}, imp, pl))).to.eql("食べ(ろ/よ)");
    expect(morpho.conjugate("寝る",$({}, imp, pl))).to.eql("寝(ろ/よ)");
    //godan //うくむぬすつぶぐ
    expect(morpho.conjugate("払う",$({}, imp, pl))).to.eql("払え");
    expect(morpho.conjugate("行く",$({}, imp, pl))).to.eql("行け");
    expect(morpho.conjugate("飲む",$({}, imp, pl))).to.eql("飲め");
    expect(morpho.conjugate("死ぬ",$({}, imp, pl))).to.eql("死ね");
    expect(morpho.conjugate("示す",$({}, imp, pl))).to.eql("示せ");
    expect(morpho.conjugate("立つ",$({}, imp, pl))).to.eql("立て");
    expect(morpho.conjugate("遊ぶ",$({}, imp, pl))).to.eql("遊べ");
    expect(morpho.conjugate("泳ぐ",$({}, imp, pl))).to.eql("泳げ");
  });

  it("I-form: present formal", function() {
    expect(morpho.conjugate("勉強する",$({}, tpr, po))).to.eql("勉強します");
    expect(morpho.conjugate("する",$({}, tpr, po))).to.eql("します");
    expect(morpho.conjugate("くる",$({}, tpr, po))).to.eql("きます");
    expect(morpho.conjugate("来る",$({}, tpr, po))).to.eql("来ます");
    //ichidan
    expect(morpho.conjugate("出来る",$({}, tpr, po))).to.eql("出来ます");
    expect(morpho.conjugate("食べる",$({}, tpr, po))).to.eql("食べます");
    expect(morpho.conjugate("寝る",$({}, tpr, po))).to.eql("寝ます");
    //godan //うくむぬすつぶぐ
    expect(morpho.conjugate("払う",$({}, tpr, po))).to.eql("払います");
    expect(morpho.conjugate("行く",$({}, tpr, po))).to.eql("行きます");
    expect(morpho.conjugate("飲む",$({}, tpr, po))).to.eql("飲みます");
    expect(morpho.conjugate("死ぬ",$({}, tpr, po))).to.eql("死にます");
    expect(morpho.conjugate("示す",$({}, tpr, po))).to.eql("示します");
    expect(morpho.conjugate("立つ",$({}, tpr, po))).to.eql("立ちます");
    expect(morpho.conjugate("遊ぶ",$({}, tpr, po))).to.eql("遊びます");
    expect(morpho.conjugate("泳ぐ",$({}, tpr, po))).to.eql("泳ぎます");
  });

  it("O-form: plain Volitional (optative)", function() {
    expect(morpho.conjugate("勉強する",$({}, opt, pl))).to.eql("勉強しよう");
    expect(morpho.conjugate("する",$({}, opt, pl))).to.eql("しよう");
    expect(morpho.conjugate("くる",$({}, opt, pl))).to.eql("こよう");
    expect(morpho.conjugate("来る",$({}, opt, pl))).to.eql("来よう");
    //ichidan
    expect(morpho.conjugate("出来る",$({}, opt, pl))).to.eql("出来よう");
    expect(morpho.conjugate("食べる",$({}, opt, pl))).to.eql("食べよう");
    expect(morpho.conjugate("寝る",$({}, opt, pl))).to.eql("寝よう");
    //godan //うくむぬすつぶぐ
    expect(morpho.conjugate("払う",$({}, opt, pl))).to.eql("払おう");
    expect(morpho.conjugate("行く",$({}, opt, pl))).to.eql("行こう");
    expect(morpho.conjugate("飲む",$({}, opt, pl))).to.eql("飲もう");
    expect(morpho.conjugate("死ぬ",$({}, opt, pl))).to.eql("死のう");
    expect(morpho.conjugate("示す",$({}, opt, pl))).to.eql("示そう");
    expect(morpho.conjugate("立つ",$({}, opt, pl))).to.eql("立とう");
    expect(morpho.conjugate("遊ぶ",$({}, opt, pl))).to.eql("遊ぼう");
    expect(morpho.conjugate("泳ぐ",$({}, opt, pl))).to.eql("泳ごう");
  });

  it("T-form: plain past", function() {
    expect(morpho.conjugate("勉強する",$({}, tpa, pl))).to.eql("勉強した");
    expect(morpho.conjugate("する",$({}, tpa, pl))).to.eql("した");
    expect(morpho.conjugate("くる",$({}, tpa, pl))).to.eql("きた");
    expect(morpho.conjugate("来る",$({}, tpa, pl))).to.eql("来た");
    //ichidan
    expect(morpho.conjugate("出来る",$({}, tpa, pl))).to.eql("出来た");
    expect(morpho.conjugate("食べる",$({}, tpa, pl))).to.eql("食べた");
    expect(morpho.conjugate("寝る",$({}, tpa, pl))).to.eql("寝た");
    //godan //うくむぬすつぶぐ
    expect(morpho.conjugate("払う",$({}, tpa, pl))).to.eql("払った");
    expect(morpho.conjugate("行く",$({}, tpa, pl))).to.eql("行った");//irregular
    expect(morpho.conjugate("叩く",$({}, tpa, pl))).to.eql("叩いた");
    expect(morpho.conjugate("飲む",$({}, tpa, pl))).to.eql("飲んだ");
    expect(morpho.conjugate("死ぬ",$({}, tpa, pl))).to.eql("死んだ");
    expect(morpho.conjugate("示す",$({}, tpa, pl))).to.eql("示した");
    expect(morpho.conjugate("立つ",$({}, tpa, pl))).to.eql("立った");
    expect(morpho.conjugate("遊ぶ",$({}, tpa, pl))).to.eql("遊んだ");
    expect(morpho.conjugate("泳ぐ",$({}, tpa, pl))).to.eql("泳いだ");
  });

  it("Other forms", function() {
    //past contnuous plain affirmative
    expect(morpho.conjugate("勉強する",$({}, tpa, c, pl))).to.eql("勉強していた");
    expect(morpho.conjugate("食べる",$({}, tpa, c, pl))).to.eql("食べていた");
    expect(morpho.conjugate("飲む",$({}, tpa, c, pl))).to.eql("飲んでいた");

    //condition "tara" plain affirmative
    expect(morpho.conjugate("勉強する",$({}, cnd, pl))).to.eql("勉強したら");
    expect(morpho.conjugate("食べる",$({}, cnd, pl))).to.eql("食べたら");
    expect(morpho.conjugate("飲む",$({}, cnd, pl))).to.eql("飲んだら");

    //causative polite negative
    expect(morpho.conjugate("勉強する",$({cause:1}, po, n))).to.eql("勉強させません");
    expect(morpho.conjugate("食べる",$({cause:1}, po, n))).to.eql("食べさせません");
    expect(morpho.conjugate("飲む",$({cause:1}, po, n))).to.eql("飲ませません");

    //potential plain negative
    expect(morpho.conjugate("勉強する",$({}, pot, pl, n))).to.eql("勉強出来ない");
    expect(morpho.conjugate("食べる",$({}, pot, pl, n))).to.eql("食べられない");
    expect(morpho.conjugate("飲む",$({}, pot, pl, n))).to.eql("飲めない");

    //present passive plain affirmative
    expect(morpho.conjugate("勉強する",$({}, tpr, pas, pl))).to.eql("勉強される");
    expect(morpho.conjugate("食べる",$({}, tpr, pas, pl))).to.eql("食べられる");
    expect(morpho.conjugate("飲む",$({}, tpr, pas, pl))).to.eql("飲まれる");

    //causative passive plain affirmative
    expect(morpho.conjugate("勉強する",$({cause:1}, pas, pl))).to.eql("勉強させられる");
    expect(morpho.conjugate("食べる",$({cause:1}, pas, pl))).to.eql("食べさせられる");
    expect(morpho.conjugate("飲む",$({cause:1}, pas, pl))).to.eql("飲ませられる");

  });

});


morpho.setCurrentStemmer("jslinguaJpnStemmer");
describe("Japanese JsLingua Stemmer", function(){

  it("Verbs stemming", function() {
    expect(morpho.stem("用いられている")).to.eql("用い");
    expect(morpho.stem("用いられていませんでした")).to.eql("用い");
    expect(morpho.stem("始まった")).to.eql("始ま");
    expect(morpho.stem("読ませている")).to.eql("読ませ");
    expect(morpho.stem("強調したい")).to.eql("強調す");
    expect(morpho.stem("伝わっていない")).to.eql("伝わ");
    expect(morpho.stem("表記されている")).to.eql("表記され");
    expect(morpho.stem("行かなければならない")).to.eql("行く");
    expect(morpho.stem("いっていません")).to.eql("いく");
    expect(morpho.stem("いかなければならない")).to.eql("いく");
  });

  it("Adjectives stemming", function() {
    expect(morpho.stem("きれい")).to.eql("きれい");
    expect(morpho.stem("高くなかった")).to.eql("高い");
    expect(morpho.stem("たかくなかった")).to.eql("たかい");
  });

});

describe("Japanese Normalization", function(){

  it("Chat", function() {
    expect(morpho.normalize("雨ねえええ")).to.eql("雨ね");
    expect(morpho.normalize("雨ねぇぇぇ")).to.eql("雨ね");
    expect(morpho.normalize("そうかなあああ")).to.eql("そうかな");
    expect(morpho.normalize("そうかなぁぁぁぁ")).to.eql("そうかな");
    expect(morpho.normalize("すげえええ")).to.eql("すごい");
  });

  it("Hakata Ben", function() {
    expect(morpho.normalize("犬やない")).to.eql("犬じゃない");
    expect(morpho.normalize("言ったばい")).to.eql("言ったよ");
  });

  it("Osaka Ben", function() {
    expect(morpho.normalize("飲まへん")).to.eql("飲まない");
    expect(morpho.normalize("帰るさかい")).to.eql("帰るから");
  });

  it("Hiroshima Ben", function() {
    expect(morpho.normalize("飲みんさんな")).to.eql("飲まないでください");
    expect(morpho.normalize("食べんさんな")).to.eql("食べないでください");
  });

  it("Kyoto Ben", function() {
    expect(morpho.normalize("行きますえ")).to.eql("行きますよ");
  });

  it("Nagoya Ben", function() {
    expect(morpho.normalize("書いてちょう")).to.eql("書いてください");
  });

  it("Sendai Ben", function() {
    expect(morpho.normalize("寒いべ")).to.eql("寒いでしょう");
    expect(morpho.normalize("日本人だべ")).to.eql("日本人でしょう");
  });

  it("Hokkaido Ben", function() {
    expect(morpho.normalize("寒いべ")).to.eql("寒いでしょう");
    expect(morpho.normalize("寒いっしょ")).to.eql("寒いでしょう");
    expect(morpho.normalize("明日しょや")).to.eql("明日でしょう");
  });

});
