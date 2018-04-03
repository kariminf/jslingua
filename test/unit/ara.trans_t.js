var AraTrans = require('../../ara/ara.trans');
var expect = require('expect.js');

var src = "ذلك البرنامج مسلّ";
var exp = {
  "buckwalter": {
    "rev": "ذلك البرنامج مسلّ",
    "dst": "*lk AlbrnAmj msl~"
  },
  "arabtex": {
    "rev": "ذلك البرنامج مسلّ",
    "dst": "_dlk AlbrnAmj mslxx"
  },
  "morse": {
    "rev": "ذلك البرنامج مسل",
    "dst": "--.. .-.. -.-     .- .-.. -... .-. -. .- -- .---     -- ... .-.."
  }
};

var trans = new AraTrans();

describe("Arabic Transliteration", function(){

  it("Methods check", function(){
    var methods = trans.availableMethods();
    expect(methods.length).to.eql(3);//number of methods
    var j;
    for (j = 0; j < methods.length; j++){
      var method = methods[j];
      trans.setCurrentMethod(method);
      expect(trans.transliterate(src)).to.eql(exp[method].dst);//transliterate
      expect(trans.untransliterate(exp[method].dst)).to.eql(exp[method].rev);//untransliterate
    }
  });

});
