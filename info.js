(function(){

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Info;
  } else {
    window.JsLingua.Cls.Info = Info;
  }

  /**
   * Contains information about the specified language
   * @class Info
   * @param {string} langCode The language ISO639-2 code: "ara", "jpn", "eng", etc.
   */
  function Info(langCode) {

    //ISO639-2/5 code: ara, eng, jpn, etc.
    this.code = langCode;

    //arabic, english, japanese
    this.name = "";

    //writing direction: ltr (left to right)
    this.dir = "ltr"; //most are ltr

    //Words order (Subject, Object, Verb): svo, sov, vso, osv, ovs, vos
    this.wordOrder = "svo";//most are svo

    //language family:
    this.family = "";

    //language branch:
    this.branch = "";


    //---------Deprecated--------------------
    //---------------------------------------
    //number of native speakers
    //@deprecated
    this.population = 0;

    //Locations where it is the first language
    //@deprecated
    this.locations = [];

    //Dialects
    //@deprecated
    this.dialects = [];
  }


  //===========================
  //functions
  //===========================
  var Me = Info.prototype;

  /**
   * Get the name of the language
   * @method getName
   * @return {string}  the language name: arabic, english, japanese, etc.
   */
  Me.getName = function(){
    return this.name;
  }

  /**
   * Get the code of the language
   * @method getCode
   * @return {string}  The language ISO639-2 code: "ara", "jpn", "eng", etc.
   */
  Me.getCode = function(){
    return this.code;
  }

  /**
   * Get the family of the language
   * @method getFamily
   * @return {string}  The language family: Afro-asiatic, Japonic, etc.
   */
  Me.getFamily = function(){
    return this.family;
  }

  /**
   * Get the branch of the language, if any
   * @method getBranch
   * @return {string}  The language branch: semitic, etc.
   */
  Me.getBranch = function(){
    return this.branch;
  }

  /**
   * Get the direction of writing of the language: ltr or rtl
   * @method getDir
   * @return {string}  The language direction: left to right (ltr) or right to left (rtl)
   */
  Me.getDir = function(){
    return this.dir;
  }

  /**
   * Get the words order:
   * <ul>
   * <li>s: Subject</li>
   * <li>v: Verb</li>
   * <li>o: Object</li>
   * </ul>
   * For example, English is "svo"
   * @method getWordOrder
   * @return {string}  The words order in the language
   */
  Me.getWordOrder = function(){
    return this.wordOrder;
  }

  /**
   * The number of population speaking the language
   * @method getPopulation
   * @deprecated
   * @return {number} number of population
   */
  Me.getPopulation = function(){
    return this.population;
  }

  /**
   * Contries where this language is official
   * @method getLocations
   * @deprecated
   * @return {array}  Array of strings with contries names
   */
  Me.getLocations = function(){
    return this.locations;
  }

  /**
   * Get the Dialects
   * @method getDialects
   * @deprecated
   * @return {array}  Array of strings with dialects
   */
  Me.getDialects = function(){
    return this.dialects;
  }

}());
