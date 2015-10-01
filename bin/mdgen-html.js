#!/usr/bin/env node

var program = require('commander'),
    fs      = require('fs-extra'),
    ejs     = require('ejs'),
    mdjson  = require('metadata-json');

program
    .option('-m, --model <file>', 'model file to load (default "model.mdj")')
    .option('-o, --output <file>', 'output folder name (default "html-out")')
    .option('-d, --diagram <yesno>', 'export diagram images (default "yes")')
    .parse(process.argv);


// Default parameters
program.model    = program.model   || "model.mdj";
program.output   = program.output  || "html-out";
program.diagram  = program.diagram || "yes";

// Generate HTML
try {
    mdjson.loadFromFile(program.model);
    mdjson.exportToHTML(program.output, (program.diagram === "yes"));
    console.log("HTML docs generated: " + program.output);
} catch (err) {
    console.error(err);
}
