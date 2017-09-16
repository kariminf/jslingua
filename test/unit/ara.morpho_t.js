var AraMorpho = require('../../ara/ara.morpho');
var expect = require('expect.js');

var morpho = new AraMorpho();

describe("Arabic Word normalization", function(){

  it("without options", function(){
    expect(morpho.normalize("ذهب")).to.eql("ذهب");
    expect(morpho.normalize("ذهــــــــب")).to.eql("ذهب");
    expect(morpho.normalize("ذَهَبٌ")).to.eql("ذهب");
    expect(morpho.normalize("ذَهــَبَ")).to.eql("ذهب");
    expect(morpho.normalize("دعى")).to.eql("دعي");
    expect(morpho.normalize("دعــــى")).to.eql("دعي");
    expect(morpho.normalize("دعاة")).to.eql("دعاه");
    expect(morpho.normalize("أَنَا")).to.eql("انا");
  });

  it("voc option", function(){
    expect(morpho.normalize("ذَهَبٌ", "voc")).to.eql("ذهب");
    expect(morpho.normalize("ذَهــَبَ", "voc")).not.to.eql("ذهب");
  });

  it("alef option", function(){
    expect(morpho.normalize("أنا", "alef")).to.eql("انا");
    expect(morpho.normalize("إنه", "alef")).to.eql("انه");
    expect(morpho.normalize("آسف", "alef")).to.eql("اسف");
  });

  it("yeh option", function(){
    expect(morpho.normalize("دعى", "yeh")).to.eql("دعي");
  });

  it("teh option", function(){
    expect(morpho.normalize("دعاة", "teh")).to.eql("دعاه");
  });

  it("_ option", function(){
    expect(morpho.normalize("ذهــــــــب", "_")).to.eql("ذهب");
  });

  it("options combination", function(){
    expect(morpho.normalize("ذَهــَبَ", "voc,_")).to.eql("ذهب");
    expect(morpho.normalize("ذَهــَبَ", "_,a lot of non sense,voc")).to.eql("ذهب");
    expect(morpho.normalize("دعــــى", "yeh, _")).to.eql("دعي");
    expect(morpho.normalize("دعــــــاة", "teh,_")).to.eql("دعاه");
    expect(morpho.normalize("أَنـــــَا", "alef,_,voc")).to.eql("انا");
  });

});


var
$ = Object.assign,//shorten the function
//tenses
pr = {tense:"present"},
pa = {tense:"past"},
//voice
pv = {voice: "passive"},
//negation
n = {negated: 1},
//Imperative
imp = {mood: "imperative"},
//pronouns
i = {person:"first", number: "singular"},
we = {person:"first", number: "plural"},

youm = {person:"second", number: "singular", gender: "masculine"},
youf = {person:"second", number: "singular", gender: "feminine"},
youmd = {person:"second", number: "dual", gender: "masculine"},
youfd = {person:"second", number: "dual", gender: "feminine"},
yoump = {person:"second", number: "plural", gender: "masculine"},
youfp = {person:"second", number: "plural", gender: "feminine"},

he = {person:"third", number: "singular", gender: "masculine"},
she = {person:"third", number: "singular", gender: "feminine"},
theymd = {person:"third", number: "dual", gender: "masculine"},
theyfd = {person:"third", number: "dual", gender: "feminine"},
theymp = {person:"third", number: "plural", gender: "masculine"},
theyfp = {person:"third", number: "plural", gender: "feminine"};

