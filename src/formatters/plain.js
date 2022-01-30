const pathMaker = (value, path) => (path === '' ? value : `${path}.${value}`);

const unitToString = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'boolean' || value === null) {
    return value;
  }
  return `'${value}'`;
};

const plainAstDecoder = (ast) => {
  const decoder = (astData, path) => {
    const lines = astData
      .map((unit) => {
        switch (unit.type) {
          case 'equal':
            return '';
          case 'removed':
            return `Property '${pathMaker(unit.name, path)}' was removed`;
          case 'added':
            return `Property '${pathMaker(
              unit.name,
              path
            )}' was added with value ${unitToString(unit.value)}`;
          case 'nested':
            return decoder(unit.children, pathMaker(unit.name, path));
          case 'updated':
            return `Property '${pathMaker(
              unit.name,
              path
            )}' was updated. From ${unitToString(
              unit.oldValue
            )} to ${unitToString(unit.newValue)}`;
          default:
            return `Unknown node format: ${unit.type}`;
        }
      })
      .filter(String);
    return lines.join('\n');
  };
  return decoder(ast, '');
};

export default plainAstDecoder;
