'use strict';
const _repeat = require('lodash/repeat');
const _forOwn = require('lodash/forOwn');

const MASK_CHAR = '*';

const _maskedString = ({length, maskChar}) => _repeat(maskChar, length);

const huna = (data, keys) => {
  if (!data || typeof data !== 'object') {
    if (!data) {
      throw new Error('First parameter `data` not given');
    }
    throw new TypeError(`Expected an object or array, got ${typeof data}`);
  }
  if (!keys || (!Array.isArray(keys) && typeof keys !== 'string')) {
    if (!keys) {
      throw new Error('Second parameter `keys` not given');
    }
    throw new TypeError(`Expected a string or array, got ${typeof keys}`);
  }

  let newData = Array.isArray(data) ? [...data] : {...data};
  if (Array.isArray(data)) {
    newData = newData.map(data => {
      if (typeof data !== 'object') {
        return data;
      }
      return huna(data, keys);
    });
  } else {
    _forOwn(newData, (value, key) => {
      if (typeof value === 'object') {
        if (Array.isArray(value) && Array.isArray(keys) && keys.includes(key)) {
          newData[key] = value.map(() => _maskedString({length: 8, maskChar: MASK_CHAR}));
        } else {
          newData[key] = huna(value, keys);
        }
      } else if (key === keys || (Array.isArray(keys) && keys.includes(key))) {
        newData[key] = _maskedString({length: 8, maskChar: MASK_CHAR});
      }
    });
  }

  return newData;
};

module.exports = huna;
