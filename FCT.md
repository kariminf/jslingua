
# JsLingua Functions

jsdoc generated API is located in [https://kariminf.github.io/jslingua.web/docs/](https://kariminf.github.io/jslingua.web/docs/)


## JsLingua

The **JsLingua** is the main class which used to manage the other classes.
It affords these services:
* **serviceLanguages(serviceID)**: It returns a list of languages codes which support the service.
serviceID is in: "Info", "Lang" and "Trans".
* **getService(serviceID, langCode)**: Returns a class of the service you want to use.

This class is obligatory to manage different services.
In the browser, you have to call it first, before other classes so it can charge the services

## Info

The **Info** class affords these services:
* **getName()**: Get the name of the language; "Arabic", "Japanese", etc.
* **getCode()**: Get the code of the language; "ara", "jpn", etc.
* **getFamily()**: Get the family of the language; "Afro-Asiatic", "Japonic", etc.
* **getBranch()**: Get the branch of the language; "Semetic", etc.
* **getDir()**: Get the direction of writing; "rtl", "ltr".
* **getWordOrder()**: Get Words order using: subject (S), "Object" and Verb "V"; "vso", "sov", etc.

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

## Morpho

The **morpho** class affords these services:
* **conjugate**: returns a conjugated verb according to some given options, such as
the tense, etc.
* **declenseNoun**: returns an inflected noun according to some given options, such as
the gender, the number, etc.
* **getPronounName**: returns the pronoun according to options, such as the gender,
the number, etc.
* **getPronounOpts**: returns a list of pronoun options which are available
for the selected language.
* **getTenses**: returns a list of available tense options for the selected
language.
* **lemmatize**: returns the lemma of a word.
* **stem**: returns the stem of a word.
