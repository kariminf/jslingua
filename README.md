
# JsLingua

[![Project](https://img.shields.io/badge/Project-JsLingua-FDEE00.svg)](https://kariminf.github.com/jslingua)
[![License](https://img.shields.io/badge/License-Apache--2.0-FDEE00.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Version](https://img.shields.io/npm/v/jslingua.svg)](https://www.npmjs.com/package/jslingua)
[![Travis](https://img.shields.io/travis/kariminf/jslingua.svg)](https://travis-ci.org/kariminf/jslingua)
[![codecov](https://img.shields.io/codecov/c/github/kariminf/jslingua.svg)](https://codecov.io/gh/kariminf/jslingua)
[![npm](https://img.shields.io/npm/dt/jslingua.svg)](https://www.npmjs.com/package/jslingua)

Javascript library to process languages:
* Information about the language
* Basic language functions:
  * Detection of language's characters
  * Transforming numbers to strings (pronunciation)
* Transliteration: different transliteration methods including Morse code.
* Morphology: different morphological functions
  * Verb Conjugation
  * Stemming

You can test it on [https://kariminf.github.com/jslingua](https://kariminf.github.com/jslingua)

## Functionalities

To get the list of available functionalities, check [FCT.md](./FCT.md)

YuiDoc generated API is located in [https://kariminf.github.com/jslingua/docs/](https://kariminf.github.com/JsLingua/docs/)

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

Copyright (C) 2016-2017 Abdelkrime Aries

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
