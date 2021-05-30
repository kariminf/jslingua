let JpnInfo;
let expect = require('expect.js');

describe("Japanese Info", function(){

  before(async () => {
    let module = await import("../../src/jpn/jpn.info.mjs");
    JpnInfo = module.default;
  });

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
