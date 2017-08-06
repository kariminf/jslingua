# Contribution Guidelines

Here are some few guidelines on how to be part of this project.

## Tags meanings

In this project, we use a specific set of tags, in issues and change-log:
* NEW: For any new module or file (creation)
* ADD: For any functions added inside a module (addition)
* IMPROVE: For any improvements to existing materials.
This affects the behavior, but doesn't break any precedent
* MODIFY: Modification of function names, files names and directories.
This will break the projects developed on precedent versions.
* FIX: Fixing bugs
* DEL: Delete or deprecate some functions

## Adding issues

If you have any suggestions or found bugs, don't hesitate.
Just open a new issue [HERE](https://github.com/kariminf/jslingua/issues/).
But, before you do, verify if your suggestion or bug report has already been reported.

## Code with us

If you want to fix something yourself, you are welcome to join us.

* Install Git, Npm
* First, [FORK](https://github.com/kariminf/jslingua/fork) this repository
* Clone the fork
* Configure the server to point on this project (let's say 127.0.0.3)

If you want to test the web-site located in docs/
* Install a local web server
* Configure it to point on projects folder (lets say: 127.0.0.3)
* In the file: docs/call.js, comment the 2nd line and uncomment the first
```
var path = "../dist/";
//var path = "https://unpkg.com/jslingua@latest/dist/";
```
* Test the web-site on 127.0.0.3/docs
* Before pushing the code, comment the first line and uncomment the second

If the functionality added to the web-site is not yet ready to be released in npm;
use "next" branch instead of "master".
Otherwise, this will break the test web-site
