
let expect = require('expect.js');

let morpho = new (require('../../morpho'))();
let eng = new (require('../../eng/eng.morpho'))();
let $ = Object.assign;//shorten the function



describe("Segmentation", function(){

  it("sentence segmentation", function(){
    let text = "Oh! How can you? It is not fair. You have to do something.";
    let res = ["Oh", "!", "How can you", "?", "It is not fair", ".", "You have to do something", "."];
    expect(morpho.splitToSentences(text)).to.eql(res);
  });

  it("words tokenization", function(){
    let text = "You have to do something";
    let res = ["You", "have", "to", "do", "something"];
    expect(morpho.tokenize(text)).to.eql(res);
  });

});

describe("Conjugation variations", function(){

  it("with form name", function(){
    let heSheIt = {person:"third", number:"singular"};
    expect(eng.conj("go", heSheIt, "pres")).to.eql("goes");
    expect(eng.conj("go", heSheIt, "past")).to.eql("went");
    expect(eng.conj("go", heSheIt, "fut")).to.eql("will go");
  });

});

describe("Morphology abbreviated functions ", function(){

  it("stemming", function() {
    eng.sstem("porter");
    expect(eng.stem("analogousli")).to.eql("analog");
    expect(eng.stem("vietnamization")).to.eql("vietnam");
    eng.sstem("lancaster");
    expect(eng.stem("maximum")).to.eql("maxim"); // Remove "-um" when word is intact 'maxim'
    expect(eng.stem("presumably")).to.eql("presum");
  });

  it("conjugation", function() {
    expect(eng.conj("go",$({tense:"present", person:"third", number:"singular"}))).to.eql("goes");
  });

  it("pos converter", function() {
    eng.sconv("sing2pl");
    expect(eng.conv("alley")).to.eql("alleys");
    expect(eng.conv("ally")).to.eql("allies");
  });

});

describe("Morphology storage chaining functions ", function(){

  it("stemming", function() {

    let res = ["analog", "vietnam", "maxim", "presum"];

    eng.s.clear().sstem("porter").stem("analogousli").stem("vietnamization")
                .sstem("lancaster").stem("maximum").stem("presumably")
    expect(eng.s.lstem()).to.eql(res);

  });

  it("conjugation", function() {
    let res = ["goes", "flies", "flew", "went", "will go"];
    let hesheit = {person: "third", number: "singular"};

    eng.s.clear().conj("go", $({tense:"present"}, hesheit)).conj("fly")
                .conj("fly", $({tense:"past"}, hesheit)).conj("go")
                .conj("go", $({tense:"future"}, hesheit));

    expect(eng.s.lconj()).to.eql(res);
  });

  it("pos converter", function() {
    let res = ["alleys", "allies",  "leaves"];

    eng.s.clear().sconv("sing2pl").conv("alley").conv("ally").conv("leaf");

    expect(eng.s.lconv()).to.eql(res);
  });

  it("mixed operations", function() {
    let resStem = ["analog", "vietnam", "maxim", "presum"];
    let resConj = ["goes", "flies", "flew", "went", "will go"];
    let hesheit = {person: "third", number: "singular"};
    let resConv = ["alleys", "allies",  "leaves"];

    eng.s.clear().sstem("porter").conj("go", $({tense:"present"}, hesheit))
                .stem("analogousli")
                .sconv("sing2pl").conv("alley")
                .stem("vietnamization")
                .conj("fly").conj("fly", $({tense:"past"}, hesheit))
                .conv("ally")
                .sstem("lancaster").stem("maximum")
                .conj("go").conj("go", $({tense:"future"}, hesheit))
                .conv("leaf")
                .stem("presumably");

    expect(eng.s.lstem()).to.eql(resStem);
    expect(eng.s.lconj()).to.eql(resConj);
    expect(eng.s.lconv()).to.eql(resConv);
  });

});
