[![Hex.pm](https://img.shields.io/badge/Project-JsLingua-yellow.svg?style=plastic)](https://kariminf.github.com/JsLingua)
[![Hex.pm](https://img.shields.io/badge/License-Apache_2-yellow.svg?style=plastic)](https://github.com/kariminf/JsLingua/blob/master/LICENSE)
[![Hex.pm](https://img.shields.io/badge/Version-0.1.0-yellow.svg?style=plastic)](https://github.com/kariminf/JsLingua/releases)

JsLingua
===========
Javascript library to process languages:
* Basic language functions:
  * Detection of language's characters
  * Transforming numbers to strings (pronounciation)
* Translateration: different translateration methods including Morse code.

# Different classes
These classes are abstract; it means each language has to extend these classes. For example: class Lang, we find: ArLang for Arabic and JaLang for Japanese

## Lang
The **Lang** class affords these services:
* **availableCharSets()**: it returns a list of available charsets names. For Japanese as example, it returns: "Hiragana", "Katakana", "Kanji" and "Punctuation".
* **availableTransformations()**: it returns a list of available transformations between charSets; For example: "hiraganaToKatakana".
* **verifyCharSetFunction(setName)**: this function takes as an argument the charset's name, and return a function which verify if a given character belongs to this charset or not.
* **containsCharSetFunction(setName)**: this function takes as an argument the charset's name, and return a function which verify if a given text contains at least one character of this charset.
* **allCharSetFunction(setName)**: this function takes as an argument the charset's name, and return a function which verify if a given text is fully constructed using character of this charset.
* **getLangName()**: returns the language name: "Arabic", "Japanese", etc.
* **pronounceNumber(nbr)**: it takes a number with Arabic digits, for example 1254, an then it returns a string with the number in letters, for example: "one thousand two hundreds and fifty four" in the class's language.

## Trans
The **trans** class affords these services:
* **availableMethods()**: it returns a list of translateration methods names. For example, in Arabic it returns: "Buckwalter", "ArabTeX" and "Morse". The implementations for each language can add more translaterations.
* **setCurrentMethod(methodName)**: it takes the name of the method, say "Buckwalter", and use it as current method for transliteration and untransliteration.
* **transliterate(text)**: returns a transliterated text using the current method.
* **untransliterate(text)**: returns an untransliterated text using the current method.
* **getLangName()**: returns the language name: "Arabic", "Japanese", etc.

# How to?

## Use in Browser
Just import the class that you want to use and its implementations. Here the importation of all classes
```
<!-- Transliteration module -->
<script type="text/javascript" src="trans.js" ></script>
<script type="text/javascript" src="ar/ar.trans.js" ></script>
<script type="text/javascript" src="ja/ja.trans.js" ></script>

<!-- Language module -->
<script type="text/javascript" src="lang.js" ></script>
<script type="text/javascript" src="ar/ar.lang.js" ></script>
<script type="text/javascript" src="ja/ja.lang.js" ></script>
```

## Use in Node
First of all, you have to install the package in your current project
```
npm --install jslingua
```
Then in your test file, call the module:
```
var JsLingua = require('jslingua');

//Available transliteration classes
var ArTrans = JsLingua.ArTrans;
var JaTrans = JsLingua.JaTrans;

//Available language classes
var ArLang = JsLingua.ArLang;
var JaLang = JsLingua.JaLang;
```
## Example
You have now the classes, you can use the functions we enumerated earlier.
```
...
var langList = [
    ArLang,
    JaLang
];

var transList = [
    ArTrans,
    JaTrans
];

var test = {
  "Arabic": "أهْلاً بِكُمْ فِي هـٰـذَا الاِختِبَار",
  "Japanese": "皆さん、こんにちは"
};

var resp = "";
for (var i=0; i< langList.length; i++){
    var lang = new langList[i];
    resp += "Language " + lang.getLangName() + "\n";
    resp += "103987 = " + lang.pronounceNumber(103987) + "\n";
}

resp += "\n";
var i;
for (i=0; i< transList.length; i++){
    var trans = new transList[i];
    var langName = trans.getLangName();
    var methods = trans.availableMethods();
    var j;
    for (j = 0; j < methods.length; j++){
        var method = methods[j];
        resp += langName + ": " + method + "\n";
        trans.setCurrentMethod(method);
        if (langName in test){
            var srcT = test[langName];
            var transT = trans.transliterate(srcT);
            resp += srcT + " ==trans==> " + transT + "\n";
            resp += transT + " ==untrans==> " + trans.untransliterate(transT) + "\n";
        }
    }
}

```

# License
The code is released under Apache 2.0 license.
For more details about this license, check [LICENSE](./LICENSE) file
