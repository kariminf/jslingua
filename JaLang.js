/**
* Returns unicode 
* @method getUnicode
* @param {String, Number} char a character or a unicode int
* @return {Number} returns the same number or the unicode of the first character
*/
function getUnicode(char) {
    var type = typeof char;
    if (type === "number")
        return char;
    
    if (type === "string" && char != "")
        return char.charCodeAt(0);
    
    return -1;
}

function isBetween(min,  max){
    return function (char){
        var u = getUnicode(char); 
        if(min <= u && u <= max)
            return true;
        return false;
    }
}

function contains(charTestFunc) {
    return function(text) {
        for (var i = 0; i < text.length; i++) {
            var u = text.charCodeAt(i);
            if (charTestFunc(u)) 
                return true;    
        }
        return false;
    }
}


function all(charTestFunc) {
    return function(text) {
        for (var i = 0; i < text.length; i++) {
            var u = text.charCodeAt(i);
            if (! charTestFunc(u)) 
                return false;    
        }
        return true;
    }
}

/**
* Check out if a character is a hiragana
* @method isHiragana
* @param {Object} char a character or a unicode int
* @return {Boolean} true or false
*/
var isHiragana = isBetween(0x3040, 0x309F);


/**
* Check out if a string contains hiragana
* @method containsHiragana
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var containsHiragana = contains(isHiragana);

/**
* Check out if a string is all hiragana
* @method allHiragana
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var allHiragana = all(isHiragana);

/**
* Check out if a character is a katakana
* @method isHiragana
* @param {Object} char a character or a unicode int
* @return {Object} true or false
*/
var isKatakana = isBetween(0x30A0, 0x30FF);


/**
* Check out if a string contains katakana
* @method containsKatakana
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var containsKatakana = contains(isKatakana);

/**
* Check out if a string is all katakana
* @method allKatakana
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var allKatakana = all(isKatakana);

/**
* Check out if a character is a katakana
* @method isKanji
* @param {Object} char a character or a unicode int
* @return {Object} true or false
*/
var isKanji = isBetween(0x4E00, 0x9FBF);


/**
* Check out if a string contains katakana
* @method containsKanji
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var containsKanji = contains(isKanji);

/**
* Check out if a string is all kanji
* @method allKanji
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var allKanji = all(isKanji);

/**
* Check out if a character is a CJK punctuation
* @method isPunctuation
* @param {String} char a character or a unicode int
* @return {Boolean} true or false
*/
var isPunctuation = isBetween(0x3000, 0x303F);


/**
* Check out if a string contains CJK punctuation
* @method containsPunctuation
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var containsPunctuation = contains(isPunctuation);

/**
* Check out if a string is all CJK punctuations
* @method allPunctuation
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var allPunctuation = all(isPunctuation);

