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
    //this.family = "";
    this.population = 0;
    this.locations = [
      "Japan"
    ];

  }

  JaInfo.prototype = new JaInfo("jpn");
  JaInfo.prototype.constructor = JaInfo;

  }

}(this));
