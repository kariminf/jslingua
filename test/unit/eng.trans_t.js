let EngTrans = import("../../src/eng/eng.trans");
let expect = require('expect.js');

var src = "This is an example."
var exp = {
  "morse": {
    "rev": "THIS IS AN EXAMPLE.",
    "dst": "- .... .. ...     .. ...     .- -.     . -..- .- -- .--. .-.. . .-.-.-"
  }
};

describe("English Transliteration", function(){

  it("Methods check", function(){
    var methods = trans.ltrans();
    expect(methods.length).to.eql(1);//number of methods
    var j;
    for (j = 0; j < methods.length; j++){
      var method = methods[j];
      trans.strans(method);
      expect(trans.trans(src)).to.eql(exp[method].dst);//transliterate
      expect(trans.untrans(exp[method].dst)).to.eql(exp[method].rev);//untransliterate
    }
  });

});
