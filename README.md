**DO NOT USE THIS MODULE (UNDER DEVELOPMENT)**

---

Model-Driven Generation (mdgen)
===============================

A CLI (Command-Line Interface) tool for template-based code generation for [metadata-json](https://github.com/staruml/metadata-json) files (`.mdj`) typically created by [StarUML](http://staruml.io).

Installation
------------

```
$ npm install -g mdgen
```

Features
--------

* Generate codes using templates of [EJS](https://github.com/tj/ejs)
* (TODO) Generate images (PNG, JPEG, SVG) of diagrams

Usage
-----

```shell
$ mdgen [command] [options]
```

### render

```shell
$ mdgen render -m model.mdj -t java-template.ejs -o out/<%=element.name%>.java -s @UMLClass
```

### png, jpg, svg, pdf (TODO)

Not implemented yet.

