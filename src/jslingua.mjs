class JsLingua {
  static version = "0.12.1";
  static rtls = ["ara", "heb", "aze", "div", "kur", "per", "fas", "urd"];
  static services = {};

  static async load(serviceID, langCode){
    serviceID = serviceID.toLowerCase();
    langCode = langCode.toLowerCase();
    let service = this.services[serviceID];//load the service from the internal list
    if (service === undefined){
      if (!(serviceID in servicesURLs)){
        return false; //the service is not available
      }
      service = servicesURLs[serviceID];//load the service map
      if (!(langCode in service)){
        return false; //the service is not available for this language
      }
    }
    let serviceLang = service[langCode];
    if (typeof serviceLang == "string") {//if it is a string, then it came from servicesURLs
      let services = this.services;
      let module = await import(serviceLang);
      this.aserv(serviceID, langCode, module.default);
    }
    return true;
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
  static aserv(serviceID, langCode, theClass) {
    serviceID = serviceID.toLowerCase();
    langCode = langCode.toLowerCase();
    if (this.services[serviceID] === undefined){
      this.services[serviceID] = {};
    }

    this.services[serviceID][langCode] = theClass;
  }

  /**
  * Get the codes of available languages of a given service
  *
  * @method llang
  * @public
  * @static
  * @param  {String} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
  * @return {String[]}   array of strings, with ISO639-2 codes
  */
  static llang(serviceID) {
    let service = this.services[serviceID.toLowerCase()];
    if (service === undefined) return [];
    return Object.keys(service);
  }

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
  static gserv(serviceID, langCode) {
    let service = this.services[serviceID.toLowerCase()];
    if (service === undefined) return null;
    langCode = langCode.toLowerCase();
    if (! (langCode in service)) return null;
    return service[langCode];
  }

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
  static nserv(serviceID, langCode) {
    let Cls = this.gserv(serviceID, langCode);
    if (Cls === null) return null;
    return new Cls();
  }

  /**
   * Returns the version of JsLingua
   *
   * @method gversion
   * @public
   * @static
   * @return {String}   JsLingua version
   */
  static gversion() {
    return this.version;
  }

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
  static gdir(langCode) {

    if (this.rtls.indexOf(langCode) < 0) return "ltr";

    return "rtl";

  }


  //========================================
  // LONG FUNCTIONS
  //========================================

  /**
  * Get the service class for a given language and service name.<br>
  * For example: JsLingua.getService("Info", "ara") Gives a class AraInfo
  *
  * @method getService
  * @public
  * @static
  * @param  {String} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
  * @param  {String} langCode  The language ISO639-2 code: "ara", "jpn", "eng", etc.
  * @return {Class}   The class that affords the service
  */
  static getService(serviceID, langCode) {
    return JsLingua.gserv(serviceID, langCode);
  }

  /**
  * Get the codes of available languages of a given service
  *
  * @method listLanguages
  * @public
  * @static
  * @param  {String} serviceID The name of the service (the super-classe): "Info", "Lang", etc.
  * @return {String[]}   array of strings, with ISO639-2 codes
  */
  static listLanguages(serviceID) {
    return this.llang(serviceID);
  }

  /**
   * To recover the direction of writing for the given language <br>
   * This can be done using the info.js instance of the target language.
   * But, the direction is used a lot for presentation, so a centralized
   * version is to be afforded, so we don't import the js file for each
   * language in each webpage.
   *
   * @method getDir
   * @public
   * @static
   * @param  {String} langCode The language ISO639-2 code: "ara", "jpn", "eng", etc.
   * @return {String}     either "rtl" or "ltr"
   */
  static getDir(langCode) {
    return this.gdir(langCode);
  }

  /**
   * Returns the version of JsLingua
   *
   * @method getVersion
   * @public
   * @static
   * @return {String}   JsLingua version
   */
  static getVersion() {
    return this.version;
  }

}


let servicesURLs = {
  "info": {
    "ara": "./ara/ara.info.mjs",//Arabic information class
    "jpn": "./jpn/jpn.info.mjs",//Japanese information class
    "eng": "./eng/eng.info.mjs",//English information class
    "fra": "./fra/fra.info.mjs"//French information class
  },
  "lang": {
    "ara": "./ara/ara.lang.mjs",//Arabic language class
    "jpn": "./jpn/jpn.lang.mjs",//Japanese language class
    "eng": "./eng/eng.lang.mjs",//English language class
    "fra": "./fra/fra.lang.mjs"//English language class
  },
  "trans": {
    "ara": "./ara/ara.trans.mjs",//Arabic transliteration class
    "jpn": "./jpn/jpn.trans.mjs",//Japanese transliteration class
    "eng": "./eng/eng.trans.mjs",//English transliteration class
    "fra": "./fra/fra.trans.mjs"//French transliteration class
  },
  "morpho": {
    "ara": "./ara/ara.morpho.mjs",//Arabic Morphology class
    "jpn": "./jpn/jpn.morpho.mjs",//Japanese Morphology class
    "eng": "./eng/eng.morpho.mjs",//English Morphology class
    "fra": "./fra/fra.morpho.mjs"//French Morphology class
  }
};

export default JsLingua;
