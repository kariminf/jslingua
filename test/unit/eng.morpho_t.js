var EnglMorpho = require('../../eng/eng.morpho');
var expect = require('expect.js');

var morpho = new EnglMorpho();

describe("English Morphology porter stemmer ", function(){
  /*
    inspired from http://snowballstem.org/algorithms/porter/stemmer.html
  */
  it("Words have length < 3", function() {
      expect(morpho.stem("porterStemmer","a")).to.eql("a");
      expect(morpho.stem("porterStemmer","b")).to.eql("b");
      expect(morpho.stem("porterStemmer","aa")).to.eql("aa");
      expect(morpho.stem("porterStemmer","ab")).to.eql("ab");
      expect(morpho.stem("porterStemmer","is")).to.eql("is");
      expect(morpho.stem("porterStemmer","in")).to.eql("in");
      expect(morpho.stem("porterStemmer","us")).to.eql("us");
  });

  it("Step 1a", function(){

      expect(morpho.stem("porterStemmer","caresses")).to.eql("caress");
      expect(morpho.stem("porterStemmer","ponies")).to.eql("poni");
      expect(morpho.stem("porterStemmer","ties")).to.eql("ti");
      expect(morpho.stem("porterStemmer","caress")).to.eql("caress");
      expect(morpho.stem("porterStemmer","cats")).to.eql("cat");
  });

  it("Step 1b", function(){

    expect(morpho.stem("porterStemmer","feed")).to.eql("feed");
    expect(morpho.stem("porterStemmer","agreed")).to.eql("agre");
    expect(morpho.stem("porterStemmer","plastered")).to.eql("plaster");
    expect(morpho.stem("porterStemmer","bled")).to.eql("bled");
    expect(morpho.stem("porterStemmer","motoring")).to.eql("motor");
    expect(morpho.stem("porterStemmer","sing")).to.eql("sing");

  });

  it("Step 1c", function(){

    expect(morpho.stem("porterStemmer","happy")).to.eql("happi");
    expect(morpho.stem("porterStemmer","sky")).to.eql("sky");
  });

  it("Step 2", function(){

    expect(morpho.stem("porterStemmer","relational")).to.eql("relat");
    expect(morpho.stem("porterStemmer","conditional")).to.eql("condit");
    expect(morpho.stem("porterStemmer","rational")).to.eql("ration");
    expect(morpho.stem("porterStemmer","valenci")).to.eql("valenc");
    expect(morpho.stem("porterStemmer","hesitanci")).to.eql("hesit");
    expect(morpho.stem("porterStemmer","digitizer")).to.eql("digit");
    expect(morpho.stem("porterStemmer","conformabli")).to.eql("conform");
    expect(morpho.stem("porterStemmer","radicalli")).to.eql("radic");
    expect(morpho.stem("porterStemmer","differentli")).to.eql("differ");
    expect(morpho.stem("porterStemmer","vileli")).to.eql("vile");
    expect(morpho.stem("porterStemmer","analogousli")).to.eql("analog");
    expect(morpho.stem("porterStemmer","vietnamization")).to.eql("vietnam");
    expect(morpho.stem("porterStemmer","predication")).to.eql("predic");
    expect(morpho.stem("porterStemmer","operator")).to.eql("oper");
    expect(morpho.stem("porterStemmer","feudalism")).to.eql("feudal");
    expect(morpho.stem("porterStemmer","decisiveness")).to.eql("decis");
    expect(morpho.stem("porterStemmer","hopefulness")).to.eql("hope");
    expect(morpho.stem("porterStemmer","formaliti")).to.eql("formal");
    expect(morpho.stem("porterStemmer","sensitiviti")).to.eql("sensit");
    expect(morpho.stem("porterStemmer","sensibiliti")).to.eql("sensibl");
  });

  it("Step 3", function(){

    expect(morpho.stem("porterStemmer","triplicate")).to.eql("triplic");
    expect(morpho.stem("porterStemmer","formative")).to.eql("form");
    expect(morpho.stem("porterStemmer","formalize")).to.eql("formal");
    expect(morpho.stem("porterStemmer","electriciti")).to.eql("electr");
    expect(morpho.stem("porterStemmer","electrical")).to.eql("electr");
    expect(morpho.stem("porterStemmer","hopeful")).to.eql("hope");
    expect(morpho.stem("porterStemmer","goodness")).to.eql("good");
  });

  it("Step 4", function(){

    expect(morpho.stem("porterStemmer","revival")).to.eql("reviv");
    expect(morpho.stem("porterStemmer","allowance")).to.eql("allow");
    expect(morpho.stem("porterStemmer","inference")).to.eql("infer");
    expect(morpho.stem("porterStemmer","airliner")).to.eql("airlin");
    expect(morpho.stem("porterStemmer","gyroscopic")).to.eql("gyroscop");
    expect(morpho.stem("porterStemmer","adjustable")).to.eql("adjust");
    expect(morpho.stem("porterStemmer","defensible")).to.eql("defens");
    expect(morpho.stem("porterStemmer","irritant")).to.eql("irrit");
    expect(morpho.stem("porterStemmer","replacement")).to.eql("replac");
    expect(morpho.stem("porterStemmer","adjustment")).to.eql("adjust");
    expect(morpho.stem("porterStemmer","dependent")).to.eql("depend");
    expect(morpho.stem("porterStemmer","adoption")).to.eql("adopt");
    expect(morpho.stem("porterStemmer","homologou")).to.eql("homolog");
    expect(morpho.stem("porterStemmer","communism")).to.eql("commun");
    expect(morpho.stem("porterStemmer","activate")).to.eql("activ");
    expect(morpho.stem("porterStemmer","angulariti")).to.eql("angular");
    expect(morpho.stem("porterStemmer","homologous")).to.eql("homolog");
    expect(morpho.stem("porterStemmer","effective")).to.eql("effect");
    expect(morpho.stem("porterStemmer","bowdlerize")).to.eql("bowdler");
  });

  it("Step 5", function(){

    expect(morpho.stem("porterStemmer","probate")).to.eql("probat");
    expect(morpho.stem("porterStemmer","rate")).to.eql("rate");
    expect(morpho.stem("porterStemmer","controll")).to.eql("control");
    expect(morpho.stem("porterStemmer","roll")).to.eql("roll");
  });

});
