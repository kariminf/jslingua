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


var pronouns = [
  {person:"first", number:"singular"},//je
  {person:"second", number:"singular"},//tu
  {person:"third", number:"singular", gender:"masculine"},//il
  {person:"first", number:"plural"},//nous
  {person:"second", number:"plural"},//vous
  {person:"third", number:"plural", gender:"feminine"}//elles
];

var $ = Object.assign;//shorten the function

function conjugateFR (verb, form, resList) {
  for (let i = 0; i< pronouns.length; i++) {
    expect(morpho.conjugate(verb,$({}, form, pronouns[i]))).to.eql(resList[i]);
  }
}

function conjugateFRFondamentalEndings(verb, conjs) {

  let forms = morpho.getForms();

  for (let formName in conjs) {
    if (formName in forms) {
      let form = forms[formName];
      conjugateFR(verb, form, conjs[formName]);
    }
    else expect("Don't exist: ").to.eql(formName);
    //fail the test if the form is not in FraMorpho
  }

  /*
  let form = {
    mood: "indicative",
    tense: "present",
    aspect: "simple"
  };




  //present simple
  conjugateFR(verb, form, conjs[0]);

  form.tense = "past";
  //past simple
  conjugateFR(verb, form, conjs[1]);

  //imparfait
  form.tense = "present";
  form.aspect = "imperfect";
  conjugateFR(verb, form, conjs[2]);

  //future simple
  form.tense = "future";
  form.aspect = "simple";
  conjugateFR(verb, form, conjs[3]);

  //sujunctive present
  form.mood = "subjunctive";
  form.tense = "present";
  conjugateFR(verb, form, conjs[4]);

  //subjunctive imperfect
  form.aspect = "imperfect";
  conjugateFR(verb, form, conjs[5]);

  //conditional present
  form.mood = "conditional";
  form.tense = "present";
  form.aspect= "simple";
  conjugateFR(verb, form, conjs[6]);

  //imperative
  form.mood = "imperative";
  conjugateFR(verb, form, conjs[7]);
  */

}

