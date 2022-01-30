import _ from 'lodash';

const makeAST = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const duplicateFreeKeys = _.sortedUniq(keys1.concat(keys2).concat().sort());

  return duplicateFreeKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return { name: key, type: 'removed', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { name: key, type: 'added', value: obj2[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        name: key,
        type: 'nested',
        children: makeAST(obj1[key], obj2[key]),
      };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { name: key, type: 'equal', value: obj1[key] };
    }
    return {
      name: key,
      type: 'updated',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
};

export default makeAST;
