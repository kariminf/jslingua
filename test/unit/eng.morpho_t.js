var EnglMorpho = require('../../eng/eng.morpho');
var expect = require('expect.js');

var morpho = new EnglMorpho();

morpho.setCurrentStemmer("porterStemmer");
//morpho.enableDebug();

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
// Lancaster Stemmer Unitary tests
describe("English Morphology Lancaster Stemmer", function(){

        before(function(){
          morpho.setCurrentStemmer("lancasterStemmer");
        });

        it("Strip suffixes", function(){
          expect(morpho.stem("maximum")).to.eql("maxim"); // Remove "-um" when word is intact 'maxim'
          expect(morpho.stem("presumably")).to.eql("presum"); // Don't remove "-um" when word is not intact 'presum'
          expect(morpho.stem("multiply")).to.eql("multiply"); // No action taken if word ends with "-ply" 'multiply'
          expect(morpho.stem("provision")).to.eql("provid"); // Replace "-sion" with "-j" to trigger "j" set of rules 'provid'
          expect(morpho.stem("owed")).to.eql("ow"); // Word starting with vowel must contain at least 2 letters 'ow'
          expect(morpho.stem("ear")).to.eql("ear"); //  ditto 'ear'
          expect(morpho.stem("saying")).to.eql("say"); // Words starting with consonant must contain at least 3'say
          expect(morpho.stem("crying")).to.eql("cry"); // letters and one of those letters must be a vowel 'cry'
          expect(morpho.stem("string")).to.eql("string"); // ditto 'string'
          expect(morpho.stem("meant")).to.eql("meant"); // ditto 'meant'
          expect(morpho.stem("cement")).to.eql("cem"); // ditto 'cem'
          //expect(morpho.stem("ness")).to.eql("nest"); // Change s to t 'nest' TODO: Make it change s to t 'nest'
        });

        /*it('Strip Prefixes', function(){ TODO: make it strip Prefixes
          expect(morpho.stem("kilometer")).to.eql("met");
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
    expect(morpho.conjugate("go",$({tense:"present"}, I))).to.eql("go");
    expect(morpho.conjugate("go",$({tense:"present"}, heSheIt))).to.eql("goes");
    //Verbs end with vowal + y
    expect(morpho.conjugate("stay",$({tense:"present"}, I))).to.eql("stay");
    expect(morpho.conjugate("stay",$({tense:"present"}, heSheIt))).to.eql("stays");
    //Verbs end with cons. + y
    expect(morpho.conjugate("try",$({tense:"present"}, I))).to.eql("try");
    expect(morpho.conjugate("try",$({tense:"present"}, heSheIt))).to.eql("tries");
    //Be
    expect(morpho.conjugate("be",$({tense:"present"}, I))).to.eql("am");
    expect(morpho.conjugate("be",$({tense:"present"}, heSheIt))).to.eql("is");
    expect(morpho.conjugate("be",$({tense:"present"}, they))).to.eql("are");

  });

  it("Past simple", function() {
    //Regular
    expect(morpho.conjugate("dream",$({tense:"past"}, I))).to.eql("dreamed");
    //Regular vowal + y
    expect(morpho.conjugate("stay",$({tense:"past"}, I))).to.eql("stayed");
    //Regular  cons. + y
    expect(morpho.conjugate("try",$({tense:"past"}, I))).to.eql("tried");
    //irregular0 No change
    expect(morpho.conjugate("cut",$({tense:"past"}, I))).to.eql("cut");
    //irregular1 past == past participle
    expect(morpho.conjugate("buy",$({tense:"past"}, I))).to.eql("bought");
    //irregular2 past != past participle
    expect(morpho.conjugate("eat",$({tense:"past"}, I))).to.eql("ate");
    //Be
    expect(morpho.conjugate("be",$({tense:"past"}, I))).to.eql("was");
    expect(morpho.conjugate("be",$({tense:"past"}, heSheIt))).to.eql("was");
    expect(morpho.conjugate("be",$({tense:"past"}, they))).to.eql("were");
    //Go
    expect(morpho.conjugate("go",$({tense:"past"}, I))).to.eql("went");

  });

  //Past simple test
  it("Past simple passive", function() {
    //Regular
    expect(morpho.conjugate("dream",$({tense:"past", voice: "passive"}, I))).to.eql("was dreamed");
    //irregular0 No change
    expect(morpho.conjugate("cut",$({tense:"past", voice: "passive"}, I))).to.eql("was cut");
    //irregular1 past == past participle
    expect(morpho.conjugate("buy",$({tense:"past", voice: "passive"}, I))).to.eql("was bought");
    //irregular2 past != past participle
    expect(morpho.conjugate("eat",$({tense:"past", voice: "passive"}, I))).to.eql("was eaten");
    //Be
    expect(morpho.conjugate("be",$({tense:"past", voice: "passive"}, I))).to.eql("was been");
    //Go
    expect(morpho.conjugate("go",$({tense:"past", voice: "passive"}, I))).to.eql("was gone");

  });

  //Past participle test
  it("Present perfect", function() {
    //Regular
    expect(morpho.conjugate("dream",$({tense:"past", aspect: "perfect"}, I))).to.eql("had dreamed");
    //irregular0 No change
    expect(morpho.conjugate("cut",$({tense:"past", aspect: "perfect"}, I))).to.eql("had cut");
    //irregular1 past == past participle
    expect(morpho.conjugate("buy",$({tense:"past", aspect: "perfect"}, I))).to.eql("had bought");
    //irregular2 past != past participle
    expect(morpho.conjugate("eat",$({tense:"past", aspect: "perfect"}, I))).to.eql("had eaten");
    //Be
    expect(morpho.conjugate("be",$({tense:"past", aspect: "perfect"}, I))).to.eql("had been");
    //Go
    expect(morpho.conjugate("go",$({tense:"past", aspect: "perfect"}, I))).to.eql("had gone");

  });

  //Present participle test: -ing
  it("Past perfect continuous", function() {
    //Normal
    expect(morpho.conjugate("dream",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been dreaming");

    //ends with a vowel + cons. (with no further vowels)
    expect(morpho.conjugate("cut",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been cutting");
    expect(morpho.conjugate("swim",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been swimming");
    expect(morpho.conjugate("dream",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been dreaming");

    //ends with a vowel + y (with no further vowels)
    expect(morpho.conjugate("buy",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been buying");

    //Ends with e
    expect(morpho.conjugate("be",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been being");
    expect(morpho.conjugate("write",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been writing");

    //lie and die
    expect(morpho.conjugate("lie",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been lying");
    expect(morpho.conjugate("die",$({tense:"past", aspect: "perfect-continuous"}, I))).to.eql("had been dying");

  });

  it("Negation", function() {
    //Present, I, negated
    expect(morpho.conjugate("dream",$({tense:"present", negated:1}, I))).to.eql("do not dream");

    //Present, He She It, negated
    expect(morpho.conjugate("dream",$({tense:"present", negated:1}, heSheIt))).to.eql("does not dream");

    //Future, I, perfect continuous, negated
    expect(morpho.conjugate("cut",$({tense:"future", aspect: "perfect-continuous", negated:1}, I)))
    .to.eql("will not have been cutting");

  });

  it("Imperative mood", function() {
    //No imperative with first person
    expect(morpho.conjugate("drink", $({mood:"imperative"}, I))).to.eql("");

    //No imperative with third person
    expect(morpho.conjugate("eat", $({mood:"imperative"}, heSheIt))).to.eql("");

    //Imperative with second person
    expect(morpho.conjugate("buy", $({mood:"imperative"}, you))).to.eql("buy");


  });

});

describe("English Morphology Pos Converter ", function(){

  it("Singular to plural", function() {
    morpho.setCurrentPosConverter("singularToPlural");

    expect(morpho.convertPoS("address")).to.eql("addresses");
    expect(morpho.convertPoS("box")).to.eql("boxes");
    expect(morpho.convertPoS("match")).to.eql("matches");
    expect(morpho.convertPoS("quiz")).to.eql("quizzes");
    expect(morpho.convertPoS("ox")).to.eql("oxen");

    expect(morpho.convertPoS("alley")).to.eql("alleys");
    expect(morpho.convertPoS("ally")).to.eql("allies");

    expect(morpho.convertPoS("life")).to.eql("lives");
    expect(morpho.convertPoS("leaf")).to.eql("leaves");
    expect(morpho.convertPoS("staff")).to.eql("staffs");


    expect(morpho.convertPoS("cat")).to.eql("cats");
    //TODO complete
  });


});
