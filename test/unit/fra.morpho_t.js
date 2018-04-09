var FraMorpho = require('../../fra/fra.morpho');
var expect = require('expect.js');

var morpho = new FraMorpho();

//morpho.setCurrentStemmer("porterStemmer");
//morpho.enableDebug();

describe("French Snowball stemmer ", function(){

  before(function(){
    morpho.setCurrentStemmer("snowball");
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

      "pres"://Indicative Present (présent)
      ["choisis", "choisis", "choisit", "choisissons", "choisissez", "choisissent" ],

      "past"://Indicative Simple past (passé simple)
      [
        "choisis",
        "choisis",
        "choisit",
        "choisîmes",
        "choisîtes",
        "choisirent"
      ],

      "imperf"://Indicative Imperfect (imparfait)
      [
        "choisissais",
        "choisissais",
        "choisissait",
        "choisissions",
        "choisissiez",
        "choisissaient"
      ],

      "fut"://Indicative Simple future (futur simple)
      [
        "choisirai",
        "choisiras",
        "choisira",
        "choisirons",
        "choisirez",
        "choisiront"
      ],

      "subj_pres"://Subjunctive Present
      [
        "choisisse",
        "choisisses",
        "choisisse",
        "choisissions",
        "choisissiez",
        "choisissent"
      ],

      "subj_imperf"://Subjunctive Imperfect
      [
        "choisisse",
        "choisisses",
        "choisît",
        "choisissions",
        "choisissiez",
        "choisissent"
      ],

      "cond_pres"://Conditional Present
      [
        "choisirais",
        "choisirais",
        "choisirait",
        "choisirions",
        "choisiriez",
        "choisiraient"
      ],

      "imp_pres"://Imperative Present
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

      "pres":
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

      "fut":
      [
        "requerrai",
        "requerras",
        "requerra",
        "requerrons",
        "requerrez",
        "requerront"
      ],

      "pres":
      [
        "requiers",
        "requiers",
        "requiert",
        "requérons",
        "requérez",
        "requièrent"
      ],

      "subj_pres":
      [
        "requière",
        "requières",
        "requière",
        "requérions",
        "requériez",
        "requièrent"
      ],

      "pres_perf":
      [
        "ai requis",
        "as requis",
        "a requis",
        "avons requis",
        "avez requis",
        "ont requis"
      ],

      "past":
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

      "pres":
      [
        "ouvre",
        "ouvres",
        "ouvre",
        "ouvrons",
        "ouvrez",
        "ouvrent"
      ],

      "subj_pres":
      [
        "ouvre",
        "ouvres",
        "ouvre",
        "ouvrions",
        "ouvriez",
        "ouvrent"
      ],

      "pres_perf":
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

      "fut":
      [
        "cueillerai",
        "cueilleras",
        "cueillera",
        "cueillerons",
        "cueillerez",
        "cueilleront"
      ],

      "pres":
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

      "fut":
      [
        "viendrai",
        "viendras",
        "viendra",
        "viendrons",
        "viendrez",
        "viendront"
      ],

      "pres":
      [
        "viens",
        "viens",
        "vient",
        "venons",
        "venez",
        "viennent"
      ],

      "pres_perf":
      [
        "suis venu",
        "es venu",
        "est venu",
        "sommes venus",
        "êtes venus",
        "sont venues"
      ],

      "past":
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

      "fut":
      [
        "mourrai",
        "mourras",
        "mourra",
        "mourrons",
        "mourrez",
        "mourront"
      ],

      "pres":
      [
        "meurs",
        "meurs",
        "meurt",
        "mourons",
        "mourez",
        "meurent"
      ],

      "pres_perf":
      [
        "suis mort",
        "es mort",
        "est mort",
        "sommes morts",
        "êtes morts",
        "sont mortes"
      ],

      "past":
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

      "fut":
      [
        "verrai",
        "verras",
        "verra",
        "verrons",
        "verrez",
        "verront"
      ],

      "pres":
      [
        "vois",
        "vois",
        "voit",
        "voyons",
        "voyez",
        "voient"
      ],

      "subj_pres":
      [
        "voie",
        "voies",
        "voie",
        "voyions",
        "voyiez",
        "voient"
      ],

      "pres_perf":
      [
        "ai vu",
        "as vu",
        "a vu",
        "avons vu",
        "avez vu",
        "ont vu"
      ],

      "past":
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

      "fut":
      [
        "devrai",
        "devras",
        "devra",
        "devrons",
        "devrez",
        "devront"
      ],

      "pres":
      [
        "dois",
        "dois",
        "doit",
        "devons",
        "devez",
        "doivent"
      ],

      "subj_pres":
      [
        "doive",
        "doives",
        "doive",
        "devions",
        "deviez",
        "doivent"
      ],

      "pres_perf":
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

      "fut":
      [
        "mouvrai",
        "mouvras",
        "mouvra",
        "mouvrons",
        "mouvrez",
        "mouvront"
      ],

      "pres":
      [
        "meus",
        "meus",
        "meut",
        "mouvons",
        "mouvez",
        "meuvent"
      ],

      "pres_perf":
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

      "fut":
      [
        "assoirai",
        "assoiras",
        "assoira",
        "assoirons",
        "assoirez",
        "assoiront"
      ],

      "pres":
      [
        "assois",
        "assois",
        "assoit",
        "assoyons",
        "assoyez",
        "assoient"
      ],

      "pres_perf":
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

      "pres":
      [
        "vends",
        "vends",
        "vend",
        "vendons",
        "vendez",
        "vendent"
      ],

      "pres_perf":
      [
        "ai vendu",
        "as vendu",
        "a vendu",
        "avons vendu",
        "avez vendu",
        "ont vendu"
      ]
    });

    conjugateFRFondamentalEndings("craindre", {

      "pres":
      [
        "crains",
        "crains",
        "craint",
        "craignons",
        "craignez",
        "craignent"
      ],

      "pres_perf":
      [
        "ai craint",
        "as craint",
        "a craint",
        "avons craint",
        "avez craint",
        "ont craint"
      ],

      "past":
      [
        "craignis",
        "craignis",
        "craignit",
        "craignîmes",
        "craignîtes",
        "craignirent"
      ]
    });

    //-uire verbs
    conjugateFRFondamentalEndings("cuire", {

      "pres":
      [
        "cuis",
        "cuis",
        "cuit",
        "cuisons",
        "cuisez",
        "cuisent"
      ],

      "pres_perf":
      [
        "ai cuit",
        "as cuit",
        "a cuit",
        "avons cuit",
        "avez cuit",
        "ont cuit"
      ],

      "past":
      [
        "cuisis",
        "cuisis",
        "cuisit",
        "cuisîmes",
        "cuisîtes",
        "cuisirent"
      ]
    });

    //dire, interdire, contredire
    conjugateFRFondamentalEndings("dire", {

      "pres":
      [
        "dis",
        "dis",
        "dit",
        "disons",
        "dites",//seulement dire
        "disent"
      ],

      "pres_perf":
      [
        "ai dit",
        "as dit",
        "a dit",
        "avons dit",
        "avez dit",
        "ont dit"
      ],

      "past":
      [
        "dis",
        "dis",
        "dit",
        "dîmes",
        "dîtes",
        "dirent"
      ]
    });

    conjugateFRFondamentalEndings("interdire", {

      "pres":
      [
        "interdis",
        "interdis",
        "interdit",
        "interdisons",
        "interdisez",
        "interdisent"
      ]
    });

    //lire
    conjugateFRFondamentalEndings("lire", {

      "pres":
      [
        "lis",
        "lis",
        "lit",
        "lisons",
        "lisez",
        "lisent"
      ],

      "pres_perf":
      [
        "ai lu",
        "as lu",
        "a lu",
        "avons lu",
        "avez lu",
        "ont lu"
      ]
    });

    conjugateFRFondamentalEndings("décrire", {

      "pres":
      [
        "décris",
        "décris",
        "décrit",
        "décrivons",
        "décrivez",
        "décrivent"
      ],

      "pres_perf":
      [
        "ai décrit",
        "as décrit",
        "a décrit",
        "avons décrit",
        "avez décrit",
        "ont décrit"
      ],

      "past":
      [
        "décrivis",
        "décrivis",
        "décrivit",
        "décrivîmes",
        "décrivîtes",
        "décrivirent"
      ]
    });

    conjugateFRFondamentalEndings("confire", {

      "pres":
      [
        "confis",
        "confis",
        "confit",
        "confisons",
        "confisez",
        "confisent"
      ],

      "pres_perf":
      [
        "ai confit",
        "as confit",
        "a confit",
        "avons confit",
        "avez confit",
        "ont confit"
      ]
    });

    conjugateFRFondamentalEndings("suffire", {

      "pres_perf":
      [
        "ai suffi",
        "as suffi",
        "a suffi",
        "avons suffi",
        "avez suffi",
        "ont suffi"
      ]
    });

    conjugateFRFondamentalEndings("frire", {

      "pres_perf":
      [
        "ai frit",
        "as frit",
        "a frit",
        "avons frit",
        "avez frit",
        "ont frit"
      ]
    });

    conjugateFRFondamentalEndings("circoncire", {

      "pres_perf":
      [
        "ai circoncis",
        "as circoncis",
        "a circoncis",
        "avons circoncis",
        "avez circoncis",
        "ont circoncis"
      ]
    });

    conjugateFRFondamentalEndings("boire", {

      "pres":
      [
        "bois",
        "bois",
        "boit",
        "buvons",
        "buvez",
        "boivent"
      ],

      "pres_perf":
      [
        "ai bu",
        "as bu",
        "a bu",
        "avons bu",
        "avez bu",
        "ont bu"
      ],

      "past":
      [
        "bus",
        "bus",
        "but",
        "bûmes",
        "bûtes",
        "burent"
      ]
    });

    conjugateFRFondamentalEndings("croire", {

      "pres":
      [
        "crois",
        "crois",
        "croit",
        "croyons",
        "croyez",
        "croient"
      ],

      "pres_perf":
      [
        "ai cru",
        "as cru",
        "a cru",
        "avons cru",
        "avez cru",
        "ont cru"
      ]
    });

    conjugateFRFondamentalEndings("plaire", {

      "pres":
      [
        "plais",
        "plais",
        "plaît",
        "plaisons",
        "plaisez",
        "plaisent"
      ],

      "pres_perf":
      [
        "ai plu",
        "as plu",
        "a plu",
        "avons plu",
        "avez plu",
        "ont plu"
      ]
    });

    conjugateFRFondamentalEndings("surprendre", {

      "pres":
      [
        "surprends",
        "surprends",
        "surprend",
        "surprenons",
        "surprenez",
        "surprennent"
      ],

      "pres_perf":
      [
        "ai surpris",
        "as surpris",
        "a surpris",
        "avons surpris",
        "avez surpris",
        "ont surpris"
      ],

      "past":
      [
        "surpris",
        "surpris",
        "surprit",
        "surprîmes",
        "surprîtes",
        "surprirent"
      ]
    });


    conjugateFRFondamentalEndings("vivre", {

      "pres":
      [
        "vis",
        "vis",
        "vit",
        "vivons",
        "vivez",
        "vivent"
      ],

      "pres_perf":
      [
        "ai vécu",
        "as vécu",
        "a vécu",
        "avons vécu",
        "avez vécu",
        "ont vécu"
      ],

      "past":
      [
        "vécus",
        "vécus",
        "vécut",
        "vécûmes",
        "vécûtes",
        "vécurent"
      ]
    });

    conjugateFRFondamentalEndings("poursuivre", {

      "pres":
      [
        "poursuis",
        "poursuis",
        "poursuit",
        "poursuivons",
        "poursuivez",
        "poursuivent"
      ],

      "pres_perf":
      [
        "ai poursuivi",
        "as poursuivi",
        "a poursuivi",
        "avons poursuivi",
        "avez poursuivi",
        "ont poursuivi"
      ]
    });


    conjugateFRFondamentalEndings("naître", {

      "pres":
      [
        "nais",
        "nais",
        "naît",
        "naissons",
        "naissez",
        "naissent"
      ],

      "pres_perf":
      [
        "suis né",
        "es né",
        "est né",
        "sommes nés",
        "êtes nés",
        "sont nées"
      ],

      "past":
      [
        "naquis",
        "naquis",
        "naquit",
        "naquîmes",
        "naquîtes",
        "naquirent"
      ]
    });


    conjugateFRFondamentalEndings("connaître", {

      "pres":
      [
        "connais",
        "connais",
        "connaît",
        "connaissons",
        "connaissez",
        "connaissent"
      ],

      "pres_perf":
      [
        "ai connu",
        "as connu",
        "a connu",
        "avons connu",
        "avez connu",
        "ont connu"
      ],

      "past":
      [
        "connus",
        "connus",
        "connut",
        "connûmes",
        "connûtes",
        "connurent"
      ]
    });

    conjugateFRFondamentalEndings("promettre", {

      "pres":
      [
        "promets",
        "promets",
        "promet",
        "promettons",
        "promettez",
        "promettent"
      ],

      "pres_perf":
      [
        "ai promis",
        "as promis",
        "a promis",
        "avons promis",
        "avez promis",
        "ont promis"
      ],

      "past":
      [
        "promis",
        "promis",
        "promit",
        "promîmes",
        "promîtes",
        "promirent"
      ]
    });

    conjugateFRFondamentalEndings("convaincre", {

      "pres":
      [
        "convaincs",
        "convaincs",
        "convainc",
        "convainquons",
        "convainquez",
        "convainquent"
      ],

      "pres_perf":
      [
        "ai convaincu",
        "as convaincu",
        "a convaincu",
        "avons convaincu",
        "avez convaincu",
        "ont convaincu"
      ],

      "past":
      [
        "convainquis",
        "convainquis",
        "convainquit",
        "convainquîmes",
        "convainquîtes",
        "convainquirent"
      ]
    });

    //simple past is not available in all these websites
    //https://leconjugueur.lefigaro.fr/conjugaison/verbe/extraire.html
    //http://conjugueur.reverso.net/conjugaison-francais-verbe-traire.html
    //http://la-conjugaison.nouvelobs.com/du/verbe/extraire.php
    //It is said to follow group 1 conjugation as in:
    //https://fr.wiktionary.org/wiki/Annexe:Conjugaison_en_français/extraire
    //So, we will follow this analogie
    conjugateFRFondamentalEndings("extraire", {

      "pres":
      [
        "extrais",
        "extrais",
        "extrait",
        "extrayons",
        "extrayez",
        "extraient"
      ],

      "pres_perf":
      [
        "ai extrait",
        "as extrait",
        "a extrait",
        "avons extrait",
        "avez extrait",
        "ont extrait"
      ],

      "past":
      [
        "extrayai",
        "extrayas",
        "extraya",
        "extrayâmes",
        "extrayâtes",
        "extrayèrent"
      ]
    });

    conjugateFRFondamentalEndings("coudre", {

      "pres":
      [
        "couds",
        "couds",
        "coud",
        "cousons",
        "cousez",
        "cousent"
      ],

      "pres_perf":
      [
        "ai cousu",
        "as cousu",
        "a cousu",
        "avons cousu",
        "avez cousu",
        "ont cousu"
      ],

      "past":
      [
        "cousis",
        "cousis",
        "cousit",
        "cousîmes",
        "cousîtes",
        "cousirent"
      ]
    });

    conjugateFRFondamentalEndings("moudre", {

      "pres":
      [
        "mouds",
        "mouds",
        "moud",
        "moulons",
        "moulez",
        "moulent"
      ],

      "pres_perf":
      [
        "ai moulu",
        "as moulu",
        "a moulu",
        "avons moulu",
        "avez moulu",
        "ont moulu"
      ],

      "past":
      [
        "moulus",
        "moulus",
        "moulut",
        "moulûmes",
        "moulûtes",
        "moulurent"
      ]
    });

    conjugateFRFondamentalEndings("résoudre", {

      "pres":
      [
        "résous",
        "résous",
        "résout",
        "résolvons",
        "résolvez",
        "résolvent"
      ],

      "pres_perf":
      [
        "ai résolu",
        "as résolu",
        "a résolu",
        "avons résolu",
        "avez résolu",
        "ont résolu"
      ],

      "past":
      [
        "résolus",
        "résolus",
        "résolut",
        "résolûmes",
        "résolûtes",
        "résolurent"
      ]
    });

    conjugateFRFondamentalEndings("absoudre", {

      "pres":
      [
        "absous",
        "absous",
        "absout",
        "absolvons",
        "absolvez",
        "absolvent"
      ],

      "pres_perf":
      [
        "ai absous",
        "as absous",
        "a absous",
        "avons absous",
        "avez absous",
        "ont absous"
      ],

      "past":
      [
        "absolus",
        "absolus",
        "absolut",
        "absolûmes",
        "absolûtes",
        "absolurent"
      ]
    });

  }); // group 3 - re

  it("Groupe 3 - irregular", function() {

    conjugateFRFondamentalEndings("pouvoir", {

      "fut":
      [
        "pourrai",
        "pourras",
        "pourra",
        "pourrons",
        "pourrez",
        "pourront"
      ],

      "pres":
      [
        "peux",
        "peux",
        "peut",
        "pouvons",
        "pouvez",
        "peuvent"
      ],

      "subj_pres":
      [
        "puisse",
        "puisses",
        "puisse",
        "puissions",
        "puissiez",
        "puissent"
      ],

      "pres_perf":
      [
        "ai pu",
        "as pu",
        "a pu",
        "avons pu",
        "avez pu",
        "ont pu"
      ],

      "past":
      [
        "pus",
        "pus",
        "put",
        "pûmes",
        "pûtes",
        "purent"
      ]
    });

    conjugateFRFondamentalEndings("pouvoir", {

      "fut":
      [
        "pourrai",
        "pourras",
        "pourra",
        "pourrons",
        "pourrez",
        "pourront"
      ],

      "pres":
      [
        "peux",
        "peux",
        "peut",
        "pouvons",
        "pouvez",
        "peuvent"
      ],

      "subj_pres":
      [
        "puisse",
        "puisses",
        "puisse",
        "puissions",
        "puissiez",
        "puissent"
      ],

      "pres_perf":
      [
        "ai pu",
        "as pu",
        "a pu",
        "avons pu",
        "avez pu",
        "ont pu"
      ],

      "past":
      [
        "pus",
        "pus",
        "put",
        "pûmes",
        "pûtes",
        "purent"
      ]
    });

    conjugateFRFondamentalEndings("savoir", {

      "fut":
      [
        "saurai",
        "sauras",
        "saura",
        "saurons",
        "saurez",
        "sauront"
      ],

      "pres":
      [
        "sais",
        "sais",
        "sait",
        "savons",
        "savez",
        "savent"
      ],

      "subj_pres":
      [
        "sache",
        "saches",
        "sache",
        "sachions",
        "sachiez",
        "sachent"
      ],

      "pres_perf":
      [
        "ai su",
        "as su",
        "a su",
        "avons su",
        "avez su",
        "ont su"
      ],

      "past":
      [
        "sus",
        "sus",
        "sut",
        "sûmes",
        "sûtes",
        "surent"
      ]
    });

    conjugateFRFondamentalEndings("valoir", {

      "fut":
      ["vaudrai", "vaudras", "vaudra", "vaudrons", "vaudrez", "vaudront"],

      "pres":
      ["vaux", "vaux", "vaut", "valons", "valez", "valent"],

      "subj_pres":
      ["vaille", "vailles", "vaille", "valions", "valiez", "vaillent"],

      "pres_perf":
      ["ai valu", "as valu", "a valu", "avons valu", "avez valu", "ont valu"],

      "past":
      ["valus", "valus", "valut", "valûmes", "valûtes", "valurent"]
    });

    conjugateFRFondamentalEndings("falloir", {

      "fut":
      ["", "", "faudra", "", "", ""],

      "pres":
      ["", "", "faut", "", "", ""],

      "subj_pres":
      ["", "", "faille", "", "", ""],

      "pres_perf":
      ["", "", "a fallu", "", "", ""],

      "past":
      ["", "", "falut", "", "", ""]
    });

    conjugateFRFondamentalEndings("faire", {

      "fut":
      ["ferai", "feras", "fera", "ferons", "ferez", "feront"],

      "pres":
      ["fais", "fais", "fait", "faisons", "faites", "font"],

      "subj_pres":
      ["fasse", "fasses", "fasse", "fassions", "fassiez", "fassent"],

      "pres_perf":
      ["ai fait", "as fait", "a fait", "avons fait", "avez fait", "ont fait"],

      "past":
      ["fis", "fis", "fit", "fîmes", "fîtes", "firent"]
    });

    conjugateFRFondamentalEndings("satisfaire", {

      "fut":
      ["satisferai", "satisferas", "satisfera", "satisferons", "satisferez", "satisferont"],

      "pres":
      ["satisfais", "satisfais", "satisfait", "satisfaisons", "satisfaites", "satisfont"],

      "subj_pres":
      ["satisfasse", "satisfasses", "satisfasse", "satisfassions", "satisfassiez", "satisfassent"],

      "pres_perf":
      ["ai satisfait", "as satisfait", "a satisfait", "avons satisfait", "avez satisfait", "ont satisfait"],

      "past":
      ["satisfis", "satisfis", "satisfit", "satisfîmes", "satisfîtes", "satisfirent"]
    });



  });//group 3 - irregular

  it("Negation", function() {
    let form = {
      mood: "indicative",
      tense: "present",
      aspect: "simple",
      negated: 1
    };
    conjugateFR("haïr", form, [
      "n'hais pas",
      "n'hais pas",
      "n'hait pas",
      "n'haïssons pas",
      "n'haïssez pas",
      "n'haïssent pas"
    ]);

    conjugateFR("apprendre", form, [
      "n'apprends pas",
      "n'apprends pas",
      "n'apprend pas",
      "n'apprenons pas",
      "n'apprenez pas",
      "n'apprennent pas"
    ]);

    conjugateFR("parler", form, [
      "ne parle pas",
      "ne parles pas",
      "ne parle pas",
      "ne parlons pas",
      "ne parlez pas",
      "ne parlent pas"
    ]);

    form.aspect = "perfect";
    conjugateFR("parler", form, [
      "n'ai pas parlé",
      "n'as pas parlé",
      "n'a pas parlé",
      "n'avons pas parlé",
      "n'avez pas parlé",
      "n'ont pas parlé"
    ]);

  });

});

describe("French Morphology Pos Converter ", function(){

  it("Singular to plural", function() {
    morpho.setCurrentPosConverter("sing2pl");

    //-s, -x, -z
    expect(morpho.convertPoS("souris")).to.eql("souris");
    expect(morpho.convertPoS("croix")).to.eql("croix");
    expect(morpho.convertPoS("nez")).to.eql("nez");

    //-ou
    expect(morpho.convertPoS("clou")).to.eql("clous");
    expect(morpho.convertPoS("chou")).to.eql("choux");

    // -al
    expect(morpho.convertPoS("cheval")).to.eql("chevaux");
    expect(morpho.convertPoS("chacal")).to.eql("chacals");

    // -ail
    expect(morpho.convertPoS("rail")).to.eql("rails");
    expect(morpho.convertPoS("travail")).to.eql("travaux");

    // -au, -eu
    expect(morpho.convertPoS("bateau")).to.eql("bateaux");
    expect(morpho.convertPoS("pneu")).to.eql("pneus");
    expect(morpho.convertPoS("landau")).to.eql("landaus");

    //the rest
    expect(morpho.convertPoS("arbre")).to.eql("arbres");

  });
});
