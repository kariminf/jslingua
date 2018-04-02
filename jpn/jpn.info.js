(function() {

  //==========================================
  // MODULE & CONSTRUCTOR
  //==========================================

  "use strict";

  let Info = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../info.js");
    module.exports = JpnInfo;
  }
  else {
    Info = window.JsLingua.Cls.Info;
    //window.JpnInfo = JpnInfo;
    window.JsLingua.addService("Info", "jpn", JpnInfo);
  }

  /**
   * Contains information about Japanese language
   *
   * @class JpnInfo
   * @extends Info
   */
  function JpnInfo() {
    Info.call(this, "jpn");
    this.name = "Japanese";
    this.origName = "日本語";
    //this.dir = "ltr";//already defined
    this.wordOrder = "sov";
    this.family = "Japonic";
  }

  JpnInfo.prototype = Object.create(Info.prototype);
  JpnInfo.prototype.constructor = JpnInfo;

  //==========================================
  // DATA
  //==========================================


  //==========================================
  // GETTER FUNCTIONS
  //==========================================

}());
