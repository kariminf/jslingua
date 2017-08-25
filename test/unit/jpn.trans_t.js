var JpnTrans = require('../../jpn/jpn.trans');
var expect = require('expect.js');

var src = "じゃ,しゃしん,いっぱい"
var exp = {
  "Hepburn": {
    "rev": "じゃ,しゃしん,いっぱい",
    "dst": "ja,shashin,ippai"
  },
  "NihonShiki": {
    "rev": "じゃ,しゃしん,いっぱい",
    "dst": "zya,syasin,ippai"
  },
  "KunreiShiki": {
    "rev": "じゃ,しゃしん,いっぱい",
    "dst": "zya,syasin,ippai"
  },
  "Morse": {
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
    trans.setCurrentMethod("Hepburn");
    expect(trans.transliterate(src)).to.eql(exp["Hepburn"].dst);//transliterate
    expect(trans.untransliterate(exp["Hepburn"].dst)).to.eql(exp["Hepburn"].rev);//untransliterate
  });

  it("NihonShiki", function(){
    trans.setCurrentMethod("NihonShiki");
    expect(trans.transliterate(src)).to.eql(exp["NihonShiki"].dst);//transliterate
    expect(trans.untransliterate(exp["NihonShiki"].dst)).to.eql(exp["NihonShiki"].rev);//untransliterate
  });

  it("KunreiShiki", function(){
    trans.setCurrentMethod("KunreiShiki");
    expect(trans.transliterate(src)).to.eql(exp["KunreiShiki"].dst);//transliterate
    expect(trans.untransliterate(exp["KunreiShiki"].dst)).to.eql(exp["KunreiShiki"].rev);//untransliterate
  });

  it("Morse", function(){
    trans.setCurrentMethod("Morse");
    expect(trans.transliterate(src)).to.eql(exp["Morse"].dst);//transliterate
    expect(trans.untransliterate(exp["Morse"].dst)).to.eql(exp["Morse"].rev);//untransliterate
  });

});
