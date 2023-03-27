/*
let jpn = new (require('../../jpn/jpn.trans'))();
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


describe("Trans Short", function(){

  it("short version", function(){
    let methods = jpn.ltrans();
    expect(methods.length).to.eql(4);//number of methods

    //Methods
    jpn.strans("nihonshiki");
    expect(jpn.trans(src)).to.eql(exp["nihonshiki"].dst);//transliterate
    expect(jpn.untrans(exp["nihonshiki"].dst)).to.eql(exp["nihonshiki"].rev);//untransliterate
    jpn.strans("hepburn");
    expect(jpn.trans(src)).to.eql(exp["hepburn"].dst);//transliterate
    expect(jpn.untrans(exp["hepburn"].dst)).to.eql(exp["hepburn"].rev);//untransliterate

  });

});

describe("Trans Storage", function(){

  it("Transliteration", function(){
    let res = ["しゃしん", "ippai", "syasin", "いっぱい"];
    jpn.s.clear().strans("hepburn").untrans("shashin").trans("いっぱい")
          .strans("nihonshiki").trans("しゃしん").untrans("ippai");
    expect(jpn.s.ltrans()).to.eql(res);
  });

});
*/
