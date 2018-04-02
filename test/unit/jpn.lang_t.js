var JpnLang = require('../../jpn/jpn.lang');
var expect = require('expect.js');

var lang = new JpnLang();

describe("Japanese Lang", function(){

  it("pronounceNumber", function(){
    expect(lang.pronounceNumber(1025)).to.eql("千二十五");
  });

  it("charSets", function(){
    var charsets = lang.availableCharSets();
    expect(charsets.length).to.eql(4);//the number of charsets
    var txt = "皆さん、こんにちは";
    var j, all=0, contains=0;
    for(j=0; j < charsets.length; j++){
      var allFct = lang.allCharSetFunction(charsets[j]);
      var containsFct = lang.containsCharSetFunction(charsets[j]);
      all += (allFct(txt))? 1 : 0;
      contains += (containsFct(txt))? 1 : 0;
    }
    expect(all).to.eql(0);
    expect(contains).to.eql(3);
  });

  it("Transform", function(){
    expect(lang.availableTransformations().length).to.eql(2);
    var hiragana = "こんにちは";
    var katakana = "コンニチハ";
    var func = lang.transformationFunction("hira2kata");
    expect(func(hiragana)).to.eql(katakana);
    func = lang.transformationFunction("kata2hira");
    expect(func(katakana)).to.eql(hiragana);
  });

});
