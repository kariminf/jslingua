var JpnInfo = require('../../jpn/jpn.info');
var expect = require('expect.js');

var info = new JpnInfo();

describe("Japanese Info", function(){

  it("Name", function(){
    expect(info.getName()).to.eql("Japanese");
  });

  it("Family", function(){
    expect(info.getFamily()).to.eql("Japonic");
  });

  it("Branch", function(){
    expect(info.getBranch()).to.eql("");
  });

  it("Writing direction", function(){
    expect(info.getDir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(info.getWordOrder()).to.eql("sov");
  });

});
