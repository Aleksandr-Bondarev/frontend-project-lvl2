import fs from 'fs';

import path from 'path';

import _ from 'lodash';

import parse from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  const data1 = fs.readFileSync(fullPath1, 'utf8');
  const data2 = fs.readFileSync(fullPath2, 'utf8');

  const fileFormat1 = path.extname(fullPath1);
  const fileFormat2 = path.extname(fullPath2);

  const obj1 = parse(data1, fileFormat1);
  const obj2 = parse(data2, fileFormat2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const unitedKeys = keys1.concat(keys2);
  unitedKeys.sort();

  const duplicateFreeKeys = _.sortedUniq(unitedKeys);

  let result = '{\n';
  for (const key of duplicateFreeKeys) {
    if (obj1[key] === obj2[key] && obj1[key] !== undefined) {
      result = result.concat(`    ${key}: ${obj1[key]}\n`);
    }
    if (key in obj1 && key in obj2 && obj1[key] !== obj2[key]) {
      result = result.concat(`  - ${key}: ${obj1[key]}\n`);
      result = result.concat(`  + ${key}: ${obj2[key]}\n`);
    }
    if (key in obj1 && !(key in obj2)) {
      result = result.concat(`  - ${key}: ${obj1[key]}\n`);
    } else if (key in obj2) {
      result = result.concat(`  + ${key}: ${obj2[key]}\n`);
    }
  }
  result = result.concat('}');
  return result;
};

export default gendiff;
