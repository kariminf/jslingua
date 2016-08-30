(function(){

	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = Trans;
	} else {
		window.JsLingua.Cls.Trans = Trans;
	}

	/**
	 * This function returns another function which do the transformation
	 * @param  {[type]} srcTbl [description]
	 * @param  {[type]} dstTbl [description]
	 * @return {[type]}        [description]
	 */
	function getTransliterator(srcTbl, dstTbl) {
		return function(text) {
			var result = text;
			var i;
			for (i=0; i< srcTbl.length; i++){
				var keyEscaped = srcTbl[i].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
				result = result.replace(new RegExp(keyEscaped, 'g'), dstTbl[i]);
			}
			return result;
		}
	}

	/**
	 * Constructor of the class
	 * @param {string} langCode the code of the language: ara, jpn, etc.
	 */
	function Trans(langCode) {
		this.code = langCode;
		this.methods = {};
		//default method (here we will take the first added one)
		this.defMethod = "";

		this.currentMethod = "";
	}

	/**
	 * Add new translateration method
	 * @param  {string} methodName the name of the method
	 * @param  {Array[string]} langTbl    the languages characters
	 * @param  {Array[string]} transTbl   their respective representations
	 */
	Trans.newMethod = function (methodName, langTbl, transTbl) {
		if (typeof methodName === "string" && methodName.length > 0){
			this.methods[methodName] = {};
			if (this.defMethod.length < 1)
				this.currentMethod = this.defMethod = methodName;
			this.methods[methodName].trans = this.methods[methodName].untrans = function(text){
				return text;
			};
			if (Array.isArray(langTbl)  && Array.isArray(transTbl))
				if (langTbl.length  === transTbl.length){
					this.methods[methodName].trans = getTransliterator(langTbl, transTbl);
					this.methods[methodName].untrans = getTransliterator(transTbl, langTbl);
				}
		}
	}

	/**
	 * [setTransUntrasMethods description]
	 * @param {[type]} trans   [description]
	 * @param {[type]} untrans [description]
	 */
	Trans.prototype.setTransUntrasMethods = function (trans, untrans) {
		if (methodName in this.methods){
			if (typeof trans === "function"){
				this.methods[methodName].trans = trans;
			}
			if (typeof untrans === "function"){
				this.methods[methodName].untrans = untrans;
			}
		}
	}

	Trans.addTransPrePostMethods = function (methodName, preFunc, postFunc) {
		if (methodName in this.methods){
			if (typeof preFunc === "function"){
				this.methods[methodName].preTrans = preFunc;
			}
			if (typeof postFunc === "function"){
				this.methods[methodName].postTrans = postFunc;
			}
		}
	}

	Trans.addUntransPrePostMethods = function (methodName, preFunc, postFunc) {
		if (methodName in this.methods){
			if (typeof preFunc === "function"){
				this.methods[methodName].preUntrans = preFunc;
			}
			if (typeof postFunc === "function"){
				this.methods[methodName].postUntrans = postFunc;
			}
		}
	}


//=============================================
// Prototypes
// ============================================
	/**
	 * Sets the current method for translateration
	 * @param {string} methodName method's name
	 */
	Trans.prototype.setCurrentMethod = function (methodName) {
		if (methodName in this.methods){
			this.currentMethod = methodName;
		}
	}

	/**
	 * Returns the list of available translateration methods
	 * @return {Array[string]} [description]
	 */
	Trans.prototype.availableMethods = function(){
    return Object.keys(this.methods);
  }

	/**
	 * gets the language's code
	 * @return {string} the language's code
	 */
	Trans.prototype.getCode = function(){
    return this.code;
  }

	/**
	 * translaterate the text using the current method
	 * @param  {string} text the untransliterated text (original)
	 * @return {string}      the transliterated text
	 */
	Trans.prototype.transliterate = function(text){
		var result = text;

		if (typeof this.methods[this.currentMethod].preTrans === "function"){
			result = this.methods[this.currentMethod].preTrans(result);
		}

		result = this.methods[this.currentMethod].trans(result);

		if (typeof this.methods[this.currentMethod].postTrans === "function"){
			result = this.methods[this.currentMethod].postTrans(result);
		}
		return result;
	}

	/**
	 * untranslaterates the text using the current method
	 * @param  {string} text translaterated text
	 * @return {string}      untranslaterated text (original text)
	 */
	Trans.prototype.untransliterate = function(text){
		var result = text;

		if (typeof this.methods[this.currentMethod].preUntrans === "function"){
			result = this.methods[this.currentMethod].preUntrans(result);
		}

		result = this.methods[this.currentMethod].untrans(result);

		if (typeof this.methods[this.currentMethod].postUntrans === "function"){
			result = this.methods[this.currentMethod].postUntrans(result);
		}
		return result;
	}

}());
