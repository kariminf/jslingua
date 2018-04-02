var EngTrans = require('../../eng/eng.trans');
var expect = require('expect.js');

var src = "This is an example."
var exp = {
  "morse": {
    "rev": "THIS IS AN EXAMPLE.",
    "dst": "- .... .. ...     .. ...     .- -.     . -..- .- -- .--. .-.. . .-.-.-"
  }
};

var trans = new EngTrans();

describe("English Transliteration", function(){

  it("Methods check", function(){
    var methods = trans.availableMethods();
    expect(methods.length).to.eql(1);//number of methods
    var j;
    for (j = 0; j < methods.length; j++){
      var method = methods[j];
      trans.setCurrentMethod(method);
      expect(trans.transliterate(src)).to.eql(exp[method].dst);//transliterate
      expect(trans.untransliterate(exp[method].dst)).to.eql(exp[method].rev);//untransliterate
    }
  });

});
