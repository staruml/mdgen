#!/usr/bin/env node

var program = require('commander'),
    fs      = require('fs-extra'),
    ejs     = require('ejs'),
    path    = require('path'),
    mdjson  = require('metadata-json');

program
    .option('-m, --model <file>', 'model file to load (default "model.mdj")')
    .option('-o, --output <file>', 'output file (default "mdgen-out.pdf")')
    .option('-s, --select <selector>', 'selector for a set of diagrams (default "@Diagram")')
    .option('-z, --size <size>', 'page size (default "A4")')
    .option('-l, --layout <layout>', 'page layout (default "landscape")')
    .option('-n, --showname <yesno>', 'show diagram name on page top (default "yes")')
    .parse(process.argv);


// Default parameters
program.model = program.model || "model.mdj";
program.output = program.output || "mdgen-out.pdf";
program.select = program.select || "@Diagram";
program.size = program.size || "A4";
program.layout = program.layout || "landscape";
program.showname = program.showname || "yes";

// Generate diagrams
var diagrams,
    options = {};

function loadDefaultFonts() {
    var dir = path.normalize(__dirname + "/../fonts");
    var fontDirs = fs.readdirSync(dir);
    fontDirs.forEach(function (fontDir) {
        mdjson.registerFont(path.join(dir, fontDir));
    });
}

try {
    loadDefaultFonts();
    mdjson.loadFromFile(program.model);
    diagrams = mdjson.Repository.select(program.select);
    options.size = program.size;
    options.layout = program.layout;
    options.showName = (program.showname === "no") ? false : true;
    mdjson.exportToPDF(diagrams, program.output, options);
    console.log("PDF generated: " + program.output);
} catch (err) {
    console.error(err);
}
