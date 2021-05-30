let AraMorpho;
let expect = require('expect.js');

describe("Arabic Morphology", function(){
  before(async () => {
    let module = await import("../../src/ara/ara.morpho.mjs");
    AraMorpho = module.default;
  });

  describe("Arabic Word normalization", function(){

    it("without options", function(){
      expect(AraMorpho.norm("ذهب")).to.eql("ذهب");
      expect(AraMorpho.norm("ذهــــــــب")).to.eql("ذهب");
      expect(AraMorpho.norm("ذَهَبٌ")).to.eql("ذهب");
      expect(AraMorpho.norm("ذَهــَبَ")).to.eql("ذهب");
      expect(AraMorpho.norm("دعى")).to.eql("دعي");
      expect(AraMorpho.normalize("دعــــى")).to.eql("دعي");
      expect(AraMorpho.normalize("دعاة")).to.eql("دعاه");
      expect(AraMorpho.normalize("أَنَا")).to.eql("انا");
    });

    it("voc option", function(){
      expect(AraMorpho.norm("ذَهَبٌ", "voc")).to.eql("ذهب");
      expect(AraMorpho.norm("ذَهــَبَ", "voc")).not.to.eql("ذهب");
    });

    it("alef option", function(){
      expect(AraMorpho.norm("أنا", "alef")).to.eql("انا");
      expect(AraMorpho.norm("إنه", "alef")).to.eql("انه");
      expect(AraMorpho.norm("آسف", "alef")).to.eql("اسف");
    });

    it("yeh option", function(){
      expect(AraMorpho.norm("دعى", "yeh")).to.eql("دعي");
    });

    it("teh option", function(){
      expect(AraMorpho.norm("دعاة", "teh")).to.eql("دعاه");
    });

    it("_ option", function(){
      expect(AraMorpho.normalize("ذهــــــــب", "_")).to.eql("ذهب");
    });

    it("options combination", function(){
      expect(AraMorpho.norm("ذَهــَبَ", "voc,_")).to.eql("ذهب");
      expect(AraMorpho.norm("ذَهــَبَ", "_,a lot of non sense,voc")).to.eql("ذهب");
      expect(AraMorpho.norm("دعــــى", "yeh, _")).to.eql("دعي");
      expect(AraMorpho.normalize("دعــــــاة", "teh,_")).to.eql("دعاه");
      expect(AraMorpho.normalize("أَنـــــَا", "alef,_,voc")).to.eql("انا");
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
      expect(AraMorpho.conj("ذهب",$({}, pa, i))).to.eql("ذَهبْتُ");
      expect(AraMorpho.conj("ذهب",$({}, pa, we))).to.eql("ذَهبْنَا");
      expect(AraMorpho.conj("ذهب",$({}, pa, youm))).to.eql("ذَهبْتَ");
      expect(AraMorpho.conj("ذهب",$({}, pa, youf))).to.eql("ذَهبْتِ");
      expect(AraMorpho.conj("ذهب",$({}, pa, youmd))).to.eql("ذَهبْتُمَا");
      expect(AraMorpho.conj("ذهب",$({}, pa, youfd))).to.eql("ذَهبْتُمَا");
      expect(AraMorpho.conj("ذهب",$({}, pa, yoump))).to.eql("ذَهبْتُمْ");
      expect(AraMorpho.conj("ذهب",$({}, pa, youfp))).to.eql("ذَهبْتُنَّ");
      expect(AraMorpho.conj("ذهب",$({}, pa, he))).to.eql("ذَهبَ");
      expect(AraMorpho.conj("ذهب",$({}, pa, she))).to.eql("ذَهبَتْ");
      expect(AraMorpho.conj("ذهب",$({}, pa, theymd))).to.eql("ذَهبَا");
      expect(AraMorpho.conj("ذهب",$({}, pa, theyfd))).to.eql("ذَهبَتَا");
      expect(AraMorpho.conj("ذهب",$({}, pa, theymp))).to.eql("ذَهبُوا");
      expect(AraMorpho.conj("ذهب",$({}, pa, theyfp))).to.eql("ذَهبْنَ");

    });

    it("Sahih Salim (standard) present", function() {
      //present
      expect(AraMorpho.conjugate("ذهب",$({}, pr, i))).to.eql("أَذْهبُ");
      expect(AraMorpho.conjugate("ذهب",$({}, pr, we))).to.eql("نَذْهبُ");
      expect(AraMorpho.conj("ذهب",$({}, pr, youm))).to.eql("تَذْهبُ");
      expect(AraMorpho.conj("ذهب",$({}, pr, youf))).to.eql("تَذْهبِينَ");
      expect(AraMorpho.conj("ذهب",$({}, pr, youmd))).to.eql("تَذْهبَانِ");
      expect(AraMorpho.conj("ذهب",$({}, pr, youfd))).to.eql("تَذْهبَانِ");
      expect(AraMorpho.conj("ذهب",$({}, pr, yoump))).to.eql("تَذْهبُونَ");
      expect(AraMorpho.conj("ذهب",$({}, pr, youfp))).to.eql("تَذْهبْنَ");
      expect(AraMorpho.conj("ذهب",$({}, pr, he))).to.eql("يَذْهبُ");
      expect(AraMorpho.conj("ذهب",$({}, pr, she))).to.eql("تَذْهبُ");
      expect(AraMorpho.conj("ذهب",$({}, pr, theymd))).to.eql("يَذْهبَانِ");
      expect(AraMorpho.conj("ذهب",$({}, pr, theyfd))).to.eql("تَذْهبَانِ");
      expect(AraMorpho.conj("ذهب",$({}, pr, theymp))).to.eql("يَذْهبُونَ");
      expect(AraMorpho.conj("ذهب",$({}, pr, theyfp))).to.eql("يَذْهبْنَ");

    });

    it("Muatal Mithal + alif", function() {
      //وضع Waw
      //past
      expect(AraMorpho.conj("وضع",$({}, pa, i))).to.eql("وَضعْتُ");
      //present
      expect(AraMorpho.conj("وضع",$({}, pr, youfd))).to.eql("تَضعَانِ");

      //استعمل alif
      //past
      expect(AraMorpho.conj("استعمل",$({}, pa, i))).to.eql("استَعمَلْتُ");
      //present
      expect(AraMorpho.conj("استعمل",$({}, pr, youfd))).to.eql("تَستعمِلَانِ");

      //ينع yaa
      //past
      expect(AraMorpho.conj("ينع",$({}, pa, i))).to.eql("يَنعْتُ");
      //present
      expect(AraMorpho.conj("ينع",$({}, pr, youfd))).to.eql("تَيْنعَانِ");

    });

    it("Muatal Naqis", function() {
      //دنا Waw
      //past
      expect(AraMorpho.conj("دنا",$({}, pa, i))).to.eql("دَنَوْتُ");
      expect(AraMorpho.conj("دنا",$({}, pa, he))).to.eql("دَنَا");
      expect(AraMorpho.conj("دنا",$({}, pa, she))).to.eql("دَنَتْ");
      expect(AraMorpho.conj("دنا",$({}, pa, theyfd))).to.eql("دَنَتَا");
      expect(AraMorpho.conj("دنا",$({}, pa, theymp))).to.eql("دَنُوا");//VERIFY
      //present
      expect(AraMorpho.conj("دنا",$({}, pr, i))).to.eql("أَدْنُو");
      expect(AraMorpho.conj("دنا",$({}, pr, youf))).to.eql("تَدْنِينَ");
      expect(AraMorpho.conj("دنا",$({}, pr, yoump))).to.eql("تَدْنُونَ");
      expect(AraMorpho.conj("دنا",$({}, pr, theymp))).to.eql("يَدْنُونَ");

      //مشى Yaa
      //past
      expect(AraMorpho.conj("مشى",$({}, pa, i))).to.eql("مَشَيْتُ");
      expect(AraMorpho.conj("مشى",$({}, pa, he))).to.eql("مَشَى");
      expect(AraMorpho.conj("مشى",$({}, pa, she))).to.eql("مَشَتْ");
      expect(AraMorpho.conj("مشى",$({}, pa, theyfd))).to.eql("مَشَتَا");
      expect(AraMorpho.conj("مشى",$({}, pa, theymp))).to.eql("مَشُوا");//VERIFY
      //present
      expect(AraMorpho.conj("مشى",$({}, pr, i))).to.eql("أَمْشِي");
      expect(AraMorpho.conj("مشى",$({}, pr, youf))).to.eql("تَمْشِينَ");
      expect(AraMorpho.conj("مشى",$({}, pr, yoump))).to.eql("تَمْشُونَ");
      expect(AraMorpho.conj("مشى",$({}, pr, theymp))).to.eql("يَمْشُونَ");

    });

    it("Muatal ajwaf", function() {
      //نام Alif
      //past
      expect(AraMorpho.conj("نام",$({}, pa, i))).to.eql("نِمْتُ");
      expect(AraMorpho.conj("نام",$({}, pa, theymd))).to.eql("نَامَا");
      expect(AraMorpho.conj("نام",$({}, pa, theyfp))).to.eql("نِمْنَ");
      //present
      expect(AraMorpho.conj("نام",$({}, pr, i))).to.eql("أَنَامُ");
      expect(AraMorpho.conj("نام",$({}, pr, youfp))).to.eql("تَنَمْنَ");
      expect(AraMorpho.conj("نام",$({}, pr, theyfp))).to.eql("يَنَمْنَ");

      //شاء Alif with Hamza
      //TODO fix it

      //عاد Waw
      //past
      expect(AraMorpho.conj("عاد",$({}, pa, i))).to.eql("عُدْتُ");
      expect(AraMorpho.conj("عاد",$({}, pa, theymd))).to.eql("عَادَا");
      expect(AraMorpho.conj("عاد",$({}, pa, theyfp))).to.eql("عُدْنَ");
      //present
      expect(AraMorpho.conj("عاد",$({}, pr, i))).to.eql("أَعُودُ");
      expect(AraMorpho.conj("عاد",$({}, pr, youfp))).to.eql("تَعُدْنَ");

      //ساح Yaa
      //past
      expect(AraMorpho.conj("ساح",$({}, pa, i))).to.eql("سِحْتُ");
      expect(AraMorpho.conj("ساح",$({}, pa, theymd))).to.eql("سَاحَا");
      expect(AraMorpho.conj("ساح",$({}, pa, theyfp))).to.eql("سِحْنَ");
      //present
      expect(AraMorpho.conj("ساح",$({}, pr, i))).to.eql("أَسِيحُ");
      expect(AraMorpho.conj("ساح",$({}, pr, youfp))).to.eql("تَسِحْنَ");

    });

    it("Salim muda33af", function() {
      //مدّ
      //past
      expect(AraMorpho.conj("مدّ",$({}, pa, i))).to.eql("مَدَدْتُ");
      expect(AraMorpho.conj("مدّ",$({}, pa, theymd))).to.eql("مَدَّا");
      expect(AraMorpho.conj("مدّ",$({}, pa, theyfp))).to.eql("مَدَدْنَ");
      //present
      expect(AraMorpho.conj("مدّ",$({}, pr, i))).to.eql("أَمُدُّ");
      expect(AraMorpho.conj("مدّ",$({}, pr, youfp))).to.eql("تَمْدُدْنَ");
      expect(AraMorpho.conj("مدّ",$({}, pr, theyfp))).to.eql("يَمْدُدْنَ");

    });

    it("verbs types", function() {
      //فعّل
      //past
      expect(AraMorpho.conj("فعّل",$({}, pa, i))).to.eql("فَعَّلْتُ");
      expect(AraMorpho.conj("فعّل",$({}, pa, theymd))).to.eql("فَعَّلَا");
      expect(AraMorpho.conj("فعّل",$({}, pa, theyfp))).to.eql("فَعَّلْنَ");
      //present
      expect(AraMorpho.conj("فعّل",$({}, pr, i))).to.eql("أُفَعِّلُ");
      expect(AraMorpho.conj("فعّل",$({}, pr, youfp))).to.eql("تُفَعِّلْنَ");
      expect(AraMorpho.conj("فعّل",$({}, pr, theyfp))).to.eql("يُفَعِّلْنَ");

      //فاعل
      //past
      expect(AraMorpho.conj("فاعل",$({}, pa, i))).to.eql("فَاعَلْتُ");
      expect(AraMorpho.conj("فاعل",$({}, pa, theymd))).to.eql("فَاعَلَا");
      expect(AraMorpho.conj("فاعل",$({}, pa, theyfp))).to.eql("فَاعَلْنَ");
      //present
      expect(AraMorpho.conj("فاعل",$({}, pr, i))).to.eql("أُفَاعِلُ");
      expect(AraMorpho.conj("فاعل",$({}, pr, youfp))).to.eql("تُفَاعِلْنَ");
      expect(AraMorpho.conj("فاعل",$({}, pr, theyfp))).to.eql("يُفَاعِلْنَ");

      //أفعل
      //past
      expect(AraMorpho.conj("أفعل",$({}, pa, i))).to.eql("أفْعَلْتُ");
      expect(AraMorpho.conj("أفعل",$({}, pa, theymd))).to.eql("أفْعَلَا");
      expect(AraMorpho.conj("أفعل",$({}, pa, theyfp))).to.eql("أفْعَلْنَ");
      //present
      expect(AraMorpho.conj("أفعل",$({}, pr, i))).to.eql("أُفْعِلُ");
      expect(AraMorpho.conj("أفعل",$({}, pr, youfp))).to.eql("تُفْعِلْنَ");
      expect(AraMorpho.conj("أفعل",$({}, pr, theyfp))).to.eql("يُفْعِلْنَ");

      //تفعّل
      //past
      expect(AraMorpho.conj("تفعّل",$({}, pa, i))).to.eql("تفعَّلْتُ");
      expect(AraMorpho.conj("تفعّل",$({}, pa, theymd))).to.eql("تفعَّلَا");
      expect(AraMorpho.conj("تفعّل",$({}, pa, theyfp))).to.eql("تفعَّلْنَ");
      //present
      expect(AraMorpho.conj("تفعّل",$({}, pr, i))).to.eql("أَتفعَّلُ");
      expect(AraMorpho.conj("تفعّل",$({}, pr, youfp))).to.eql("تَتفعَّلْنَ");
      expect(AraMorpho.conj("تفعّل",$({}, pr, theyfp))).to.eql("يَتفعَّلْنَ");

      //تفاعل
      //past
      expect(AraMorpho.conj("تفاعل",$({}, pa, i))).to.eql("تفاعَلْتُ");
      expect(AraMorpho.conj("تفاعل",$({}, pa, theymd))).to.eql("تفاعَلَا");
      expect(AraMorpho.conj("تفاعل",$({}, pa, theyfp))).to.eql("تفاعَلْنَ");
      //present
      expect(AraMorpho.conj("تفاعل",$({}, pr, i))).to.eql("أَتفاعَلُ");
      expect(AraMorpho.conj("تفاعل",$({}, pr, youfp))).to.eql("تَتفاعَلْنَ");
      expect(AraMorpho.conj("تفاعل",$({}, pr, theyfp))).to.eql("يَتفاعَلْنَ");

      //انفعل
      //past
      expect(AraMorpho.conj("انفعل",$({}, pa, i))).to.eql("انفَعَلْتُ");
      expect(AraMorpho.conj("انفعل",$({}, pa, theymd))).to.eql("انفَعَلَا");
      expect(AraMorpho.conj("انفعل",$({}, pa, theyfp))).to.eql("انفَعَلْنَ");
      //present
      expect(AraMorpho.conj("انفعل",$({}, pr, i))).to.eql("أَنفَعِلُ");
      expect(AraMorpho.conj("انفعل",$({}, pr, youfp))).to.eql("تَنفَعِلْنَ");
      expect(AraMorpho.conj("انفعل",$({}, pr, theyfp))).to.eql("يَنفَعِلْنَ");

      //افتعل
      //past
      expect(AraMorpho.conj("افتعل",$({}, pa, i))).to.eql("افتَعَلْتُ");
      expect(AraMorpho.conj("افتعل",$({}, pa, theymd))).to.eql("افتَعَلَا");
      expect(AraMorpho.conj("افتعل",$({}, pa, theyfp))).to.eql("افتَعَلْنَ");
      //present
      expect(AraMorpho.conj("افتعل",$({}, pr, i))).to.eql("أَفتَعِلُ");
      expect(AraMorpho.conj("افتعل",$({}, pr, youfp))).to.eql("تَفتَعِلْنَ");
      expect(AraMorpho.conj("افتعل",$({}, pr, theyfp))).to.eql("يَفتَعِلْنَ");

      //افعلّ
      //past
      expect(AraMorpho.conj("افعلّ",$({}, pa, i))).to.eql("افْعلَلْتُ");
      expect(AraMorpho.conj("افعلّ",$({}, pa, theymd))).to.eql("افْعلَّا");
      expect(AraMorpho.conj("افعلّ",$({}, pa, theyfp))).to.eql("افْعلَلْنَ");
      //present
      expect(AraMorpho.conj("افعلّ",$({}, pr, i))).to.eql("أَفْعَلُّ");
      expect(AraMorpho.conj("افعلّ",$({}, pr, youfp))).to.eql("تَفْعلِلْنَ");
      expect(AraMorpho.conj("افعلّ",$({}, pr, theyfp))).to.eql("يَفْعلِلْنَ");

      //استفعل
      //past
      expect(AraMorpho.conj("استفعل",$({}, pa, i))).to.eql("استَفعَلْتُ");
      expect(AraMorpho.conj("استفعل",$({}, pa, theymd))).to.eql("استَفعَلَا");
      expect(AraMorpho.conj("استفعل",$({}, pa, theyfp))).to.eql("استَفعَلْنَ");
      //present
      expect(AraMorpho.conj("استفعل",$({}, pr, i))).to.eql("أَستفعِلُ");
      expect(AraMorpho.conj("استفعل",$({}, pr, youfp))).to.eql("تَستفعِلْنَ");
      expect(AraMorpho.conj("استفعل",$({}, pr, theyfp))).to.eql("يَستفعِلْنَ");

    });

    it("Passive voice", function() {

      //Mu3tall Mithal
      //==============
      //وضع Waw
      //past
      expect(AraMorpho.conj("وضع",$({}, pa, pv, i))).to.eql("وُضِعْتُ");
      //present
      expect(AraMorpho.conj("وضع",$({}, pr, pv, youfd))).to.eql("تُوضَعَانِ");

      //ينع yaa
      //past
      expect(AraMorpho.conj("ينع",$({}, pa, pv, i))).to.eql("يُنِعْتُ");
      //present
      expect(AraMorpho.conj("ينع",$({}, pr, pv, youfd))).to.eql("تُيْنَعَانِ");


      // Muatal Naqis
      // ==============
      //دعا Waw
      //past
      expect(AraMorpho.conj("دعا",$({}, pa, pv, i))).to.eql("دُعِيتُ");
      expect(AraMorpho.conj("دعا",$({}, pa, pv, he))).to.eql("دُعِيَ");
      expect(AraMorpho.conj("دعا",$({}, pa, pv, she))).to.eql("دُعِيَتْ");
      expect(AraMorpho.conj("دعا",$({}, pa, pv, theyfd))).to.eql("دُعِيَتَا");
      expect(AraMorpho.conj("دعا",$({}, pa, pv, theymp))).to.eql("دُعِيُوا");//VERIFY
      //present
      expect(AraMorpho.conj("دعا",$({}, pr, pv, i))).to.eql("أُدْعَى");
      expect(AraMorpho.conj("دعا",$({}, pr, pv, youf))).to.eql("تُدْعِينَ");
      expect(AraMorpho.conj("دعا",$({}, pr, pv, youmd))).to.eql("تُدْعَيَانِ");
      expect(AraMorpho.conj("دعا",$({}, pr, pv, theymp))).to.eql("يُدْعُونَ");

      //بنى Yaa
      //past
      expect(AraMorpho.conj("بنى",$({}, pa, pv, i))).to.eql("بُنِيتُ");
      expect(AraMorpho.conj("بنى",$({}, pa, pv, he))).to.eql("بُنِيَ");
      expect(AraMorpho.conj("بنى",$({}, pa, pv, she))).to.eql("بُنِيَتْ");
      expect(AraMorpho.conj("بنى",$({}, pa, pv, theyfd))).to.eql("بُنِيَتَا");
      expect(AraMorpho.conj("بنى",$({}, pa, pv, theymp))).to.eql("بُنِيُوا");//VERIFY
      //present
      expect(AraMorpho.conj("بنى",$({}, pr, pv, i))).to.eql("أُبْنَى");
      expect(AraMorpho.conj("بنى",$({}, pr, pv, youf))).to.eql("تُبْنِينَ");
      expect(AraMorpho.conj("بنى",$({}, pr, pv, yoump))).to.eql("تُبْنُونَ");
      expect(AraMorpho.conj("بنى",$({}, pr, pv, theyfp))).to.eql("يُبْنَينَ");


      //Muatal ajwaf"
      //نام Alif
      //past
      expect(AraMorpho.conj("خاف",$({}, pa, pv, i))).to.eql("خِفْتُ");//VERIFY
      expect(AraMorpho.conj("خاف",$({}, pa, pv, theymd))).to.eql("خِيفَا");
      expect(AraMorpho.conj("خاف",$({}, pa, pv, theyfp))).to.eql("خِفْنَ");//VERIFY
      //present
      expect(AraMorpho.conj("خاف",$({}, pr, pv, i))).to.eql("أُخَافُ");
      expect(AraMorpho.conj("خاف",$({}, pr, pv, youfp))).to.eql("تُخَفْنَ");
      expect(AraMorpho.conj("خاف",$({}, pr, pv, theymd))).to.eql("يُخَافَانِ");

      //شاء Alif with Hamza
      //TODO fix it

      //عاد Waw
      //past
      expect(AraMorpho.conj("عاد",$({}, pa, pv, i))).to.eql("عِدْتُ");
      expect(AraMorpho.conj("عاد",$({}, pa, pv, theymd))).to.eql("عِيدَا");
      expect(AraMorpho.conj("عاد",$({}, pa, pv, theyfp))).to.eql("عِدْنَ");
      //present
      expect(AraMorpho.conj("عاد",$({}, pr, pv, i))).to.eql("أُعَادُ");
      expect(AraMorpho.conj("عاد",$({}, pr, pv, youfp))).to.eql("تُعَدْنَ");

      //باع Yaa
      //past
      expect(AraMorpho.conj("باع",$({}, pa, pv, i))).to.eql("بِعْتُ");
      expect(AraMorpho.conj("باع",$({}, pa, pv, theymd))).to.eql("بِيعَا");
      expect(AraMorpho.conj("باع",$({}, pa, pv, theyfp))).to.eql("بِعْنَ");
      //present
      expect(AraMorpho.conj("باع",$({}, pr, pv, i))).to.eql("أُبَاعُ");
      expect(AraMorpho.conj("باع",$({}, pr, pv, theyfp))).to.eql("يُبَعْنَ");


      //Other verb types
      //=================
      //فعّل
      //past
      expect(AraMorpho.conj("فعّل",$({}, pa, pv, i))).to.eql("فُعِّلْتُ");
      expect(AraMorpho.conj("فعّل",$({}, pa, pv, theymd))).to.eql("فُعِّلَا");
      expect(AraMorpho.conj("فعّل",$({}, pa, pv, theyfp))).to.eql("فُعِّلْنَ");
      //present
      expect(AraMorpho.conj("فعّل",$({}, pr, pv, i))).to.eql("أُفَعَّلُ");
      expect(AraMorpho.conj("فعّل",$({}, pr, pv, youfp))).to.eql("تُفَعَّلْنَ");
      expect(AraMorpho.conj("فعّل",$({}, pr, pv, theyfp))).to.eql("يُفَعَّلْنَ");

      //فاعل
      //past
      expect(AraMorpho.conj("فاعل",$({}, pa, pv, i))).to.eql("فُوعِلْتُ");
      expect(AraMorpho.conj("فاعل",$({}, pa, pv, theymd))).to.eql("فُوعِلَا");
      expect(AraMorpho.conj("فاعل",$({}, pa, pv, theyfp))).to.eql("فُوعِلْنَ");
      //present
      expect(AraMorpho.conj("فاعل",$({}, pr, pv, i))).to.eql("أُفَاعَلُ");
      expect(AraMorpho.conj("فاعل",$({}, pr, pv, youfp))).to.eql("تُفَاعَلْنَ");
      expect(AraMorpho.conj("فاعل",$({}, pr, pv, theyfp))).to.eql("يُفَاعَلْنَ");

      //أفعل
      //past
      expect(AraMorpho.conj("أفعل",$({}, pa, pv, i))).to.eql("أُفْعِلْتُ");
      expect(AraMorpho.conj("أفعل",$({}, pa, pv, youmd))).to.eql("أُفْعِلْتُمَا");
      expect(AraMorpho.conj("أفعل",$({}, pa, pv, theyfp))).to.eql("أُفْعِلْنَ");
      //present
      expect(AraMorpho.conj("أفعل",$({}, pr, pv, i))).to.eql("أُفْعَلُ");
      expect(AraMorpho.conj("أفعل",$({}, pr, pv, youfp))).to.eql("تُفْعَلْنَ");
      expect(AraMorpho.conj("أفعل",$({}, pr, pv, theyfp))).to.eql("يُفْعَلْنَ");

      //تفعّل I think no passive voice for this type
      //It seems intransitive
      //past
      expect(AraMorpho.conj("تفعّل",$({}, pa, pv, i))).to.eql("");
      expect(AraMorpho.conj("تفعّل",$({}, pa, pv, theymd))).to.eql("");
      expect(AraMorpho.conj("تفعّل",$({}, pa, pv, theyfp))).to.eql("");
      //present
      expect(AraMorpho.conj("تفعّل",$({}, pr, pv, i))).to.eql("");
      expect(AraMorpho.conj("تفعّل",$({}, pr, pv, youfp))).to.eql("");
      expect(AraMorpho.conj("تفعّل",$({}, pr, pv, theyfp))).to.eql("");

      //تفاعل I think no passive voice for this type
      //It seems intransitive
      //past
      expect(AraMorpho.conj("تفاعل",$({}, pa, pv, i))).to.eql("");
      expect(AraMorpho.conj("تفاعل",$({}, pa, pv, theymd))).to.eql("");
      expect(AraMorpho.conj("تفاعل",$({}, pa, pv, theyfp))).to.eql("");
      //present
      expect(AraMorpho.conj("تفاعل",$({}, pr, pv, i))).to.eql("");
      expect(AraMorpho.conj("تفاعل",$({}, pr, pv, youfp))).to.eql("");
      expect(AraMorpho.conj("تفاعل",$({}, pr, pv, theyfp))).to.eql("");

      //انفعل I think no passive voice for this type
      //It seems intransitive
      //past
      expect(AraMorpho.conj("انفعل",$({}, pa, pv, i))).to.eql("");
      expect(AraMorpho.conj("انفعل",$({}, pa, pv, theymd))).to.eql("");
      expect(AraMorpho.conj("انفعل",$({}, pa, pv, theyfp))).to.eql("");
      //present
      expect(AraMorpho.conj("انفعل",$({}, pr, pv, i))).to.eql("");
      expect(AraMorpho.conj("انفعل",$({}, pr, pv, youfp))).to.eql("");
      expect(AraMorpho.conj("انفعل",$({}, pr, pv, theyfp))).to.eql("");

      //افتعل
      //past
      expect(AraMorpho.conj("افتعل",$({}, pa, pv, i))).to.eql("افتُعِلْتُ");
      expect(AraMorpho.conj("افتعل",$({}, pa, pv, theymd))).to.eql("افتُعِلَا");
      expect(AraMorpho.conj("افتعل",$({}, pa, pv, theyfp))).to.eql("افتُعِلْنَ");
      //present
      expect(AraMorpho.conj("افتعل",$({}, pr, pv, i))).to.eql("أُفتَعَلُ");
      expect(AraMorpho.conj("افتعل",$({}, pr, pv, youfp))).to.eql("تُفتَعَلْنَ");
      expect(AraMorpho.conj("افتعل",$({}, pr, pv, theyfp))).to.eql("يُفتَعَلْنَ");

      //افعلّ I think no passive voice for this type
      //It seems intransitive
      //past
      expect(AraMorpho.conj("افعلّ",$({}, pa, pv, i))).to.eql("");
      expect(AraMorpho.conj("افعلّ",$({}, pa, pv, theymd))).to.eql("");
      expect(AraMorpho.conj("افعلّ",$({}, pa, pv, theyfp))).to.eql("");
      //present
      expect(AraMorpho.conj("افعلّ",$({}, pr, pv, i))).to.eql("");
      expect(AraMorpho.conj("افعلّ",$({}, pr, pv, youfp))).to.eql("");
      expect(AraMorpho.conj("افعلّ",$({}, pr, pv, theyfp))).to.eql("");

      //استفعل
      //past
      expect(AraMorpho.conj("استفعل",$({}, pa, pv, i))).to.eql("استُفعِلْتُ");
      expect(AraMorpho.conj("استفعل",$({}, pa, pv, theymd))).to.eql("استُفعِلَا");
      expect(AraMorpho.conj("استفعل",$({}, pa, pv, theyfp))).to.eql("استُفعِلْنَ");
      //present
      expect(AraMorpho.conj("استفعل",$({}, pr, pv, i))).to.eql("أُستفعَلُ");
      expect(AraMorpho.conj("استفعل",$({}, pr, pv, youfp))).to.eql("تُستفعَلْنَ");
      expect(AraMorpho.conj("استفعل",$({}, pr, pv, theyfp))).to.eql("يُستفعَلْنَ");

    });


    it("Negation", function() {

      //Mu3tall Mithal
      //==============
      //وضع Waw
      //Active voice
      //past
      expect(AraMorpho.conj("وضع",$({}, pa, n, i))).to.eql("لَمْ أَضعْ");
      //present
      expect(AraMorpho.conj("وضع",$({}, pr, n, youfd))).to.eql("لَنْ تَضعَا");
      //Passive voice
      //past
      expect(AraMorpho.conj("وضع",$({}, pa, n, pv, i))).to.eql("لَمْ أُوضَعْ");
      //present
      expect(AraMorpho.conj("وضع",$({}, pr, n, pv, youfd))).to.eql("لَنْ تُوضَعَا");

      //ينع yaa
      //Active voice
      //past
      expect(AraMorpho.conj("ينع",$({}, pa, n, i))).to.eql("لَمْ أَيْنعْ");
      //present
      expect(AraMorpho.conj("ينع",$({}, pr, n, youfd))).to.eql("لَنْ تَيْنعَا");
      //Passive voice
      //past
      expect(AraMorpho.conj("ينع",$({}, pa, n, pv, i))).to.eql("لَمْ أُيْنَعْ");
      //present
      expect(AraMorpho.conj("ينع",$({}, pr, n, pv, youfd))).to.eql("لَنْ تُيْنَعَا");


      // Muatal Naqis
      // ==============
      //دعا Waw
      //Active voice
      //past
      expect(AraMorpho.conj("دعا",$({}, pa, n, i))).to.eql("لَمْ أَدْعُ");
      expect(AraMorpho.conj("دعا",$({}, pa, n, he))).to.eql("لَمْ يَدْعُ");
      expect(AraMorpho.conj("دعا",$({}, pa, n, youfd))).to.eql("لَمْ تَدْعُوَا");
      //present
      expect(AraMorpho.conj("دعا",$({}, pr, n, i))).to.eql("لَنْ أَدْعُوَ");
      expect(AraMorpho.conj("دعا",$({}, pr, n, youf))).to.eql("لَنْ تَدْعِي");
      expect(AraMorpho.conj("دعا",$({}, pr, n, youmd))).to.eql("لَنْ تَدْعُوَا");
      //Passive voice
      //past
      expect(AraMorpho.conj("دعا",$({}, pa, n, pv, i))).to.eql("لَمْ أُدْعَ");
      expect(AraMorpho.conj("دعا",$({}, pa, n, pv, he))).to.eql("لَمْ يُدْعَ");
      expect(AraMorpho.conj("دعا",$({}, pa, n, pv, youfd))).to.eql("لَمْ تُدْعَيَا");
      //present
      expect(AraMorpho.conj("دعا",$({}, pr, n, pv, i))).to.eql("لَنْ أُدْعَى");
      expect(AraMorpho.conj("دعا",$({}, pr, n, pv, youf))).to.eql("لَنْ تُدْعِي");
      expect(AraMorpho.conj("دعا",$({}, pr, n, pv, youmd))).to.eql("لَنْ تُدْعَيَا");


      //بنى Yaa
      //Active Voice
      //past
      expect(AraMorpho.conj("بنى",$({}, pa, n, i))).to.eql("لَمْ أَبْنِ");
      expect(AraMorpho.conj("بنى",$({}, pa, n, he))).to.eql("لَمْ يَبْنِ");
      expect(AraMorpho.conj("بنى",$({}, pa, n, she))).to.eql("لَمْ تَبْنِ");
      expect(AraMorpho.conj("بنى",$({}, pa, n, theyfd))).to.eql("لَمْ تَبْنِيَا");
      expect(AraMorpho.conj("بنى",$({}, pa, n, theymp))).to.eql("لَمْ يَبْنُوا");
      //present
      expect(AraMorpho.conj("بنى",$({}, pr, n, i))).to.eql("لَنْ أَبْنِيَ");
      expect(AraMorpho.conj("بنى",$({}, pr, n, youf))).to.eql("لَنْ تَبْنِي");
      expect(AraMorpho.conj("بنى",$({}, pr, n, yoump))).to.eql("لَنْ تَبْنُوا");
      expect(AraMorpho.conj("بنى",$({}, pr, n, theyfp))).to.eql("لَنْ يَبْنِينَ");
      //Passive Voice
      //past
      expect(AraMorpho.conj("بنى",$({}, pa, n, pv, i))).to.eql("لَمْ أُبْنَ");
      expect(AraMorpho.conj("بنى",$({}, pa, n, pv, he))).to.eql("لَمْ يُبْنَ");
      expect(AraMorpho.conj("بنى",$({}, pa, n, pv, she))).to.eql("لَمْ تُبْنَ");
      expect(AraMorpho.conj("بنى",$({}, pa, n, pv, theyfd))).to.eql("لَمْ تُبْنَيَا");
      expect(AraMorpho.conj("بنى",$({}, pa, n, pv, theymp))).to.eql("لَمْ يُبْنُوا");
      //present
      expect(AraMorpho.conj("بنى",$({}, pr, n, pv, i))).to.eql("لَنْ أُبْنَى");
      expect(AraMorpho.conj("بنى",$({}, pr, n, pv, youf))).to.eql("لَنْ تُبْنِي");
      expect(AraMorpho.conj("بنى",$({}, pr, n, pv, yoump))).to.eql("لَنْ تُبْنُوا");
      expect(AraMorpho.conj("بنى",$({}, pr, n, pv, theyfp))).to.eql("لَنْ يُبْنَينَ");


      //Muatal ajwaf"
      //نام Alif
      //Active voice
      //past
      expect(AraMorpho.conj("خاف",$({}, pa, n, i))).to.eql("لَمْ أَخَفْ");
      expect(AraMorpho.conj("خاف",$({}, pa, n, theymd))).to.eql("لَمْ يَخَافَا");
      expect(AraMorpho.conj("خاف",$({}, pa, n, theyfp))).to.eql("لَمْ يَخَفْنَ");//VERIFY
      //present
      expect(AraMorpho.conj("خاف",$({}, pr, n, i))).to.eql("لَنْ أَخَافَ");
      expect(AraMorpho.conj("خاف",$({}, pr, n, youfp))).to.eql("لَنْ تَخَفْنَ");
      expect(AraMorpho.conj("خاف",$({}, pr, n, theymd))).to.eql("لَنْ يَخَافَا");
      //Passive voice
      //past
      expect(AraMorpho.conj("خاف",$({}, pa, n, pv, i))).to.eql("لَمْ أُخَفْ");//VERIFY
      expect(AraMorpho.conj("خاف",$({}, pa, n, pv, theymd))).to.eql("لَمْ يُخَافَا");
      expect(AraMorpho.conj("خاف",$({}, pa, n, pv, theyfp))).to.eql("لَمْ يُخَفْنَ");
      //present
      expect(AraMorpho.conj("خاف",$({}, pr, n, pv, i))).to.eql("لَنْ أُخَافَ");
      expect(AraMorpho.conj("خاف",$({}, pr, n, pv, youfp))).to.eql("لَنْ تُخَفْنَ");
      expect(AraMorpho.conj("خاف",$({}, pr, n, pv, theymd))).to.eql("لَنْ يُخَافَا");

      //شاء Alif with Hamza
      //TODO fix it

      //عاد Waw
      //Active voice
      //past
      expect(AraMorpho.conj("عاد",$({}, pa, n, i))).to.eql("لَمْ أَعُدْ");
      expect(AraMorpho.conj("عاد",$({}, pa, n, theymd))).to.eql("لَمْ يَعُودَا");
      expect(AraMorpho.conj("عاد",$({}, pa, n, theyfp))).to.eql("لَمْ يَعُدْنَ");
      //present
      expect(AraMorpho.conj("عاد",$({}, pr, n, i))).to.eql("لَنْ أَعُودَ");
      expect(AraMorpho.conj("عاد",$({}, pr, n, youfp))).to.eql("لَنْ تَعُدْنَ");
      //Passive voice
      //past
      expect(AraMorpho.conj("عاد",$({}, pa, n, pv, i))).to.eql("لَمْ أُعَدْ");
      expect(AraMorpho.conj("عاد",$({}, pa, n, pv, theymd))).to.eql("لَمْ يُعَادَا");
      expect(AraMorpho.conj("عاد",$({}, pa, n, pv, theyfp))).to.eql("لَمْ يُعَدْنَ");
      //present
      expect(AraMorpho.conj("عاد",$({}, pr, n, pv, i))).to.eql("لَنْ أُعَادَ");
      expect(AraMorpho.conj("عاد",$({}, pr, n, pv, youfp))).to.eql("لَنْ تُعَدْنَ");

      //باع Yaa
      //Active voice
      //past
      expect(AraMorpho.conj("باع",$({}, pa, n, i))).to.eql("لَمْ أَبِعْ");
      expect(AraMorpho.conj("باع",$({}, pa, n, theymd))).to.eql("لَمْ يَبِيعَا");
      expect(AraMorpho.conj("باع",$({}, pa, n, theyfp))).to.eql("لَمْ يَبِعْنَ");
      //present
      expect(AraMorpho.conj("باع",$({}, pr, n, i))).to.eql("لَنْ أَبِيعَ");
      expect(AraMorpho.conj("باع",$({}, pr, n, theyfp))).to.eql("لَنْ يَبِعْنَ");
      //Passive voice
      //past
      expect(AraMorpho.conj("باع",$({}, pa, n, pv, i))).to.eql("لَمْ أُبَعْ");
      expect(AraMorpho.conj("باع",$({}, pa, n, pv, theymd))).to.eql("لَمْ يُبَاعَا");
      expect(AraMorpho.conj("باع",$({}, pa, n, pv, theyfp))).to.eql("لَمْ يُبَعْنَ");
      //present
      expect(AraMorpho.conj("باع",$({}, pr, n, pv, i))).to.eql("لَنْ أُبَاعَ");
      expect(AraMorpho.conj("باع",$({}, pr, n, pv, theyfp))).to.eql("لَنْ يُبَعْنَ");


      //Other verb types
      //=================
      //فعّل
      //Active voice
      //past
      expect(AraMorpho.conj("فعّل",$({}, pa, n, i))).to.eql("لَمْ أُفَعِّلْ");
      expect(AraMorpho.conj("فعّل",$({}, pa, n, theymd))).to.eql("لَمْ يُفَعِّلَا");
      expect(AraMorpho.conj("فعّل",$({}, pa, n, theyfp))).to.eql("لَمْ يُفَعِّلْنَ");
      //present
      expect(AraMorpho.conj("فعّل",$({}, pr, n, i))).to.eql("لَنْ أُفَعِّلَ");
      expect(AraMorpho.conj("فعّل",$({}, pr, n, youfp))).to.eql("لَنْ تُفَعِّلْنَ");
      expect(AraMorpho.conj("فعّل",$({}, pr, n, theyfp))).to.eql("لَنْ يُفَعِّلْنَ");
      //Passive voice
      //past
      expect(AraMorpho.conj("فعّل",$({}, pa, n, pv, i))).to.eql("لَمْ أُفَعَّلْ");
      expect(AraMorpho.conj("فعّل",$({}, pa, n, pv, theymd))).to.eql("لَمْ يُفَعَّلَا");
      expect(AraMorpho.conj("فعّل",$({}, pa, n, pv, theyfp))).to.eql("لَمْ يُفَعَّلْنَ");
      //present
      expect(AraMorpho.conj("فعّل",$({}, pr, n, pv, i))).to.eql("لَنْ أُفَعَّلَ");
      expect(AraMorpho.conj("فعّل",$({}, pr, n, pv, youfp))).to.eql("لَنْ تُفَعَّلْنَ");
      expect(AraMorpho.conj("فعّل",$({}, pr, n, pv, theyfp))).to.eql("لَنْ يُفَعَّلْنَ");

      //فاعل
      //Active voice
      //past
      expect(AraMorpho.conj("فاعل",$({}, pa, n, i))).to.eql("لَمْ أُفَاعِلْ");
      expect(AraMorpho.conj("فاعل",$({}, pa, n, theymd))).to.eql("لَمْ يُفَاعِلَا");
      expect(AraMorpho.conj("فاعل",$({}, pa, n, theyfp))).to.eql("لَمْ يُفَاعِلْنَ");
      //present
      expect(AraMorpho.conj("فاعل",$({}, pr, n, i))).to.eql("لَنْ أُفَاعِلَ");
      expect(AraMorpho.conj("فاعل",$({}, pr, n, youfp))).to.eql("لَنْ تُفَاعِلْنَ");
      expect(AraMorpho.conj("فاعل",$({}, pr, n, theyfp))).to.eql("لَنْ يُفَاعِلْنَ");
      //Passive voice
      //past
      expect(AraMorpho.conj("فاعل",$({}, pa, n, pv, i))).to.eql("لَمْ أُفَاعَلْ");
      expect(AraMorpho.conj("فاعل",$({}, pa, n, pv, theymd))).to.eql("لَمْ يُفَاعَلَا");
      expect(AraMorpho.conj("فاعل",$({}, pa, n, pv, theyfp))).to.eql("لَمْ يُفَاعَلْنَ");
      //present
      expect(AraMorpho.conj("فاعل",$({}, pr, n, pv, i))).to.eql("لَنْ أُفَاعَلَ");
      expect(AraMorpho.conj("فاعل",$({}, pr, n, pv, youfp))).to.eql("لَنْ تُفَاعَلْنَ");
      expect(AraMorpho.conj("فاعل",$({}, pr, n, pv, theyfp))).to.eql("لَنْ يُفَاعَلْنَ");

      //أفعل
      //Active voice
      //past
      expect(AraMorpho.conj("أفعل",$({}, pa, n, i))).to.eql("لَمْ أُفْعِلْ");
      expect(AraMorpho.conj("أفعل",$({}, pa, n, youmd))).to.eql("لَمْ تُفْعِلَا");
      expect(AraMorpho.conj("أفعل",$({}, pa, n, theyfp))).to.eql("لَمْ يُفْعِلْنَ");
      //present
      expect(AraMorpho.conj("أفعل",$({}, pr, n, i))).to.eql("لَنْ أُفْعِلَ");
      expect(AraMorpho.conj("أفعل",$({}, pr, n, youfp))).to.eql("لَنْ تُفْعِلْنَ");
      expect(AraMorpho.conj("أفعل",$({}, pr, n, theyfp))).to.eql("لَنْ يُفْعِلْنَ");
      //Passive voice
      //past
      expect(AraMorpho.conj("أفعل",$({}, pa, n, pv, i))).to.eql("لَمْ أُفْعَلْ");
      expect(AraMorpho.conj("أفعل",$({}, pa, n, pv, youmd))).to.eql("لَمْ تُفْعَلَا");
      expect(AraMorpho.conj("أفعل",$({}, pa, n, pv, theyfp))).to.eql("لَمْ يُفْعَلْنَ");
      //present
      expect(AraMorpho.conj("أفعل",$({}, pr, n, pv, i))).to.eql("لَنْ أُفْعَلَ");
      expect(AraMorpho.conj("أفعل",$({}, pr, n, pv, youfp))).to.eql("لَنْ تُفْعَلْنَ");
      expect(AraMorpho.conj("أفعل",$({}, pr, n, pv, theyfp))).to.eql("لَنْ يُفْعَلْنَ");

      //تفعّل
      //Active voice
      //past
      expect(AraMorpho.conj("تفعّل",$({}, pa, n, i))).to.eql("لَمْ أَتفعَّلْ");
      expect(AraMorpho.conj("تفعّل",$({}, pa, n, theymd))).to.eql("لَمْ يَتفعَّلَا");
      expect(AraMorpho.conj("تفعّل",$({}, pa, n, theyfp))).to.eql("لَمْ يَتفعَّلْنَ");
      //present
      expect(AraMorpho.conj("تفعّل",$({}, pr, n, i))).to.eql("لَنْ أَتفعَّلَ");
      expect(AraMorpho.conj("تفعّل",$({}, pr, n, youfp))).to.eql("لَنْ تَتفعَّلْنَ");
      expect(AraMorpho.conj("تفعّل",$({}, pr, n, theyfp))).to.eql("لَنْ يَتفعَّلْنَ");
      //NO Passive voice

      //تفاعل
      //Active voice
      //past
      expect(AraMorpho.conj("تفاعل",$({}, pa, n, i))).to.eql("لَمْ أَتفاعَلْ");
      expect(AraMorpho.conj("تفاعل",$({}, pa, n, theymd))).to.eql("لَمْ يَتفاعَلَا");
      expect(AraMorpho.conj("تفاعل",$({}, pa, n, theyfp))).to.eql("لَمْ يَتفاعَلْنَ");
      //present
      expect(AraMorpho.conj("تفاعل",$({}, pr, n, i))).to.eql("لَنْ أَتفاعَلَ");
      expect(AraMorpho.conj("تفاعل",$({}, pr, n, youf))).to.eql("لَنْ تَتفاعَلِي");
      expect(AraMorpho.conj("تفاعل",$({}, pr, n, theymp))).to.eql("لَنْ يَتفاعَلُوا");
      //NO Passive voice

      //انفعل
      //Active voice
      //past
      expect(AraMorpho.conj("انفعل",$({}, pa, n, i))).to.eql("لَمْ أَنفَعِلْ");
      expect(AraMorpho.conj("انفعل",$({}, pa, n, theymd))).to.eql("لَمْ يَنفَعِلَا");
      expect(AraMorpho.conj("انفعل",$({}, pa, n, theyfp))).to.eql("لَمْ يَنفَعِلْنَ");
      //present
      expect(AraMorpho.conj("انفعل",$({}, pr, n, i))).to.eql("لَنْ أَنفَعِلَ");
      expect(AraMorpho.conj("انفعل",$({}, pr, n, youfd))).to.eql("لَنْ تَنفَعِلَا");
      expect(AraMorpho.conj("انفعل",$({}, pr, n, theyfp))).to.eql("لَنْ يَنفَعِلْنَ");
      //NO Passive voice

      //افتعل
      //Active voice
      //past
      expect(AraMorpho.conj("افتعل",$({}, pa, n, i))).to.eql("لَمْ أَفتَعِلْ");
      expect(AraMorpho.conj("افتعل",$({}, pa, n, theymd))).to.eql("لَمْ يَفتَعِلَا");
      expect(AraMorpho.conj("افتعل",$({}, pa, n, theyfp))).to.eql("لَمْ يَفتَعِلْنَ");
      //present
      expect(AraMorpho.conj("افتعل",$({}, pr, n, i))).to.eql("لَنْ أَفتَعِلَ");
      expect(AraMorpho.conj("افتعل",$({}, pr, n, youfp))).to.eql("لَنْ تَفتَعِلْنَ");
      expect(AraMorpho.conj("افتعل",$({}, pr, n, theymp))).to.eql("لَنْ يَفتَعِلُوا");
      //Passive voice
      //past
      expect(AraMorpho.conj("افتعل",$({}, pa, n, pv, i))).to.eql("لَمْ أُفتَعَلْ");
      expect(AraMorpho.conj("افتعل",$({}, pa, n, pv, theymd))).to.eql("لَمْ يُفتَعَلَا");
      expect(AraMorpho.conj("افتعل",$({}, pa, n, pv, theyfp))).to.eql("لَمْ يُفتَعَلْنَ");
      //present
      expect(AraMorpho.conj("افتعل",$({}, pr, n, pv, i))).to.eql("لَنْ أُفتَعَلَ");
      expect(AraMorpho.conj("افتعل",$({}, pr, n, pv, youfp))).to.eql("لَنْ تُفتَعَلْنَ");
      expect(AraMorpho.conj("افتعل",$({}, pr, n, pv, theymp))).to.eql("لَنْ يُفتَعَلُوا");

      //افعلّ
      //Active voice
      //past
      expect(AraMorpho.conj("افعلّ",$({}, pa, n, i))).to.eql("لَمْ أَفْعَلّْ");
      expect(AraMorpho.conj("افعلّ",$({}, pa, n, theymd))).to.eql("لَمْ يَفْعَلَّا");
      expect(AraMorpho.conj("افعلّ",$({}, pa, n, theyfp))).to.eql("لَمْ يَفْعلِلْنَ");
      //present
      expect(AraMorpho.conj("افعلّ",$({}, pr, n, i))).to.eql("لَنْ أَفْعَلَّ");
      expect(AraMorpho.conj("افعلّ",$({}, pr, n, youfp))).to.eql("لَنْ تَفْعلِلْنَ");
      expect(AraMorpho.conj("افعلّ",$({}, pr, n, theyfp))).to.eql("لَنْ يَفْعلِلْنَ");
      //NO Passive voice

      //استفعل
      //Active voice
      //past
      expect(AraMorpho.conj("استفعل",$({}, pa, n, i))).to.eql("لَمْ أَستفعِلْ");
      expect(AraMorpho.conj("استفعل",$({}, pa, n, theymd))).to.eql("لَمْ يَستفعِلَا");
      expect(AraMorpho.conj("استفعل",$({}, pa, n, theyfp))).to.eql("لَمْ يَستفعِلْنَ");
      //present
      expect(AraMorpho.conj("استفعل",$({}, pr, n, i))).to.eql("لَنْ أَستفعِلَ");
      expect(AraMorpho.conj("استفعل",$({}, pr, n, youfp))).to.eql("لَنْ تَستفعِلْنَ");
      expect(AraMorpho.conj("استفعل",$({}, pr, n, theyfp))).to.eql("لَنْ يَستفعِلْنَ");
      //Passive voice
      //past
      expect(AraMorpho.conj("استفعل",$({}, pa, n, pv, i))).to.eql("لَمْ أُستفعَلْ");
      expect(AraMorpho.conj("استفعل",$({}, pa, n, pv, theymd))).to.eql("لَمْ يُستفعَلَا");
      expect(AraMorpho.conj("استفعل",$({}, pa, n, pv, theyfp))).to.eql("لَمْ يُستفعَلْنَ");
      //present
      expect(AraMorpho.conj("استفعل",$({}, pr, n, pv, i))).to.eql("لَنْ أُستفعَلَ");
      expect(AraMorpho.conj("استفعل",$({}, pr, n, pv, youfp))).to.eql("لَنْ تُستفعَلْنَ");
      expect(AraMorpho.conj("استفعل",$({}, pr, n, pv, theyfp))).to.eql("لَنْ يُستفعَلْنَ");

    });

    it("Imperative mood", function() {

      //Mu3tall Mithal
      //==============
      //وضع Waw
      //affirmative
      expect(AraMorpho.conj("وضع",$({}, imp, youm))).to.eql("ضعْ");
      expect(AraMorpho.conj("وضع",$({}, imp, youf))).to.eql("ضعِي");
      expect(AraMorpho.conj("وضع",$({}, imp, youmd))).to.eql("ضعَا");
      expect(AraMorpho.conj("وضع",$({}, imp, youfd))).to.eql("ضعَا");
      expect(AraMorpho.conj("وضع",$({}, imp, yoump))).to.eql("ضعُوا");
      expect(AraMorpho.conj("وضع",$({}, imp, youfp))).to.eql("ضعْنَ");
      //negative
      expect(AraMorpho.conj("وضع",$({}, imp, n, youm))).to.eql("لَا تَضعْ");
      expect(AraMorpho.conj("وضع",$({}, imp, n, youf))).to.eql("لَا تَضعِي");
      expect(AraMorpho.conj("وضع",$({}, imp, n, youmd))).to.eql("لَا تَضعَا");
      expect(AraMorpho.conj("وضع",$({}, imp, n, youfd))).to.eql("لَا تَضعَا");
      expect(AraMorpho.conj("وضع",$({}, imp, n, yoump))).to.eql("لَا تَضعُوا");
      expect(AraMorpho.conj("وضع",$({}, imp, n, youfp))).to.eql("لَا تَضعْنَ");

      //TODO verify imperative of verbs stating with yaa
      //ينع yaa
      /*
      //affirmative
      expect(AraMorpho.conj("ينع",$({}, imp, youm))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, youf))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, youmd))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, youfd))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, yoump))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, youfp))).to.eql("");
      //negative
      expect(AraMorpho.conj("ينع",$({}, imp, n, youm))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, n, youf))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, n, youmd))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, n, youfd))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, n, yoump))).to.eql("");
      expect(AraMorpho.conj("ينع",$({}, imp, n, youfp))).to.eql("");
      */


      // Muatal Naqis
      // ==============
      //دعا Waw
      //affirmative
      expect(AraMorpho.conj("دعا",$({}, imp, youm))).to.eql("ادْعُ");
      expect(AraMorpho.conj("دعا",$({}, imp, youf))).to.eql("ادْعِي");
      expect(AraMorpho.conj("دعا",$({}, imp, youmd))).to.eql("ادْعُوَا");
      expect(AraMorpho.conj("دعا",$({}, imp, youfd))).to.eql("ادْعُوَا");
      expect(AraMorpho.conj("دعا",$({}, imp, yoump))).to.eql("ادْعُوا");
      expect(AraMorpho.conj("دعا",$({}, imp, youfp))).to.eql("ادْعُونَ");
      //negative
      expect(AraMorpho.conj("دعا",$({}, imp, n, youm))).to.eql("لَا تَدْعُ");
      expect(AraMorpho.conj("دعا",$({}, imp, n, youf))).to.eql("لَا تَدْعِي");
      expect(AraMorpho.conj("دعا",$({}, imp, n, youmd))).to.eql("لَا تَدْعُوَا");
      expect(AraMorpho.conj("دعا",$({}, imp, n, youfd))).to.eql("لَا تَدْعُوَا");
      expect(AraMorpho.conj("دعا",$({}, imp, n, yoump))).to.eql("لَا تَدْعُوا");
      expect(AraMorpho.conj("دعا",$({}, imp, n, youfp))).to.eql("لَا تَدْعُونَ");


      //بنى Yaa
      //affirmative
      expect(AraMorpho.conj("بنى",$({}, imp, youm))).to.eql("ابْنِ");
      expect(AraMorpho.conj("بنى",$({}, imp, youf))).to.eql("ابْنِي");
      expect(AraMorpho.conj("بنى",$({}, imp, youmd))).to.eql("ابْنِيَا");
      expect(AraMorpho.conj("بنى",$({}, imp, youfd))).to.eql("ابْنِيَا");
      expect(AraMorpho.conj("بنى",$({}, imp, yoump))).to.eql("ابْنُوا");
      expect(AraMorpho.conj("بنى",$({}, imp, youfp))).to.eql("ابْنِينَ");
      //negative
      expect(AraMorpho.conj("بنى",$({}, imp, n, youm))).to.eql("لَا تَبْنِ");
      expect(AraMorpho.conj("بنى",$({}, imp, n, youf))).to.eql("لَا تَبْنِي");
      expect(AraMorpho.conj("بنى",$({}, imp, n, youmd))).to.eql("لَا تَبْنِيَا");
      expect(AraMorpho.conj("بنى",$({}, imp, n, youfd))).to.eql("لَا تَبْنِيَا");
      expect(AraMorpho.conj("بنى",$({}, imp, n, yoump))).to.eql("لَا تَبْنُوا");
      expect(AraMorpho.conj("بنى",$({}, imp, n, youfp))).to.eql("لَا تَبْنِينَ");



      //Muatal ajwaf"
      //نام Alif
      //affirmative
      expect(AraMorpho.conj("نام",$({}, imp, youm))).to.eql("نَمْ");
      expect(AraMorpho.conj("نام",$({}, imp, youf))).to.eql("نَامِي");
      expect(AraMorpho.conj("نام",$({}, imp, youmd))).to.eql("نَامَا");
      expect(AraMorpho.conj("نام",$({}, imp, youfd))).to.eql("نَامَا");
      expect(AraMorpho.conj("نام",$({}, imp, yoump))).to.eql("نَامُوا");
      expect(AraMorpho.conj("نام",$({}, imp, youfp))).to.eql("نَمْنَ");
      //negative
      expect(AraMorpho.conj("نام",$({}, imp, n, youm))).to.eql("لَا تَنَمْ");
      expect(AraMorpho.conj("نام",$({}, imp, n, youf))).to.eql("لَا تَنَامِي");
      expect(AraMorpho.conj("نام",$({}, imp, n, youmd))).to.eql("لَا تَنَامَا");
      expect(AraMorpho.conj("نام",$({}, imp, n, youfd))).to.eql("لَا تَنَامَا");
      expect(AraMorpho.conj("نام",$({}, imp, n, yoump))).to.eql("لَا تَنَامُوا");
      expect(AraMorpho.conj("نام",$({}, imp, n, youfp))).to.eql("لَا تَنَمْنَ");

      //شاء Alif with Hamza
      //TODO fix it

      //عاد Waw
      //affirmative
      expect(AraMorpho.conj("عاد",$({}, imp, youm))).to.eql("عُدْ");
      expect(AraMorpho.conj("عاد",$({}, imp, youf))).to.eql("عُودِي");
      expect(AraMorpho.conj("عاد",$({}, imp, youmd))).to.eql("عُودَا");
      expect(AraMorpho.conj("عاد",$({}, imp, youfd))).to.eql("عُودَا");
      expect(AraMorpho.conj("عاد",$({}, imp, yoump))).to.eql("عُودُوا");
      expect(AraMorpho.conj("عاد",$({}, imp, youfp))).to.eql("عُدْنَ");
      //negative
      expect(AraMorpho.conj("عاد",$({}, imp, n, youm))).to.eql("لَا تَعُدْ");
      expect(AraMorpho.conj("عاد",$({}, imp, n, youf))).to.eql("لَا تَعُودِي");
      expect(AraMorpho.conj("عاد",$({}, imp, n, youmd))).to.eql("لَا تَعُودَا");
      expect(AraMorpho.conj("عاد",$({}, imp, n, youfd))).to.eql("لَا تَعُودَا");
      expect(AraMorpho.conj("عاد",$({}, imp, n, yoump))).to.eql("لَا تَعُودُوا");
      expect(AraMorpho.conj("عاد",$({}, imp, n, youfp))).to.eql("لَا تَعُدْنَ");

      //باع Yaa
      //affirmative
      expect(AraMorpho.conj("باع",$({}, imp, youm))).to.eql("بِعْ");
      expect(AraMorpho.conj("باع",$({}, imp, youf))).to.eql("بِيعِي");
      expect(AraMorpho.conj("باع",$({}, imp, youmd))).to.eql("بِيعَا");
      expect(AraMorpho.conj("باع",$({}, imp, youfd))).to.eql("بِيعَا");
      expect(AraMorpho.conj("باع",$({}, imp, yoump))).to.eql("بِيعُوا");
      expect(AraMorpho.conj("باع",$({}, imp, youfp))).to.eql("بِعْنَ");
      //negative
      expect(AraMorpho.conj("باع",$({}, imp, n, youm))).to.eql("لَا تَبِعْ");
      expect(AraMorpho.conj("باع",$({}, imp, n, youf))).to.eql("لَا تَبِيعِي");
      expect(AraMorpho.conj("باع",$({}, imp, n, youmd))).to.eql("لَا تَبِيعَا");
      expect(AraMorpho.conj("باع",$({}, imp, n, youfd))).to.eql("لَا تَبِيعَا");
      expect(AraMorpho.conj("باع",$({}, imp, n, yoump))).to.eql("لَا تَبِيعُوا");
      expect(AraMorpho.conj("باع",$({}, imp, n, youfp))).to.eql("لَا تَبِعْنَ");


      //Other verb types
      //=================
      //فعّل
      //affirmative
      expect(AraMorpho.conj("فعّل",$({}, imp, youm))).to.eql("فَعِّلْ");
      expect(AraMorpho.conj("فعّل",$({}, imp, youf))).to.eql("فَعِّلِي");
      expect(AraMorpho.conj("فعّل",$({}, imp, youmd))).to.eql("فَعِّلَا");
      expect(AraMorpho.conj("فعّل",$({}, imp, youfd))).to.eql("فَعِّلَا");
      expect(AraMorpho.conj("فعّل",$({}, imp, yoump))).to.eql("فَعِّلُوا");
      expect(AraMorpho.conj("فعّل",$({}, imp, youfp))).to.eql("فَعِّلْنَ");
      //negative
      expect(AraMorpho.conj("فعّل",$({}, imp, n, youm))).to.eql("لَا تُفَعِّلْ");
      expect(AraMorpho.conj("فعّل",$({}, imp, n, youf))).to.eql("لَا تُفَعِّلِي");
      expect(AraMorpho.conj("فعّل",$({}, imp, n, youmd))).to.eql("لَا تُفَعِّلَا");
      expect(AraMorpho.conj("فعّل",$({}, imp, n, youfd))).to.eql("لَا تُفَعِّلَا");
      expect(AraMorpho.conj("فعّل",$({}, imp, n, yoump))).to.eql("لَا تُفَعِّلُوا");
      expect(AraMorpho.conj("فعّل",$({}, imp, n, youfp))).to.eql("لَا تُفَعِّلْنَ");

      //فاعل
      //affirmative
      expect(AraMorpho.conj("فاعل",$({}, imp, youm))).to.eql("فَاعِلْ");
      expect(AraMorpho.conj("فاعل",$({}, imp, youf))).to.eql("فَاعِلِي");
      expect(AraMorpho.conj("فاعل",$({}, imp, youmd))).to.eql("فَاعِلَا");
      expect(AraMorpho.conj("فاعل",$({}, imp, youfd))).to.eql("فَاعِلَا");
      expect(AraMorpho.conj("فاعل",$({}, imp, yoump))).to.eql("فَاعِلُوا");
      expect(AraMorpho.conj("فاعل",$({}, imp, youfp))).to.eql("فَاعِلْنَ");
      //negative
      expect(AraMorpho.conj("فاعل",$({}, imp, n, youm))).to.eql("لَا تُفَاعِلْ");
      expect(AraMorpho.conj("فاعل",$({}, imp, n, youf))).to.eql("لَا تُفَاعِلِي");
      expect(AraMorpho.conj("فاعل",$({}, imp, n, youmd))).to.eql("لَا تُفَاعِلَا");
      expect(AraMorpho.conj("فاعل",$({}, imp, n, youfd))).to.eql("لَا تُفَاعِلَا");
      expect(AraMorpho.conj("فاعل",$({}, imp, n, yoump))).to.eql("لَا تُفَاعِلُوا");
      expect(AraMorpho.conj("فاعل",$({}, imp, n, youfp))).to.eql("لَا تُفَاعِلْنَ");

      //أفعل
      //affirmative
      expect(AraMorpho.conj("أفعل",$({}, imp, youm))).to.eql("أَفْعِلْ");
      expect(AraMorpho.conj("أفعل",$({}, imp, youf))).to.eql("أَفْعِلِي");
      expect(AraMorpho.conj("أفعل",$({}, imp, youmd))).to.eql("أَفْعِلَا");
      expect(AraMorpho.conj("أفعل",$({}, imp, youfd))).to.eql("أَفْعِلَا");
      expect(AraMorpho.conj("أفعل",$({}, imp, yoump))).to.eql("أَفْعِلُوا");
      expect(AraMorpho.conj("أفعل",$({}, imp, youfp))).to.eql("أَفْعِلْنَ");
      //negative
      expect(AraMorpho.conj("أفعل",$({}, imp, n, youm))).to.eql("لَا تُفْعِلْ");
      expect(AraMorpho.conj("أفعل",$({}, imp, n, youf))).to.eql("لَا تُفْعِلِي");
      expect(AraMorpho.conj("أفعل",$({}, imp, n, youmd))).to.eql("لَا تُفْعِلَا");
      expect(AraMorpho.conj("أفعل",$({}, imp, n, youfd))).to.eql("لَا تُفْعِلَا");
      expect(AraMorpho.conj("أفعل",$({}, imp, n, yoump))).to.eql("لَا تُفْعِلُوا");
      expect(AraMorpho.conj("أفعل",$({}, imp, n, youfp))).to.eql("لَا تُفْعِلْنَ");

      //تفعّل

      //affirmative
      expect(AraMorpho.conj("تفعّل",$({}, imp, youm))).to.eql("تفعَّلْ");
      expect(AraMorpho.conj("تفعّل",$({}, imp, youf))).to.eql("تفعَّلِي");
      expect(AraMorpho.conj("تفعّل",$({}, imp, youmd))).to.eql("تفعَّلَا");
      expect(AraMorpho.conj("تفعّل",$({}, imp, youfd))).to.eql("تفعَّلَا");
      expect(AraMorpho.conj("تفعّل",$({}, imp, yoump))).to.eql("تفعَّلُوا");
      expect(AraMorpho.conj("تفعّل",$({}, imp, youfp))).to.eql("تفعَّلْنَ");
      //negative
      expect(AraMorpho.conj("تفعّل",$({}, imp, n, youm))).to.eql("لَا تَتفعَّلْ");
      expect(AraMorpho.conj("تفعّل",$({}, imp, n, youf))).to.eql("لَا تَتفعَّلِي");
      expect(AraMorpho.conj("تفعّل",$({}, imp, n, youmd))).to.eql("لَا تَتفعَّلَا");
      expect(AraMorpho.conj("تفعّل",$({}, imp, n, youfd))).to.eql("لَا تَتفعَّلَا");
      expect(AraMorpho.conj("تفعّل",$({}, imp, n, yoump))).to.eql("لَا تَتفعَّلُوا");
      expect(AraMorpho.conj("تفعّل",$({}, imp, n, youfp))).to.eql("لَا تَتفعَّلْنَ");


      //تفاعل
      //affirmative
      expect(AraMorpho.conj("تفاعل",$({}, imp, youm))).to.eql("تفاعَلْ");
      expect(AraMorpho.conj("تفاعل",$({}, imp, youf))).to.eql("تفاعَلِي");
      expect(AraMorpho.conj("تفاعل",$({}, imp, youmd))).to.eql("تفاعَلَا");
      expect(AraMorpho.conj("تفاعل",$({}, imp, youfd))).to.eql("تفاعَلَا");
      expect(AraMorpho.conj("تفاعل",$({}, imp, yoump))).to.eql("تفاعَلُوا");
      expect(AraMorpho.conj("تفاعل",$({}, imp, youfp))).to.eql("تفاعَلْنَ");
      //negative
      expect(AraMorpho.conj("تفاعل",$({}, imp, n, youm))).to.eql("لَا تَتفاعَلْ");
      expect(AraMorpho.conj("تفاعل",$({}, imp, n, youf))).to.eql("لَا تَتفاعَلِي");
      expect(AraMorpho.conj("تفاعل",$({}, imp, n, youmd))).to.eql("لَا تَتفاعَلَا");
      expect(AraMorpho.conj("تفاعل",$({}, imp, n, youfd))).to.eql("لَا تَتفاعَلَا");
      expect(AraMorpho.conj("تفاعل",$({}, imp, n, yoump))).to.eql("لَا تَتفاعَلُوا");
      expect(AraMorpho.conj("تفاعل",$({}, imp, n, youfp))).to.eql("لَا تَتفاعَلْنَ");

      //انفعل
      //affirmative
      expect(AraMorpho.conj("انفعل",$({}, imp, youm))).to.eql("انفَعِلْ");
      expect(AraMorpho.conj("انفعل",$({}, imp, youf))).to.eql("انفَعِلِي");
      expect(AraMorpho.conj("انفعل",$({}, imp, youmd))).to.eql("انفَعِلَا");
      expect(AraMorpho.conj("انفعل",$({}, imp, youfd))).to.eql("انفَعِلَا");
      expect(AraMorpho.conj("انفعل",$({}, imp, yoump))).to.eql("انفَعِلُوا");
      expect(AraMorpho.conj("انفعل",$({}, imp, youfp))).to.eql("انفَعِلْنَ");
      //negative
      expect(AraMorpho.conj("انفعل",$({}, imp, n, youm))).to.eql("لَا تَنفَعِلْ");
      expect(AraMorpho.conj("انفعل",$({}, imp, n, youf))).to.eql("لَا تَنفَعِلِي");
      expect(AraMorpho.conj("انفعل",$({}, imp, n, youmd))).to.eql("لَا تَنفَعِلَا");
      expect(AraMorpho.conj("انفعل",$({}, imp, n, youfd))).to.eql("لَا تَنفَعِلَا");
      expect(AraMorpho.conj("انفعل",$({}, imp, n, yoump))).to.eql("لَا تَنفَعِلُوا");
      expect(AraMorpho.conj("انفعل",$({}, imp, n, youfp))).to.eql("لَا تَنفَعِلْنَ");

      //افتعل
      //affirmative
      expect(AraMorpho.conj("افتعل",$({}, imp, youm))).to.eql("افتَعِلْ");
      expect(AraMorpho.conj("افتعل",$({}, imp, youf))).to.eql("افتَعِلِي");
      expect(AraMorpho.conj("افتعل",$({}, imp, youmd))).to.eql("افتَعِلَا");
      expect(AraMorpho.conj("افتعل",$({}, imp, youfd))).to.eql("افتَعِلَا");
      expect(AraMorpho.conj("افتعل",$({}, imp, yoump))).to.eql("افتَعِلُوا");
      expect(AraMorpho.conj("افتعل",$({}, imp, youfp))).to.eql("افتَعِلْنَ");
      //negative
      expect(AraMorpho.conj("افتعل",$({}, imp, n, youm))).to.eql("لَا تَفتَعِلْ");
      expect(AraMorpho.conj("افتعل",$({}, imp, n, youf))).to.eql("لَا تَفتَعِلِي");
      expect(AraMorpho.conj("افتعل",$({}, imp, n, youmd))).to.eql("لَا تَفتَعِلَا");
      expect(AraMorpho.conj("افتعل",$({}, imp, n, youfd))).to.eql("لَا تَفتَعِلَا");
      expect(AraMorpho.conj("افتعل",$({}, imp, n, yoump))).to.eql("لَا تَفتَعِلُوا");
      expect(AraMorpho.conj("افتعل",$({}, imp, n, youfp))).to.eql("لَا تَفتَعِلْنَ");

      //افعلّ
      //affirmative
      expect(AraMorpho.conj("افعلّ",$({}, imp, youm))).to.eql("افْعَلّْ");
      expect(AraMorpho.conj("افعلّ",$({}, imp, youf))).to.eql("افْعَلِّي");
      expect(AraMorpho.conj("افعلّ",$({}, imp, youmd))).to.eql("افْعَلَّا");
      expect(AraMorpho.conj("افعلّ",$({}, imp, youfd))).to.eql("افْعَلَّا");
      expect(AraMorpho.conj("افعلّ",$({}, imp, yoump))).to.eql("افْعَلُّوا");
      expect(AraMorpho.conj("افعلّ",$({}, imp, youfp))).to.eql("افْعلِلْنَ");
      //negative
      expect(AraMorpho.conj("افعلّ",$({}, imp, n, youm))).to.eql("لَا تَفْعَلّْ");
      expect(AraMorpho.conj("افعلّ",$({}, imp, n, youf))).to.eql("لَا تَفْعَلِّي");
      expect(AraMorpho.conj("افعلّ",$({}, imp, n, youmd))).to.eql("لَا تَفْعَلَّا");
      expect(AraMorpho.conj("افعلّ",$({}, imp, n, youfd))).to.eql("لَا تَفْعَلَّا");
      expect(AraMorpho.conj("افعلّ",$({}, imp, n, yoump))).to.eql("لَا تَفْعَلُّوا");
      expect(AraMorpho.conj("افعلّ",$({}, imp, n, youfp))).to.eql("لَا تَفْعلِلْنَ");

      //استفعل
      //affirmative
      expect(AraMorpho.conj("استفعل",$({}, imp, youm))).to.eql("استفعِلْ");
      expect(AraMorpho.conj("استفعل",$({}, imp, youf))).to.eql("استفعِلِي");
      expect(AraMorpho.conj("استفعل",$({}, imp, youmd))).to.eql("استفعِلَا");
      expect(AraMorpho.conj("استفعل",$({}, imp, youfd))).to.eql("استفعِلَا");
      expect(AraMorpho.conj("استفعل",$({}, imp, yoump))).to.eql("استفعِلُوا");
      expect(AraMorpho.conj("استفعل",$({}, imp, youfp))).to.eql("استفعِلْنَ");
      //negative
      expect(AraMorpho.conj("استفعل",$({}, imp, n, youm))).to.eql("لَا تَستفعِلْ");
      expect(AraMorpho.conj("استفعل",$({}, imp, n, youf))).to.eql("لَا تَستفعِلِي");
      expect(AraMorpho.conj("استفعل",$({}, imp, n, youmd))).to.eql("لَا تَستفعِلَا");
      expect(AraMorpho.conj("استفعل",$({}, imp, n, youfd))).to.eql("لَا تَستفعِلَا");
      expect(AraMorpho.conj("استفعل",$({}, imp, n, yoump))).to.eql("لَا تَستفعِلُوا");
      expect(AraMorpho.conj("استفعل",$({}, imp, n, youfp))).to.eql("لَا تَستفعِلْنَ");

    });

  });

  /*
  a port from NLTK ISRI stemmer
  */
  describe("Arabic Morphology ISRI stemmer ", function(){

    before(function() {
      AraMorpho.sstem("isri");
    });

    it("Words have length <= 3", function() {
      expect(AraMorpho.stem("ذَهَبٌ")).to.eql("ذهب");
      expect(AraMorpho.stem("جرّ")).to.eql("جرّ");
    });
  });

  describe("Arabic Morphology Pos Converter ", function(){

    it("Singular to plural", function() {
      AraMorpho.setCurrentPosConverter("sing2pl");
      expect(AraMorpho.conv("معلمة")).to.eql("معلمات");
      expect(AraMorpho.conv("معلم")).to.eql("معلمون");
      expect(AraMorpho.conv("كِتَاب")).to.eql("كُتُب");
      expect(AraMorpho.convertPoS("سَفِينَة")).to.eql("سُفُن");
      //expect(AraMorpho.convertPoS("سَبِيل")).to.eql("سُبُل");
      expect(AraMorpho.convertPoS("غُرْفَة")).to.eql("غُرَف");
      expect(AraMorpho.convertPoS("شَقَّة")).to.eql("شُقَق");
      expect(AraMorpho.convertPoS("قِطَّة")).to.eql("قِطَط");
      expect(AraMorpho.convertPoS("هِرّ")).to.eql("هِرَرَة");
      //expect(AraMorpho.convertPoS("قَلْب")).to.eql("قُلُوب");
      //expect(AraMorpho.convertPoS("عِلْم")).to.eql("عُلُوم");
      //expect(AraMorpho.convertPoS("جُحْر")).to.eql("جُحُور");
      //expect(AraMorpho.convertPoS("كَلْب")).to.eql("كِلَاب");
      //expect(AraMorpho.convertPoS("ظِلّ")).to.eql("ظِلَال");
      //expect(AraMorpho.convertPoS("رُمْح")).to.eql("رِمَاح");
      //expect(AraMorpho.convertPoS("جَمَل")).to.eql("جِمَال");
      expect(AraMorpho.convertPoS("رَجُل")).to.eql("رِجَال");
      //expect(AraMorpho.convertPoS("يَوْم")).to.eql("أَيَّام");
      //expect(AraMorpho.convertPoS("حِلْم")).to.eql("أَحْلَام");
      //expect(AraMorpho.convertPoS("رُبْع")).to.eql("أَرْبَاع");
      //expect(AraMorpho.convertPoS("سَبَب")).to.eql("أَسْبَاب");
      expect(AraMorpho.convertPoS("وَرَقَة")).to.eql("أَوْرَاق");
      expect(AraMorpho.convertPoS("عَمُود")).to.eql("أَعْمِدَة");
      //expect(AraMorpho.convertPoS("صَدِيق")).to.eql("أَصْدِقَاء");
      //expect(AraMorpho.convertPoS("سَعِيد")).to.eql("سُعَدَاء");
      expect(AraMorpho.convertPoS("كَاتِب")).to.eql("كُتَّاب");
      expect(AraMorpho.convertPoS("قَائِمَة")).to.eql("قَوَائِم");
      expect(AraMorpho.convertPoS("صَارُوخ")).to.eql("صَوَارِيخ");
      expect(AraMorpho.convertPoS("رِسَالَة")).to.eql("رَسَائِل");
      expect(AraMorpho.convertPoS("دَفْتَر")).to.eql("دَفَاتِر");
      expect(AraMorpho.convertPoS("فُنْدُق")).to.eql("فَنَادِق");
      expect(AraMorpho.convertPoS("مَلْبَس")).to.eql("مَلَابِس");
      expect(AraMorpho.convertPoS("مَسْجِد")).to.eql("مَسَاجِد");
      expect(AraMorpho.convertPoS("مِنْطَقَة")).to.eql("مَنَاطِق");
      expect(AraMorpho.convertPoS("صَنْدُوق")).to.eql("صَنَادِيق");
      expect(AraMorpho.convertPoS("مِفْتَاح")).to.eql("مَفَاتِيح");
      expect(AraMorpho.convertPoS("مَكْتُوب")).to.eql("مَكَاتِيب");
      //expect(AraMorpho.convertPoS("")).to.eql("");
    });

    /*it("Singular to dual", function() {
      AraMorpho.setCurrentPosConverter("sing2dual");
      expect(AraMorpho.convertPoS("معلمة")).to.eql("معلمتان");
      expect(AraMorpho.convertPoS("معلم")).to.eql("معلمان");
    });*/


  });

});
