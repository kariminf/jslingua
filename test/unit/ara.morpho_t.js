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
