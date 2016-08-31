(function(){

  var Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../morpho.js");
    module.exports = AraMorpho;
  } else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.addService("Morpho", "ara", AraMorpho);
  }

  function AraMorpho() {
    Morpho.call(this, "ara");
  }

  AraMorpho.prototype = Object.create(Morpho.prototype);;
  AraMorpho.prototype.constructor = AraMorpho;

  //var C = Object.freeze;

  //=================
  //Conjugation zone
  //=================

  //Override conjugate function
  AraMorpho.prototype.conjugate = function(verb, opts){
    //delete diacretics
    //detect if the verb starts with alif
    //detect if the verb ends with alif-maqsuura or yaa
    //detect

    return word;
  }


}());
