(function(window){

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Info;
  } else {
    window.Info = Info;
  }

  function Info(code) {

    //ISO639-2/5 code: ara, eng, jpn, etc.
    this.code = code;

    //arabic, english, japanese
    this.name = "";

    //writing direction: ltr (left to right)
    this.dir = "ltr"; //most are ltr

    //Words order (Subject, Object, Verb): svo, sov, vso, osv, ovs, vos
    this.wordOrder = "svo";//most are svo

    //language family:
    this.family = "";

    //number of native speakers
    this.population = 0;

    //Locations where it is the first language
    this.locations = [];

    //Dialects
    this.dialects = [];
  }


  Info.prototype.getName(){
    return this.name;
  }

  Info.prototype.getCode(){
    return this.name;
  }

  Info.prototype.getDir(){
    return this.dir;
  }

  Info.prototype.getWordOrder(){
    return this.wordOrder;
  }

  Info.prototype.getPopulation(){
    return this.population;
  }

  Info.prototype.getLocations(){
    return this.locations;
  }

  Info.prototype.getDialects(){
    return this.dialects;
  }

}(this));
