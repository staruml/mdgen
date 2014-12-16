#!/usr/bin/env node

var program = require('commander'),
    fs      = require('fs-extra'),
    ejs     = require('ejs'),
    mdjson  = require('metadata-json');

program
    .option('-m, --model <file>', 'model file to load (default "model.mdj")')
    .option('-t, --template <file>', 'template file (default "template.ejs"')
    .option('-o, --output <file>', 'output file (default "mdgen-out")')
    .option('-s, --select <selector>', 'selector for a set of elements (default "@Project")')
    .parse(process.argv);


// Default parameters
program.model = program.model || "model.mdj";
program.template = program.template || "template.ejs";
program.output = program.output || "mdgen-out";
program.select = program.select || "@Project";

// Generate codes
var success = 0,
    errors  = 0;

try {
    mdjson.loadFromFile(program.model);
    mdjson.renderBulk(program.template, program.output, program.select, {}, function (err, file, elem) {
        if (err) {
            errors++;
            console.error(err);
        } else {
            success++;
            console.log("File generated: " + file);
        }
    });
} catch (err) {
    errors++;
    console.error(err);
}

console.log();
console.log("Total " + success + " file(s) were generated.");
if (errors === 0) {
    console.log("Done without errors.");
} else {
    console.log("Done with " + errors + " errors.");
}
