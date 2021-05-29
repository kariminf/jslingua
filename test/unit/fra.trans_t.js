let FraTrans = import("../../src/fra/fra.trans");
let expect = require('expect.js');

let src = "ça, est un exemple."
let exp = {
  "morse": {
    "rev": "CA, EST UN EXEMPLE.",
    "dst": "-.-. .- --..--     . ... -     ..- -.     . -..- . -- .--. .-.. . .-.-.-"
  }
};

describe("French Transliteration", function(){

  it("Methods check", function(){
    var methods = FraTrans.ltrans();
    expect(methods.length).to.eql(1);//number of methods
    var j;
    for (j = 0; j < methods.length; j++){
      var method = methods[j];
      FraTrans.strans(method);
      expect(FraTrans.trans(src)).to.eql(exp[method].dst);//transliterate
      expect(FraTrans.untrans(exp[method].dst)).to.eql(exp[method].rev);//untransliterate
    }
  });

});
