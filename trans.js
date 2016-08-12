(function(window){

	/**
	* This function returns another function which do the transformation
	* @param  {lookup table} lookupTable A lookup table to replace the keys with values
	* @return {function} a function which takes a text and replace the keys in it with the equivalent values.
	*/
	function getTranslaterator(lookupTable) {
		return function(text) {
			var result = text;
			for (var key in lookupTable){
				var keyEscaped = key.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
				result = result.replace(new RegExp(keyEscaped, 'g'), lookupTable[key]);
			}
			return result;
		}
	}

	/**
	* Constructor of the class
	* @param {lookup table} lookupTable table used for translateration
	* @param {lookup table} invLookupTable table used for untranslateration; if it doesn't exist
	* the first one will be inversed and used for this operation.
	*/
	function Trans(langName, lookupTable, invLookupTable) {
		this.name = langName;

		var rlookup = {};


		if (typeof(invLookupTable) !== "undefined"){
			rlookup = invLookupTable;
		} else {
			Object.keys(lookupTable).forEach(function(key) {
				var val = lookupTable[key];
				rlookup[val] = key;
			});
		}

		this.translaterator = getTranslaterator(lookupTable);

		this.untranslaterator = getTranslaterator(rlookup);

		this.inverseLookup = rlookup;

	}

	Trans.prototype.addTransPreFunction = function (func) {
		if (typeof func === "function"){
			this.transPreFunc = func;
		}
	}

	Trans.prototype.addUnTransPreFunction = function (func) {
		if (typeof func === "function"){
			this.utransPreFunc = func;
		}
	}

	Trans.prototype.addTransPostFunction = function (func) {
		if (typeof func === "function"){
			this.transPostFunc = func;
		}
	}

	Trans.prototype.addUnTransPostFunction = function (func) {
		if (typeof func === "function"){
			this.utransPostFunc = func;
		}
	}

	Trans.prototype.getLangName = function(){
    return this.name;
  }

	Trans.prototype.translaterate = function(text){
		var result = text;

		if (typeof this.transPreFunc === "function"){
			result = this.transPreFunc(result);
		}

		result = this.translaterator(result);

		if (typeof this.transPostFunc === "function"){
			result = this.transPostFunc(result);
		}
		return result;
	}

	Trans.prototype.untranslaterate = function(text){
		var result = text;

		if (typeof this.utransPreFunc === "function"){
			result = this.utransPreFunc(result);
		}

		result = this.untranslaterator(result);

		if (typeof this.utransPostFunc === "function"){
			result = this.utransPostFunc(result);
		}
		return result;
	}

	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = Trans;
	} else {
		window.Trans = Trans;
	}
}(this));
