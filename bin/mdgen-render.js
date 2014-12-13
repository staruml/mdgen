#!/usr/bin/env node

var program = require('commander'),
    fs      = require('fs-extra'),
    ejs     = require('ejs'),
    mdjson  = require('metadata-json');

program
    .option('-m, --model <file>', 'model file to load')
    .option('-t, --template <file>', 'template file')
    .option('-o, --output <file>', 'output file')
    .option('-s, --select <selector>', 'selector expression to select a set of elements')
    .parse(process.argv);

var root;

// Load model file
if (!program.model) {
    console.log("Model file is required");
    process.exit(0);
}
if (fs.existsSync(program.model)) {
    root = mdjson.loadFromFile(program.model);
} else {
    console.error("File not found: " + program.model);
    process.exit(1);
}

var elements = [root];

// Select a set of elements to be rendered
if (program.select) {
    try {
        elements = mdjson.Repository.select(program.select);
    } catch (err) {
        console.error("Error in selector expression: " + program.select);
        process.exit(1);
    }
}

var template;

// Get template
if (!program.template) {
    console.log("Template file is required");
    process.exit(0);
}
if (fs.existsSync(program.template)) {
    template = fs.readFileSync(program.template, 'utf8');
} else {
    console.error("File not found: " + program.template);
    process.exit(1);
}

// Set output file
if (!program.output) {
    program.output = "mdgen-out";
}

// Render all selected elements with template
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i],
        output  = ejs.render(program.output, {element: element}),
        options = {
            mdjson   : mdjson,
            filename : program.template,  // to avoid "include" error
            root     : root,
            element  : element
        };
    var rendered = ejs.render(template, options);
    fs.ensureFileSync(output);
    fs.writeFileSync(output, rendered);
    console.log("File generated: " + output);
}

// Done.
console.log();
console.log("Total " + elements.length + " file(s) were generated.");
console.log("Done without errors.");
