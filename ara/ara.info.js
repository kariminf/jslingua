(function(window){

  var Info = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../info.js");
    module.exports = AraInfo;
  } else {
    Info = window.JsLingua.Cls.Info;
    window.JsLingua.addService("Info", "ara", AraInfo);
  }

  function AraInfo() {
    Info.call(this, "ara");
    this.name = "Arabic";
    this.dir = "rtl";
    this.wordOrder = "vso";
    this.family = "Afro-Asiatic";
    this.branch = "Semitic";
    this.population = 420000000;
    this.locations = [
      "Algeria",
      "Bahrain",
      "Chad",
      "Comoros",
      "Djibouti",
      "Egypt",
      "Eritrea",
      "Iraq",
      "Jordan",
      "Kuwait",
      "Lebanon",
      "Libya",
      "Mauritania",
      "Morocco",
      "Oman",
      "Palestine",
      "Qatar",
      "Saudi Arabia",
      "Somalia",
      "Sudan",
      "Syria",
      "Tunisia",
      "United Arab Emirates",
      "Western Sahara",
      "Yemen"
    ];

    this.dialects = [
      "Western",
      "Central",
      "Northern",
      "Peninsular"
    ];

  }

  AraInfo.prototype = new Info("ara");
  AraInfo.prototype.constructor = AraInfo;


}(this));
