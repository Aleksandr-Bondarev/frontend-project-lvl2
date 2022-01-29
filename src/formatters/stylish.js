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

const stylishAstDecoder = (ast) => {
  const decoder = (astData, depth) => {
    const lines = astData.map((unit) => {
      switch (unit.type) {
        case 'removed':
          return `${indentMaker(depth)}- ${unit.name}: ${stringify(unit.value, depth + 1)}`;
        case 'added':
          return `${indentMaker(depth)}+ ${unit.name}: ${stringify(unit.value, depth + 1)}`;
        case 'nested':
          return `${indentMaker(depth)}  ${unit.name}: ${decoder(unit.children, depth + 1)}`;
        case 'equal':
          return `${indentMaker(depth)}  ${unit.name}: ${stringify(unit.value, depth + 1)}`;
        case 'updated':
          return [`${indentMaker(depth)}- ${unit.name}: ${stringify(unit.oldValue, depth + 1)}`,
            `${indentMaker(depth)}+ ${unit.name}: ${stringify(unit.newValue, depth + 1)}`,
          ].join('\n');
        default: return 'Something went wrong...';
      }
    });
    return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
  };
  return decoder(ast, 0);
};

export default stylishAstDecoder;
