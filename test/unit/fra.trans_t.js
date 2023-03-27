let FraTrans;
let expect = require('expect.js');

let src = "ça, est un exemple."
let exp = {
  "morse": {
    "rev": "CA, EST UN EXEMPLE.",
    "dst": "-.-. .- --..--     . ... -     ..- -.     . -..- . -- .--. .-.. . .-.-.-"
  }
};

describe("French Transliteration", function(){

  before(async () => {
    let module = await import("../../src/fra/fra.trans.mjs");
    FraTrans = module.default;
  });

  it("Methods check", function(){
    var methods = FraTrans.l();
    expect(methods.length).to.eql(1);//number of methods
    var j;
    for (j = 0; j < methods.length; j++){
      var method = methods[j];
      FraTrans.s(method);
      expect(FraTrans.t(src)).to.eql(exp[method].dst);//transliterate
      expect(FraTrans.u(exp[method].dst)).to.eql(exp[method].rev);//untransliterate
    }
  });

});
