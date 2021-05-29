let FraLang = import("../../src/fra/fra.lang");
let expect = require('expect.js');

describe("French Lang", function(){

  it("pronounceNumber", function(){
    expect(FraLang.pronounceNumber(1025)).to.eql("mille vingt-cinq");
  });

  it("charSets", function(){
    var charsets = FraLang.listCharSets();
    expect(charsets.length).to.eql(2);//the number of charsets
    var txt = "ça dépend.";
    var j, all=0, contains=0;
    for(j=0; j < charsets.length; j++){
      var allFct = FraLang.allCharSetFunction(charsets[j]);
      var containsFct = FraLang.containsCharSetFunction(charsets[j]);
      all += (allFct(txt))? 1 : 0;
      contains += (containsFct(txt))? 1 : 0;
    }
    expect(all).to.eql(0);
    expect(contains).to.eql(2);
  });

  it("Transform", function(){
    expect(FraLang.ltrans().length).to.eql(2);
    var min = "azertyçùéèà";
    var maj = "AZERTYÇÙÉÈÀ";
    var func = FraLang.transformationFunction("min2maj");
    expect(func(min)).to.eql(maj);
    func = FraLang.transformationFunction("maj2min");
    expect(func(maj)).to.eql(min);
  });

});
