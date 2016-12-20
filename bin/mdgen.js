#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var pjson = require('../package.json');

function task(task) {
    console.log("run " + task);
}

program
    .version(pjson.version)
    .usage('[command] [options]')
    .command('render', 'generate code using template')
    .command('image', 'export diagram image')
    .command('pdf', 'generate PDF document')
    .command('html', 'generate HTML document')
    .option('-r, --run <task>', 'run a specified task', task)
    .parse(process.argv);
