let EngInfo;
let expect = require('expect.js');

describe("English Info", function(){

  before(async () => {
    let module = await import("../../src/eng/eng.info.mjs");
    EngInfo = module.default;
  });

  it("Name", function(){
    expect(EngInfo.getName()).to.eql("English");
  });

  it("Family", function(){
    expect(EngInfo.getFamily()).to.eql("Indo-European");
  });

  it("Branch", function(){
    expect(EngInfo.getBranch()).to.eql("Germanic");
  });

  it("Writing direction", function(){
    expect(EngInfo.getDir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(EngInfo.getWordOrder()).to.eql("svo");
  });

});
