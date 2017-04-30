/**
 * The main module
 * @module JsLingua
 */

(function(){


  var version = "0.3.0";

  //service name: [services for languages]
  var services = {};

  /**
   * The main class
   * @class JsLingua
   */
  var JsLingua = {};

  JsLingua.Cls = {};

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    //In case of nodeJs, we load all available modules
    services = {
      "Info": {
        "ara": require("./ara/ara.info.js"),//Arabic information class
        "jpn": require("./jpn/jpn.info.js")//Japanese information class
      },
      "Lang": {
        "ara": require("./ara/ara.lang.js"),//Arabic language class
        "jpn": require("./jpn/jpn.lang.js")//Japanese language class
      },
      "Trans": {
        "ara": require("./ara/ara.trans.js"),//Arabic transliteration class
        "jpn": require("./jpn/jpn.trans.js")//Japanese transliteration class
      },
      "Morpho": {
        "ara": require("./ara/ara.morpho.js")//,//Arabic Morphology class
        //"jpn": require("./jpn/jpn.trans.js")//Japanese Morphology class
      }
    };

    /**
     * Contains the super-classes: Info, Lang, Trans, Morpho. <br>
     * for example, JsLingua.Cls.Info returns Info class
     * @attribute Cls
     * @static
     * @type {Object}
     */
    JsLingua.Cls = {
      Info: require("./info.js"),
      Lang: require("./lang.js"),
      Trans: require("./trans.js"),
      Morpho: require("./morpho.js")
    };

    module.exports = JsLingua;

  } else {
    //In case of browser, the called classes will subscribe themeselves
    window.JsLingua = JsLingua;
  }

  /**
   * Add a service for a specific language
   * @method addService
   * @param {string} serviceID The services name: "Info", "Lang", etc.
   * @param {string} langCode  The language ISO639-2 code: "ara", "jpn", "eng", etc.
   * @param {object} theClass  The class that affords the service
   */
  JsLingua.addService = function(serviceID, langCode, theClass){
    if (services[serviceID] === undefined){
      services[serviceID] = {};
    }

    services[serviceID][langCode] = theClass;

  }

  /**
   * Get the codes of available languages of a given service
   * @method serviceLanguages
   * @param  {string} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
   * @return {array}   array of strings, with ISO639-2 codes
   */
  JsLingua.serviceLanguages = function(serviceID){
    if (services[serviceID] === undefined) return [];
    return Object.keys(services[serviceID]);
  }

  /**
   * Get the service class for a given language and service name.<br>
   * For example: JsLingua.getService("Info", "ara") Gives a class AraInfo
   * @method getService
   * @param  {string} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
   * @param  {string} langCode  The language ISO639-2 code: "ara", "jpn", "eng", etc.
   * @return {object}   The class that affords the service
   */
  JsLingua.getService = function(serviceID, langCode){
    if (services[serviceID] === undefined) return null;
    if (! langCode in services[serviceID]) return null;
    return services[serviceID][langCode];
  }

  JsLingua.getVersion = function(){
    return version;
  }


}());
