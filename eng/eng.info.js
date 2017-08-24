(function(){

  let Info = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Info = require("../info.js");
    module.exports = EngInfo;
  } else {
    Info = window.JsLingua.Cls.Info;
    window.JsLingua.addService("Info", "eng", EngInfo);
  }

  /**
   * Contains information about English language
   * @class EngInfo
   * @extends Info
   * @constructor
   */
  function EngInfo() {

    Info.call(this, "eng");
    this.name = "English";
    this.family = "Indo-European";
    this.branch = "Germanic";
  }

  EngInfo.prototype = Object.create(Info.prototype);
  EngInfo.prototype.constructor = EngInfo;

}());
