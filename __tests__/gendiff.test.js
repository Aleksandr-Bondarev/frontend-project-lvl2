/* eslint no-underscore-dangle: 0 */
/* eslint no-undef: 0 */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJson.txt');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');

const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');

const formatters = [
  ['stylish', expectedStylish],
  ['plain', expectedPlain],
  ['json', expectedJson],
];

test.each(formatters)('gendiff %s', (formatter, expected) => {
  expect(gendiff(jsonFile1, jsonFile2, formatter)).toEqual(expected);
  expect(gendiff(ymlFile1, ymlFile2, formatter)).toEqual(expected);
});
