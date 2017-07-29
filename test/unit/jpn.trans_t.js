var JpnTrans = require('../../jpn/jpn.trans');
var expect = require('expect.js');

var src = "じゃ、しゃしん、いっぱい"
var exp = {
  "Hepburn": {
    "rev": "じゃ、しゃしん、いっぱい",
    "dst": "ja、shashin、ippai"
  },
  "NihonShiki": {
    "rev": "じゃ、しゃしん、いっぱい",
    "dst": "zya、syasin、ippai"
  },
  "KunreiShiki": {
    "rev": "じゃ、しゃしん、いっぱい",
    "dst": "zya、syasin、ippai"
  },
  "Morse": {
    "rev": "じや、しやしん、いつばい",
    "dst": "-..--- --.-. .. .-- --..-- --.-. .-- --.-. .-.-. --..-- .- .--. -... .. .- ...-."
  }
};

var trans = new JpnTrans();

describe("Japanese Transliteration", function(){

  it("Methods check", function(){
    var methods = trans.availableMethods();
    expect(methods.length).to.eql(4);//number of methods
    var j;
    for (j = 0; j < methods.length; j++){
      var method = methods[j];
      trans.setCurrentMethod(method);
      expect(trans.transliterate(src)).to.eql(exp[method].dst);//transliterate
      expect(trans.untransliterate(exp[method].dst)).to.eql(exp[method].rev);//untransliterate
    }
  });

});
