let JpnTrans;
let expect = require('expect.js');

let src = "じゃ,しゃしん,いっぱい";
let exp = {
  "hepburn": {
    "rev": "じゃ,しゃしん,いっぱい",
    "dst": "ja,shashin,ippai"
  },
  "nihonshiki": {
    "rev": "じゃ,しゃしん,いっぱい",
    "dst": "zya,syasin,ippai"
  },
  "kunreishiki": {
    "rev": "じゃ,しゃしん,いっぱい",
    "dst": "zya,syasin,ippai"
  },
  "morse": {
    "rev": "じや,しやしん,いつばい",
    "dst": "-..--- --.-. .. .-- --..-- --.-. .-- --.-. .-.-. --..-- .- .--. -... .. .- ...-."
  }
};

describe("Japanese Transliteration", function(){

  before(async () => {
    let module = await import("../../src/jpn/jpn.trans.mjs");
    JpnTrans = module.default;
  });

  it("Methods check", function(){
    let methods = JpnTrans.l();
    expect(methods.length).to.eql(4);//number of methods
  });

  it("Hepburn", function(){
    JpnTrans.s("hepburn");
    expect(JpnTrans.t(src)).to.eql(exp["hepburn"].dst);//transliterate
    expect(JpnTrans.u(exp["hepburn"].dst)).to.eql(exp["hepburn"].rev);//untransliterate
  });

  it("NihonShiki", function(){
    JpnTrans.s("nihonshiki");
    expect(JpnTrans.t(src)).to.eql(exp["nihonshiki"].dst);//transliterate
    expect(JpnTrans.u(exp["nihonshiki"].dst)).to.eql(exp["nihonshiki"].rev);//untransliterate
  });

  it("kunreishiki", function(){
    JpnTrans.s("kunreishiki");
    expect(JpnTrans.t(src)).to.eql(exp["kunreishiki"].dst);//transliterate
    expect(JpnTrans.u(exp["kunreishiki"].dst)).to.eql(exp["kunreishiki"].rev);//untransliterate
  });

  it("morse", function(){
    JpnTrans.s("morse");
    expect(JpnTrans.t(src)).to.eql(exp["morse"].dst);//transliterate
    expect(JpnTrans.u(exp["morse"].dst)).to.eql(exp["morse"].rev);//untransliterate
  });

});
