(function(){

  //service name: [services for languages]
  var services = {};

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
      }
    };

    JsLingua.Cls = {
      Info: require("./info.js"),
      Lang: require("./lang.js"),
      Trans: require("./trans.js"),
    };

    module.exports = JsLingua;

  } else {
    //In case of browser, the called classes will subscribe themeselves
    window.JsLingua = JsLingua;
  }

  JsLingua.addService = function(serviceID, langCode, theClass){
    if (services[serviceID] === undefined){
      services[serviceID] = {};
    }
    
    services[serviceID][langCode] = theClass;

  }

  JsLingua.serviceLanguages = function(serviceID){
    if (services[serviceID] === undefined) return [];
    return Object.keys(services[serviceID]);
  }

  JsLingua.getService = function(serviceID, langCode){
    if (services[serviceID] === undefined) return null;
    if (! langCode in services[serviceID]) return null;
    return services[serviceID][langCode];
  }


}());
