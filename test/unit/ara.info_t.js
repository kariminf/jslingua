let AraInfo;

let expect = require('expect.js');


describe("Arabic Info", function(){

  before(async () => {
    let module = await import("../../src/ara/ara.info.mjs");
    AraInfo = module.default;
  });

  it("Name", function(){
    expect(AraInfo.gname()).to.eql("Arabic");
  });

  it("Family", function(){
    expect(AraInfo.gfamily()).to.eql("Afro-Asiatic");
  });

  it("Branch", function(){
    expect(AraInfo.gbranch()).to.eql("Semitic");
  });

  it("Writing direction", function(){
    expect(AraInfo.gdir()).to.eql("rtl");
  });

  it("Words order", function(){
    expect(AraInfo.gorder()).to.eql("vso");
  });

});
