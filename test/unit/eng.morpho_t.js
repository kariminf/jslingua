let EngMorpho = import("../../src/eng/eng.morpho");
let expect = require('expect.js');

//EngMorpho.enableDebug();

describe("English Morphology porter stemmer ", function(){

  before(function(){
    EngMorpho.sstem("porter");
  });

  /*
  inspired from http://snowballstem.org/algorithms/porter/stemmer.html
  */
  it("Words have length < 3", function() {
    expect(EngMorpho.stem("a")).to.eql("a");
    expect(EngMorpho.stem("b")).to.eql("b");
    expect(EngMorpho.stem("aa")).to.eql("aa");
    expect(EngMorpho.stem("ab")).to.eql("ab");
    expect(EngMorpho.stem("is")).to.eql("is");
    expect(EngMorpho.stem("in")).to.eql("in");
    expect(EngMorpho.stem("us")).to.eql("us");
  });

  it("Step 1a", function(){

    expect(EngMorpho.stem("caresses")).to.eql("caress");
    expect(EngMorpho.stem("ponies")).to.eql("poni");
    expect(EngMorpho.stem("ties")).to.eql("ti");
    expect(EngMorpho.stem("caress")).to.eql("caress");
    expect(EngMorpho.stem("cats")).to.eql("cat");
  });

  it("Step 1b", function(){

    expect(EngMorpho.stem("feed")).to.eql("feed");
    expect(EngMorpho.stem("agreed")).to.eql("agre");
    expect(EngMorpho.stem("plastered")).to.eql("plaster");
    expect(EngMorpho.stem("bled")).to.eql("bled");
    expect(EngMorpho.stem("motoring")).to.eql("motor");
    expect(EngMorpho.stem("sing")).to.eql("sing");

  });

  it("Step 1c", function(){

    expect(EngMorpho.stem("happy")).to.eql("happi");
    expect(EngMorpho.stem("sky")).to.eql("sky");
  });

  it("Step 2", function(){

    expect(EngMorpho.stem("relational")).to.eql("relat");
    expect(EngMorpho.stem("conditional")).to.eql("condit");
    expect(EngMorpho.stem("rational")).to.eql("ration");
    expect(EngMorpho.stem("valenci")).to.eql("valenc");
    expect(EngMorpho.stem("hesitanci")).to.eql("hesit");
    expect(EngMorpho.stem("digitizer")).to.eql("digit");
    expect(EngMorpho.stem("conformabli")).to.eql("conform");
    expect(EngMorpho.stem("radicalli")).to.eql("radic");
    expect(EngMorpho.stem("differentli")).to.eql("differ");
    expect(EngMorpho.stem("vileli")).to.eql("vile");
    expect(EngMorpho.stem("analogousli")).to.eql("analog");
    expect(EngMorpho.stem("vietnamization")).to.eql("vietnam");
    expect(EngMorpho.stem("predication")).to.eql("predic");
    expect(EngMorpho.stem("operator")).to.eql("oper");
    expect(EngMorpho.stem("feudalism")).to.eql("feudal");
    expect(EngMorpho.stem("decisiveness")).to.eql("decis");
    expect(EngMorpho.stem("hopefulness")).to.eql("hope");
    expect(EngMorpho.stem("formaliti")).to.eql("formal");
    expect(EngMorpho.stem("sensitiviti")).to.eql("sensit");
    expect(EngMorpho.stem("sensibiliti")).to.eql("sensibl");
  });

  it("Step 3", function(){

    expect(EngMorpho.stem("triplicate")).to.eql("triplic");
    expect(EngMorpho.stem("formative")).to.eql("form");
    expect(EngMorpho.stem("formalize")).to.eql("formal");
    expect(EngMorpho.stem("electriciti")).to.eql("electr");
    expect(EngMorpho.stem("electrical")).to.eql("electr");
    expect(EngMorpho.stem("hopeful")).to.eql("hope");
    expect(EngMorpho.stem("goodness")).to.eql("good");
  });

  it("Step 4", function(){

    expect(EngMorpho.stem("revival")).to.eql("reviv");
    expect(EngMorpho.stem("allowance")).to.eql("allow");
    expect(EngMorpho.stem("inference")).to.eql("infer");
    expect(EngMorpho.stem("airliner")).to.eql("airlin");
    expect(EngMorpho.stem("gyroscopic")).to.eql("gyroscop");
    expect(EngMorpho.stem("adjustable")).to.eql("adjust");
    expect(EngMorpho.stem("defensible")).to.eql("defens");
    expect(EngMorpho.stem("irritant")).to.eql("irrit");
    expect(EngMorpho.stem("replacement")).to.eql("replac");
    expect(EngMorpho.stem("adjustment")).to.eql("adjust");
    expect(EngMorpho.stem("dependent")).to.eql("depend");
    expect(EngMorpho.stem("adoption")).to.eql("adopt");
    expect(EngMorpho.stem("homologou")).to.eql("homolog");
    expect(EngMorpho.stem("communism")).to.eql("commun");
    expect(EngMorpho.stem("activate")).to.eql("activ");
    expect(EngMorpho.stem("angulariti")).to.eql("angular");
    expect(EngMorpho.stem("homologous")).to.eql("homolog");
    expect(EngMorpho.stem("effective")).to.eql("effect");
    expect(EngMorpho.stem("bowdlerize")).to.eql("bowdler");
  });

  it("Step 5", function(){

    expect(EngMorpho.stem("probate")).to.eql("probat");
    expect(EngMorpho.stem("rate")).to.eql("rate");
    expect(EngMorpho.stem("controll")).to.eql("control");
    expect(EngMorpho.stem("roll")).to.eql("roll");
  });

});
// Lancaster Stemmer Unitary tests
describe("English Morphology Lancaster Stemmer", function(){

        before(function(){
          EngMorpho.setCurrentStemmer("lancaster");
        });

        it("Strip suffixes", function(){
          expect(EngMorpho.stem("maximum")).to.eql("maxim"); // Remove "-um" when word is intact 'maxim'
          expect(EngMorpho.stem("presumably")).to.eql("presum"); // Don't remove "-um" when word is not intact 'presum'
          expect(EngMorpho.stem("multiply")).to.eql("multiply"); // No action taken if word ends with "-ply" 'multiply'
          expect(EngMorpho.stem("provision")).to.eql("provid"); // Replace "-sion" with "-j" to trigger "j" set of rules 'provid'
          expect(EngMorpho.stem("owed")).to.eql("ow"); // Word starting with vowel must contain at least 2 letters 'ow'
          expect(EngMorpho.stem("ear")).to.eql("ear"); //  ditto 'ear'
          expect(EngMorpho.stem("saying")).to.eql("say"); // Words starting with consonant must contain at least 3'say
          expect(EngMorpho.stem("crying")).to.eql("cry"); // letters and one of those letters must be a vowel 'cry'
          expect(EngMorpho.stem("string")).to.eql("string"); // ditto 'string'
          expect(EngMorpho.stem("meant")).to.eql("meant"); // ditto 'meant'
          expect(EngMorpho.stem("cement")).to.eql("cem"); // ditto 'cem'
          //expect(EngMorpho.stem("ness")).to.eql("nest"); // Change s to t 'nest' TODO: Make it change s to t 'nest'
        });

        /*it('Strip Prefixes', function(){ TODO: make it strip Prefixes
          expect(EngMorpho.stem("kilometer")).to.eql("met");
        });*/
});

