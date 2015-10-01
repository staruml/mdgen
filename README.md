Model-Driven Generation (mdgen)
===============================

A command line tool for template-based code generation from metadata encoded in JSON format based on [metadata-json](https://github.com/staruml/metadata-json) files (`.mdj`) typically created by [StarUML](http://staruml.io).

Installation
------------

This tool depends on [Node.js](http://nodejs.org) so you need to install it first. Install globally using `npm` command so as to use `mdgen` in any directory.

```
$ npm install -g mdgen
```

> **IMPORTANT**
>
> This `mdgen` uses [**node-canvas**](https://github.com/Automattic/node-canvas) module in order to generate diagram image files (PNG and SVG).
> If you need to export diagram images, you have to install **Cairo** first before installing this module (_To installing Cairo on various platforms, please refer to https://github.com/Automattic/node-canvas_).
> If you don't need to export images, ignore installation errors from `node-canvas`.


Features
--------

* Generate codes using [EJS](https://github.com/tj/ejs) templates.
* Generate a PDF document from diagrams.

Usage
-----

```shell
$ mdgen [command] [options]
```

### Generate codes with EJS template

To generate codes with EJS template, use `render` command with following options:

* `-m, --model <file>` : a model file to load (default `model.mdj`)
* `-t, --template <file>` : template file (default `template.ejs`)
* `-o, --output <file>` : output file (default `mdgen-out`)
* `-s, --select <selector>` : [selector expression](https://github.com/staruml/metadata-json/wiki/SelectorExpression) to select a set of elements (default `@Project`).

To see the help, type `mdgen render -h` or `mdgen render --help` in shell.

Here is an example to generate a set Java source files. Loads `model.mdj` file and renders all of UML Classes with `java-template.ejs` template, then save to files of its name and `.java` file extension in `out` folder.

```shell
$ mdgen render -m model.mdj -t java-template.ejs -o "out/<%=element.name%>.java" -s @UMLClass
```

### Export diagram images (PNG or SVG)

To export diagram images, use `image` command with following options:

* `-m, --model <file>` : a model file to load (default `model.mdj`)
* `-o, --output <file>` : output image file name (default `<%=diagram.name%>.png`)
* `-f, --format <format>`, image format "png" or "svg" (default `png`)
* `-s, --select <selector>` : [selector expression](https://github.com/staruml/metadata-json/wiki/SelectorExpression) to select a set of diagrams (default `@Diagram`).


To see the help, type `mdgen image -h` or `mdgen image --help` in shell.

Here is an example to export diagram images. Loads `model.mdj` file and export all of diagrams as SVG format in `images` folder.

```shell
$ mdgen image -m model.mdj -o "images/<%=diagram.name%>.svg" -f "svg" -s @Diagram
```

### Generate a PDF document

To generate a PDF document of diagrams, use `pdf` command with following options:

* `-m, --model <file>` : model file to load (default `model.mdj`)
* `-o, --output <file>` : output file (default `mdgen-out.pdf`)
* `-s, --select <selector>` : [selector expression](https://github.com/staruml/metadata-json/wiki/SelectorExpression) to select a set of elements (default `@Diagram`). This means all diagrams.
* `-z, --size <size>` : page size (default `A4`). Full list of page size can be found [here](https://github.com/staruml/metadata-json).
* `-l, --layout <layout>` : page layout (default `landscape`). Or use `portrait`.
* `-n, --showname <yesno>` : show diagram name on page top (default `yes`). Or use `no`.

Here is an example generating all diagrams in a PDF document.

```shell
$ mdgen pdf -m model.mdj -o document.pdf
```

### Generate HTML document

To generate HTML docs, use `html` command with following options:

* `-m, --model <file>` : model file to load (default `model.mdj`)
* `-o, --output <file>` : output folder name (default `html-out`)
* `-d, --diagram <yesno>` : export diagram images (default `yes`). Or use `no`.

Here is an example generating HTML docs.
`
```shell
$ mdgen html -m model.mdj -o html-out
```
