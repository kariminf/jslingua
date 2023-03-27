let FraInfo;
let expect = require('expect.js');

describe("French Info", function(){

  before(async () => {
    let module = await import("../../src/fra/fra.info.mjs");
    FraInfo = module.default;
  });

  it("Name", function(){
    expect(FraInfo.gname()).to.eql("French");
  });

  it("Family", function(){
    expect(FraInfo.gfamily()).to.eql("Indo-European");
  });

  it("Branch", function(){
    expect(FraInfo.gbranch()).to.eql("Romance");
  });

  it("Writing direction", function(){
    expect(FraInfo.gdir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(FraInfo.gorder()).to.eql("svo");
  });

});
