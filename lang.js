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
