var EnglMorpho = require('../../eng/eng.morpho');
var expect = require('expect.js');

var morpho = new EnglMorpho();

describe("English Morphology ", function(){

  it("Stemming Engilsh words", function(){
      expect(morpho.stem("beautiful")).to.eql("beauti");
      expect(morpho.stem("information")).to.eql("inform");
      expect(morpho.stem("running")).to.eql("run");
  });
});
