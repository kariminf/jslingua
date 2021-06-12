let EngTrans;
let expect = require('expect.js');

let src = "This is an example."
let exp = {
  "morse": {
    "rev": "THIS IS AN EXAMPLE.",
    "dst": "- .... .. ...     .. ...     .- -.     . -..- .- -- .--. .-.. . .-.-.-"
  }
};

describe("English Transliteration", function(){

  before(async () => {
    let module = await import("../../src/eng/eng.trans.mjs");
    EngTrans = module.default;
  });

  it("Methods check", function(){
    var methods = EngTrans.l();
    expect(methods.length).to.eql(1);//number of methods
    var j;
    for (j = 0; j < methods.length; j++){
      var method = methods[j];
      EngTrans.s(method);
      expect(EngTrans.t(src)).to.eql(exp[method].dst);//transliterate
      expect(EngTrans.u(exp[method].dst)).to.eql(exp[method].rev);//untransliterate
    }
  });

});
