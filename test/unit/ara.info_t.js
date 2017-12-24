var EngInfo = require('../../ara/ara.info');
var expect = require('expect.js');

var info = new AraInfo();

describe("Arabic Info", function(){

  it("Name", function(){
    expect(info.getName()).to.eql("Arabic");
  });

  it("Family", function(){
    expect(info.getFamily()).to.eql("Afro-Asiatic");
  });

  it("Branch", function(){
    expect(info.getBranch()).to.eql("Semitic");
  });

  it("Writing direction", function(){
    expect(info.getDir()).to.eql("rtl");
  });

  it("Words order", function(){
    expect(info.getWordOrder()).to.eql("vso");
  });

});
