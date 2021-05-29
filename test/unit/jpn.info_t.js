let JpnInfo = import("../../src/jpn/jpn.info");
let expect = require('expect.js');

describe("Japanese Info", function(){

  it("Name", function(){
    expect(JpnInfo.getName()).to.eql("Japanese");
  });

  it("Family", function(){
    expect(JpnInfo.getFamily()).to.eql("Japonic");
  });

  it("Branch", function(){
    expect(JpnInfo.getBranch()).to.eql("");
  });

  it("Writing direction", function(){
    expect(JpnInfo.getDir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(JpnInfo.getWordOrder()).to.eql("sov");
  });

});
