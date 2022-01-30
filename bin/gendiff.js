#!/usr/bin/env node

import program from 'commander/esm.mjs';
import gendiff from '../src/index.js';

const program = new Command();
program
  .version('0.0.1', '-v, --vers', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstFilePath> <secondFilePath>')
  .action((firstFilePath, secondFilePath) => {
    console.log(gendiff(firstFilePath, secondFilePath, program.opts().format));
  });
program.parse(process.argv);
