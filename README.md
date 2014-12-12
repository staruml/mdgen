**DO NOT USE THIS MODULE (UNDER DEVELOPMENT)**

---

Model-Driven Generation (mdgen)
===============================

A CLI (Command-Line Interface) tool for template-based code generation from a [metadata-json](https://github.com/staruml/metadata-json) file (`.mdj`) typically created using [StarUML](http://staruml.io).

Installation
------------

```
$ npm install -g mdgen
```

Features
--------

* Generate codes using templates of [EJS](https://github.com/tj/ejs)
* Generate HTML Docs
* Generate PDF
* (TODO) Generate image (PNG, JPEG, SVG) of diagrams



Usage
-----

```
$ mdgen render mymodel.mdj -t my-java-template.ejs -o Classes.java
```

Read configuration `mdgen.json` file
```
$mdgen default --config mdgen.json
```

Configuration File
------------------

```
{
    "default": {
        "model": "mymodel.mdj",
        "render": [
            {
                "template": "templates/my-java-template.ejs",
                "out": "src/gen/Basic.java"
            },
            {
                "template": "templates/my-csharp-template.ejs",
                "out": "src/gen/Basic.cs"            
            }
        ]
    }
}
```
