let AraInfo;

let expect = require('expect.js');


describe("Arabic Info", function(){

  before(async () => {
    let module = await import("../../src/ara/ara.info.mjs");
    AraInfo = module.default;
  });

  it("Name", function(){
    expect(AraInfo.getName()).to.eql("Arabic");
  });

  it("Family", function(){
    expect(AraInfo.getFamily()).to.eql("Afro-Asiatic");
  });

  it("Branch", function(){
    expect(AraInfo.getBranch()).to.eql("Semitic");
  });

  it("Writing direction", function(){
    expect(AraInfo.getDir()).to.eql("rtl");
  });

  it("Words order", function(){
    expect(AraInfo.getWordOrder()).to.eql("vso");
  });

});
