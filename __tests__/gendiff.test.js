/* eslint no-underscore-dangle: 0 */
/* eslint no-undef: 0 */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const expectedJson = readFile('expectedJson.txt');

const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');
const expectedYml = readFile('expectedYml.txt');

test('gendiff json', () => {
  expect(gendiff(jsonFile1, jsonFile2)).toEqual(expectedJson);
});

test('gendiff yml', () => {
  expect(gendiff(ymlFile1, ymlFile2)).toEqual(expectedYml);
});
