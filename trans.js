(function(){

	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = Trans;
	} else {
		window.JsLingua.Cls.Trans = Trans;
	}

	/**
	* This function returns another function which do the transformation
	* @method getTransliterator
	* @private
	* @param  {array} srcTbl array which contains the source strings
	* @param  {array} dstTbl array which contains the destination strings
	* @return {function}        a function which takes a string and transforme it using
	* srcTbl and dstTbl
	*/
	function getTransliterator(srcTbl, dstTbl) {
		return function(text) {
			let result = text;
			for (let i=0; i< srcTbl.length; i++){
				let keyEscaped = srcTbl[i].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
				result = result.replace(new RegExp(keyEscaped, 'g'), dstTbl[i]);
			}
			return result;
		}
	}

	/**
	* translateration of the language words
	* @class Trans
	* @module JsLingua
	* @constructor
	* @param {string} langCode the code of the language: ara, jpn, etc.
	*/
	function Trans(langCode) {
		this.code = langCode;
		this.methods = {};
		//default method (here we will take the first added one)
		this.defMethod = "";

		this.currentMethod = "";
	}

	//=========================================
	// Protected Static methods
	// ========================================

	/**
	* Add new transliteration method using two parallele tables
	* @method newMethod
	* @protected
	* @static
	* @param  {string} methodName the name of the method
	* @param  {array} langTbl    array of strigs, the languages characters
	* @param  {array} transTbl   array of strigs, their respective representations
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
	* Set transliteration methods directly
	* @method setTransUntrasMethods
	* @protected
	* @static
	* @param {string} methodName the name of the method
	* @param {function} trans      function of transliteration
	* @param {function} untrans    function of untransliteration
	*/
	Trans.setTransUntrasMethods = function (methodName, trans, untrans) {
		if (methodName in this.methods){
			if (typeof trans === "function"){
				this.methods[methodName].trans = trans;
			}
			if (typeof untrans === "function"){
				this.methods[methodName].untrans = untrans;
			}
		}
	}

	/**
	* add pre- and post-transliteration functions to a method
	* @method addTransPrePostMethods
	* @protected
	* @static
	* @param {string} methodName the name of the method
	* @param {function} preFunc    function that executes before transliteration;
	* It takes a string and returns a string
	* @param {function} postFunc   function that executes after transliteration;
	* It takes a string and returns a string
	*/
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

	/**
	* add pre- and post-untransliteration functions to a method
	* @method addUntransPrePostMethods
	* @protected
	* @static
	* @param {string} methodName the name of the method
	* @param {function} preFunc    function that executes before untransliteration;
	* It takes a string and returns a string
	* @param {function} postFunc   function that executes after untransliteration;
	* It takes a string and returns a string
	*/
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
	let Me = Trans.prototype;


	/**
	* Sets the current method to be used for [un]transliteration
	* @method setCurrentMethod
	* @param {string} methodName method's name
	*/
	Me.setCurrentMethod = function (methodName) {
		if (methodName in this.methods){
			this.currentMethod = methodName;
		}
	}

	/**
	* Returns the list of available transliteration methods
	* @method availableMethods
	* @return {array}  Array of Strings containing methods names
	*/
	Me.availableMethods = function(){
		return Object.keys(this.methods);
	}

	/**
	* gets the language's code
	* @method getCode
	* @return {string}  the language's code
	*/
	Me.getCode = function(){
		return this.code;
	}

	/**
	* transliterate the text using the current method
	* @method transliterate
	* @param  {string} text the untransliterated text (original)
	* @return {string}      the transliterated text
	*/
	Me.transliterate = function(text){
		let result = text;

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
	* untransliterate the text using the current method
	* @method untransliterate
	* @param  {string} text translaterated text
	* @return {string}      untranslaterated text (original text)
	*/
	Me.untransliterate = function(text){
		let result = text;

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
