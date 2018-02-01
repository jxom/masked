'use strict';
const _repeat = require('lodash/repeat');
const _forOwn = require('lodash/forOwn');

const MASK_CHAR = '*';

const _maskedString = ({length, maskChar}) => _repeat(maskChar, length);

const masked = (data, keys) => {
  if (!data) {
    throw new Error('First parameter `data` not given');
  }
  if (!keys || (!Array.isArray(keys) && typeof keys !== 'string')) {
    if (!keys) {
      throw new Error('Second parameter `keys` not given');
    }
    throw new TypeError(`Expected a string or array, got ${typeof keys}`);
  }
  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(data => {
      if (typeof data !== 'object') {
        return data;
      }
      return masked(data, keys);
    });
  }

  const newData = {...data};
  _forOwn(newData, (value, key) => {
    if (typeof value === 'object') {
      if (Array.isArray(value) && Array.isArray(keys) && keys.includes(key)) {
        newData[key] = value.map(() => _maskedString({length: 8, maskChar: MASK_CHAR}));
      } else {
        newData[key] = masked(value, keys);
      }
    } else if (key === keys || (Array.isArray(keys) && keys.includes(key))) {
      newData[key] = _maskedString({length: 8, maskChar: MASK_CHAR});
    }
  });
  return newData;
};

module.exports = masked;
