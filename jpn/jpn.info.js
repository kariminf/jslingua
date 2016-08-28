(function(window){

  var Info = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../info.js");
    module.exports = JpnInfo;
  } else {
    Info = window.Info;
    window.JpnInfo = JpnInfo;
  }

  function JpnInfo() {
    Info.call(this, "jpn");
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

  JpnInfo.prototype = new Info("jpn");
  JpnInfo.prototype.constructor = JpnInfo;

}(this));
