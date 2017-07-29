var AraLang = require('../../ara/ara.lang');
var expect = require('expect.js');

var lang = new AraLang();

describe("Arabic Lang", function(){

  it("pronounceNumber", function(){
    expect(lang.pronounceNumber(1025)).to.eql("ألف وخمسة وعشرون");
  });

  it("charSets", function(){
    var charsets = lang.availableCharSets();
    expect(charsets.length).to.eql(7);//the number of charsets
    var txt = "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار";
    var j, all=0, contains=0;
    for(j=0; j < charsets.length; j++){
      var allFct = lang.allCharSetFunction(charsets[j]);
      var containsFct = lang.containsCharSetFunction(charsets[j]);
      all += (allFct(txt))? 1 : 0;
      contains += (containsFct(txt))? 1 : 0;
    }
    expect(all).to.eql(0);
    expect(contains).to.eql(1);
  });

  it("Transform", function(){
    expect(lang.availableTransformations().length).to.eql(2);
    var arabicNum = "1234567890";
    var indicNum = "١٢٣٤٥٦٧٨٩٠";
    var func = lang.transformationFunction("indicToArabicNumeral");
    expect(func(indicNum)).to.eql(arabicNum);
    func = lang.transformationFunction("arabicToIndicNumeral");
    expect(func(arabicNum)).to.eql(indicNum);
  });

});
