(function() {

  "use strict";

  let Info = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../info.js");
    module.exports = FraInfo;
  }
  else {
    Info = window.JsLingua.Cls.Info;
    window.JsLingua.addService("Info", "fra", FraInfo);
  }

  /**
   * Contains information about French language
   * @class FraInfo
   * @extends Info
   * @constructor
   */
  function FraInfo() {

    Info.call(this, "fra");
    this.name = "French";
    this.family = "Indo-European";
    this.branch = "Romance";

  }

  FraInfo.prototype = Object.create(Info.prototype);
  FraInfo.prototype.constructor = FraInfo;

}());
