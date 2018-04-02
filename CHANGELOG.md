
# JsLingua Changelog

This is the changelog syntax:
* NEW: For any new module or file (creation)
* ADD: For any functions added inside a module (addition)
* IMPROVE: For any improvements to existing materials.
This affects the behavior, but doesn't break any precedent
* MODIFY: Modification of function names, files names and directories.
This will break the projects developed on precedent versions.
* FIX: Fixing bugs
* DEL: Delete or deprecate some functions

## Current
* REFACTORING
* MODIFY: functions names; using more abbreviated ones 

## Version 0.8.0 (2018-03-31)
* IMPROVE: Arabic conjugation; Add negation marks when negated
* ADD: JsLingua Arabic stemmer; A starter try
* FIX: French conjugation; Group 3
* IMPROVE: French conjugation; add negation
* DEL: Morpho noun declension methods
* ADD: Morpho PoS conveting methods (wider than noun declension)
* ADD: getStemmerDesc, getPosConverterDesc to Morpho
* ADD: singular 2 plural to Arabic, English and French (a testing function)
* ADD: singular to dual to Arabic (a testing function)
* ADD: splitToSentences, tokenize and filterStopWords to Morpho  API


## Version 0.7.0 (2018-01-01)

* NEW: French support (Info, Lang, Trans, Morpho)
* IMPROVE: adding transformation from charsets to others
* ADD: Lancaster stemmer for English
* ADD: English Noun declension (singular to plural): beta version
* DEL: getVerbType from Morpho API (never been used)


## Version 0.6.x (2017-09-18)

* ADD: Japanese stemmer: jpn.morpho: jslinguaJpnStemmer
* ADD: normalization to Japanese Morpho
* ADD: ISRI stemmer to ara.morpho
* IMPROVE: Arabic verb conjugation
* ADD:  Japanese stemmer to jpn.morpho: IsriAraStemmer
* DEL: lematize from Morpho
* ADD: English normalization to eng.morpho
* IMPROVE: improve the code readability


## Version 0.5.0 (2017-08-13)

* ADD: verb Conjugation to Japanese Morpho
* IMPROVE: verb Conjugation of English Morpho
* ADD: getVerbTypes, getVerbType(verb)
* MODIFY: The way to access conjugation parameters: getTenses --> GetForms
* ADD: normalization function to Morpho
* ADD: normalization to Arabic Morpho


## Version 0.4.4 (2017-07-31)

* ADD: Porter Stemmer for English Morpho


## Version 0.4.0 (2017-07-29)
* NEW: English Language
* IMPROVE: Add unit tests and coverage reports


## Version 0.3.0 (2016-08-30)

* FIX: Japanese little "tsu" transliteration.
* NEW: Morpho class; a class for conjugation, declension, stemming and lemmatizing
* NEW: Arabic implementation of Morpho class with simple conjugation
* ADD: changelog and credits
* DEL: populations, dialects and countries in Info


## Version 0.2.0 (2016-08-30)

* FIX: Arabic numbers in letters
* NEW: Info class and implementations for Arabic and Japanese
* MODIFY: languages implementations names from ISO639-1 (2 characters) into ISO639-2 (3 characters)
* MODIFY: index.js to jslingua.js. This module must used to access to other modules.
* ADD: Functions to access the different modules and to verify the available languages


## Version 0.1.1 (2016-08-27)

* IMPROVE: Documentation


## Version 0.1.0 (2016-08-27)

* FIX: For one language we can find many trasliteration methods
* ADD: ArabTex Transliteration to Arabic Trans
* ADD: Nihon-Shiki and Kunrei-Shiki to Japanese Trans
* FIX: Japanese untransliteration
* MODIFY: the function "[un]translaterate" to "[un]transl**i**terate"
* ADD: morse code as transliteration method to both Arabic and Japanese


## Version 0.0.1 (2016-08-12)

* NEW: Lang class and its implementations in Arabic and Japanese
* NEW: Transliteration class and its implementations in Arabic and Japanese
* NEW: index.js which is used in nodejs to lunch different implementations
