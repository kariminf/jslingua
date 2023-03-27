/*
let EngLang = require('../../src/eng/eng.lang');
let AraLang = require('../../src/ara/ara.lang');
let expect = require('expect.js');
describe("Lang Storage", function(){

  it("Storage Transformation", function(){
    let res = ["123", "890", "٥٦", "159"];
    ara.s.clear();//from the last use
    ara.s.strans("ind2ara").trans("١٢٣").trans("٨٩٠")
          .strans("ara2ind").trans("56")
          .strans("ind2ara").trans("١٥٩");
    expect(ara.s.ltrans()).to.eql(res);
    expect(ara.s.clear().ltrans()).to.eql([]);
  });

  it("Storage 2 diff lang objects", function(){
    let res = ["123", "890", "٥٦", "159"];
    let res2 = ["AA", "aa", "bbb"];
    ara.s.clear();//from the last use
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
    ara.s.clear();//from the last use
    //no need to clear ara2, since it is new here
    ara.s.strans("ind2ara").trans("١٢٣");
    ara2.s.strans("ind2ara").trans("١٢").trans("٨٩").strans("ara2ind");
    ara.s.trans("٨٩٠").strans("ara2ind").trans("56");
    ara2.s.trans("5").strans("ind2ara").trans("١٥");
    ara.s.strans("ind2ara").trans("١٥٩");
    //console.log(ara.s.ltrans().length);
    expect(ara.s.ltrans()).to.eql(res);
    expect(ara2.s.ltrans()).to.eql(res2);
  });

  it("Storage number pronounciation", function(){
    let res = ["five", "twelve", "eight hundred, seventy-five", "minus twenty-three"];
    let num = [5, 12, 875, -23];

    eng.s.clear();
    eng.s.nbr2str(5).nbr2str(12).nbr2str(875).nbr2str(-23);
    expect(eng.s.lnbr2str()).to.eql(res);

    //Other way
    eng.s.clear();
    for (let i=0; i<num.length; i++) eng.s.nbr2str(num[i]);
    expect(eng.s.lnbr2str()).to.eql(res);
  });

});

*/
