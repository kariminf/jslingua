let AraTrans;
let expect = require('expect.js');

let src = "ذلك البرنامج مسلّ";
let exp = {
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

describe("Arabic Transliteration", function(){

  before(async () => {
    let module = await import("../../src/ara/ara.trans.mjs");
    AraTrans = module.default;
  });

  it("Methods check", function(){
    var methods = AraTrans.ltrans();
    expect(methods.length).to.eql(3);//number of methods
    var j;
    for (j = 0; j < methods.length; j++){
      var method = methods[j];
      AraTrans.strans(method);
      expect(AraTrans.trans(src)).to.eql(exp[method].dst);//transliterate
      expect(AraTrans.untrans(exp[method].dst)).to.eql(exp[method].rev);//untransliterate
    }
  });

});
