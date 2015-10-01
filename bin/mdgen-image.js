#!/usr/bin/env node

var program = require('commander'),
    fs      = require('fs-extra'),
    ejs     = require('ejs'),
    mdjson  = require('metadata-json');

program
    .option('-m, --model <file>', 'model file to load (default "model.mdj")')
    .option('-o, --output <file>', 'output image file (default "<%=diagram.name%>.png")')
    .option('-f, --format <format>', 'image format "png" or "svg" (default "png")')
    .option('-s, --select <selector>', 'selector for a diagram or a set of diagrams (default "@Diagram")')
    .parse(process.argv);

// Default parameters
program.model = program.model || "model.mdj";
program.output = program.output || "<%=diagram.name%>.png";
program.format = program.format || "png";
program.select = program.select || "@Diagram";

// Generate codes
var success = 0,
    errors  = 0;

try {
    mdjson.loadFromFile(program.model);
    mdjson.exportDiagramBulk(program.select, program.output, program.format, {}, function (err, file, elem) {
        if (err) {
            errors++;
            console.error(err);
        } else {
            success++;
            console.log("Diagram exported: " + file);
        }
    });
} catch (err) {
    errors++;
    console.error(err);
}


console.log();
console.log("Total " + success + " diagram image(s) were generated.");
if (errors === 0) {
    console.log("Done without errors.");
} else {
    console.log("Done with " + errors + " errors.");
}
