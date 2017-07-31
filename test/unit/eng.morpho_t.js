var EnglMorpho = require('../../eng/eng.morpho');
var expect = require('expect.js');

var morpho = new EnglMorpho();

morpho.setCurrentStemmer("porterStemmer");
morpho.enableDebug();

describe("English Morphology porter stemmer ", function(){


  /*
    inspired from http://snowballstem.org/algorithms/porter/stemmer.html
  */
  it("Words have length < 3", function() {
      expect(morpho.stem("a")).to.eql("a");
      expect(morpho.stem("b")).to.eql("b");
      expect(morpho.stem("aa")).to.eql("aa");
      expect(morpho.stem("ab")).to.eql("ab");
      expect(morpho.stem("is")).to.eql("is");
      expect(morpho.stem("in")).to.eql("in");
      expect(morpho.stem("us")).to.eql("us");
  });

  it("Step 1a", function(){

      expect(morpho.stem("caresses")).to.eql("caress");
      expect(morpho.stem("ponies")).to.eql("poni");
      expect(morpho.stem("ties")).to.eql("ti");
      expect(morpho.stem("caress")).to.eql("caress");
      expect(morpho.stem("cats")).to.eql("cat");
  });

  it("Step 1b", function(){

    expect(morpho.stem("feed")).to.eql("feed");
    expect(morpho.stem("agreed")).to.eql("agre");
    expect(morpho.stem("plastered")).to.eql("plaster");
    expect(morpho.stem("bled")).to.eql("bled");
    expect(morpho.stem("motoring")).to.eql("motor");
    expect(morpho.stem("sing")).to.eql("sing");

  });

  it("Step 1c", function(){

    expect(morpho.stem("happy")).to.eql("happi");
    expect(morpho.stem("sky")).to.eql("sky");
  });

  it("Step 2", function(){

    expect(morpho.stem("relational")).to.eql("relat");
    expect(morpho.stem("conditional")).to.eql("condit");
    expect(morpho.stem("rational")).to.eql("ration");
    expect(morpho.stem("valenci")).to.eql("valenc");
    expect(morpho.stem("hesitanci")).to.eql("hesit");
    expect(morpho.stem("digitizer")).to.eql("digit");
    expect(morpho.stem("conformabli")).to.eql("conform");
    expect(morpho.stem("radicalli")).to.eql("radic");
    expect(morpho.stem("differentli")).to.eql("differ");
    expect(morpho.stem("vileli")).to.eql("vile");
    expect(morpho.stem("analogousli")).to.eql("analog");
    expect(morpho.stem("vietnamization")).to.eql("vietnam");
    expect(morpho.stem("predication")).to.eql("predic");
    expect(morpho.stem("operator")).to.eql("oper");
    expect(morpho.stem("feudalism")).to.eql("feudal");
    expect(morpho.stem("decisiveness")).to.eql("decis");
    expect(morpho.stem("hopefulness")).to.eql("hope");
    expect(morpho.stem("formaliti")).to.eql("formal");
    expect(morpho.stem("sensitiviti")).to.eql("sensit");
    expect(morpho.stem("sensibiliti")).to.eql("sensibl");
  });

  it("Step 3", function(){

    expect(morpho.stem("triplicate")).to.eql("triplic");
    expect(morpho.stem("formative")).to.eql("form");
    expect(morpho.stem("formalize")).to.eql("formal");
    expect(morpho.stem("electriciti")).to.eql("electr");
    expect(morpho.stem("electrical")).to.eql("electr");
    expect(morpho.stem("hopeful")).to.eql("hope");
    expect(morpho.stem("goodness")).to.eql("good");
  });

  it("Step 4", function(){

    expect(morpho.stem("revival")).to.eql("reviv");
    expect(morpho.stem("allowance")).to.eql("allow");
    expect(morpho.stem("inference")).to.eql("infer");
    expect(morpho.stem("airliner")).to.eql("airlin");
    expect(morpho.stem("gyroscopic")).to.eql("gyroscop");
    expect(morpho.stem("adjustable")).to.eql("adjust");
    expect(morpho.stem("defensible")).to.eql("defens");
    expect(morpho.stem("irritant")).to.eql("irrit");
    expect(morpho.stem("replacement")).to.eql("replac");
    expect(morpho.stem("adjustment")).to.eql("adjust");
    expect(morpho.stem("dependent")).to.eql("depend");
    expect(morpho.stem("adoption")).to.eql("adopt");
    expect(morpho.stem("homologou")).to.eql("homolog");
    expect(morpho.stem("communism")).to.eql("commun");
    expect(morpho.stem("activate")).to.eql("activ");
    expect(morpho.stem("angulariti")).to.eql("angular");
    expect(morpho.stem("homologous")).to.eql("homolog");
    expect(morpho.stem("effective")).to.eql("effect");
    expect(morpho.stem("bowdlerize")).to.eql("bowdler");
  });

  it("Step 5", function(){

    expect(morpho.stem("probate")).to.eql("probat");
    expect(morpho.stem("rate")).to.eql("rate");
    expect(morpho.stem("controll")).to.eql("control");
    expect(morpho.stem("roll")).to.eql("roll");
  });

});
