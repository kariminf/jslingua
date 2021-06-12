let FraLang;
let expect = require('expect.js');

describe("French Lang", function(){

  before(async () => {
    let module = await import("../../src/fra/fra.lang.mjs");
    FraLang = module.default;
  });

  it("pronounceNumber", function(){
    expect(FraLang.nbr2words(1025)).to.eql("mille vingt-cinq");
  });

  it("charSets", function(){
    let charsets = FraLang.lchars();
    expect(charsets.length).to.eql(2);//the number of charsets
    let txt = "ça dépend.";
    let j, all=0, contains=0;
    for(j=0; j < charsets.length; j++){
      let verifyFcts = FraLang.gcharverify(charsets[j]);
      all += (verifyFcts.every(txt))? 1 : 0;
      contains += (verifyFcts.some(txt))? 1 : 0;
    }
    expect(all).to.eql(0);
    expect(contains).to.eql(2);
  });

  it("Transform", function(){
    expect(FraLang.ltrans().length).to.eql(2);
    let min = "azertyçùéèà";
    let maj = "AZERTYÇÙÉÈÀ";
    let func = FraLang.gtrans("min2maj");
    expect(func(min)).to.eql(maj);
    func = FraLang.gtrans("maj2min");
    expect(func(maj)).to.eql(min);

    FraLang.strans("min2maj");
    expect(FraLang.trans(min)).to.eql(maj);
    FraLang.strans("maj2min");
    expect(FraLang.trans(maj)).to.eql(min);
  });

});
