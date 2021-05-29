let AraInfo = import("../../src/ara/ara.info");
let expect = require('expect.js');

describe("Arabic Info", function(){

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
