(function() {

  //==========================================
  // MODULE & CONSTRUCTOR
  //==========================================

  "use strict";

  let Info = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../info.js");
    module.exports = FraInfo;
  }
  else {
    Info = window.JsLingua.Cls.Info;
    window.JsLingua.aserv("info", "fra", FraInfo);
  }

  /**
   * Contains information about French language
   *
   * @class FraInfo
   * @extends Info
   */
  function FraInfo() {

    Info.call(this, "fra");
    this.name = "French";
    this.origName = "Français";
    this.family = "Indo-European";
    this.branch = "Romance";

  }

  FraInfo.prototype = Object.create(Info.prototype);
  FraInfo.prototype.constructor = FraInfo;

  //==========================================
  // DATA
  //==========================================


  //==========================================
  // GETTER FUNCTIONS
  //==========================================

}());
