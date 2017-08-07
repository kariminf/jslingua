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
* cd jslingua
* nmp install

If you want to see the web-site:
```
./server
```
* then in your browser **http://127.0.0.1:8086/**

This website is meant to users, because you have to execute
```
bash min.sh
```
which minimizes the javascript files and send them to "dist".


To test while programming, see the next section "testing"

## testing

When you modify your code, it is preferable to test it.

### browser
```
./server
```
* then in your browser **http://127.0.0.1:8086/test/browser/**
* Choose the module if it is available, or create a simple website test

### mocha

You can find mocha tests in "./test/unit/"

### nodejs

You can find simple nodejs scripts (log test) in "./test/nodejs/"
