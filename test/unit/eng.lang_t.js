let EngLang;
let expect = require('expect.js');

describe("English Lang", function(){

  before(async () => {
    let module = await import("../../src/eng/eng.lang.mjs");
    EngLang = module.default;
  });

  it("pronounceNumber", function(){
    expect(EngLang.nbr2words(1025)).to.eql("one thousand, twenty-five");
  });

  it("charSets", function(){
    let charsets = EngLang.lchars();
    expect(charsets.length).to.eql(1);//the number of charsets
    let txt = "I am in the charset.";
    let j, all=0, contains=0;
    for(j=0; j < charsets.length; j++){
      let verifyFcts = EngLang.gcharverify(charsets[j]);
      all += (verifyFcts.every(txt))? 1 : 0;
      contains += (verifyFcts.some(txt))? 1 : 0;
    }
    expect(all).to.eql(1);
    expect(contains).to.eql(1);
  });

  it("Transform", function(){
    expect(EngLang.ltrans().length).to.eql(2);
    let min = "azerty";
    let maj = "AZERTY";
    let func = EngLang.gtrans("min2maj");
    expect(func(min)).to.eql(maj);
    func = EngLang.gtrans("maj2min");
    expect(func(maj)).to.eql(min);

    EngLang.strans("min2maj");
    expect(EngLang.trans(min)).to.eql(maj);
    EngLang.strans("maj2min");
    expect(EngLang.trans(maj)).to.eql(min);
  });

});
