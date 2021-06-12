let EngInfo;
let expect = require('expect.js');

describe("English Info", function(){

  before(async () => {
    let module = await import("../../src/eng/eng.info.mjs");
    EngInfo = module.default;
  });

  it("Name", function(){
    expect(EngInfo.gname()).to.eql("English");
  });

  it("Family", function(){
    expect(EngInfo.gfamily()).to.eql("Indo-European");
  });

  it("Branch", function(){
    expect(EngInfo.gbranch()).to.eql("Germanic");
  });

  it("Writing direction", function(){
    expect(EngInfo.gdir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(EngInfo.gorder()).to.eql("svo");
  });

});
