#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

function task(task) {
    console.log("run " + task);
}

program
    .version('0.1.0')
    .usage('[command] [options]')
    .command('render', 'generate code using template')
    .command('png', 'generate PNG image')
    .command('jpg', 'generate JPEG image')
    .command('svg', 'generate SVG image')
    .command('pdf', 'generate PDF document')
    .option('-r, --run <task>', 'run a specified task', task)
    .parse(process.argv);
