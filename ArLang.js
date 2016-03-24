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

//========================================================
//https://en.wikipedia.org/wiki/Arabic_script_in_Unicode
//========================================================
/**
* Check out if a character is a Arabic main chars
* @method isArabic
* @param {Object} char a character or a unicode int
* @return {Boolean} true or false
*/
var isArabic = isBetween(0x0600, 0x06FF);

var isArabicSupplement = isBetween(0x0750, 0x077F);

var isArabicExtendedA = isBetween(0x08A0, 0x08FF);

var isArabicPresentationA = isBetween(0xFB50, 0xFDFF);

var isArabicPresentationB = isBetween(0xFE70, 0xFEFF);

var isIndicNumeral = isBetween(0x0660, 0x0669);

var isArabicNumeral = isBetween(0x0030, 0x0039);

/**
* Check out if a string contains Arabic main chars
* @method containsArabic
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var containsArabic = contains(isArabic);

/**
* Check out if a string is all Arabic main chars
* @method allArabic
* @param {String} text the text to be checked
* @return {Boolean} true or false
*/
var allArabic = all(isArabic);


//https://ar.wikipedia.org/wiki/قائمة_الأعداد
var lookup = {
    0: "صفر", 1:"واحد", 2:"اثنان", 3:"ثلاث", 4:"أربع", 5:"خمس", 
    6:"ست", 7:"سبع", 8:"ثمان", 9:"تسع", 10:"عشر",
    100:"مائة", 1000:"ألف", 1000000:"مليون", 1000000000:"مليار"
}

var bigNbr = [
    100, 1000, 1000000, 1000000000
    //1000000000, 1000000, 1000, 100, 10
]

var lookup2 = {
   100: "مائتان",
   1000: "ألفان",
   1000000: "مليونان",
   1000000000: "ملياران"
    //1000000000, 1000000, 1000, 100, 10
}

var lookupPl = {
   100: "مائة",
   1000: "آلاف",
   1000000: "ملايين",
   1000000000: "ملايير"
    //1000000000, 1000000, 1000, 100, 10
}

/**
* Transform from Arabic numbers to Arabic letters
* @method toArabicLetters
* @param {Number} num the integer number
* @return {String} Arabic writing of numbers
*/
function toArabicLetters (num) {
    
    if (isNaN(num))
        return "";
    
    if(num < 0)
        return "ناقص " + toArabicLetters(-num);
    
    if (num == 0)
        return lookup[num];
    
    if (num == 8)
        return lookup[num] + "ية";
    
    if (num < 3)
        return lookup[num];
    
    if (num < 10)
        return lookup[num] + "ة";
    
    if (num < 100 ){
        var div = ~~(num/10);
        var rem = ~~(num % 10);
        
        if (div == 1){
            if (rem == 0)
                return lookup[10] + "ة";
            if (rem == 1)
                return "أحد " + lookup[10];
            if (rem == 2)
                return "إثنا " + lookup[10];
            return toArabicLetters(rem) + " " + lookup[10];
        }
        
        var tenth = lookup[div] + "ون";
        if (div == 2)
            tenth = lookup[10] + "ون";
        
        if (rem == 0)
                return tenth;
        
        var suff = " و";
        
        return toArabicLetters(rem) + suff + tenth;
        
    }
    
    for (var i = 1; i < bigNbr.length; i++) {
        var big = bigNbr[i];
        var lessBig = bigNbr[i-1];
        if (num < big ){
            var div = ~~(num/lessBig);
            var rem = ~~(num % lessBig);
        
            var pron = lookup[lessBig];
            var pref = "";
            var suff = "";
        
            if (div < 3){
                if (div == 2)
                pron = lookup2[lessBig];
            } else if (div < 9 ){
                pref = lookup[div];
                if (lessBig != 100)
                    pref += "ة ";
                pron = lookupPl[lessBig];
            } else {
                pref = toArabicLetters(div) + " ";
            }
            
            if (div == 2){
                pron = lookup2[lessBig];
                pref = "";
            }
                
                
            if (rem > 0)
                suff = " و" + toArabicLetters(rem);
        
        return pref + pron + suff;
        
        }
    }
    
    var lessBig = bigNbr[bigNbr.length-1];
    
    var div = ~~(num/lessBig);
    var rem = ~~(num % lessBig);
        
    var pron = lookup[lessBig];
    var pref = "";
    var suff = "";

    if (div < 3){
        if (div == 2)
        pron = lookup2[lessBig];
    } else if (div < 9 ){
        pref = lookup[div];
        if (lessBig != 100)
            pref += "ة ";
        pron = lookupPl[lessBig];
    } else {
        pref = toArabicLetters(div) + " ";
    }
          
    if (rem > 0)
        suff = " و" + toArabicLetters(rem);
        
    return pref + pron + suff;
    
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
* Transform from Arabic to indic numerals
* @method indicToArabicNumeral
* @param {String} text the input arabic numerals
* @return {String} The result text where indic numerals are transformed to Arabic
*/
var indicToArabicNumeral = transform(-0x0630, isIndicNumeral);

/**
* Transform from Indic to Arabic numerals
* @method arabicToIndicNumeral
* @param {String} text the input text
* @return {String} The result text where Arabic numeral characters are transformed to Indic ones
*/
var arabicToIndicNumeral = transform(0x0630, isArabicNumeral);