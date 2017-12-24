var FraLang = require('../../fra/fra.lang');
var expect = require('expect.js');

var lang = new FraLang();

describe("French Lang", function(){

  it("pronounceNumber", function(){
    expect(lang.pronounceNumber(1025)).to.eql("mille vingt-cinq");
  });

  it("charSets", function(){
    var charsets = lang.availableCharSets();
    expect(charsets.length).to.eql(2);//the number of charsets
    var txt = "ça dépend.";
    var j, all=0, contains=0;
    for(j=0; j < charsets.length; j++){
      var allFct = lang.allCharSetFunction(charsets[j]);
      var containsFct = lang.containsCharSetFunction(charsets[j]);
      all += (allFct(txt))? 1 : 0;
      contains += (containsFct(txt))? 1 : 0;
    }
    expect(all).to.eql(0);
    expect(contains).to.eql(2);
  });

  it("Transform", function(){
    expect(lang.availableTransformations().length).to.eql(2);
    var min = "azertyçùéèà";
    var maj = "AZERTYÇÙÉÈÀ";
    var func = lang.transformationFunction("minusculeToMajuscule");
    expect(func(min)).to.eql(maj);
    func = lang.transformationFunction("majusculeToMinuscule");
    expect(func(maj)).to.eql(min);
  });

});
