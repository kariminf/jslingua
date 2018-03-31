var morpho = new (require('../../morpho'))();
var expect = require('expect.js');



describe("Segmentation", function(){

  it("sentence segmentation", function(){
    let text = "Oh! How can you? It is not fair. You have to do something.";
    let res = ["Oh", "How can you", "It is not fair", "You have to do something"];
    expect(morpho.splitToSentences(text)).to.eql(res);
  });

  it("words tokenization", function(){
    let text = "You have to do something";
    let res = ["You", "have", "to", "do", "something"];
    expect(morpho.tokenize(text)).to.eql(res);
  });

});
