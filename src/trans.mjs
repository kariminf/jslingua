/**
 * Transliteration module
 * @module trans
 */

/**
 * Transliteration functions
 * @hideconstructor
 */
class Trans {

  static code = "";
  static methods = {};
  //default method (here we will take the first added one)
  static defMethod = "";
  static currentMethod = "";

  //==========================================
  // STATIC FUNCTIONS
  //==========================================

	/**
	* Add new transliteration method using two parallele tables
	*
	* @protected
	* @param  {String} methodName the name of the method
	* @param  {String[]} langTbl    array of strigs, the languages characters
	* @param  {String[]} transTbl   array of strigs, their respective representations
	*/
	static _nTrans(methodName, langTbl, transTbl) {
		if (typeof methodName === "string" && methodName.length > 0) {
			this.methods[methodName] = {};
			if (this.defMethod.length < 1)
			this.currentMethod = this.defMethod = methodName;
			this.methods[methodName].trans = this.methods[methodName].untrans = function(text) {
				return text;
			};
			if (Array.isArray(langTbl)  && Array.isArray(transTbl))
			if (langTbl.length  === transTbl.length) {
				this.methods[methodName].trans = __createTrans(langTbl, transTbl);
				this.methods[methodName].untrans = __createTrans(transTbl, langTbl);
			}
		}
	}

	/**
	* Set transliteration methods directly
	*
	* @protected
	* @param {String} methodName the name of the method
	* @param {Function} trans      function of transliteration
	* @param {Function} untrans    function of untransliteration
	*/
	static _sTrans(methodName, trans, untrans) {
		if (methodName in this.methods){

			if (typeof trans === "function") {
				this.methods[methodName].trans = trans;
			}

			if (typeof untrans === "function") {
				this.methods[methodName].untrans = untrans;
			}

		}
	}

	/**
	* add pre- and post-transliteration functions to a method
	*
	* @protected
	* @param {String} methodName the name of the method
	* @param {Function} preFunc    function that executes before transliteration;
	* It takes a string and returns a string
	* @param {Function} postFunc   function that executes after transliteration;
	* It takes a string and returns a string
	*/
	static _sTransCnd(methodName, preFunc, postFunc) {
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
	*
	* @protected
	* @param {String} methodName the name of the method
	* @param {Function} preFunc    function that executes before untransliteration;
	* It takes a string and returns a string
	* @param {Function} postFunc   function that executes after untransliteration;
	* It takes a string and returns a string
	*/
	static _sUntransCnd(methodName, preFunc, postFunc) {
		if (methodName in this.methods){
			if (typeof preFunc === "function"){
				this.methods[methodName].preUntrans = preFunc;
			}
			if (typeof postFunc === "function"){
				this.methods[methodName].postUntrans = postFunc;
			}
		}
	}

	//==========================================
  // TRANSLITERATION MANAGEMENT FUNCTIONS
  //==========================================

	/**
	* Sets the current method to be used for [un]transliteration
	*
	* @public
	* @final
	* @param {String} methodName method's name
	*/
	static s(methodName) {
		if (methodName in this.methods) {
			this.currentMethod = methodName;
		}
	}



	/**
	* Returns the list of available transliteration methods
	*
	* @public
	* @final
	* @return {String[]}  methods names
	*/
	static l() {
		return Object.keys(this.methods);
	}

	//==========================================
  // TRANSLITERATE FUNCTIONS
  //==========================================

	/**
	* transliterate the text using the current method
	*
	* @public
	* @final
	* @param  {String} text the untransliterated text (original)
	* @return {String}      the transliterated text
	*/
	static t(text) {
		let result = text;

		if (typeof this.methods[this.currentMethod].preTrans === "function") {
			result = this.methods[this.currentMethod].preTrans(result);
		}

		result = this.methods[this.currentMethod].trans(result);

		if (typeof this.methods[this.currentMethod].postTrans === "function") {
			result = this.methods[this.currentMethod].postTrans(result);
		}
		return result;
	}

	//==========================================
  // UNTRANSLITERATE FUNCTIONS
  //==========================================

	/**
	* untransliterate the text using the current method
	*
	* @public
	* @final
	* @param  {String} text translaterated text
	* @return {String}      untranslaterated text (original text)
	*/
	static u(text) {
		let result = text;

		if (typeof this.methods[this.currentMethod].preUntrans === "function") {
			result = this.methods[this.currentMethod].preUntrans(result);
		}

		result = this.methods[this.currentMethod].untrans(result);

		if (typeof this.methods[this.currentMethod].postUntrans === "function") {
			result = this.methods[this.currentMethod].postUntrans(result);
		}
		return result;
	}

}

//==========================================
// CONSTANTS
//==========================================

const specialBef = [
  //numbers,
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  //punctuation,
  "#", //actually it is a dot, this is to prevent conflect
  ",",
  "?",
  "'",
  "!",
  "/",
  "(",
  ")",
  "&",
  ":",
  ";",
  "=",
  "+",
  "^", //actually it is a hyphen, this is to prevent conflect
  "_",
  "\"",
  "$",
  "@"
],
specialAft = [
  //numbers
  " ----- ",
  " .---- ",
  " ..--- ",
  " ...-- ",
  " ....- ",
  " ..... ",
  " -.... ",
  " --... ",
  " ---.. ",
  " ----. ",
  //punctuation
  " .-.-.- ",
  " --..-- ",
  " ..--.. ",
  " .----. ",
  " -.-.-- ",
  " -..-. ",
  " -.--. ",
  " -.--.- ",
  " .-... ",
  " ---... ",
  " -.-.-. ",
  " -...- ",
  " .-.-. ",
  " -....- ",
  " ..--.- ",
  " .-..-. ",
  " ...-..- ",
  " .--.-. "
];


/**
* This function returns another function which do the transformation
*
* @private
* @memberof Trans
* @memberof Trans
* @param  {String[]} srcTbl array which contains the source strings
* @param  {String[]} dstTbl array which contains the destination strings
* @return {Function}        a function which takes a string and transforme it using
* srcTbl and dstTbl
*/
function __createTrans(srcTbl, dstTbl) {
  return function(text) {
    let result = text;
    for (let i=0; i< srcTbl.length; i++) {
      let keyEscaped = srcTbl[i].replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
      result = result.replace(new RegExp(keyEscaped, "g"), dstTbl[i]);
    }
    return result;
  };
}

Trans.specialCharTrans = __createTrans(specialBef, specialAft);
Trans.specialCharUntrans = __createTrans(specialAft, specialBef);

export default Trans;
