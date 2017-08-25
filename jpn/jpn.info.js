(function() {

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
   * @class JpnInfo
   * @extends Info
   * @constructor
   */
  function JpnInfo() {
    Info.call(this, "jpn");
    this.name = "Japanese";
    //this.dir = "ltr";//already defined
    this.wordOrder = "sov";
    this.family = "Japonic";
  }

  JpnInfo.prototype = Object.create(Info.prototype);
  JpnInfo.prototype.constructor = JpnInfo;

}());
