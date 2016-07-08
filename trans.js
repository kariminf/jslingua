
var Trans = (function(){

	function getTranslaterator(lookupTable) {
	    return function(text) {
	        var result = "";
	        for (var i = 0; i < text.length; i++){
	            var char = text.charAt(i);
	            if (char in lookupTable){
	                result += lookupTable[char];
	            } else {
	                result += char;
	            }
	        }

	        return result;
	    }
	}

	function Trans(lookupTable, invLookupTable) {
		var lookup = lookupTable;
		var rlookup = {};
		if (typeof(invLookupTable) != "undefined"){
			rlookup = invLookupTable;
			return;
		}
		Object.keys(lookup).forEach(function(key) {
			var val = lookup[key];
			rlookup[val] = key;
		});

		Trans.prototype.translaterate = getTranslaterator(lookup);
		Trans.prototype.untranslaterate = getTranslaterator(rlookup);

	}

	return Trans;
}());
