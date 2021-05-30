let FraInfo;
let expect = require('expect.js');

describe("French Info", function(){

  before(async () => {
    let module = await import("../../src/fra/fra.info.mjs");
    FraInfo = module.default;
  });

  it("Name", function(){
    expect(FraInfo.getName()).to.eql("French");
  });

  it("Family", function(){
    expect(FraInfo.getFamily()).to.eql("Indo-European");
  });

  it("Branch", function(){
    expect(FraInfo.getBranch()).to.eql("Romance");
  });

  it("Writing direction", function(){
    expect(FraInfo.getDir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(FraInfo.getWordOrder()).to.eql("svo");
  });

});
