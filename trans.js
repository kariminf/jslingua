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
	var privateStore = {};



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

		privateStore[this.id = uid++] = {};

		privateStore[this.id].rlookup = rlookup;

		privateStore[this.id].translaterator = translaterator;

		privateStore[this.id].untranslaterator = untranslaterator;

		this.inverseLookup = rlookup;

		}

			Trans.prototype.addTransPreFunction = function (func) {
				if (typeof func === "function"){
					privateStore[this.id].transPreFunc = func;
				}
			}

			Trans.prototype.addUnTransPreFunction = function (func) {
				if (typeof func === "function"){
					privateStore[this.id].utransPreFunc = func;
				}
			}

			Trans.prototype.addTransPostFunction = function (func) {
				if (typeof func === "function"){
					privateStore[this.id].transPostFunc = func;
				}
			}

			Trans.prototype.addUnTransPostFunction = function (func) {
				if (typeof func === "function"){
					privateStore[this.id].utransPostFunc = func;
				}
			}

			Trans.prototype.translaterate = function(text){
				var result = text;

				if (typeof privateStore[this.id].transPreFunc === "function"){
					result = privateStore[this.id].transPreFunc(result);
				}

				result = privateStore[this.id].translaterator(result);

				if (typeof privateStore[this.id].transPostFunc === "function"){
					result = privateStore[this.id].transPostFunc(result);
				}
				return result;
			}

			Trans.prototype.untranslaterate = function(text){
				var result = text;

				if (typeof privateStore[this.id].utransPreFunc === "function"){
					result = privateStore[this.id].utransPreFunc(result);
				}

				result = privateStore[this.id].untranslaterator(result);

				if (typeof privateStore[this.id].utransPostFunc === "function"){
					result = privateStore[this.id].utransPostFunc(result);
				}
				return result;
			}

	return Trans;
}());
