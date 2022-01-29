import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import makeAST from './makeAST.js';
import formatterSelector from './formatters/formatterSelector.js';

const gendiff = (filepath1, filepath2, format) => {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  const data1 = fs.readFileSync(fullPath1, 'utf8');
  const data2 = fs.readFileSync(fullPath2, 'utf8');

  const fileFormat1 = path.extname(fullPath1);
  const fileFormat2 = path.extname(fullPath2);

  const obj1 = parse(data1, fileFormat1);
  const obj2 = parse(data2, fileFormat2);

  const ast = makeAST(obj1, obj2);
  return formatterSelector(ast, format);
};

export default gendiff;
