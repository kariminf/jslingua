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

    //language branch:
    this.branch = "";

    //number of native speakers
    this.population = 0;

    //Locations where it is the first language
    this.locations = [];

    //Dialects
    this.dialects = [];
  }


  Info.prototype.getName = function(){
    return this.name;
  }

  Info.prototype.getCode = function(){
    return this.name;
  }

  Info.prototype.getFamily = function(){
    return this.family;
  }

  Info.prototype.getBranch = function(){
    return this.branch;
  }

  Info.prototype.getDir = function(){
    return this.dir;
  }

  Info.prototype.getWordOrder = function(){
    return this.wordOrder;
  }

  Info.prototype.getPopulation = function(){
    return this.population;
  }

  Info.prototype.getLocations = function(){
    return this.locations;
  }

  Info.prototype.getDialects = function(){
    return this.dialects;
  }

}(this));
