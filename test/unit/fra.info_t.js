var EngInfo = require('../../fra/fra.info');
var expect = require('expect.js');

var info = new FraInfo();

describe("French Info", function(){

  it("Name", function(){
    expect(info.getName()).to.eql("French");
  });

  it("Family", function(){
    expect(info.getFamily()).to.eql("Indo-European");
  });

  it("Branch", function(){
    expect(info.getBranch()).to.eql("Romance");
  });

  it("Writing direction", function(){
    expect(info.getDir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(info.getWordOrder()).to.eql("svo");
  });

});
