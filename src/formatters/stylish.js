const bracketIndent = (depthValue, indent = ' ', extraIndentCounter = 0) => indent.repeat(4 * depthValue + extraIndentCounter);

const indentMaker = (depthValue, indent = ' ') => bracketIndent(depthValue, indent, 2);

const stringify = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    const lines = Object.entries(value).map(
      ([key, val]) => `${indentMaker(depth)}  ${key}: ${stringify(val, depth + 1)}`,
    );
    return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
  }
  return value;
};

const astDecoder = (ast) => {
  const decoder = (astData, depth) => {
    const lines = astData.map((unit) => {
      if (unit.type === 'removed') {
        return `${indentMaker(depth)}- ${unit.name}: ${stringify(
          unit.value,
          depth + 1,
        )}`;
      }
      if (unit.type === 'added') {
        return `${indentMaker(depth)}+ ${unit.name}: ${stringify(
          unit.value,
          depth + 1,
        )}`;
      }
      if (unit.type === 'nested') {
        return `${indentMaker(depth)}  ${unit.name}: ${decoder(
          unit.children,
          depth + 1,
        )}`;
      }
      if (unit.type === 'equal') {
        return `${indentMaker(depth)}  ${unit.name}: ${stringify(
          unit.value,
          depth + 1,
        )}`;
      }
      if (unit.type === 'updated') {
        return [
          `${indentMaker(depth)}- ${unit.name}: ${stringify(
            unit.oldValue,
            depth + 1,
          )}`,
          `${indentMaker(depth)}+ ${unit.name}: ${stringify(
            unit.newValue,
            depth + 1,
          )}`,
        ].join('\n');
      }
      return 'Something went wrong...';
    });
    return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
  };
  return decoder(ast, 0);
};

export default astDecoder;
