#!/usr/bin/env node

import { Command } from '../node_modules/commander/esm.mjs';
const program = new Command();
program
	.version('0.0.1', '-v, --vers', 'output the current version')
	.description('Compares two configuration files and shows a difference.')
	.arguments('<firstArgument><secondArgument>')
	.option('-f, --format [type]', 'output format');
program.parse();
