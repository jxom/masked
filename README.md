# Masked [![Build Status](https://travis-ci.org/jxom/masked.svg?branch=master)](https://travis-ci.org/jxom/masked)

> Mask sensitive values in objects/arrays


## Install

```
$ npm install masked
```


## Usage

```js
const masked = require('masked');
// or
import masked from 'masked';

const user = {
  firstName: 'jake',
  password: 'IAmCool',
  mobileNumbers: ['0400123123', '0411223444'],
  providerData: [{ providerNumber: '123456' }, { providerNumber: '123456' }]
};

const maskedUser = masked(user, ['password', 'mobileNumbers', 'providerData']);
/*
maskedUser =
  {
    firstName: 'jake',
    password: '********',
    mobileNumbers: ['********', '********'],
    providerData: [{ providerNumber: '********' }, { providerNumber: '********' }]
  }
*/
```

and [here](https://github.com/jxom/masked/blob/master/test.js)


## API

### masked(data, keys)

#### data

Type: `Object` or `Array`

The data that you want to mask.

#### keys

Type: `string` or `Array`

The sensitive keys in your `data`.


## License

MIT © [jxom](http://jxom.io)
