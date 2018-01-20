(function() {

  "use strict";

  let Trans = null;
  let EngTrans = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Trans = require("../trans.js");
    module.exports = FraTrans;
    EngTrans = require("../eng/eng.trans.js");
  }
  else {
    Trans = window.JsLingua.Cls.Trans;
    window.JsLingua.addService("Trans", "fra", FraTrans);
    EngTrans = window.JsLingua.getService("Trans", "eng");
  }

  const latinRep = {
    "ç": "c",
    "à": "a",
    "è": "e",
    "é": "e",
    "ù": "u"
  }

  const latinChars = "[" + Object.keys(latinRep).toString().replace(/,/g, "") + "]";

  /**
   * French transliteration
   *
   * @class FraTrans
   * @extends Trans
   * @uses EngTrans
   */
  function FraTrans() {
    if (EngTrans.prototype != null){
      EngTrans.call(this);
      let oldPreTrans = this.methods["Morse"].preTrans;
      this.methods["Morse"].preTrans = function(text) {
        let result = text.toLowerCase();
        text = text.replace(new RegExp(latinChars, "g"), c => latinRep[c]);
        return oldPreTrans(text);
      }
    }
    else Trans.call(this, "fra");
    this.code = "fra";
  }

  if (EngTrans.prototype != null) {
    FraTrans.prototype = Object.create(EngTrans.prototype);
  }
  else {
    FraTrans.prototype = Object.create(Trans.prototype);
  }

  FraTrans.prototype.constructor = FraTrans;


}());
