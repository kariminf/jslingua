let AraLang;
let expect = require('expect.js');

describe("Arabic Lang", function(){

  before(async () => {
    let module = await import("../../src/ara/ara.lang.mjs");
    AraLang = module.default;
  });

  it("pronounceNumber", function(){
    //long way
    expect(AraLang.pronounceNumber(1025)).to.eql("ألف وخمسة وعشرون");
    //short way
    expect(AraLang.nbr2str(1025)).to.eql("ألف وخمسة وعشرون");
  });

  it("charSets", function(){
    //long way
    let charsets = AraLang.listCharSets();
    expect(charsets.length).to.eql(7);//the number of charsets
    //short way
    charsets = AraLang.lchars();
    expect(charsets.length).to.eql(7);//the number of charsets

    let txt = "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار";

    let j, all=0, contains=0, all2 =0, contains2=0;

    for(j=0; j < charsets.length; j++){
      //long way
      let verifyFcts = AraLang.getCharSetFunctions(charsets[j]);
      all += (verifyFcts.all(txt))? 1 : 0;
      contains += (verifyFcts.contains(txt))? 1 : 0;

      //short way
      AraLang.schars(charsets[j]);
      all2 += (AraLang.all(txt))? 1 : 0;
      contains2 += (AraLang.contains(txt))? 1 : 0;
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
    var func = AraLang.getTransformationFunction("ind2ara");
    expect(func(indicNum)).to.eql(arabicNum);
    func = AraLang.gtrans("ara2ind");
    expect(func(arabicNum)).to.eql(indicNum);

    //short way
    AraLang.strans("ind2ara");
    expect(AraLang.trans(indicNum)).to.eql(arabicNum);
    AraLang.strans("ara2ind");
    expect(AraLang.trans(arabicNum)).to.eql(indicNum);

  });

});
