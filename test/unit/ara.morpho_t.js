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
    expect(morpho.conjugate("وضع",$({}, pr, i))).to.eql("أَضعُ");
    //present
    expect(morpho.conjugate("وضع",$({}, pr, youfd))).to.eql("تَضعَانِ");

    //استعمل alif
    //past
    expect(morpho.conjugate("استعمل",$({}, pr, i))).to.eql("أَستعمِلُ");
    //present
    expect(morpho.conjugate("استعمل",$({}, pr, youfd))).to.eql("تَستعمِلَانِ");

    //ينع yaa
    //past
    expect(morpho.conjugate("ينع",$({}, pr, i))).to.eql("أَيْنعُ");
    //present
    expect(morpho.conjugate("ينع",$({}, pr, youfd))).to.eql("تَيْنعَانِ");

  });

  it("Muatal Naqis", function() {
    //دنا Waw
    //past
    expect(morpho.conjugate("دنا",$({}, pa, i))).to.eql("دَنوْتُ");
    expect(morpho.conjugate("دنا",$({}, pa, he))).to.eql("دَنا");
    expect(morpho.conjugate("دنا",$({}, pa, she))).to.eql("دَنَتْ");
    expect(morpho.conjugate("دنا",$({}, pa, theyfd))).to.eql("دَنَتَا");
    expect(morpho.conjugate("دنا",$({}, pa, theymp))).to.eql("دَنُوا");//VERIFY
    //present
    expect(morpho.conjugate("دنا",$({}, pr, i))).to.eql("أَدْنو");
    expect(morpho.conjugate("دنا",$({}, pr, youf))).to.eql("تَدْنِينَ");
    expect(morpho.conjugate("دنا",$({}, pr, yoump))).to.eql("تَدْنُونَ");
    expect(morpho.conjugate("دنا",$({}, pr, theymp))).to.eql("يَدْنُونَ");

    //مشى Yaa
    //past
    expect(morpho.conjugate("مشى",$({}, pa, i))).to.eql("مَشيْتُ");
    expect(morpho.conjugate("مشى",$({}, pa, he))).to.eql("مَشى");
    expect(morpho.conjugate("مشى",$({}, pa, she))).to.eql("مَشَتْ");
    expect(morpho.conjugate("مشى",$({}, pa, theyfd))).to.eql("مَشَتَا");
    expect(morpho.conjugate("مشى",$({}, pa, theymp))).to.eql("مَشُوا");//VERIFY
    //present
    expect(morpho.conjugate("مشى",$({}, pr, i))).to.eql("أَمْشي");
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
    expect(morpho.conjugate("نام",$({}, pr, i))).to.eql("أَمُدُّ");
    expect(morpho.conjugate("نام",$({}, pr, youfp))).to.eql("تَمْدُدْنَ");
    expect(morpho.conjugate("نام",$({}, pr, theyfp))).to.eql("يَمْدُدْنَ");

  });

});
