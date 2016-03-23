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

var lookup = {
    0: "零", 1:"一", 2:"二", 3:"三", 4:"四", 5:"五", 
    6:"六", 7:"七", 8:"八", 9:"九", 10:"十",
    100:"百", 1000:"千", 10000:"万", 
    100000000:"億", 1000000000000:"兆"  
}

var bigNbr = [
    1000000000000, 100000000,
    10000, 1000, 100, 10
]

/**
* Transform from Arabic numbers to Japanese letters
* @method toJapaneseLetters
* @param {Number} num the integer number
* @return {String} Japanese writing of numbers
*/
function toJapaneseLetters (num) {
    
    if (isNaN(num))
        return "";
    
    var neg = false;
    if(num < 0){
        neg = true;
        num = - num;
    }
    
    if (num < 10)
        return lookup[num];
    
    //search for the max index
    var i = 0;
    var max = 1;
    var div;
    for (i = 0; i < bigNbr.length; i++){
        max = bigNbr[i]
        div = ~~(num/max);
        if (div > 0)
            break;
    }
    var rem = ~~(num % max);
    var result = "";
    if (div > 0)
        if (div > 1 || max > 1000)
            result += toJapaneseLetters(div);
    result += lookup[max];
    if(rem > 0)
        result += toJapaneseLetters(rem);
    
    if(neg)
        result = "マイナス" + result;
    
    return result;
    
}

function transform (diff, charTestFunc) {
    return function(text) {
        var result = "";
        for (var i = 0; i < text.length; i++){
            var u = text.charCodeAt(i);
            if (charTestFunc(u))
                u += diff;
            result += String.fromCharCode(u);
        }
        return result;
    }
}

/**
* Transform from hiragana to katakana
* @method hiraganaToKatakana
* @param {String} text the input text
* @return {String} The result text where hiragana characters are transformed to katakana
*/
var hiraganaToKatakana = transform(0x0060, isHiragana);

/**
* Transform from katakana to hiragana
* @method katakanaToHiragana
* @param {String} text the input text
* @return {String} The result text where katakana characters are transformed to hiragana
*/
var katakanaToHiragana = transform(-0x0060, isKatakana);