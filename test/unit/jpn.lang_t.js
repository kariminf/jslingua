let JpnLang = import("../../src/jpn/jpn.lang");
let expect = require('expect.js');

describe("Japanese Lang", function(){

  it("pronounceNumber", function(){
    expect(JpnLang.pronounceNumber(1025)).to.eql("千二十五");
  });

  it("charSets", function(){
    var charsets = JpnLang.listCharSets();
    expect(charsets.length).to.eql(4);//the number of charsets
    var txt = "皆さん、こんにちは";
    var j, all=0, contains=0;
    for(j=0; j < charsets.length; j++){
      var allFct = JpnLang.allCharSetFunction(charsets[j]);
      var containsFct = JpnLang.containsCharSetFunction(charsets[j]);
      all += (allFct(txt))? 1 : 0;
      contains += (containsFct(txt))? 1 : 0;
    }
    expect(all).to.eql(0);
    expect(contains).to.eql(3);
  });

  it("Transform", function(){
    expect(JpnLang.ltrans().length).to.eql(2);
    var hiragana = "こんにちは";
    var katakana = "コンニチハ";
    var func = JpnLang.transformationFunction("hira2kata");
    expect(func(hiragana)).to.eql(katakana);
    func = JpnLang.transformationFunction("kata2hira");
    expect(func(katakana)).to.eql(hiragana);
  });

});
