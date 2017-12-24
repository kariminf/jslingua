var EngInfo = require('../../eng/eng.info');
var expect = require('expect.js');

var info = new EngInfo();

describe("English Info", function(){

  it("Name", function(){
    expect(info.getName()).to.eql("English");
  });

  it("Family", function(){
    expect(info.getFamily()).to.eql("Indo-European");
  });

  it("Branch", function(){
    expect(info.getBranch()).to.eql("Germanic");
  });

  it("Writing direction", function(){
    expect(info.getDir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(info.getWordOrder()).to.eql("svo");
  });

});
