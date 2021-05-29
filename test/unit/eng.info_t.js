let EngInfo = import("../../src/eng/eng.info");
let expect = require('expect.js');

describe("English Info", function(){

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
