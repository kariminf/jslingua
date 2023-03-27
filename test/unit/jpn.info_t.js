let JpnInfo;
let expect = require('expect.js');

describe("Japanese Info", function(){

  before(async () => {
    let module = await import("../../src/jpn/jpn.info.mjs");
    JpnInfo = module.default;
  });

  it("Name", function(){
    expect(JpnInfo.gname()).to.eql("Japanese");
  });

  it("Family", function(){
    expect(JpnInfo.gfamily()).to.eql("Japonic");
  });

  it("Branch", function(){
    expect(JpnInfo.gbranch()).to.eql("");
  });

  it("Writing direction", function(){
    expect(JpnInfo.gdir()).to.eql("ltr");
  });

  it("Words order", function(){
    expect(JpnInfo.gorder()).to.eql("sov");
  });

});
