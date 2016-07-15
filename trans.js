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
						var keyEscaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
	function Trans(lookupTable, invLookupTable) {
		var rlookup = {};
		var transPreFunc;
		var utransPreFunc;
		var transPostFunc;
		var utransPostFunc;
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

		Trans.prototype.addTransPreFunction = function (func) {
			if (typeof func === "function"){
				transPreFunc = func;
			}
		}

		Trans.prototype.addUnTransPreFunction = function (func) {
			if (typeof func === "function"){
				utransPreFunc = func;
			}
		}

		Trans.prototype.addTransPostFunction = function (func) {
			if (typeof func === "function"){
				transPostFunc = func;
			}
		}

		Trans.prototype.addUnTransPostFunction = function (func) {
			if (typeof func === "function"){
				utransPostFunc = func;
			}
		}

		Trans.prototype.translaterate = function(text){
			var result = text;

			if (typeof transPreFunc === "function"){
				result = transPreFunc(result);
			}

			result = translaterator(result);

			if (typeof transPostFunc === "function"){
				result = transPostFunc(result);
			}
			return result;
		}

		Trans.prototype.untranslaterate = function(text){
			var result = text;

			if (typeof utransPreFunc === "function"){
				result = utransPreFunc(result);
			}

			result = untranslaterator(result);

			if (typeof utransPostFunc === "function"){
				result = utransPostFunc(result);
			}
			return result;
		}

	}

	return Trans;
}());
