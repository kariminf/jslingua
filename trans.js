var Trans = (function(){

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


	var uid = 0;
	var p = {};



	/**
	 * Constructor of the class
	 * @param {lookup table} lookupTable table used for translateration
	 * @param {lookup table} invLookupTable table used for untranslateration; if it doesn't exist
	 * the first one will be inversed and used for this operation.
	 */
	function Trans(lookupTable, invLookupTable) {

		var rlookup = {};


		if (typeof(invLookupTable) !== "undefined"){
			rlookup = invLookupTable;
		} else {
			Object.keys(lookupTable).forEach(function(key) {
				var val = lookupTable[key];
				rlookup[val] = key;
			});
		}

		var translaterator = getTranslaterator(lookupTable);
		var untranslaterator = getTranslaterator(rlookup);

		p[this.id = uid++] = {};

		//p[this.id].rlookup = rlookup;

		p[this.id].translaterator = translaterator;

		p[this.id].untranslaterator = untranslaterator;

		this.inverseLookup = rlookup;

		}

			Trans.prototype.addTransPreFunction = function (func) {
				if (typeof func === "function"){
					p[this.id].transPreFunc = func;
				}
			}

			Trans.prototype.addUnTransPreFunction = function (func) {
				if (typeof func === "function"){
					p[this.id].utransPreFunc = func;
				}
			}

			Trans.prototype.addTransPostFunction = function (func) {
				if (typeof func === "function"){
					p[this.id].transPostFunc = func;
				}
			}

			Trans.prototype.addUnTransPostFunction = function (func) {
				if (typeof func === "function"){
					p[this.id].utransPostFunc = func;
				}
			}

			Trans.prototype.translaterate = function(text){
				var result = text;

				if (typeof p[this.id].transPreFunc === "function"){
					result = p[this.id].transPreFunc(result);
				}

				result = p[this.id].translaterator(result);

				if (typeof p[this.id].transPostFunc === "function"){
					result = p[this.id].transPostFunc(result);
				}
				return result;
			}

			Trans.prototype.untranslaterate = function(text){
				var result = text;

				if (typeof p[this.id].utransPreFunc === "function"){
					result = p[this.id].utransPreFunc(result);
				}

				result = p[this.id].untranslaterator(result);

				if (typeof p[this.id].utransPostFunc === "function"){
					result = p[this.id].utransPostFunc(result);
				}
				return result;
			}

	return Trans;
}());
