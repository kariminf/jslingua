let JpnLang;
let expect = require('expect.js');

describe("Japanese Lang", function(){

  before(async () => {
    let module = await import("../../src/jpn/jpn.lang.mjs");
    JpnLang = module.default;
  });

  it("pronounceNumber", function(){
    expect(JpnLang.nbr2words(1025)).to.eql("千二十五");
  });

  it("charSets", function(){
    let charsets = JpnLang.lchars();
    expect(charsets.length).to.eql(4);//the number of charsets
    let txt = "皆さん、こんにちは";
    let j, all=0, contains=0;
    for(j=0; j < charsets.length; j++){
      let verifyFcts = JpnLang.gcharverify(charsets[j]);
      all += (verifyFcts.every(txt))? 1 : 0;
      contains += (verifyFcts.some(txt))? 1 : 0;
    }
    expect(all).to.eql(0);
    expect(contains).to.eql(3);
  });

  it("Transform", function(){
    expect(JpnLang.ltrans().length).to.eql(2);
    let hiragana = "こんにちは";
    let katakana = "コンニチハ";
    let func = JpnLang.gtrans("hira2kata");
    expect(func(hiragana)).to.eql(katakana);
    func = JpnLang.gtrans("kata2hira");
    expect(func(katakana)).to.eql(hiragana);
    JpnLang.strans("hira2kata");
    expect(JpnLang.trans(hiragana)).to.eql(katakana);
    JpnLang.strans("kata2hira");
    expect(JpnLang.trans(katakana)).to.eql(hiragana);
  });

});
