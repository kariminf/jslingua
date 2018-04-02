/**
* The main module
* @module JsLingua
*/
(function () {

  "use strict";

  let version = "0.8.0";

  const rtls = ["ara", "heb"];

  //service name: [services for languages]
  let services = {};

  let JsLingua = {};

  /**
  * Contains the super-classes: Info, Lang, Trans, Morpho. <br>
  * for example, JsLingua.Cls.Info returns Info class
  *
  * @attribute Cls
  * @public
  * @static
  * @type {Object}
  */
  JsLingua.Cls = {};

  if (typeof module === "object" && module && typeof module.exports === "object") {
    //In case of nodeJs, we load all available modules
    services = {
      "info": {
        "ara": require("./ara/ara.info.js"),//Arabic information class
        "jpn": require("./jpn/jpn.info.js"),//Japanese information class
        "eng": require("./eng/eng.info.js"),//English information class
        "fra": require("./fra/fra.info.js")//French information class
      },
      "lang": {
        "ara": require("./ara/ara.lang.js"),//Arabic language class
        "jpn": require("./jpn/jpn.lang.js"),//Japanese language class
        "eng": require("./eng/eng.lang.js"),//English language class
        "fra": require("./fra/fra.lang.js")//English language class
      },
      "trans": {
        "ara": require("./ara/ara.trans.js"),//Arabic transliteration class
        "jpn": require("./jpn/jpn.trans.js"),//Japanese transliteration class
        "eng": require("./eng/eng.trans.js"),//English transliteration class
        "fra": require("./fra/fra.trans.js")//French transliteration class
      },
      "morpho": {
        "ara": require("./ara/ara.morpho.js"),//Arabic Morphology class
        "jpn": require("./jpn/jpn.morpho.js"),//Japanese Morphology class
        "eng": require("./eng/eng.morpho.js"),//English Morphology class
        "fra": require("./fra/fra.morpho.js")//French Morphology class
      }
    };

    JsLingua.Cls = {
      Info: require("./info.js"),
      Lang: require("./lang.js"),
      Trans: require("./trans.js"),
      Morpho: require("./morpho.js")
    };

    module.exports = JsLingua;

  }
  else {
    //In case of browser, the called classes will subscribe themeselves
    window.JsLingua = JsLingua;
  }

  /**
  * Add a service for a specific language
  *
  * @method aserv
  * @public
  * @static
  * @param {String} serviceID The services name: "Info", "Lang", etc.
  * @param {String} langCode  The language ISO639-2 code: "ara", "jpn", "eng", etc.
  * @param {Object} theClass  The class that affords the service
  */
  JsLingua.aserv = function(serviceID, langCode, theClass) {
    if (services[serviceID] === undefined){
      services[serviceID] = {};
    }

    services[serviceID][langCode] = theClass;

  };

  /**
  * Get the codes of available languages of a given service
  *
  * @method llang
  * @public
  * @static
  * @param  {String} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
  * @return {String[]}   array of strings, with ISO639-2 codes
  */
  JsLingua.llang = function(serviceID) {
    if (services[serviceID] === undefined) return [];
    return Object.keys(services[serviceID]);
  };

  /**
  * Get the service class for a given language and service name.<br>
  * For example: JsLingua.gserv("Info", "ara") Gives a class AraInfo
  *
  * @method gserv
  * @public
  * @static
  * @param  {String} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
  * @param  {String} langCode  The language ISO639-2 code: "ara", "jpn", "eng", etc.
  * @return {Class}   The class that affords the service
  */
  JsLingua.gserv = function(serviceID, langCode) {
    if (services[serviceID] === undefined) return null;
    if (! (langCode in services[serviceID])) return null;
    return services[serviceID][langCode];
  };

  /**
  * Get an object of a service class for a given language and service name.<br>
  * For example: JsLingua.nserv("Info", "ara") Gives an object of the class AraInfo
  *
  * @method nserv
  * @public
  * @static
  * @param  {String} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
  * @param  {String} langCode  The language ISO639-2 code: "ara", "jpn", "eng", etc.
  * @return {Class}   The class that affords the service
  */
  JsLingua.nserv = function(serviceID, langCode) {
    let Cls = JsLingua.gserv(serviceID, langCode);
    if (Cls === null) return null;
    return new Cls();
  };

  /**
   * Returns the version of JsLingua
   *
   * @method gversion
   * @public
   * @static
   * @return {String}   JsLingua version
   */
  JsLingua.gversion = function() {
    return version;
  };

  /**
   * To recover the direction of writing for the given language <br>
   * This can be done using the info.js instance of the target language.
   * But, the direction is used a lot for presentation, so a centralized
   * version is to be afforded, so we don't import the js file for each
   * language in each webpage.
   *
   * @method gdir
   * @public
   * @static
   * @param  {String} langCode The language ISO639-2 code: "ara", "jpn", "eng", etc.
   * @return {String}     either "rtl" or "ltr"
   */
  JsLingua.gdir = function(langCode) {

    if (rtls.indexOf(langCode) < 0) return "ltr";

    return "rtl";

  };


  //========================================
  // DEPRECATED FUNCTIONS
  //========================================

  /**
  * Get the service class for a given language and service name.<br>
  * For example: JsLingua.getService("Info", "ara") Gives a class AraInfo
  *
  * @method getService
  * @deprecated use gserv() instead
  * @public
  * @static
  * @param  {String} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
  * @param  {String} langCode  The language ISO639-2 code: "ara", "jpn", "eng", etc.
  * @return {Class}   The class that affords the service
  */
  JsLingua.getService = function(serviceID, langCode) {
    return JsLingua.gserv(serviceID.toLowerCase(), langCode);
  };

  /**
  * Get the codes of available languages of a given service
  *
  * @method serviceLanguages
  * @deprecated use llang() instead
  * @public
  * @static
  * @param  {String} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
  * @return {String[]}   array of strings, with ISO639-2 codes
  */
  JsLingua.serviceLanguages = function(serviceID) {
    return JsLingua.llang(serviceID);
  };

  /**
   * To recover the direction of writing for the given language <br>
   * This can be done using the info.js instance of the target language.
   * But, the direction is used a lot for presentation, so a centralized
   * version is to be afforded, so we don't import the js file for each
   * language in each webpage.
   *
   * @method getDir
   * @deprecated use gdir() instead
   * @public
   * @static
   * @param  {String} langCode The language ISO639-2 code: "ara", "jpn", "eng", etc.
   * @return {String}     either "rtl" or "ltr"
   */
  JsLingua.getDir = function(langCode) {
    return JsLingua.gdir();
  };

  /**
   * Returns the version of JsLingua
   *
   * @method getVersion
   * @deprecated use gversion() instead
   * @public
   * @static
   * @return {String}   JsLingua version
   */
  JsLingua.getVersion = function() {
    return version;
  };

}());
