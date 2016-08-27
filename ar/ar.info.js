(function(window){

  var Info = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../info.js");
    module.exports = ArInfo;
  } else {
    Info = window.Info;
    window.ArInfo = ArInfo;
  }

  function ArInfo() {
    Lang.call(this, "ara");
    this.name = "arabic";
    this.dir = "rtl";
    this.wordOrder = "vso";
    //this.family = "Afro-Asiatic";
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

  ArInfo.prototype = new Info("ara");
  ArInfo.prototype.constructor = ArInfo;

  }

}(this));