describe("Arabic Verb conjugation", function(){

  it("Sahih Salim (standard) past", function() {
    //past
    expect(morpho.conjugate("ذهب",$({}, pa, i))).to.eql("ذَهبْتُ");
    expect(morpho.conjugate("ذهب",$({}, pa, we))).to.eql("ذَهبْنَا");
    expect(morpho.conjugate("ذهب",$({}, pa, youm))).to.eql("ذَهبْتَ");
    expect(morpho.conjugate("ذهب",$({}, pa, youf))).to.eql("ذَهبْتِ");
    expect(morpho.conjugate("ذهب",$({}, pa, youmd))).to.eql("ذَهبْتُمَا");
    expect(morpho.conjugate("ذهب",$({}, pa, youfd))).to.eql("ذَهبْتُمَا");
    expect(morpho.conjugate("ذهب",$({}, pa, yoump))).to.eql("ذَهبْتُمْ");
    expect(morpho.conjugate("ذهب",$({}, pa, youfp))).to.eql("ذَهبْتُنَّ");
    expect(morpho.conjugate("ذهب",$({}, pa, he))).to.eql("ذَهبَ");
    expect(morpho.conjugate("ذهب",$({}, pa, she))).to.eql("ذَهبَتْ");
    expect(morpho.conjugate("ذهب",$({}, pa, theymd))).to.eql("ذَهبَا");
    expect(morpho.conjugate("ذهب",$({}, pa, theyfd))).to.eql("ذَهبَتَا");
    expect(morpho.conjugate("ذهب",$({}, pa, theymp))).to.eql("ذَهبُوا");
    expect(morpho.conjugate("ذهب",$({}, pa, theyfp))).to.eql("ذَهبْنَ");

  });

  it("Sahih Salim (standard) present", function() {
    //present
    expect(morpho.conjugate("ذهب",$({}, pr, i))).to.eql("أَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, we))).to.eql("نَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, youm))).to.eql("تَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, youf))).to.eql("تَذْهبِينَ");
    expect(morpho.conjugate("ذهب",$({}, pr, youmd))).to.eql("تَذْهبَانِ");
    expect(morpho.conjugate("ذهب",$({}, pr, youfd))).to.eql("تَذْهبَانِ");
    expect(morpho.conjugate("ذهب",$({}, pr, yoump))).to.eql("تَذْهبُونَ");
    expect(morpho.conjugate("ذهب",$({}, pr, youfp))).to.eql("تَذْهبْنَ");
    expect(morpho.conjugate("ذهب",$({}, pr, he))).to.eql("يَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, she))).to.eql("تَذْهبُ");
    expect(morpho.conjugate("ذهب",$({}, pr, theymd))).to.eql("يَذْهبَانِ");
    expect(morpho.conjugate("ذهب",$({}, pr, theyfd))).to.eql("تَذْهبَانِ");
    expect(morpho.conjugate("ذهب",$({}, pr, theymp))).to.eql("يَذْهبُونَ");
    expect(morpho.conjugate("ذهب",$({}, pr, theyfp))).to.eql("يَذْهبْنَ");

  });

  it("Muatal Mithal + alif", function() {
    //وضع Waw
    //past
    expect(morpho.conjugate("وضع",$({}, pa, i))).to.eql("وَضعْتُ");
    //present
    expect(morpho.conjugate("وضع",$({}, pr, youfd))).to.eql("تَضعَانِ");

    //استعمل alif
    //past
    expect(morpho.conjugate("استعمل",$({}, pa, i))).to.eql("استَعمَلْتُ");
    //present
    expect(morpho.conjugate("استعمل",$({}, pr, youfd))).to.eql("تَستعمِلَانِ");

    //ينع yaa
    //past
    expect(morpho.conjugate("ينع",$({}, pa, i))).to.eql("يَنعْتُ");
    //present
    expect(morpho.conjugate("ينع",$({}, pr, youfd))).to.eql("تَيْنعَانِ");

  });

  it("Muatal Naqis", function() {
    //دنا Waw
    //past
    expect(morpho.conjugate("دنا",$({}, pa, i))).to.eql("دَنَوْتُ");
    expect(morpho.conjugate("دنا",$({}, pa, he))).to.eql("دَنَا");
    expect(morpho.conjugate("دنا",$({}, pa, she))).to.eql("دَنَتْ");
    expect(morpho.conjugate("دنا",$({}, pa, theyfd))).to.eql("دَنَتَا");
    expect(morpho.conjugate("دنا",$({}, pa, theymp))).to.eql("دَنُوا");//VERIFY
    //present
    expect(morpho.conjugate("دنا",$({}, pr, i))).to.eql("أَدْنُو");
    expect(morpho.conjugate("دنا",$({}, pr, youf))).to.eql("تَدْنِينَ");
    expect(morpho.conjugate("دنا",$({}, pr, yoump))).to.eql("تَدْنُونَ");
    expect(morpho.conjugate("دنا",$({}, pr, theymp))).to.eql("يَدْنُونَ");

    //مشى Yaa
    //past
    expect(morpho.conjugate("مشى",$({}, pa, i))).to.eql("مَشَيْتُ");
    expect(morpho.conjugate("مشى",$({}, pa, he))).to.eql("مَشَى");
    expect(morpho.conjugate("مشى",$({}, pa, she))).to.eql("مَشَتْ");
    expect(morpho.conjugate("مشى",$({}, pa, theyfd))).to.eql("مَشَتَا");
    expect(morpho.conjugate("مشى",$({}, pa, theymp))).to.eql("مَشُوا");//VERIFY
    //present
    expect(morpho.conjugate("مشى",$({}, pr, i))).to.eql("أَمْشِي");
    expect(morpho.conjugate("مشى",$({}, pr, youf))).to.eql("تَمْشِينَ");
    expect(morpho.conjugate("مشى",$({}, pr, yoump))).to.eql("تَمْشُونَ");
    expect(morpho.conjugate("مشى",$({}, pr, theymp))).to.eql("يَمْشُونَ");

  });

  it("Muatal ajwaf", function() {
    //نام Alif
    //past
    expect(morpho.conjugate("نام",$({}, pa, i))).to.eql("نِمْتُ");
    expect(morpho.conjugate("نام",$({}, pa, theymd))).to.eql("نَامَا");
    expect(morpho.conjugate("نام",$({}, pa, theyfp))).to.eql("نِمْنَ");
    //present
    expect(morpho.conjugate("نام",$({}, pr, i))).to.eql("أَنَامُ");
    expect(morpho.conjugate("نام",$({}, pr, youfp))).to.eql("تَنَمْنَ");
    expect(morpho.conjugate("نام",$({}, pr, theyfp))).to.eql("يَنَمْنَ");

    //شاء Alif with Hamza
    //TODO fix it

    //عاد Waw
    //past
    expect(morpho.conjugate("عاد",$({}, pa, i))).to.eql("عُدْتُ");
    expect(morpho.conjugate("عاد",$({}, pa, theymd))).to.eql("عَادَا");
    expect(morpho.conjugate("عاد",$({}, pa, theyfp))).to.eql("عُدْنَ");
    //present
    expect(morpho.conjugate("عاد",$({}, pr, i))).to.eql("أَعُودُ");
    expect(morpho.conjugate("عاد",$({}, pr, youfp))).to.eql("تَعُدْنَ");

    //ساح Yaa
    //past
    expect(morpho.conjugate("ساح",$({}, pa, i))).to.eql("سِحْتُ");
    expect(morpho.conjugate("ساح",$({}, pa, theymd))).to.eql("سَاحَا");
    expect(morpho.conjugate("ساح",$({}, pa, theyfp))).to.eql("سِحْنَ");
    //present
    expect(morpho.conjugate("ساح",$({}, pr, i))).to.eql("أَسِيحُ");
    expect(morpho.conjugate("ساح",$({}, pr, youfp))).to.eql("تَسِحْنَ");

  });

  it("Salim muda33af", function() {
    //مدّ
    //past
    expect(morpho.conjugate("مدّ",$({}, pa, i))).to.eql("مَدَدْتُ");
    expect(morpho.conjugate("مدّ",$({}, pa, theymd))).to.eql("مَدَّا");
    expect(morpho.conjugate("مدّ",$({}, pa, theyfp))).to.eql("مَدَدْنَ");
    //present
    expect(morpho.conjugate("مدّ",$({}, pr, i))).to.eql("أَمُدُّ");
    expect(morpho.conjugate("مدّ",$({}, pr, youfp))).to.eql("تَمْدُدْنَ");
    expect(morpho.conjugate("مدّ",$({}, pr, theyfp))).to.eql("يَمْدُدْنَ");

  });

  it("verbs types", function() {
    //فعّل
    //past
    expect(morpho.conjugate("فعّل",$({}, pa, i))).to.eql("فَعَّلْتُ");
    expect(morpho.conjugate("فعّل",$({}, pa, theymd))).to.eql("فَعَّلَا");
    expect(morpho.conjugate("فعّل",$({}, pa, theyfp))).to.eql("فَعَّلْنَ");
    //present
    expect(morpho.conjugate("فعّل",$({}, pr, i))).to.eql("أُفَعِّلُ");
    expect(morpho.conjugate("فعّل",$({}, pr, youfp))).to.eql("تُفَعِّلْنَ");
    expect(morpho.conjugate("فعّل",$({}, pr, theyfp))).to.eql("يُفَعِّلْنَ");

    //فاعل
    //past
    expect(morpho.conjugate("فاعل",$({}, pa, i))).to.eql("فَاعَلْتُ");
    expect(morpho.conjugate("فاعل",$({}, pa, theymd))).to.eql("فَاعَلَا");
    expect(morpho.conjugate("فاعل",$({}, pa, theyfp))).to.eql("فَاعَلْنَ");
    //present
    expect(morpho.conjugate("فاعل",$({}, pr, i))).to.eql("أُفَاعِلُ");
    expect(morpho.conjugate("فاعل",$({}, pr, youfp))).to.eql("تُفَاعِلْنَ");
    expect(morpho.conjugate("فاعل",$({}, pr, theyfp))).to.eql("يُفَاعِلْنَ");

    //أفعل
    //past
    expect(morpho.conjugate("أفعل",$({}, pa, i))).to.eql("أفْعَلْتُ");
    expect(morpho.conjugate("أفعل",$({}, pa, theymd))).to.eql("أفْعَلَا");
    expect(morpho.conjugate("أفعل",$({}, pa, theyfp))).to.eql("أفْعَلْنَ");
    //present
    expect(morpho.conjugate("أفعل",$({}, pr, i))).to.eql("أُفْعِلُ");
    expect(morpho.conjugate("أفعل",$({}, pr, youfp))).to.eql("تُفْعِلْنَ");
    expect(morpho.conjugate("أفعل",$({}, pr, theyfp))).to.eql("يُفْعِلْنَ");

    //تفعّل
    //past
    expect(morpho.conjugate("تفعّل",$({}, pa, i))).to.eql("تفعَّلْتُ");
    expect(morpho.conjugate("تفعّل",$({}, pa, theymd))).to.eql("تفعَّلَا");
    expect(morpho.conjugate("تفعّل",$({}, pa, theyfp))).to.eql("تفعَّلْنَ");
    //present
    expect(morpho.conjugate("تفعّل",$({}, pr, i))).to.eql("أَتفعَّلُ");
    expect(morpho.conjugate("تفعّل",$({}, pr, youfp))).to.eql("تَتفعَّلْنَ");
    expect(morpho.conjugate("تفعّل",$({}, pr, theyfp))).to.eql("يَتفعَّلْنَ");

    //تفاعل
    //past
    expect(morpho.conjugate("تفاعل",$({}, pa, i))).to.eql("تفاعَلْتُ");
    expect(morpho.conjugate("تفاعل",$({}, pa, theymd))).to.eql("تفاعَلَا");
    expect(morpho.conjugate("تفاعل",$({}, pa, theyfp))).to.eql("تفاعَلْنَ");
    //present
    expect(morpho.conjugate("تفاعل",$({}, pr, i))).to.eql("أَتفاعَلُ");
    expect(morpho.conjugate("تفاعل",$({}, pr, youfp))).to.eql("تَتفاعَلْنَ");
    expect(morpho.conjugate("تفاعل",$({}, pr, theyfp))).to.eql("يَتفاعَلْنَ");

    //انفعل
    //past
    expect(morpho.conjugate("انفعل",$({}, pa, i))).to.eql("انفَعَلْتُ");
    expect(morpho.conjugate("انفعل",$({}, pa, theymd))).to.eql("انفَعَلَا");
    expect(morpho.conjugate("انفعل",$({}, pa, theyfp))).to.eql("انفَعَلْنَ");
    //present
    expect(morpho.conjugate("انفعل",$({}, pr, i))).to.eql("أَنفَعِلُ");
    expect(morpho.conjugate("انفعل",$({}, pr, youfp))).to.eql("تَنفَعِلْنَ");
    expect(morpho.conjugate("انفعل",$({}, pr, theyfp))).to.eql("يَنفَعِلْنَ");

    //افتعل
    //past
    expect(morpho.conjugate("افتعل",$({}, pa, i))).to.eql("افتَعَلْتُ");
    expect(morpho.conjugate("افتعل",$({}, pa, theymd))).to.eql("افتَعَلَا");
    expect(morpho.conjugate("افتعل",$({}, pa, theyfp))).to.eql("افتَعَلْنَ");
    //present
    expect(morpho.conjugate("افتعل",$({}, pr, i))).to.eql("أَفتَعِلُ");
    expect(morpho.conjugate("افتعل",$({}, pr, youfp))).to.eql("تَفتَعِلْنَ");
    expect(morpho.conjugate("افتعل",$({}, pr, theyfp))).to.eql("يَفتَعِلْنَ");

    //افعلّ
    //past
    expect(morpho.conjugate("افعلّ",$({}, pa, i))).to.eql("افْعلَلْتُ");
    expect(morpho.conjugate("افعلّ",$({}, pa, theymd))).to.eql("افْعلَّا");
    expect(morpho.conjugate("افعلّ",$({}, pa, theyfp))).to.eql("افْعلَلْنَ");
    //present
    expect(morpho.conjugate("افعلّ",$({}, pr, i))).to.eql("أَفْعَلُّ");
    expect(morpho.conjugate("افعلّ",$({}, pr, youfp))).to.eql("تَفْعلِلْنَ");
    expect(morpho.conjugate("افعلّ",$({}, pr, theyfp))).to.eql("يَفْعلِلْنَ");

    //استفعل
    //past
    expect(morpho.conjugate("استفعل",$({}, pa, i))).to.eql("استَفعَلْتُ");
    expect(morpho.conjugate("استفعل",$({}, pa, theymd))).to.eql("استَفعَلَا");
    expect(morpho.conjugate("استفعل",$({}, pa, theyfp))).to.eql("استَفعَلْنَ");
    //present
    expect(morpho.conjugate("استفعل",$({}, pr, i))).to.eql("أَستفعِلُ");
    expect(morpho.conjugate("استفعل",$({}, pr, youfp))).to.eql("تَستفعِلْنَ");
    expect(morpho.conjugate("استفعل",$({}, pr, theyfp))).to.eql("يَستفعِلْنَ");

  });

  it("Passive voice", function() {

    //Mu3tall Mithal
    //==============
    //وضع Waw
    //past
    expect(morpho.conjugate("وضع",$({}, pa, pv, i))).to.eql("وُضِعْتُ");
    //present
    expect(morpho.conjugate("وضع",$({}, pr, pv, youfd))).to.eql("تُوضَعَانِ");

    //ينع yaa
    //past
    expect(morpho.conjugate("ينع",$({}, pa, pv, i))).to.eql("يُنِعْتُ");
    //present
    expect(morpho.conjugate("ينع",$({}, pr, pv, youfd))).to.eql("تُيْنَعَانِ");


    // Muatal Naqis
    // ==============
    //دعا Waw
    //past
    expect(morpho.conjugate("دعا",$({}, pa, pv, i))).to.eql("دُعِيتُ");
    expect(morpho.conjugate("دعا",$({}, pa, pv, he))).to.eql("دُعِيَ");
    expect(morpho.conjugate("دعا",$({}, pa, pv, she))).to.eql("دُعِيَتْ");
    expect(morpho.conjugate("دعا",$({}, pa, pv, theyfd))).to.eql("دُعِيَتَا");
    expect(morpho.conjugate("دعا",$({}, pa, pv, theymp))).to.eql("دُعِيُوا");//VERIFY
    //present
    expect(morpho.conjugate("دعا",$({}, pr, pv, i))).to.eql("أُدْعَى");
    expect(morpho.conjugate("دعا",$({}, pr, pv, youf))).to.eql("تُدْعِينَ");
    expect(morpho.conjugate("دعا",$({}, pr, pv, youmd))).to.eql("تُدْعَيَانِ");
    expect(morpho.conjugate("دعا",$({}, pr, pv, theymp))).to.eql("يُدْعُونَ");

    //بنى Yaa
    //past
    expect(morpho.conjugate("بنى",$({}, pa, pv, i))).to.eql("بُنِيتُ");
    expect(morpho.conjugate("بنى",$({}, pa, pv, he))).to.eql("بُنِيَ");
    expect(morpho.conjugate("بنى",$({}, pa, pv, she))).to.eql("بُنِيَتْ");
    expect(morpho.conjugate("بنى",$({}, pa, pv, theyfd))).to.eql("بُنِيَتَا");
    expect(morpho.conjugate("بنى",$({}, pa, pv, theymp))).to.eql("بُنِيُوا");//VERIFY
    //present
    expect(morpho.conjugate("بنى",$({}, pr, pv, i))).to.eql("أُبْنَى");
    expect(morpho.conjugate("بنى",$({}, pr, pv, youf))).to.eql("تُبْنِينَ");
    expect(morpho.conjugate("بنى",$({}, pr, pv, yoump))).to.eql("تُبْنُونَ");
    expect(morpho.conjugate("بنى",$({}, pr, pv, theyfp))).to.eql("يُبْنَينَ");


    //Muatal ajwaf"
    //نام Alif
    //past
    expect(morpho.conjugate("خاف",$({}, pa, pv, i))).to.eql("خِفْتُ");//VERIFY
    expect(morpho.conjugate("خاف",$({}, pa, pv, theymd))).to.eql("خِيفَا");
    expect(morpho.conjugate("خاف",$({}, pa, pv, theyfp))).to.eql("خِفْنَ");//VERIFY
    //present
    expect(morpho.conjugate("خاف",$({}, pr, pv, i))).to.eql("أُخَافُ");
    expect(morpho.conjugate("خاف",$({}, pr, pv, youfp))).to.eql("تُخَفْنَ");
    expect(morpho.conjugate("خاف",$({}, pr, pv, theymd))).to.eql("يُخَافَانِ");

    //شاء Alif with Hamza
    //TODO fix it

    //عاد Waw
    //past
    expect(morpho.conjugate("عاد",$({}, pa, pv, i))).to.eql("عِدْتُ");
    expect(morpho.conjugate("عاد",$({}, pa, pv, theymd))).to.eql("عِيدَا");
    expect(morpho.conjugate("عاد",$({}, pa, pv, theyfp))).to.eql("عِدْنَ");
    //present
    expect(morpho.conjugate("عاد",$({}, pr, pv, i))).to.eql("أُعَادُ");
    expect(morpho.conjugate("عاد",$({}, pr, pv, youfp))).to.eql("تُعَدْنَ");

    //باع Yaa
    //past
    expect(morpho.conjugate("باع",$({}, pa, pv, i))).to.eql("بِعْتُ");
    expect(morpho.conjugate("باع",$({}, pa, pv, theymd))).to.eql("بِيعَا");
    expect(morpho.conjugate("باع",$({}, pa, pv, theyfp))).to.eql("بِعْنَ");
    //present
    expect(morpho.conjugate("باع",$({}, pr, pv, i))).to.eql("أُبَاعُ");
    expect(morpho.conjugate("باع",$({}, pr, pv, theyfp))).to.eql("يُبَعْنَ");


    //Other verb types
    //=================
    //فعّل
    //past
    expect(morpho.conjugate("فعّل",$({}, pa, pv, i))).to.eql("فُعِّلْتُ");
    expect(morpho.conjugate("فعّل",$({}, pa, pv, theymd))).to.eql("فُعِّلَا");
    expect(morpho.conjugate("فعّل",$({}, pa, pv, theyfp))).to.eql("فُعِّلْنَ");
    //present
    expect(morpho.conjugate("فعّل",$({}, pr, pv, i))).to.eql("أُفَعَّلُ");
    expect(morpho.conjugate("فعّل",$({}, pr, pv, youfp))).to.eql("تُفَعَّلْنَ");
    expect(morpho.conjugate("فعّل",$({}, pr, pv, theyfp))).to.eql("يُفَعَّلْنَ");

    //فاعل
    //past
    expect(morpho.conjugate("فاعل",$({}, pa, pv, i))).to.eql("فُوعِلْتُ");
    expect(morpho.conjugate("فاعل",$({}, pa, pv, theymd))).to.eql("فُوعِلَا");
    expect(morpho.conjugate("فاعل",$({}, pa, pv, theyfp))).to.eql("فُوعِلْنَ");
    //present
    expect(morpho.conjugate("فاعل",$({}, pr, pv, i))).to.eql("أُفَاعَلُ");
    expect(morpho.conjugate("فاعل",$({}, pr, pv, youfp))).to.eql("تُفَاعَلْنَ");
    expect(morpho.conjugate("فاعل",$({}, pr, pv, theyfp))).to.eql("يُفَاعَلْنَ");

    //أفعل
    //past
    expect(morpho.conjugate("أفعل",$({}, pa, pv, i))).to.eql("أُفْعِلْتُ");
    expect(morpho.conjugate("أفعل",$({}, pa, pv, youmd))).to.eql("أُفْعِلْتُمَا");
    expect(morpho.conjugate("أفعل",$({}, pa, pv, theyfp))).to.eql("أُفْعِلْنَ");
    //present
    expect(morpho.conjugate("أفعل",$({}, pr, pv, i))).to.eql("أُفْعَلُ");
    expect(morpho.conjugate("أفعل",$({}, pr, pv, youfp))).to.eql("تُفْعَلْنَ");
    expect(morpho.conjugate("أفعل",$({}, pr, pv, theyfp))).to.eql("يُفْعَلْنَ");

    //تفعّل I think no passive voice for this type
    //It seems intransitive
    //past
    expect(morpho.conjugate("تفعّل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("تفعّل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, pr, pv, theyfp))).to.eql("");

    //تفاعل I think no passive voice for this type
    //It seems intransitive
    //past
    expect(morpho.conjugate("تفاعل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("تفاعل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, pr, pv, theyfp))).to.eql("");

    //انفعل I think no passive voice for this type
    //It seems intransitive
    //past
    expect(morpho.conjugate("انفعل",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("انفعل",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, pr, pv, theyfp))).to.eql("");

    //افتعل
    //past
    expect(morpho.conjugate("افتعل",$({}, pa, pv, i))).to.eql("افتُعِلْتُ");
    expect(morpho.conjugate("افتعل",$({}, pa, pv, theymd))).to.eql("افتُعِلَا");
    expect(morpho.conjugate("افتعل",$({}, pa, pv, theyfp))).to.eql("افتُعِلْنَ");
    //present
    expect(morpho.conjugate("افتعل",$({}, pr, pv, i))).to.eql("أُفتَعَلُ");
    expect(morpho.conjugate("افتعل",$({}, pr, pv, youfp))).to.eql("تُفتَعَلْنَ");
    expect(morpho.conjugate("افتعل",$({}, pr, pv, theyfp))).to.eql("يُفتَعَلْنَ");

    //افعلّ I think no passive voice for this type
    //It seems intransitive
    //past
    expect(morpho.conjugate("افعلّ",$({}, pa, pv, i))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, pa, pv, theymd))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, pa, pv, theyfp))).to.eql("");
    //present
    expect(morpho.conjugate("افعلّ",$({}, pr, pv, i))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, pr, pv, youfp))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, pr, pv, theyfp))).to.eql("");

    //استفعل
    //past
    expect(morpho.conjugate("استفعل",$({}, pa, pv, i))).to.eql("استُفعِلْتُ");
    expect(morpho.conjugate("استفعل",$({}, pa, pv, theymd))).to.eql("استُفعِلَا");
    expect(morpho.conjugate("استفعل",$({}, pa, pv, theyfp))).to.eql("استُفعِلْنَ");
    //present
    expect(morpho.conjugate("استفعل",$({}, pr, pv, i))).to.eql("أُستفعَلُ");
    expect(morpho.conjugate("استفعل",$({}, pr, pv, youfp))).to.eql("تُستفعَلْنَ");
    expect(morpho.conjugate("استفعل",$({}, pr, pv, theyfp))).to.eql("يُستفعَلْنَ");

  });


  it("Negation", function() {

    //Mu3tall Mithal
    //==============
    //وضع Waw
    //Active voice
    //past
    expect(morpho.conjugate("وضع",$({}, pa, n, i))).to.eql("أَضعْ");
    //present
    expect(morpho.conjugate("وضع",$({}, pr, n, youfd))).to.eql("تَضعَا");
    //Passive voice
    //past
    expect(morpho.conjugate("وضع",$({}, pa, n, pv, i))).to.eql("أُوضَعْ");
    //present
    expect(morpho.conjugate("وضع",$({}, pr, n, pv, youfd))).to.eql("تُوضَعَا");

    //ينع yaa
    //Active voice
    //past
    expect(morpho.conjugate("ينع",$({}, pa, n, i))).to.eql("أَيْنعْ");
    //present
    expect(morpho.conjugate("ينع",$({}, pr, n, youfd))).to.eql("تَيْنعَا");
    //Passive voice
    //past
    expect(morpho.conjugate("ينع",$({}, pa, n, pv, i))).to.eql("أُيْنَعْ");
    //present
    expect(morpho.conjugate("ينع",$({}, pr, n, pv, youfd))).to.eql("تُيْنَعَا");


    // Muatal Naqis
    // ==============
    //دعا Waw
    //Active voice
    //past
    expect(morpho.conjugate("دعا",$({}, pa, n, i))).to.eql("أَدْعُ");
    expect(morpho.conjugate("دعا",$({}, pa, n, he))).to.eql("يَدْعُ");
    expect(morpho.conjugate("دعا",$({}, pa, n, youfd))).to.eql("تَدْعُوَا");
    //present
    expect(morpho.conjugate("دعا",$({}, pr, n, i))).to.eql("أَدْعُوَ");
    expect(morpho.conjugate("دعا",$({}, pr, n, youf))).to.eql("تَدْعِي");
    expect(morpho.conjugate("دعا",$({}, pr, n, youmd))).to.eql("تَدْعُوَا");
    //Passive voice
    //past
    expect(morpho.conjugate("دعا",$({}, pa, n, pv, i))).to.eql("أُدْعَ");
    expect(morpho.conjugate("دعا",$({}, pa, n, pv, he))).to.eql("يُدْعَ");
    expect(morpho.conjugate("دعا",$({}, pa, n, pv, youfd))).to.eql("تُدْعَيَا");
    //present
    expect(morpho.conjugate("دعا",$({}, pr, n, pv, i))).to.eql("أُدْعَى");
    expect(morpho.conjugate("دعا",$({}, pr, n, pv, youf))).to.eql("تُدْعِي");
    expect(morpho.conjugate("دعا",$({}, pr, n, pv, youmd))).to.eql("تُدْعَيَا");


    //بنى Yaa
    //Active Voice
    //past
    expect(morpho.conjugate("بنى",$({}, pa, n, i))).to.eql("أَبْنِ");
    expect(morpho.conjugate("بنى",$({}, pa, n, he))).to.eql("يَبْنِ");
    expect(morpho.conjugate("بنى",$({}, pa, n, she))).to.eql("تَبْنِ");
    expect(morpho.conjugate("بنى",$({}, pa, n, theyfd))).to.eql("تَبْنِيَا");
    expect(morpho.conjugate("بنى",$({}, pa, n, theymp))).to.eql("يَبْنُوا");
    //present
    expect(morpho.conjugate("بنى",$({}, pr, n, i))).to.eql("أَبْنِيَ");
    expect(morpho.conjugate("بنى",$({}, pr, n, youf))).to.eql("تَبْنِي");
    expect(morpho.conjugate("بنى",$({}, pr, n, yoump))).to.eql("تَبْنُوا");
    expect(morpho.conjugate("بنى",$({}, pr, n, theyfp))).to.eql("يَبْنِينَ");
    //Passive Voice
    //past
    expect(morpho.conjugate("بنى",$({}, pa, n, pv, i))).to.eql("أُبْنَ");
    expect(morpho.conjugate("بنى",$({}, pa, n, pv, he))).to.eql("يُبْنَ");
    expect(morpho.conjugate("بنى",$({}, pa, n, pv, she))).to.eql("تُبْنَ");
    expect(morpho.conjugate("بنى",$({}, pa, n, pv, theyfd))).to.eql("تُبْنَيَا");
    expect(morpho.conjugate("بنى",$({}, pa, n, pv, theymp))).to.eql("يُبْنُوا");
    //present
    expect(morpho.conjugate("بنى",$({}, pr, n, pv, i))).to.eql("أُبْنَى");
    expect(morpho.conjugate("بنى",$({}, pr, n, pv, youf))).to.eql("تُبْنِي");
    expect(morpho.conjugate("بنى",$({}, pr, n, pv, yoump))).to.eql("تُبْنُوا");
    expect(morpho.conjugate("بنى",$({}, pr, n, pv, theyfp))).to.eql("يُبْنَينَ");


    //Muatal ajwaf"
    //نام Alif
    //Active voice
    //past
    expect(morpho.conjugate("خاف",$({}, pa, n, i))).to.eql("أَخَفْ");
    expect(morpho.conjugate("خاف",$({}, pa, n, theymd))).to.eql("يَخَافَا");
    expect(morpho.conjugate("خاف",$({}, pa, n, theyfp))).to.eql("يَخَفْنَ");//VERIFY
    //present
    expect(morpho.conjugate("خاف",$({}, pr, n, i))).to.eql("أَخَافَ");
    expect(morpho.conjugate("خاف",$({}, pr, n, youfp))).to.eql("تَخَفْنَ");
    expect(morpho.conjugate("خاف",$({}, pr, n, theymd))).to.eql("يَخَافَا");
    //Passive voice
    //past
    expect(morpho.conjugate("خاف",$({}, pa, n, pv, i))).to.eql("أُخَفْ");//VERIFY
    expect(morpho.conjugate("خاف",$({}, pa, n, pv, theymd))).to.eql("يُخَافَا");
    expect(morpho.conjugate("خاف",$({}, pa, n, pv, theyfp))).to.eql("يُخَفْنَ");
    //present
    expect(morpho.conjugate("خاف",$({}, pr, n, pv, i))).to.eql("أُخَافَ");
    expect(morpho.conjugate("خاف",$({}, pr, n, pv, youfp))).to.eql("تُخَفْنَ");
    expect(morpho.conjugate("خاف",$({}, pr, n, pv, theymd))).to.eql("يُخَافَا");

    //شاء Alif with Hamza
    //TODO fix it

    //عاد Waw
    //Active voice
    //past
    expect(morpho.conjugate("عاد",$({}, pa, n, i))).to.eql("أَعُدْ");
    expect(morpho.conjugate("عاد",$({}, pa, n, theymd))).to.eql("يَعُودَا");
    expect(morpho.conjugate("عاد",$({}, pa, n, theyfp))).to.eql("يَعُدْنَ");
    //present
    expect(morpho.conjugate("عاد",$({}, pr, n, i))).to.eql("أَعُودَ");
    expect(morpho.conjugate("عاد",$({}, pr, n, youfp))).to.eql("تَعُدْنَ");
    //Passive voice
    //past
    expect(morpho.conjugate("عاد",$({}, pa, n, pv, i))).to.eql("أُعَدْ");
    expect(morpho.conjugate("عاد",$({}, pa, n, pv, theymd))).to.eql("يُعَادَا");
    expect(morpho.conjugate("عاد",$({}, pa, n, pv, theyfp))).to.eql("يُعَدْنَ");
    //present
    expect(morpho.conjugate("عاد",$({}, pr, n, pv, i))).to.eql("أُعَادَ");
    expect(morpho.conjugate("عاد",$({}, pr, n, pv, youfp))).to.eql("تُعَدْنَ");

    //باع Yaa
    //Active voice
    //past
    expect(morpho.conjugate("باع",$({}, pa, n, i))).to.eql("أَبِعْ");
    expect(morpho.conjugate("باع",$({}, pa, n, theymd))).to.eql("يَبِيعَا");
    expect(morpho.conjugate("باع",$({}, pa, n, theyfp))).to.eql("يَبِعْنَ");
    //present
    expect(morpho.conjugate("باع",$({}, pr, n, i))).to.eql("أَبِيعَ");
    expect(morpho.conjugate("باع",$({}, pr, n, theyfp))).to.eql("يَبِعْنَ");
    //Passive voice
    //past
    expect(morpho.conjugate("باع",$({}, pa, n, pv, i))).to.eql("أُبَعْ");
    expect(morpho.conjugate("باع",$({}, pa, n, pv, theymd))).to.eql("يُبَاعَا");
    expect(morpho.conjugate("باع",$({}, pa, n, pv, theyfp))).to.eql("يُبَعْنَ");
    //present
    expect(morpho.conjugate("باع",$({}, pr, n, pv, i))).to.eql("أُبَاعَ");
    expect(morpho.conjugate("باع",$({}, pr, n, pv, theyfp))).to.eql("يُبَعْنَ");


    //Other verb types
    //=================
    //فعّل
    //Active voice
    //past
    expect(morpho.conjugate("فعّل",$({}, pa, n, i))).to.eql("أُفَعِّلْ");
    expect(morpho.conjugate("فعّل",$({}, pa, n, theymd))).to.eql("يُفَعِّلَا");
    expect(morpho.conjugate("فعّل",$({}, pa, n, theyfp))).to.eql("يُفَعِّلْنَ");
    //present
    expect(morpho.conjugate("فعّل",$({}, pr, n, i))).to.eql("أُفَعِّلَ");
    expect(morpho.conjugate("فعّل",$({}, pr, n, youfp))).to.eql("تُفَعِّلْنَ");
    expect(morpho.conjugate("فعّل",$({}, pr, n, theyfp))).to.eql("يُفَعِّلْنَ");
    //Passive voice
    //past
    expect(morpho.conjugate("فعّل",$({}, pa, n, pv, i))).to.eql("أُفَعَّلْ");
    expect(morpho.conjugate("فعّل",$({}, pa, n, pv, theymd))).to.eql("يُفَعَّلَا");
    expect(morpho.conjugate("فعّل",$({}, pa, n, pv, theyfp))).to.eql("يُفَعَّلْنَ");
    //present
    expect(morpho.conjugate("فعّل",$({}, pr, n, pv, i))).to.eql("أُفَعَّلَ");
    expect(morpho.conjugate("فعّل",$({}, pr, n, pv, youfp))).to.eql("تُفَعَّلْنَ");
    expect(morpho.conjugate("فعّل",$({}, pr, n, pv, theyfp))).to.eql("يُفَعَّلْنَ");

    //فاعل
    //Active voice
    //past
    expect(morpho.conjugate("فاعل",$({}, pa, n, i))).to.eql("أُفَاعِلْ");
    expect(morpho.conjugate("فاعل",$({}, pa, n, theymd))).to.eql("يُفَاعِلَا");
    expect(morpho.conjugate("فاعل",$({}, pa, n, theyfp))).to.eql("يُفَاعِلْنَ");
    //present
    expect(morpho.conjugate("فاعل",$({}, pr, n, i))).to.eql("أُفَاعِلَ");
    expect(morpho.conjugate("فاعل",$({}, pr, n, youfp))).to.eql("تُفَاعِلْنَ");
    expect(morpho.conjugate("فاعل",$({}, pr, n, theyfp))).to.eql("يُفَاعِلْنَ");
    //Passive voice
    //past
    expect(morpho.conjugate("فاعل",$({}, pa, n, pv, i))).to.eql("أُفَاعَلْ");
    expect(morpho.conjugate("فاعل",$({}, pa, n, pv, theymd))).to.eql("يُفَاعَلَا");
    expect(morpho.conjugate("فاعل",$({}, pa, n, pv, theyfp))).to.eql("يُفَاعَلْنَ");
    //present
    expect(morpho.conjugate("فاعل",$({}, pr, n, pv, i))).to.eql("أُفَاعَلَ");
    expect(morpho.conjugate("فاعل",$({}, pr, n, pv, youfp))).to.eql("تُفَاعَلْنَ");
    expect(morpho.conjugate("فاعل",$({}, pr, n, pv, theyfp))).to.eql("يُفَاعَلْنَ");

    //أفعل
    //Active voice
    //past
    expect(morpho.conjugate("أفعل",$({}, pa, n, i))).to.eql("أُفْعِلْ");
    expect(morpho.conjugate("أفعل",$({}, pa, n, youmd))).to.eql("تُفْعِلَا");
    expect(morpho.conjugate("أفعل",$({}, pa, n, theyfp))).to.eql("يُفْعِلْنَ");
    //present
    expect(morpho.conjugate("أفعل",$({}, pr, n, i))).to.eql("أُفْعِلَ");
    expect(morpho.conjugate("أفعل",$({}, pr, n, youfp))).to.eql("تُفْعِلْنَ");
    expect(morpho.conjugate("أفعل",$({}, pr, n, theyfp))).to.eql("يُفْعِلْنَ");
    //Passive voice
    //past
    expect(morpho.conjugate("أفعل",$({}, pa, n, pv, i))).to.eql("أُفْعَلْ");
    expect(morpho.conjugate("أفعل",$({}, pa, n, pv, youmd))).to.eql("تُفْعَلَا");
    expect(morpho.conjugate("أفعل",$({}, pa, n, pv, theyfp))).to.eql("يُفْعَلْنَ");
    //present
    expect(morpho.conjugate("أفعل",$({}, pr, n, pv, i))).to.eql("أُفْعَلَ");
    expect(morpho.conjugate("أفعل",$({}, pr, n, pv, youfp))).to.eql("تُفْعَلْنَ");
    expect(morpho.conjugate("أفعل",$({}, pr, n, pv, theyfp))).to.eql("يُفْعَلْنَ");

    //تفعّل
    //Active voice
    //past
    expect(morpho.conjugate("تفعّل",$({}, pa, n, i))).to.eql("أَتفعَّلْ");
    expect(morpho.conjugate("تفعّل",$({}, pa, n, theymd))).to.eql("يَتفعَّلَا");
    expect(morpho.conjugate("تفعّل",$({}, pa, n, theyfp))).to.eql("يَتفعَّلْنَ");
    //present
    expect(morpho.conjugate("تفعّل",$({}, pr, n, i))).to.eql("أَتفعَّلَ");
    expect(morpho.conjugate("تفعّل",$({}, pr, n, youfp))).to.eql("تَتفعَّلْنَ");
    expect(morpho.conjugate("تفعّل",$({}, pr, n, theyfp))).to.eql("يَتفعَّلْنَ");
    //NO Passive voice

    //تفاعل
    //Active voice
    //past
    expect(morpho.conjugate("تفاعل",$({}, pa, n, i))).to.eql("أَتفاعَلْ");
    expect(morpho.conjugate("تفاعل",$({}, pa, n, theymd))).to.eql("يَتفاعَلَا");
    expect(morpho.conjugate("تفاعل",$({}, pa, n, theyfp))).to.eql("يَتفاعَلْنَ");
    //present
    expect(morpho.conjugate("تفاعل",$({}, pr, n, i))).to.eql("أَتفاعَلَ");
    expect(morpho.conjugate("تفاعل",$({}, pr, n, youf))).to.eql("تَتفاعَلِي");
    expect(morpho.conjugate("تفاعل",$({}, pr, n, theymp))).to.eql("يَتفاعَلُوا");
    //NO Passive voice

    //انفعل
    //Active voice
    //past
    expect(morpho.conjugate("انفعل",$({}, pa, n, i))).to.eql("أَنفَعِلْ");
    expect(morpho.conjugate("انفعل",$({}, pa, n, theymd))).to.eql("يَنفَعِلَا");
    expect(morpho.conjugate("انفعل",$({}, pa, n, theyfp))).to.eql("يَنفَعِلْنَ");
    //present
    expect(morpho.conjugate("انفعل",$({}, pr, n, i))).to.eql("أَنفَعِلَ");
    expect(morpho.conjugate("انفعل",$({}, pr, n, youfd))).to.eql("تَنفَعِلَا");
    expect(morpho.conjugate("انفعل",$({}, pr, n, theyfp))).to.eql("يَنفَعِلْنَ");
    //NO Passive voice

    //افتعل
    //Active voice
    //past
    expect(morpho.conjugate("افتعل",$({}, pa, n, i))).to.eql("أَفتَعِلْ");
    expect(morpho.conjugate("افتعل",$({}, pa, n, theymd))).to.eql("يَفتَعِلَا");
    expect(morpho.conjugate("افتعل",$({}, pa, n, theyfp))).to.eql("يَفتَعِلْنَ");
    //present
    expect(morpho.conjugate("افتعل",$({}, pr, n, i))).to.eql("أَفتَعِلَ");
    expect(morpho.conjugate("افتعل",$({}, pr, n, youfp))).to.eql("تَفتَعِلْنَ");
    expect(morpho.conjugate("افتعل",$({}, pr, n, theymp))).to.eql("يَفتَعِلُوا");
    //Passive voice
    //past
    expect(morpho.conjugate("افتعل",$({}, pa, n, pv, i))).to.eql("أُفتَعَلْ");
    expect(morpho.conjugate("افتعل",$({}, pa, n, pv, theymd))).to.eql("يُفتَعَلَا");
    expect(morpho.conjugate("افتعل",$({}, pa, n, pv, theyfp))).to.eql("يُفتَعَلْنَ");
    //present
    expect(morpho.conjugate("افتعل",$({}, pr, n, pv, i))).to.eql("أُفتَعَلَ");
    expect(morpho.conjugate("افتعل",$({}, pr, n, pv, youfp))).to.eql("تُفتَعَلْنَ");
    expect(morpho.conjugate("افتعل",$({}, pr, n, pv, theymp))).to.eql("يُفتَعَلُوا");

    //افعلّ
    //Active voice
    //past
    expect(morpho.conjugate("افعلّ",$({}, pa, n, i))).to.eql("أَفْعَلّْ");
    expect(morpho.conjugate("افعلّ",$({}, pa, n, theymd))).to.eql("يَفْعَلَّا");
    expect(morpho.conjugate("افعلّ",$({}, pa, n, theyfp))).to.eql("يَفْعلِلْنَ");
    //present
    expect(morpho.conjugate("افعلّ",$({}, pr, n, i))).to.eql("أَفْعَلَّ");
    expect(morpho.conjugate("افعلّ",$({}, pr, n, youfp))).to.eql("تَفْعلِلْنَ");
    expect(morpho.conjugate("افعلّ",$({}, pr, n, theyfp))).to.eql("يَفْعلِلْنَ");
    //NO Passive voice

    //استفعل
    //Active voice
    //past
    expect(morpho.conjugate("استفعل",$({}, pa, n, i))).to.eql("أَستفعِلْ");
    expect(morpho.conjugate("استفعل",$({}, pa, n, theymd))).to.eql("يَستفعِلَا");
    expect(morpho.conjugate("استفعل",$({}, pa, n, theyfp))).to.eql("يَستفعِلْنَ");
    //present
    expect(morpho.conjugate("استفعل",$({}, pr, n, i))).to.eql("أَستفعِلَ");
    expect(morpho.conjugate("استفعل",$({}, pr, n, youfp))).to.eql("تَستفعِلْنَ");
    expect(morpho.conjugate("استفعل",$({}, pr, n, theyfp))).to.eql("يَستفعِلْنَ");
    //Passive voice
    //past
    expect(morpho.conjugate("استفعل",$({}, pa, n, pv, i))).to.eql("أُستفعَلْ");
    expect(morpho.conjugate("استفعل",$({}, pa, n, pv, theymd))).to.eql("يُستفعَلَا");
    expect(morpho.conjugate("استفعل",$({}, pa, n, pv, theyfp))).to.eql("يُستفعَلْنَ");
    //present
    expect(morpho.conjugate("استفعل",$({}, pr, n, pv, i))).to.eql("أُستفعَلَ");
    expect(morpho.conjugate("استفعل",$({}, pr, n, pv, youfp))).to.eql("تُستفعَلْنَ");
    expect(morpho.conjugate("استفعل",$({}, pr, n, pv, theyfp))).to.eql("يُستفعَلْنَ");

  });

  it("Imperative mood", function() {

    //Mu3tall Mithal
    //==============
    //وضع Waw
    //affirmative
    expect(morpho.conjugate("وضع",$({}, imp, youm))).to.eql("ضعْ");
    expect(morpho.conjugate("وضع",$({}, imp, youf))).to.eql("ضعِي");
    expect(morpho.conjugate("وضع",$({}, imp, youmd))).to.eql("ضعَا");
    expect(morpho.conjugate("وضع",$({}, imp, youfd))).to.eql("ضعَا");
    expect(morpho.conjugate("وضع",$({}, imp, yoump))).to.eql("ضعُوا");
    expect(morpho.conjugate("وضع",$({}, imp, youfp))).to.eql("ضعْنَ");
    //negative
    expect(morpho.conjugate("وضع",$({}, imp, n, youm))).to.eql("لَا تَضعْ");
    expect(morpho.conjugate("وضع",$({}, imp, n, youf))).to.eql("لَا تَضعِي");
    expect(morpho.conjugate("وضع",$({}, imp, n, youmd))).to.eql("لَا تَضعَا");
    expect(morpho.conjugate("وضع",$({}, imp, n, youfd))).to.eql("لَا تَضعَا");
    expect(morpho.conjugate("وضع",$({}, imp, n, yoump))).to.eql("لَا تَضعُوا");
    expect(morpho.conjugate("وضع",$({}, imp, n, youfp))).to.eql("لَا تَضعْنَ");

    //TODO verify imperative of verbs stating with yaa
    //ينع yaa
    /*
    //affirmative
    expect(morpho.conjugate("ينع",$({}, imp, youm))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, youf))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, youmd))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, youfd))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, yoump))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, youfp))).to.eql("");
    //negative
    expect(morpho.conjugate("ينع",$({}, imp, n, youm))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, n, youf))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, n, youmd))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, n, youfd))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, n, yoump))).to.eql("");
    expect(morpho.conjugate("ينع",$({}, imp, n, youfp))).to.eql("");
    */


    // Muatal Naqis
    // ==============
    //دعا Waw
    //affirmative
    expect(morpho.conjugate("دعا",$({}, imp, youm))).to.eql("ادْعُ");
    expect(morpho.conjugate("دعا",$({}, imp, youf))).to.eql("ادْعِي");
    expect(morpho.conjugate("دعا",$({}, imp, youmd))).to.eql("ادْعُوَا");
    expect(morpho.conjugate("دعا",$({}, imp, youfd))).to.eql("ادْعُوَا");
    expect(morpho.conjugate("دعا",$({}, imp, yoump))).to.eql("ادْعُوا");
    expect(morpho.conjugate("دعا",$({}, imp, youfp))).to.eql("ادْعُونَ");
    //negative
    expect(morpho.conjugate("دعا",$({}, imp, n, youm))).to.eql("لَا تَدْعُ");
    expect(morpho.conjugate("دعا",$({}, imp, n, youf))).to.eql("لَا تَدْعِي");
    expect(morpho.conjugate("دعا",$({}, imp, n, youmd))).to.eql("لَا تَدْعُوَا");
    expect(morpho.conjugate("دعا",$({}, imp, n, youfd))).to.eql("لَا تَدْعُوَا");
    expect(morpho.conjugate("دعا",$({}, imp, n, yoump))).to.eql("لَا تَدْعُوا");
    expect(morpho.conjugate("دعا",$({}, imp, n, youfp))).to.eql("لَا تَدْعُونَ");


    //بنى Yaa
    //affirmative
    expect(morpho.conjugate("بنى",$({}, imp, youm))).to.eql("ابْنِ");
    expect(morpho.conjugate("بنى",$({}, imp, youf))).to.eql("ابْنِي");
    expect(morpho.conjugate("بنى",$({}, imp, youmd))).to.eql("ابْنِيَا");
    expect(morpho.conjugate("بنى",$({}, imp, youfd))).to.eql("ابْنِيَا");
    expect(morpho.conjugate("بنى",$({}, imp, yoump))).to.eql("ابْنُوا");
    expect(morpho.conjugate("بنى",$({}, imp, youfp))).to.eql("ابْنِينَ");
    //negative
    expect(morpho.conjugate("بنى",$({}, imp, n, youm))).to.eql("لَا تَبْنِ");
    expect(morpho.conjugate("بنى",$({}, imp, n, youf))).to.eql("لَا تَبْنِي");
    expect(morpho.conjugate("بنى",$({}, imp, n, youmd))).to.eql("لَا تَبْنِيَا");
    expect(morpho.conjugate("بنى",$({}, imp, n, youfd))).to.eql("لَا تَبْنِيَا");
    expect(morpho.conjugate("بنى",$({}, imp, n, yoump))).to.eql("لَا تَبْنُوا");
    expect(morpho.conjugate("بنى",$({}, imp, n, youfp))).to.eql("لَا تَبْنِينَ");



    //Muatal ajwaf"
    //نام Alif
    //affirmative
    expect(morpho.conjugate("نام",$({}, imp, youm))).to.eql("نَمْ");
    expect(morpho.conjugate("نام",$({}, imp, youf))).to.eql("نَامِي");
    expect(morpho.conjugate("نام",$({}, imp, youmd))).to.eql("نَامَا");
    expect(morpho.conjugate("نام",$({}, imp, youfd))).to.eql("نَامَا");
    expect(morpho.conjugate("نام",$({}, imp, yoump))).to.eql("نَامُوا");
    expect(morpho.conjugate("نام",$({}, imp, youfp))).to.eql("نَمْنَ");
    //negative
    expect(morpho.conjugate("نام",$({}, imp, n, youm))).to.eql("لَا تَنَمْ");
    expect(morpho.conjugate("نام",$({}, imp, n, youf))).to.eql("لَا تَنَامِي");
    expect(morpho.conjugate("نام",$({}, imp, n, youmd))).to.eql("لَا تَنَامَا");
    expect(morpho.conjugate("نام",$({}, imp, n, youfd))).to.eql("لَا تَنَامَا");
    expect(morpho.conjugate("نام",$({}, imp, n, yoump))).to.eql("لَا تَنَامُوا");
    expect(morpho.conjugate("نام",$({}, imp, n, youfp))).to.eql("لَا تَنَمْنَ");

    //شاء Alif with Hamza
    //TODO fix it

    //عاد Waw
    //affirmative
    expect(morpho.conjugate("عاد",$({}, imp, youm))).to.eql("عُدْ");
    expect(morpho.conjugate("عاد",$({}, imp, youf))).to.eql("عُودِي");
    expect(morpho.conjugate("عاد",$({}, imp, youmd))).to.eql("عُودَا");
    expect(morpho.conjugate("عاد",$({}, imp, youfd))).to.eql("عُودَا");
    expect(morpho.conjugate("عاد",$({}, imp, yoump))).to.eql("عُودُوا");
    expect(morpho.conjugate("عاد",$({}, imp, youfp))).to.eql("عُدْنَ");
    //negative
    expect(morpho.conjugate("عاد",$({}, imp, n, youm))).to.eql("لَا تَعُدْ");
    expect(morpho.conjugate("عاد",$({}, imp, n, youf))).to.eql("لَا تَعُودِي");
    expect(morpho.conjugate("عاد",$({}, imp, n, youmd))).to.eql("لَا تَعُودَا");
    expect(morpho.conjugate("عاد",$({}, imp, n, youfd))).to.eql("لَا تَعُودَا");
    expect(morpho.conjugate("عاد",$({}, imp, n, yoump))).to.eql("لَا تَعُودُوا");
    expect(morpho.conjugate("عاد",$({}, imp, n, youfp))).to.eql("لَا تَعُدْنَ");

    //باع Yaa
    //affirmative
    expect(morpho.conjugate("باع",$({}, imp, youm))).to.eql("بِعْ");
    expect(morpho.conjugate("باع",$({}, imp, youf))).to.eql("بِيعِي");
    expect(morpho.conjugate("باع",$({}, imp, youmd))).to.eql("بِيعَا");
    expect(morpho.conjugate("باع",$({}, imp, youfd))).to.eql("بِيعَا");
    expect(morpho.conjugate("باع",$({}, imp, yoump))).to.eql("بِيعُوا");
    expect(morpho.conjugate("باع",$({}, imp, youfp))).to.eql("بِعْنَ");
    //negative
    expect(morpho.conjugate("باع",$({}, imp, n, youm))).to.eql("لَا تَبِعْ");
    expect(morpho.conjugate("باع",$({}, imp, n, youf))).to.eql("لَا تَبِيعِي");
    expect(morpho.conjugate("باع",$({}, imp, n, youmd))).to.eql("لَا تَبِيعَا");
    expect(morpho.conjugate("باع",$({}, imp, n, youfd))).to.eql("لَا تَبِيعَا");
    expect(morpho.conjugate("باع",$({}, imp, n, yoump))).to.eql("لَا تَبِيعُوا");
    expect(morpho.conjugate("باع",$({}, imp, n, youfp))).to.eql("لَا تَبِعْنَ");


    //Other verb types
    //=================
    //فعّل
    //affirmative
    expect(morpho.conjugate("فعّل",$({}, imp, youm))).to.eql("فَعِّلْ");
    expect(morpho.conjugate("فعّل",$({}, imp, youf))).to.eql("فَعِّلِي");
    expect(morpho.conjugate("فعّل",$({}, imp, youmd))).to.eql("فَعِّلَا");
    expect(morpho.conjugate("فعّل",$({}, imp, youfd))).to.eql("فَعِّلَا");
    expect(morpho.conjugate("فعّل",$({}, imp, yoump))).to.eql("فَعِّلُوا");
    expect(morpho.conjugate("فعّل",$({}, imp, youfp))).to.eql("فَعِّلْنَ");
    //negative
    expect(morpho.conjugate("فعّل",$({}, imp, n, youm))).to.eql("لَا تُفَعِّلْ");
    expect(morpho.conjugate("فعّل",$({}, imp, n, youf))).to.eql("لَا تُفَعِّلِي");
    expect(morpho.conjugate("فعّل",$({}, imp, n, youmd))).to.eql("لَا تُفَعِّلَا");
    expect(morpho.conjugate("فعّل",$({}, imp, n, youfd))).to.eql("لَا تُفَعِّلَا");
    expect(morpho.conjugate("فعّل",$({}, imp, n, yoump))).to.eql("لَا تُفَعِّلُوا");
    expect(morpho.conjugate("فعّل",$({}, imp, n, youfp))).to.eql("لَا تُفَعِّلْنَ");

    //فاعل
    //affirmative
    expect(morpho.conjugate("فاعل",$({}, imp, youm))).to.eql("فَاعِلْ");
    expect(morpho.conjugate("فاعل",$({}, imp, youf))).to.eql("فَاعِلِي");
    expect(morpho.conjugate("فاعل",$({}, imp, youmd))).to.eql("فَاعِلَا");
    expect(morpho.conjugate("فاعل",$({}, imp, youfd))).to.eql("فَاعِلَا");
    expect(morpho.conjugate("فاعل",$({}, imp, yoump))).to.eql("فَاعِلُوا");
    expect(morpho.conjugate("فاعل",$({}, imp, youfp))).to.eql("فَاعِلْنَ");
    //negative
    expect(morpho.conjugate("فاعل",$({}, imp, n, youm))).to.eql("لَا تُفَاعِلْ");
    expect(morpho.conjugate("فاعل",$({}, imp, n, youf))).to.eql("لَا تُفَاعِلِي");
    expect(morpho.conjugate("فاعل",$({}, imp, n, youmd))).to.eql("لَا تُفَاعِلَا");
    expect(morpho.conjugate("فاعل",$({}, imp, n, youfd))).to.eql("لَا تُفَاعِلَا");
    expect(morpho.conjugate("فاعل",$({}, imp, n, yoump))).to.eql("لَا تُفَاعِلُوا");
    expect(morpho.conjugate("فاعل",$({}, imp, n, youfp))).to.eql("لَا تُفَاعِلْنَ");

    //أفعل
    //affirmative
    expect(morpho.conjugate("أفعل",$({}, imp, youm))).to.eql("أَفْعِلْ");
    expect(morpho.conjugate("أفعل",$({}, imp, youf))).to.eql("أَفْعِلِي");
    expect(morpho.conjugate("أفعل",$({}, imp, youmd))).to.eql("أَفْعِلَا");
    expect(morpho.conjugate("أفعل",$({}, imp, youfd))).to.eql("أَفْعِلَا");
    expect(morpho.conjugate("أفعل",$({}, imp, yoump))).to.eql("أَفْعِلُوا");
    expect(morpho.conjugate("أفعل",$({}, imp, youfp))).to.eql("أَفْعِلْنَ");
    //negative
    expect(morpho.conjugate("أفعل",$({}, imp, n, youm))).to.eql("لَا تُفْعِلْ");
    expect(morpho.conjugate("أفعل",$({}, imp, n, youf))).to.eql("لَا تُفْعِلِي");
    expect(morpho.conjugate("أفعل",$({}, imp, n, youmd))).to.eql("لَا تُفْعِلَا");
    expect(morpho.conjugate("أفعل",$({}, imp, n, youfd))).to.eql("لَا تُفْعِلَا");
    expect(morpho.conjugate("أفعل",$({}, imp, n, yoump))).to.eql("لَا تُفْعِلُوا");
    expect(morpho.conjugate("أفعل",$({}, imp, n, youfp))).to.eql("لَا تُفْعِلْنَ");

    //TODO verify tafa33ala imperative
    //تفعّل
    /*
    //affirmative
    expect(morpho.conjugate("تفعّل",$({}, imp, youm))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, youf))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, youmd))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, youfd))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, yoump))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, youfp))).to.eql("");
    //negative
    expect(morpho.conjugate("تفعّل",$({}, imp, n, youm))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, n, youf))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, n, youmd))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, n, youfd))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, n, yoump))).to.eql("");
    expect(morpho.conjugate("تفعّل",$({}, imp, n, youfp))).to.eql("");
    */
   
    //تفاعل
    //affirmative
    expect(morpho.conjugate("تفاعل",$({}, imp, youm))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, youf))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, youmd))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, youfd))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, yoump))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, youfp))).to.eql("");
    //negative
    expect(morpho.conjugate("تفاعل",$({}, imp, n, youm))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, n, youf))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, n, youmd))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, n, youfd))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, n, yoump))).to.eql("");
    expect(morpho.conjugate("تفاعل",$({}, imp, n, youfp))).to.eql("");

    //انفعل
    //affirmative
    expect(morpho.conjugate("انفعل",$({}, imp, youm))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, youf))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, youmd))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, youfd))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, yoump))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, youfp))).to.eql("");
    //negative
    expect(morpho.conjugate("انفعل",$({}, imp, n, youm))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, n, youf))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, n, youmd))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, n, youfd))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, n, yoump))).to.eql("");
    expect(morpho.conjugate("انفعل",$({}, imp, n, youfp))).to.eql("");

    //افتعل
    //affirmative
    expect(morpho.conjugate("افتعل",$({}, imp, youm))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, youf))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, youmd))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, youfd))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, yoump))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, youfp))).to.eql("");
    //negative
    expect(morpho.conjugate("افتعل",$({}, imp, n, youm))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, n, youf))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, n, youmd))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, n, youfd))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, n, yoump))).to.eql("");
    expect(morpho.conjugate("افتعل",$({}, imp, n, youfp))).to.eql("");

    //افعلّ
    //affirmative
    expect(morpho.conjugate("افعلّ",$({}, imp, youm))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, youf))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, youmd))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, youfd))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, yoump))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, youfp))).to.eql("");
    //negative
    expect(morpho.conjugate("افعلّ",$({}, imp, n, youm))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, n, youf))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, n, youmd))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, n, youfd))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, n, yoump))).to.eql("");
    expect(morpho.conjugate("افعلّ",$({}, imp, n, youfp))).to.eql("");

    //استفعل
    //affirmative
    expect(morpho.conjugate("استفعل",$({}, imp, youm))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, youf))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, youmd))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, youfd))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, yoump))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, youfp))).to.eql("");
    //negative
    expect(morpho.conjugate("استفعل",$({}, imp, n, youm))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, n, youf))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, n, youmd))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, n, youfd))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, n, yoump))).to.eql("");
    expect(morpho.conjugate("استفعل",$({}, imp, n, youfp))).to.eql("");

  });

});
