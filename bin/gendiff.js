#!/usr/bin/env node

import _ from 'lodash';
import gendiff from '../src/index.js';
import { Command } from '../node_modules/commander/esm.mjs';
const program = new Command();
program
	.version('0.0.1', '-v, --vers', 'output the current version')
	.description('Compares two configuration files and shows a difference.')
	.option('-f, --format [type]', 'output format')
	.arguments('<firstFilePath> <secondFilePath>')
	.action((firstFilePath, secondFilePath) => {
		gendiff(firstFilePath, secondFilePath);
	});
program.parse(process.argv);
