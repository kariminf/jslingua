
# JsLingua

[![JsLingua](https://img.shields.io/badge/Project-JsLingua-yellow.svg)](https://kariminf.github.com/JsLingua)
[![Hex.pm](https://img.shields.io/badge/License-Apache--2.0-yellow.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Travis](https://img.shields.io/travis/kariminf/JsLingua.svg)](https://travis-ci.org/kariminf/JsLingua)
[![npm](https://img.shields.io/npm/v/jslingua.svg)](https://www.npmjs.com/package/jslingua)
[![npm](https://img.shields.io/npm/dt/jslingua.svg)](https://www.npmjs.com/package/jslingua)


Javascript library to process languages:
* Information about the language
* Basic language functions:
  * Detection of language's characters
  * Transforming numbers to strings (pronunciation)
* Transliteration: different transliteration methods including Morse code.

You can test it on [https://kariminf.github.com/JsLingua](https://kariminf.github.com/JsLingua)
## Different classes
These classes are abstract; it means each language has to extend these classes. For example: class Lang, we find: AraLang for Arabic and JpnLang for Japanese.

### JsLingua
The **JsLingua** is the main class which used to manage the other classes.
It affords these services:
* **serviceLanguages(serviceID)**: It returns a list of languages codes which support the service.
serviceID is in: "Info", "Lang" and "Trans".
* **getService(serviceID, langCode)**: Returns a class of the service you want to use.

This class is obligatory to manage different services.
In the browser, you have to call it first, before other classes so it can charge the services

### Info
The **Info** class affords these services:
* **getName()**: Get the name of the language; "Arabic", "Japanese", etc.
* **getCode()**: Get the code of the language; "ara", "jpn", etc.
* **getFamily()**: Get the family of the language; "Afro-Asiatic", "Japonic", etc.
* **getBranch()**: Get the branch of the language; "Semetic", etc.
* **getDir()**: Get the direction of writing; "rtl", "ltr".
* **getWordOrder()**: Get Words order using: subject (S), "Object" and Verb "V"; "vso", "sov", etc.
* **getPopulation()**: Get the number of natively speakers; it is approximate.
* **getLocations()**: Get a list of counties where the language is official
* **getDialects()**: Get a list of dialects

### Lang
The **Lang** class affords these services:
* **availableCharSets()**: it returns a list of available charsets names. For Japanese as example, it returns: "Hiragana", "Katakana", "Kanji" and "Punctuation".
* **availableTransformations()**: it returns a list of available transformations between charSets; For example: "hiraganaToKatakana".
* **verifyCharSetFunction(setName)**: this function takes as an argument the charset's name, and return a function which verify if a given character belongs to this charset or not.
* **containsCharSetFunction(setName)**: this function takes as an argument the charset's name, and return a function which verify if a given text contains at least one character of this charset.
* **allCharSetFunction(setName)**: this function takes as an argument the charset's name, and return a function which verify if a given text is fully constructed using character of this charset.
* **getLangName()**: returns the language name: "Arabic", "Japanese", etc.
* **pronounceNumber(nbr)**: it takes a number with Arabic digits, for example 1254, an then it returns a string with the number in letters, for example: "one thousand two hundreds and fifty four" in the class's language.

### Trans
The **trans** class affords these services:
* **availableMethods()**: it returns a list of translateration methods names. For example, in Arabic it returns: "Buckwalter", "ArabTeX" and "Morse". The implementations for each language can add more translaterations.
* **setCurrentMethod(methodName)**: it takes the name of the method, say "Buckwalter", and use it as current method for transliteration and untransliteration.
* **transliterate(text)**: returns a transliterated text using the current method.
* **untransliterate(text)**: returns an untransliterated text using the current method.
* **getLangName()**: returns the language name: "Arabic", "Japanese", etc.

## How to use?

### Use in Browser
Just import the class that you want to use and its implementations.
Here the importation of all classes, where:
* <module> in: info, lang, trans
* <lang> in: ara, jpn

```javascript
<script type="text/javascript" src="jslingua.js" ></script>
<script type="text/javascript" src="<module>.js" ></script>
<script type="text/javascript" src="<lang>/<lang>.<module>.js" ></script>
...
```
You can use a CDN (content-delivery network):
```javascript
<script type="text/javascript" src="https://unpkg.com/jslingua@version/file" ></script>
```
if you want to use the last version, just replace "version" with "latest".
For example, :
```javascript
<script type="text/javascript" src="https://unpkg.com/package@latest/jslingua.min.js" ></script>
<script type="text/javascript" src="https://unpkg.com/package@latest/lang.min.js" ></script>
<script type="text/javascript" src="https://unpkg.com/package@latest/ara.lang.min.js" ></script>
...
```

### Use in Node
First of all, you have to install the package in your current project
```
npm install jslingua
```
Then in your test file, call the main module "jslingua".
```javascript
var JsLingua = require('jslingua');
```

### Get the services (Browser & Node)

You can call them one by one, if you know the services and their implemented languages.
```javascript
//Available information classes
var ArTrans = JsLingua.getService("Info", "ara");
var JaTrans = JsLingua.getService("Info", "jpn");

//Available transliteration classes
var ArTrans = JsLingua.getService("Trans", "ara");
var JaTrans = JsLingua.getService("Trans", "jpn");

//Available language classes
var ArLang = JsLingua.getService("Lang", "ara");
var JaLang = JsLingua.getService("Lang", "jpn");
```

Or, you can just loop over the services and test available languages.
For example, the "Info" service:
```javascript
//Get the list of languages codes which support the Info service
var langIDs = JsLingua.serviceLanguages("Info");
var result = "";
var i;
for (i = 0; i < langIDs; i++){
  var infoClass = JsLingua.getService("Info", langIDs[i]);
  var info = new infoClass();
  result += i + "- " + info.getName() + "\n";
}
```

## Changlog and credits

For Changlog, check [CHANGELOG.md](./CHANGELOG.md)

For Credits, check [CREDITS.md](./CREDITS.md)

## License
The code is released under Apache 2.0 license.
For more details about this license, check [LICENSE](./LICENSE) file
