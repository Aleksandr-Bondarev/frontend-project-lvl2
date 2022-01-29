import stylishAstDecoder from './stylish.js';
import plainAstDecoder from './plain.js';

const formatters = {
  stylish: stylishAstDecoder,
  plain: plainAstDecoder,
};

const formatterSelector = (ast, formatter = 'stylish') => {
  if (!(formatter in formatters)) {
    return `Unknown format ${formatter}`;
  }
  return formatters[formatter](ast);
};

export default formatterSelector;