describe("French Verb conjugation", function(){

  it("Conjugation forms (conjuguer)", function() {

    //conjugation tested against
    //https://leconjugueur.lefigaro.fr/conjugaison/verbe/conjuguer.html

    //Indicative Present (présent)
    let form = {
      mood: "indicative",
      tense: "present",
      aspect: "simple"
    };
    conjugateFR("conjuguer", form, [
      "conjugue",//je
      "conjugues", //tu
      "conjugue", //il
      "conjuguons", //nous
      "conjuguez", //vous
      "conjuguent" //elles
    ]);

    //Indicative Present perfect (passé composé)
    form.aspect = "perfect";
    conjugateFR("conjuguer", form, [
      "ai conjugué",//je
      "as conjugué", //tu
      "a conjugué", //il
      "avons conjugué", //nous
      "avez conjugué", //vous
      "ont conjugué" //elles
    ]);

    //Indicative Imperfect (imparfait)
    form.aspect = "imperfect";
    conjugateFR("conjuguer", form, [
      "conjuguais",//je
      "conjuguais", //tu
      "conjuguait", //il
      "conjuguions", //nous
      "conjuguiez", //vous
      "conjuguaient" //elles
    ]);

    //Indicative Pluperfect (plus-que-parfait)
    form.tense = "past";
    form.aspect = "perfect";
    form.period = "long";
    conjugateFR("conjuguer", form, [
      "avais conjugué",
      "avais conjugué",
      "avait conjugué",
      "avions conjugué",
      "aviez conjugué",
      "avaient conjugué"
    ]);

    //Indicative Past perfect (passé antérieur)
    form.period = "short";
    conjugateFR("conjuguer", form, [
      "eus conjugué",
      "eus conjugué",
      "eut conjugué",
      "eûmes conjugué",
      "eûtes conjugué",
      "eurent conjugué"
    ]);

    //Indicative Simple past (passé simple)
    form.aspect = "simple";
    conjugateFR("conjuguer", form, [
      "conjuguai",
      "conjuguas",
      "conjugua",
      "conjuguâmes",
      "conjuguâtes",
      "conjuguèrent"
    ]);

    //Indicative Simple future (futur simple)
    form.tense = "future";
    conjugateFR("conjuguer", form, [
      "conjuguerai",
      "conjugueras",
      "conjuguera",
      "conjuguerons",
      "conjuguerez",
      "conjugueront"
    ]);

    //Indicative Future perfect (futur antérieur)
    form.aspect = "perfect";
    conjugateFR("conjuguer", form, [
      "aurai conjugué",
      "auras conjugué",
      "aura conjugué",
      "aurons conjugué",
      "aurez conjugué",
      "auront conjugué"
    ]);

    //Subjunctive Present
    form.mood = "subjunctive";
    form.tense = "present";
    form.aspect = "simple";
    conjugateFR("conjuguer", form, [
      "conjugue",
      "conjugues",
      "conjugue",
      "conjuguions",
      "conjuguiez",
      "conjuguent"
    ]);

    //Subjunctive Past (passé)
    form.tense = "past";
    conjugateFR("conjuguer", form, [
      "aie conjugué",
      "aies conjugué",
      "ait conjugué",
      "ayons conjugué",
      "ayez conjugué",
      "aient conjugué"
    ]);

    // Subjunctive Imperfect
    form.tense = "present";
    form.aspect = "imperfect";
    conjugateFR("conjuguer", form, [
      "conjuguasse",
      "conjuguasses",
      "conjuguât",
      "conjuguassions",
      "conjuguassiez",
      "conjuguassent"
    ]);

    //Subjunctive Pluperfect
    form.tense = "past";
    form.aspect = "perfect";
    conjugateFR("conjuguer", form, [
      "eusse conjugué",
      "eusses conjugué",
      "eût conjugué",
      "eussions conjugué",
      "eussiez conjugué",
      "eussent conjugué"
    ]);


    //Imperative Past
    form.aspect = "simple";
    form.mood = "imperative";
    conjugateFR("conjuguer", form, [
      "",
      "aie conjugué",
      "",
      "ayons conjugué",
      "ayez conjugué",
      ""
    ]);

    //Imperative Present
    form.tense = "present";
    conjugateFR("conjuguer", form, [
      "",
      "conjugue",
      "",
      "conjuguons",
      "conjuguez",
      ""
    ]);

    //Conditional Present
    form.mood = "conditional";
    conjugateFR("conjuguer", form, [
      "conjuguerais",
      "conjuguerais",
      "conjuguerait",
      "conjuguerions",
      "conjugueriez",
      "conjugueraient"
    ]);

    //Conditional Past (form 1)
    form.tense = "past";
    form.form = 1;
    conjugateFR("conjuguer", form, [
      "aurais conjugué",
      "aurais conjugué",
      "aurait conjugué",
      "aurions conjugué",
      "auriez conjugué",
      "auraient conjugué"
    ]);

    //Conditional Past (form 2)
    form.form = 2;
    conjugateFR("conjuguer", form, [
      "eusse conjugué",
      "eusses conjugué",
      "eût conjugué",
      "eussions conjugué",
      "eussiez conjugué",
      "eussent conjugué"
    ]);


  });


  it("Groupe 1", function() {

    //Regular form already tested

    let form = {
      mood: "indicative",
      tense: "present",
      aspect: "simple"
    };

    // -cer
    conjugateFR("tracer", form, [
      "trace",
      "traces",
      "trace",
      "traçons", // c ==> ç
      "tracez",
      "tracent"
    ]);

    // -ger
    conjugateFR("manger", form, [
      "mange",
      "manges",
      "mange",
      "mangeons",//mangons ==> mangeons
      "mangez",
      "mangent"
    ]);

    // -oyer and -uyer
    conjugateFR("envoyer", form, [
      "envoie", //y ==> i
      "envoies", //y ==> i
      "envoie", //y ==> i
      "envoyons",
      "envoyez",
      "envoient" //y ==> i
    ]);

    // -eler
    conjugateFR("appeler", form, [
      "appelle",
      "appelles",
      "appelle",
      "appelons",
      "appelez",
      "appellent"
    ]);

    //envoyer in future
    form.tense = "future";
    conjugateFR("envoyer", form, [
      "enverrai",
      "enverras",
      "enverra",
      "enverrons",
      "enverrez",
      "enverront"
    ]);

  });

  it("Groupe 2", function() {

    let form = {
      mood: "indicative",
      tense: "present",
      aspect: "simple"
    };
    conjugateFR("haïr", form, [
      "hais",
      "hais",
      "hait",
      "haïssons",
      "haïssez",
      "haïssent"
    ]);

    conjugateFRFondamentalEndings("choisir", {

      "Indicative Present (présent)":
      [
        "choisis",
        "choisis",
        "choisit",
        "choisissons",
        "choisissez",
        "choisissent"
      ],

      "Indicative Simple past (passé simple)":
      [
        "choisis",
        "choisis",
        "choisit",
        "choisîmes",
        "choisîtes",
        "choisirent"
      ],

      "Indicative Imperfect (imparfait)":
      [
        "choisissais",
        "choisissais",
        "choisissait",
        "choisissions",
        "choisissiez",
        "choisissaient"
      ],

      "Indicative Simple future (futur simple)":
      [
        "choisirai",
        "choisiras",
        "choisira",
        "choisirons",
        "choisirez",
        "choisiront"
      ],

      "Subjunctive Present":
      [
        "choisisse",
        "choisisses",
        "choisisse",
        "choisissions",
        "choisissiez",
        "choisissent"
      ],

      "Subjunctive Imperfect":
      [
        "choisisse",
        "choisisses",
        "choisît",
        "choisissions",
        "choisissiez",
        "choisissent"
      ],

      "Conditional Present":
      [
        "choisirais",
        "choisirais",
        "choisirait",
        "choisirions",
        "choisiriez",
        "choisiraient"
      ],

      "Imperative Present":
      [
        "",
        "choisis",
        "",
        "choisissons",
        "choisissez",
        ""
      ]

    });

  });//group 2

  it("Groupe 3 - ir", function() {

    conjugateFRFondamentalEndings("partir", {

      "Indicative Present (présent)":
      [
        "pars",
        "pars",
        "part",
        "partons",
        "partez",
        "partent"
      ],
    });

    conjugateFRFondamentalEndings("requérir", {

      "Indicative Simple future (futur simple)":
      [
        "requerrai",
        "requerras",
        "requerra",
        "requerrons",
        "requerrez",
        "requerront"
      ],

      "Indicative Present (présent)":
      [
        "requiers",
        "requiers",
        "requiert",
        "requérons",
        "requérez",
        "requièrent"
      ],

      "Subjunctive Present":
      [
        "requière",
        "requières",
        "requière",
        "requérions",
        "requériez",
        "requièrent"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "ai requis",
        "as requis",
        "a requis",
        "avons requis",
        "avez requis",
        "ont requis"
      ],

      "Indicative Simple past (passé simple)":
      [
        "requis",
        "requis",
        "requit",
        "requîmes",
        "requîtes",
        "requirent"
      ]
    });

    conjugateFRFondamentalEndings("ouvrir", {

      "Indicative Present (présent)":
      [
        "ouvre",
        "ouvres",
        "ouvre",
        "ouvrons",
        "ouvrez",
        "ouvrent"
      ],

      "Subjunctive Present":
      [
        "ouvre",
        "ouvres",
        "ouvre",
        "ouvrions",
        "ouvriez",
        "ouvrent"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "ai ouvert",
        "as ouvert",
        "a ouvert",
        "avons ouvert",
        "avez ouvert",
        "ont ouvert"
      ]
    });

    conjugateFRFondamentalEndings("cueillir", {

      "Indicative Simple future (futur simple)":
      [
        "cueillerai",
        "cueilleras",
        "cueillera",
        "cueillerons",
        "cueillerez",
        "cueilleront"
      ],

      "Indicative Present (présent)":
      [
        "cueille",
        "cueilles",
        "cueille",
        "cueillons",
        "cueillez",
        "cueillent"
      ]
    });

    conjugateFRFondamentalEndings("venir", {

      "Indicative Simple future (futur simple)":
      [
        "viendrai",
        "viendras",
        "viendra",
        "viendrons",
        "viendrez",
        "viendront"
      ],

      "Indicative Present (présent)":
      [
        "viens",
        "viens",
        "vient",
        "venons",
        "venez",
        "viennent"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "suis venu",
        "es venu",
        "est venu",
        "sommes venus",
        "êtes venus",
        "sont venues"
      ],

      "Indicative Simple past (passé simple)":
      [
        "vins",
        "vins",
        "vint",
        "vînmes",
        "vîntes",
        "vinrent"
      ]
    });

    conjugateFRFondamentalEndings("mourir", {

      "Indicative Simple future (futur simple)":
      [
        "mourrai",
        "mourras",
        "mourra",
        "mourrons",
        "mourrez",
        "mourront"
      ],

      "Indicative Present (présent)":
      [
        "meurs",
        "meurs",
        "meurt",
        "mourons",
        "mourez",
        "meurent"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "suis mort",
        "es mort",
        "est mort",
        "sommes morts",
        "êtes morts",
        "sont mortes"
      ],

      "Indicative Simple past (passé simple)":
      [
        "mourus",
        "mourus",
        "mourut",
        "mourûmes",
        "mourûtes",
        "moururent"
      ]
    });

  }); // group 3 - ir


  it("Groupe 3 - oir", function() {

    conjugateFRFondamentalEndings("voir", {

      "Indicative Simple future (futur simple)":
      [
        "verrai",
        "verras",
        "verra",
        "verrons",
        "verrez",
        "verront"
      ],

      "Indicative Present (présent)":
      [
        "vois",
        "vois",
        "voit",
        "voyons",
        "voyez",
        "voient"
      ],

      "Subjunctive Present":
      [
        "voie",
        "voies",
        "voie",
        "voyions",
        "voyiez",
        "voient"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "ai vu",
        "as vu",
        "a vu",
        "avons vu",
        "avez vu",
        "ont vu"
      ],

      "Indicative Simple past (passé simple)":
      [
        "vis",
        "vis",
        "vit",
        "vîmes",
        "vîtes",
        "virent"
      ]
    });

    conjugateFRFondamentalEndings("devoir", {

      "Indicative Simple future (futur simple)":
      [
        "devrai",
        "devras",
        "devra",
        "devrons",
        "devrez",
        "devront"
      ],

      "Indicative Present (présent)":
      [
        "dois",
        "dois",
        "doit",
        "devons",
        "devez",
        "doivent"
      ],

      "Subjunctive Present":
      [
        "doive",
        "doives",
        "doive",
        "devions",
        "deviez",
        "doivent"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "ai dû",
        "as dû",
        "a dû",
        "avons dû",
        "avez dû",
        "ont dû"
      ]
    });

    conjugateFRFondamentalEndings("mouvoir", {

      "Indicative Simple future (futur simple)":
      [
        "mouvrai",
        "mouvras",
        "mouvra",
        "mouvrons",
        "mouvrez",
        "mouvront"
      ],

      "Indicative Present (présent)":
      [
        "meus",
        "meus",
        "meut",
        "mouvons",
        "mouvez",
        "meuvent"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "ai mû",
        "as mû",
        "a mû",
        "avons mû",
        "avez mû",
        "ont mû"
      ]
    });

    conjugateFRFondamentalEndings("asseoir", {

      "Indicative Simple future (futur simple)":
      [
        "assoirai",
        "assoiras",
        "assoira",
        "assoirons",
        "assoirez",
        "assoiront"
      ],

      "Indicative Present (présent)":
      [
        "assois",
        "assois",
        "assoit",
        "assoyons",
        "assoyez",
        "assoient"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "ai assis",
        "as assis",
        "a assis",
        "avons assis",
        "avez assis",
        "ont assis"
      ]
    });


  }); // group 3 - oir

  it("Groupe 3 - re", function() {

    conjugateFRFondamentalEndings("vendre", {

      "Indicative Present (présent)":
      [
        "vends",
        "vends",
        "vend",
        "vendons",
        "vendez",
        "vendent"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "ai vendu",
        "as vendu",
        "a vendu",
        "avons vendu",
        "avez vendu",
        "ont vendu"
      ]
    });

    conjugateFRFondamentalEndings("voir", {

      "Indicative Simple future (futur simple)":
      [
        "verrai",
        "verras",
        "verra",
        "verrons",
        "verrez",
        "verront"
      ],

      "Indicative Present (présent)":
      [
        "vois",
        "vois",
        "voit",
        "voyons",
        "voyez",
        "voient"
      ],

      "Subjunctive Present":
      [
        "voie",
        "voies",
        "voie",
        "voyions",
        "voyiez",
        "voient"
      ],

      "Indicative Present perfect (passé composé)":
      [
        "ai vu",
        "as vu",
        "a vu",
        "avons vu",
        "avez vu",
        "ont vu"
      ],

      "Indicative Simple past (passé simple)":
      [
        "vis",
        "vis",
        "vit",
        "vîmes",
        "vîtes",
        "virent"
      ]
    });

  }); // group 3 - re



});