var I = {person:"first", number:"singular"};
var heSheIt = {person:"third", number:"singular"};
var they = {person:"third", number:"plural"};
var you = {person:"second"};
var $ = Object.assign;//shorten the function

describe("English Verb conjugation", function(){

  it("Present simple", function() {
    //Verbs end with o
    expect(EngMorpho.conj("go",$({tense:"present"}, I))).to.eql("go");
    expect(EngMorpho.conj("go",$({tense:"present"}, heSheIt))).to.eql("goes");
    //Verbs end with vowal + y
    expect(EngMorpho.conj("stay",$({tense:"present"}, I))).to.eql("stay");
    expect(EngMorpho.conjugate("stay",$({tense:"present"}, heSheIt))).to.eql("stays");
    //Verbs end with cons. + y
    expect(EngMorpho.conjugate("try",$({tense:"present"}, I))).to.eql("try");
    expect(EngMorpho.conjugate("try",$({tense:"present"}, heSheIt))).to.eql("tries");
    //Be
    expect(EngMorpho.conjugate("be",$({tense:"present"}, I))).to.eql("am");
    expect(EngMorpho.conjugate("be",$({tense:"present"}, heSheIt))).to.eql("is");
    expect(EngMorpho.conjugate("be",$({tense:"present"}, they))).to.eql("are");
    //Override
    expect(EngMorpho.conjugate("override",$({tense:"present"}, I))).to.eql("override");
    expect(EngMorpho.conjugate("override",$({tense:"present"}, heSheIt))).to.eql("overrides");

  });

  it("Past simple", function() {
    //Regular
    expect(EngMorpho.conjugate("dream",$({tense:"past"}, I))).to.eql("dreamed");
    //Regular vowal + y
    expect(EngMorpho.conjugate("stay",$({tense:"past"}, I))).to.eql("stayed");
    //Regular  cons. + y
    expect(EngMorpho.conjugate("try",$({tense:"past"}, I))).to.eql("tried");
    //irregular0 No change
    expect(EngMorpho.conjugate("cut",$({tense:"past"}, I))).to.eql("cut");
    //irregular1 past == past participle
    expect(EngMorpho.conjugate("buy",$({tense:"past"}, I))).to.eql("bought");
    //irregular2 past != past participle
    expect(EngMorpho.conjugate("eat",$({tense:"past"}, I))).to.eql("ate");
    //Be
    expect(EngMorpho.conjugate("be",$({tense:"past"}, I))).to.eql("was");
    expect(EngMorpho.conjugate("be",$({tense:"past"}, heSheIt))).to.eql("was");
    expect(EngMorpho.conjugate("be",$({tense:"past"}, they))).to.eql("were");
    //Go
    expect(EngMorpho.conjugate("go",$({tense:"past"}, I))).to.eql("went");
    //Override
    expect(EngMorpho.conjugate("override",$({tense:"past"}, I))).to.eql("overrode");

  });

  //Past simple test
  it("Past simple passive", function() {
    //Regular
    expect(EngMorpho.conjugate("dream",$({tense:"past", voice: "passive"}, I))).to.eql("was dreamed");
    //irregular0 No change
    expect(EngMorpho.conjugate("cut",$({tense:"past", voice: "passive"}, I))).to.eql("was cut");
    //irregular1 past == past participle
    expect(EngMorpho.conjugate("buy",$({tense:"past", voice: "passive"}, I))).to.eql("was bought");
    //irregular2 past != past participle
    expect(EngMorpho.conjugate("eat",$({tense:"past", voice: "passive"}, I))).to.eql("was eaten");
    //Be
    expect(EngMorpho.conjugate("be",$({tense:"past", voice: "passive"}, I))).to.eql("was been");
    //Go
    expect(EngMorpho.conjugate("go",$({tense:"past", voice: "passive"}, I))).to.eql("was gone");
    //Override
    expect(EngMorpho.conjugate("override",$({tense:"past", voice: "passive"}, I))).to.eql("was overridden");

  });

  //Past participle test
  it("Present perfect", function() {
    //Regular
    expect(EngMorpho.conjugate("dream",$({tense:"past", aspect: "perfect"}, I))).to.eql("had dreamed");
    //irregular0 No change
    expect(EngMorpho.conjugate("cut",$({tense:"past", aspect: "perfect"}, I))).to.eql("had cut");
    //irregular1 past == past participle
    expect(EngMorpho.conjugate("buy",$({tense:"past", aspect: "perfect"}, I))).to.eql("had bought");
    //irregular2 past != past participle
    expect(EngMorpho.conjugate("eat",$({tense:"past", aspect: "perfect"}, I))).to.eql("had eaten");
    //Be
    expect(EngMorpho.conjugate("be",$({tense:"past", aspect: "perfect"}, I))).to.eql("had been");
    //Go
    expect(EngMorpho.conjugate("go",$({tense:"past", aspect: "perfect"}, I))).to.eql("had gone");
    //Override
    expect(EngMorpho.conjugate("override",$({tense:"past", aspect: "perfect"}, I))).to.eql("had overridden");

  });

  //Present participle test: -ing
  it("Past perfect continuous", function() {
    //Normal
    expect(EngMorpho.conjugate("dream",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been dreaming");

    //ends with a vowel + cons. (with no further vowels)
    expect(EngMorpho.conjugate("cut",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been cutting");
    expect(EngMorpho.conjugate("swim",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been swimming");
    expect(EngMorpho.conjugate("dream",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been dreaming");

    //ends with a vowel + y (with no further vowels)
    expect(EngMorpho.conjugate("buy",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been buying");

    //Ends with e
    expect(EngMorpho.conjugate("be",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been being");
    expect(EngMorpho.conjugate("write",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been writing");

    //lie and die
    expect(EngMorpho.conjugate("lie",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been lying");
    expect(EngMorpho.conjugate("die",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been dying");

    //override
    expect(EngMorpho.conjugate("override",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been overriding");
  });

  it("Negation", function() {
    //Present, I, negated
    expect(EngMorpho.conjugate("dream",$({tense:"present", negated:1}, I))).to.eql("do not dream");

    //Present, He She It, negated
    expect(EngMorpho.conjugate("dream",$({tense:"present", negated:1}, heSheIt))).to.eql("does not dream");

    //Future, I, perfect continuous, negated
    expect(EngMorpho.conjugate("cut",$({tense:"future", aspect: "perfect-continuous", negated:1}, I)))
    .to.eql("will not have been cutting");

  });

  it("Imperative mood", function() {
    //No imperative with first person
    expect(EngMorpho.conjugate("drink", $({mood:"imperative"}, I))).to.eql("");

    //No imperative with third person
    expect(EngMorpho.conjugate("eat", $({mood:"imperative"}, heSheIt))).to.eql("");

    //Imperative with second person
    expect(EngMorpho.conjugate("buy", $({mood:"imperative"}, you))).to.eql("buy");


  });

});

describe("English Morphology Pos Converter ", function(){

  it("Singular to plural", function() {
    EngMorpho.sconv("sing2pl");

    expect(EngMorpho.conv("address")).to.eql("addresses");
    expect(EngMorpho.conv("box")).to.eql("boxes");
    expect(EngMorpho.conv("match")).to.eql("matches");
    expect(EngMorpho.convertPoS("quiz")).to.eql("quizzes");
    expect(EngMorpho.convertPoS("ox")).to.eql("oxen");

    expect(EngMorpho.convertPoS("alley")).to.eql("alleys");
    expect(EngMorpho.convertPoS("ally")).to.eql("allies");

    expect(EngMorpho.convertPoS("life")).to.eql("lives");
    expect(EngMorpho.convertPoS("leaf")).to.eql("leaves");
    expect(EngMorpho.convertPoS("staff")).to.eql("staffs");


    expect(EngMorpho.convertPoS("cat")).to.eql("cats");
    //TODO complete
  });


});
