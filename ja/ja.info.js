(function(window){

  var Info = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../info.js");
    module.exports = JaInfo;
  } else {
    Info = window.Info;
    window.JaInfo = JaInfo;
  }

  function JaInfo() {
    Lang.call(this, "jpn");
    this.name = "japanese";
    //this.dir = "ltr";//already defined
    this.wordOrder = "sov";
    this.family = "Japonic";
    this.population = 125000000;
    this.locations = [
      "Japan"
    ];
    this.dialects = [
      "Kagoshima",
      "Hichiku",
      "Hōnichi",
      "Chūgoku",
      "Umpaku",
      "Shikoku",
      "Kansai",
      "Hokuriku",
      "Tōkai–Tōsan",
      "Kantō",
      "inland Hokkaidō",
      "Tōhoku",
      "coastal Hokkaidō",
      "Hachijō language"
    ];
  }

  JaInfo.prototype = new JaInfo("jpn");
  JaInfo.prototype.constructor = JaInfo;

  }

}(this));
