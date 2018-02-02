'use strict';
const _repeat = require('lodash/repeat');
const _forOwn = require('lodash/forOwn');

const MASK_CHAR = '*';

const _parse = string => {
  if (typeof string === 'string') {
    try {
      return JSON.parse(string);
    } catch (err) {
      return null;
    }
  }
  return null;
};
const _maskedString = ({length, maskChar}) => _repeat(maskChar, length);

const masked = (data, keys) => {
  if (!data) {
    return null;
  }
  if (typeof data !== 'object' && !_parse(data)) {
    return data;
  }
  if (!keys || (!Array.isArray(keys) && typeof keys !== 'string')) {
    if (!keys) {
      throw new Error('Second parameter `keys` not given');
    }
    throw new TypeError(`Expected a string or array, got ${typeof keys}`);
  }

  let newData = _parse(data) || data;
  if (Array.isArray(newData)) {
    newData = newData.map(newData => {
      if (typeof newData !== 'object') {
        return newData;
      }
      return masked(newData, keys);
    });
  } else {
    newData = {...newData};
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
  }

  return (typeof data === 'string' && _parse(data)) ? JSON.stringify(newData) : newData;
};

module.exports = masked;
