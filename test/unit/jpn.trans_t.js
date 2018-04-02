var JpnTrans = require('../../jpn/jpn.trans');
var expect = require('expect.js');

var src = "じゃ,しゃしん,いっぱい"
var exp = {
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

var trans = new JpnTrans();

describe("Japanese Transliteration", function(){

  it("Methods check", function(){
    var methods = trans.availableMethods();
    expect(methods.length).to.eql(4);//number of methods
  });

  it("Hepburn", function(){
    trans.setCurrentMethod("hepburn");
    expect(trans.transliterate(src)).to.eql(exp["hepburn"].dst);//transliterate
    expect(trans.untransliterate(exp["hepburn"].dst)).to.eql(exp["hepburn"].rev);//untransliterate
  });

  it("NihonShiki", function(){
    trans.setCurrentMethod("nihonshiki");
    expect(trans.transliterate(src)).to.eql(exp["nihonshiki"].dst);//transliterate
    expect(trans.untransliterate(exp["nihonshiki"].dst)).to.eql(exp["nihonshiki"].rev);//untransliterate
  });

  it("kunreishiki", function(){
    trans.setCurrentMethod("kunreishiki");
    expect(trans.transliterate(src)).to.eql(exp["kunreishiki"].dst);//transliterate
    expect(trans.untransliterate(exp["kunreishiki"].dst)).to.eql(exp["kunreishiki"].rev);//untransliterate
  });

  it("morse", function(){
    trans.setCurrentMethod("morse");
    expect(trans.transliterate(src)).to.eql(exp["morse"].dst);//transliterate
    expect(trans.untransliterate(exp["morse"].dst)).to.eql(exp["morse"].rev);//untransliterate
  });

});
