let AraLang = import("../../src/ara/ara.lang");
let expect = require('expect.js');

describe("Arabic Lang", function(){

  it("pronounceNumber", function(){
    //long way
    expect(AraLang.pronounceNumber(1025)).to.eql("ألف وخمسة وعشرون");
    //short way
    expect(AraLang.nbr2str(1025)).to.eql("ألف وخمسة وعشرون");
  });

  it("charSets", function(){
    //long way
    var charsets = lang.listCharSets();
    expect(charsets.length).to.eql(7);//the number of charsets
    //short way
    charsets = lang.lchars();
    expect(charsets.length).to.eql(7);//the number of charsets

    var txt = "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار";

    var j, all=0, contains=0, all2 =0, contains2=0;

    for(j=0; j < charsets.length; j++){
      //long way
      var allFct = lang.allCharSetFunction(charsets[j]);
      var containsFct = lang.containsCharSetFunction(charsets[j]);
      all += (allFct(txt))? 1 : 0;
      contains += (containsFct(txt))? 1 : 0;

      //short way
      lang.schars(charsets[j]);
      all2 += (lang.all(txt))? 1 : 0;
      contains2 += (lang.contains(txt))? 1 : 0;
    }

    expect(all).to.eql(0);
    expect(contains).to.eql(1);
    expect(all2).to.eql(0);
    expect(contains2).to.eql(1);
  });

  it("Transform", function(){
    // available Transformations
    // ==========================
    //long way
    expect(AraLang.listTransformations().length).to.eql(2);
    //short way
    expect(AraLang.ltrans().length).to.eql(2);

    //transformation
    //===============
    var arabicNum = "1234567890";
    var indicNum = "١٢٣٤٥٦٧٨٩٠";

    //long way
    var func = AraLang.transformationFunction("ind2ara");
    expect(func(indicNum)).to.eql(arabicNum);
    func = AraLang.transformationFunction("ara2ind");
    expect(func(arabicNum)).to.eql(indicNum);

    //short way
    AraLang.strans("ind2ara");
    expect(lang.trans(indicNum)).to.eql(arabicNum);
    AraLang.strans("ara2ind");
    expect(lang.trans(arabicNum)).to.eql(indicNum);

  });

});
