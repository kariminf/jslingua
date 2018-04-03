var eng = new (require('../../eng/eng.lang'))();
var ara = new (require('../../ara/ara.lang'))();
var expect = require('expect.js');

describe("Lang Storage", function(){

  it("Storage Transformation", function(){
    let res = ["123", "890", "٥٦", "159"];
    ara.s.strans("ind2ara").trans("١٢٣").trans("٨٩٠")
          .strans("ara2ind").trans("56")
          .strans("ind2ara").trans("١٥٩");
    expect(ara.s.ltrans()).to.eql(res);
    expect(ara.s.clear().ltrans()).to.eql([]);
  });

  it("Storage 2 diff lang objects", function(){
    let res = ["123", "890", "٥٦", "159"];
    let res2 = ["AA", "aa", "bbb"];
    ara.s.strans("ind2ara").trans("١٢٣");
    eng.s.strans("min2maj").trans("aA").strans("maj2min").trans("aA");
    ara.s.trans("٨٩٠").strans("ara2ind").trans("56");
    eng.s.trans("BbB");
    ara.s.strans("ind2ara").trans("١٥٩");
    expect(ara.s.ltrans()).to.eql(res);
    expect(eng.s.ltrans()).to.eql(res2);
  });

  it("Storage 2 objects of same lang", function(){
    let res = ["123", "890", "٥٦", "159"];
    let res2 = ["12", "89", "٥", "15"];
    let ara2= new (require('../../ara/ara.lang'))();
    ara.s.strans("ind2ara").trans("١٢٣");
    ara2.s.strans("ind2ara").trans("١٢").trans("٨٩").strans("ara2ind");
    ara.s.trans("٨٩٠").strans("ara2ind").trans("56");
    ara2.s.trans("5").strans("ind2ara").trans("١٥");
    ara.s.strans("ind2ara").trans("١٥٩");
    console.log(ara.s.ltrans().length);
    expect(ara.s.ltrans()).to.eql(res);
    expect(ara2.s.ltrans()).to.eql(res2);
  });





});
