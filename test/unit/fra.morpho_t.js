var FraMorpho = require('../../fra/fra.morpho');
var expect = require('expect.js');

var morpho = new FraMorpho();

//morpho.setCurrentStemmer("porterStemmer");
//morpho.enableDebug();

describe("French Snowball stemmer ", function(){

  before(function(){
    morpho.setCurrentStemmer("snowballFrStemmer");
  });


  /*
  Examples http://snowball.tartarus.org/algorithms/french/stemmer.html
  */

  //TODO regroupe as steps
  it("Groupe 1", function(){
    expect(morpho.stem("continu")).to.eql("continu");
    expect(morpho.stem("continua")).to.eql("continu");
    expect(morpho.stem("continuait")).to.eql("continu");
    expect(morpho.stem("continuant")).to.eql("continu");
    expect(morpho.stem("continuation")).to.eql("continu");
    expect(morpho.stem("continue")).to.eql("continu");
    expect(morpho.stem("continué")).to.eql("continu");
    expect(morpho.stem("continuel")).to.eql("continuel");
    expect(morpho.stem("continuelle")).to.eql("continuel");
    expect(morpho.stem("continuellement")).to.eql("continuel");
    expect(morpho.stem("continuelles")).to.eql("continuel");
    expect(morpho.stem("continuels")).to.eql("continuel");
    expect(morpho.stem("continuer")).to.eql("continu");
    expect(morpho.stem("continuera")).to.eql("continu");
    expect(morpho.stem("continuerait")).to.eql("continu");
    expect(morpho.stem("continueront")).to.eql("continu");
    expect(morpho.stem("continuez")).to.eql("continu");
    expect(morpho.stem("continuité")).to.eql("continu");
    expect(morpho.stem("continuons")).to.eql("continuon");
    expect(morpho.stem("contorsions")).to.eql("contors");
    expect(morpho.stem("contour")).to.eql("contour");
    expect(morpho.stem("contournait")).to.eql("contourn");
    expect(morpho.stem("contournant")).to.eql("contourn");
    expect(morpho.stem("contourne")).to.eql("contourn");
    expect(morpho.stem("contours")).to.eql("contour");
    expect(morpho.stem("contractait")).to.eql("contract");
    expect(morpho.stem("contracté")).to.eql("contract");
    expect(morpho.stem("contractée")).to.eql("contract");
    expect(morpho.stem("contracter")).to.eql("contract");
    expect(morpho.stem("contractés")).to.eql("contract");
    expect(morpho.stem("contractions")).to.eql("contract");
    expect(morpho.stem("contradictoirement")).to.eql("contradictoir");
    expect(morpho.stem("contradictoires")).to.eql("contradictoir");
    expect(morpho.stem("contraindre")).to.eql("contraindr");
    expect(morpho.stem("contraint")).to.eql("contraint");
    expect(morpho.stem("contrainte")).to.eql("contraint");
    expect(morpho.stem("contraintes")).to.eql("contraint");
    expect(morpho.stem("contraire")).to.eql("contrair");
    expect(morpho.stem("contraires")).to.eql("contrair");
    expect(morpho.stem("contraria")).to.eql("contrari");
  });

  it("Groupe 2", function(){
    expect(morpho.stem("main")).to.eql("main");
    expect(morpho.stem("mains")).to.eql("main");
    expect(morpho.stem("maintenaient")).to.eql("mainten");
    expect(morpho.stem("maintenait")).to.eql("mainten");
    expect(morpho.stem("maintenant")).to.eql("mainten");
    expect(morpho.stem("maintenir")).to.eql("mainten");
    expect(morpho.stem("maintenue")).to.eql("maintenu");
    expect(morpho.stem("maintien")).to.eql("maintien");
    expect(morpho.stem("maintint")).to.eql("maintint");
    expect(morpho.stem("maire")).to.eql("mair");
    expect(morpho.stem("maires")).to.eql("mair");
    expect(morpho.stem("mairie")).to.eql("mair");
    expect(morpho.stem("mais")).to.eql("mais");
    expect(morpho.stem("maïs")).to.eql("maï");
    expect(morpho.stem("maison")).to.eql("maison");
    expect(morpho.stem("maisons")).to.eql("maison");
    expect(morpho.stem("maistre")).to.eql("maistr");
    expect(morpho.stem("maitre")).to.eql("maitr");
    expect(morpho.stem("maître")).to.eql("maîtr");
    expect(morpho.stem("maîtres")).to.eql("maîtr");
    expect(morpho.stem("maîtresse")).to.eql("maîtress");
    expect(morpho.stem("maîtresses")).to.eql("maîtress");
    expect(morpho.stem("majesté")).to.eql("majest");
    expect(morpho.stem("majestueuse")).to.eql("majestu");
    expect(morpho.stem("majestueusement")).to.eql("majestu");
    expect(morpho.stem("majestueux")).to.eql("majestu");
    expect(morpho.stem("majeur")).to.eql("majeur");
    expect(morpho.stem("majeure")).to.eql("majeur");
    expect(morpho.stem("major")).to.eql("major");
    expect(morpho.stem("majordome")).to.eql("majordom");
    expect(morpho.stem("majordomes")).to.eql("majordom");
    expect(morpho.stem("majorité")).to.eql("major");
    expect(morpho.stem("majorités")).to.eql("major");
    expect(morpho.stem("mal")).to.eql("mal");
    expect(morpho.stem("malacca")).to.eql("malacc");
    expect(morpho.stem("malade")).to.eql("malad");
    expect(morpho.stem("malades")).to.eql("malad");
    expect(morpho.stem("maladie")).to.eql("malad");
    expect(morpho.stem("maladies")).to.eql("malad");
    expect(morpho.stem("maladive")).to.eql("malad");
  });

});

/*
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


});*/
